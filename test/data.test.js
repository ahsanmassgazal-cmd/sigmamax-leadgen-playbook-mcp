import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { AGENTS, STAGES, WORKFLOWS, getAgent, searchAgents, recommend } from "../src/agents.js";
import { buildPrompt } from "../src/prompts.js";

test("catalog has exactly 100 agents with ids 1..100", () => {
  assert.equal(AGENTS.length, 100);
  assert.deepEqual(AGENTS.map((a) => a.id), Array.from({ length: 100 }, (_, i) => i + 1));
});

test("slugs are unique and every agent has goal, inputs and outputs", () => {
  assert.equal(new Set(AGENTS.map((a) => a.slug)).size, 100);
  for (const a of AGENTS) {
    assert.ok(a.goal.length > 10, a.name);
    assert.ok(a.inputs.length >= 1 && a.outputs.length >= 1, a.name);
  }
});

test("stages cover every agent exactly once", () => {
  const covered = STAGES.reduce((n, s) => n + (s.to - s.from + 1), 0);
  assert.equal(covered, 100);
  assert.equal(STAGES.length, 12);
});

test("workflows reference only valid agents", () => {
  for (const [k, w] of Object.entries(WORKFLOWS)) {
    for (const id of w.agents) assert.ok(AGENTS.some((a) => a.id === id), `${k}: ${id}`);
  }
});

test("lookup by number, slug and name", () => {
  assert.equal(getAgent("26").name, "Cold Email Copywriter Agent");
  assert.equal(getAgent("cold-email-copywriter").id, 26);
  assert.equal(getAgent("Spam Check Agent").id, 45);
  assert.equal(getAgent("nope"), undefined);
});

test("search and recommend return sensible results", () => {
  assert.ok(searchAgents("follow up").some((a) => a.id === 33));
  const r = recommend("I want to start cold email outreach");
  assert.ok(r.agents.length > 0 && r.workflows.includes("zero-to-first-outreach"));
});

test("built prompt carries rules and context, and never invents", () => {
  const p = buildPrompt(getAgent("26"), { company: "Acme", offer: "fasteners" });
  assert.match(p, /Cold Email Copywriter Agent/);
  assert.match(p, /Acme/);
  assert.match(p, /Never invent/);
  assert.match(p, /human reviews and approves/);
});

function walk(dir, out = []) {
  for (const f of readdirSync(dir)) {
    if (f === "node_modules" || f === ".git") continue;
    const p = join(dir, f);
    statSync(p).isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
}

test("no Indian phone number or secrets in the repo", () => {
  for (const f of walk(new URL("..", import.meta.url).pathname)) {
    if (f.includes("package-lock") || f.endsWith("data.test.js")) continue;
    const t = readFileSync(f, "utf8");
    assert.ok(!/\+?91[\s-]?91722/.test(t), `Indian number in ${f}`);
    assert.ok(!/(api[_-]?key|secret|password)\s*[:=]\s*['"][^'"]+['"]/i.test(t), `secret-like string in ${f}`);
  }
});
