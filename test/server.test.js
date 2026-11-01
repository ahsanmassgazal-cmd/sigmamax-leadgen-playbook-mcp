import test from "node:test";
import assert from "node:assert/strict";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { createServer } from "../src/mcp-server.js";
import { startDevServer } from "../dev.js";

async function connect() {
  const server = createServer();
  const client = new Client({ name: "test", version: "1.0.0" });
  const [a, b] = InMemoryTransport.createLinkedPair();
  await Promise.all([server.connect(a), client.connect(b)]);
  return client;
}

const textOf = (r) => r.content[0].text;

test("lists all tools, resource and prompt", async () => {
  const c = await connect();
  const tools = (await c.listTools()).tools.map((t) => t.name).sort();
  assert.deepEqual(tools, ["about_sigmamax", "build_prompt", "get_agent", "get_workflow", "list_agents", "list_stages", "recommend_agents", "search_agents"]);
  assert.equal((await c.listResources()).resources[0].uri, "leadgen://catalog");
  assert.equal((await c.listPrompts()).prompts[0].name, "start_lead_gen");
});

test("all tools are marked read-only", async () => {
  const c = await connect();
  for (const t of (await c.listTools()).tools) assert.equal(t.annotations.readOnlyHint, true, t.name);
});

test("list_stages and list_agents", async () => {
  const c = await connect();
  const stages = JSON.parse(textOf(await c.callTool({ name: "list_stages", arguments: {} })));
  assert.equal(stages.reduce((n, s) => n + s.agents, 0), 100);
  const copy = JSON.parse(textOf(await c.callTool({ name: "list_agents", arguments: { stage: "copywriting" } })));
  assert.equal(copy.length, 12);
  const bad = await c.callTool({ name: "list_agents", arguments: { stage: "nope" } });
  assert.equal(bad.isError, true);
});

test("get_agent / search_agents / recommend_agents / get_workflow", async () => {
  const c = await connect();
  assert.match(textOf(await c.callTool({ name: "get_agent", arguments: { agent: "45" } })), /Spam Check Agent/);
  assert.equal((await c.callTool({ name: "get_agent", arguments: { agent: "999" } })).isError, true);
  assert.match(textOf(await c.callTool({ name: "search_agents", arguments: { query: "breakup" } })), /Breakup Email Agent/);
  const rec = JSON.parse(textOf(await c.callTool({ name: "recommend_agents", arguments: { goal: "handle replies and book meetings" } })));
  assert.ok(rec.agents.some((a) => a.id === 46));
  const wf = JSON.parse(textOf(await c.callTool({ name: "get_workflow", arguments: { name: "reply-desk" } })));
  assert.equal(wf.steps[0].id, 46);
  assert.equal((await c.callTool({ name: "get_workflow", arguments: { name: "x" } })).isError, true);
});

test("build_prompt fills context", async () => {
  const c = await connect();
  const r = await c.callTool({ name: "build_prompt", arguments: { agent: "cold-email-copywriter", company: "Sigma Max", offer: "AI agents", language: "English" } });
  assert.match(textOf(r), /Your company: Sigma Max/);
  assert.match(textOf(r), /Language: English/);
});

test("about_sigmamax shows the Oman contact only", async () => {
  const c = await connect();
  const t = textOf(await c.callTool({ name: "about_sigmamax", arguments: {} }));
  assert.match(t, /\+968 7694 1459/);
  assert.doesNotMatch(t, /\+91/);
});

test("real HTTP endpoint works with the Streamable HTTP client", async () => {
  const srv = await startDevServer(0);
  const port = srv.address().port;
  try {
    const client = new Client({ name: "http-test", version: "1.0.0" });
    await client.connect(new StreamableHTTPClientTransport(new URL(`http://localhost:${port}/mcp`)));
    const tools = await client.listTools();
    assert.equal(tools.tools.length, 8);
    const r = await client.callTool({ name: "get_agent", arguments: { agent: "100" } });
    assert.match(textOf(r), /Lead Generation Manager Agent/);
    await client.close();

    const get = await fetch(`http://localhost:${port}/mcp`);
    assert.equal(get.status, 405);
  } finally {
    srv.close();
  }
});
