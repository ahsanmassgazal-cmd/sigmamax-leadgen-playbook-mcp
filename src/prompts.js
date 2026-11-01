import { STAGES } from "./agents.js";

const bullets = (items) => items.map((i) => `- ${i}`).join("\n");

/**
 * Compose a ready-to-use prompt for one agent. Pure function, no network.
 * context: { company, offer, icp, audience, tone, language, notes }
 */
export function buildPrompt(agent, context = {}) {
  const stage = STAGES.find((s) => s.key === agent.stage);
  const ctx = [
    ["Your company", context.company],
    ["What you offer", context.offer],
    ["Ideal customer (ICP)", context.icp],
    ["Audience / prospect", context.audience],
    ["Tone", context.tone],
    ["Language", context.language],
    ["Extra notes", context.notes],
  ].filter(([, v]) => v && String(v).trim());

  const ctxBlock = ctx.length
    ? ctx.map(([k, v]) => `${k}: ${String(v).trim()}`).join("\n")
    : "(No context supplied yet. Ask the user for the inputs listed below before answering.)";

  return [
    `ROLE\nYou are the ${agent.name} on a B2B outbound team.`,
    `GOAL\n${agent.goal}`,
    `CONTEXT FROM THE USER\n${ctxBlock}`,
    `INPUTS YOU NEED\n${bullets(agent.inputs)}\nIf an input is missing, ask for it or mark it "unknown". Do not guess.`,
    `DELIVERABLE\n${bullets(agent.outputs)}`,
    `STAGE GUIDANCE (${stage.label})\n${stage.rules}`,
    `RULES\n${bullets([
      "Use only facts from the context above or from sources the user provides. Never invent names, titles, numbers, quotes or contact details.",
      "Show which fact supports each important claim. Mark anything uncertain as an assumption.",
      "Produce drafts and recommendations only. A human reviews and approves before anything is sent or changed.",
      "Respect opt-outs and local messaging and privacy rules. Flag anything legally sensitive for qualified review instead of deciding it yourself.",
      "Keep the output short, structured and ready to use.",
    ])}`,
    `OUTPUT FORMAT\nUse a short heading for each deliverable item above, in that order. End with a one-line "Next step for the human".`,
  ].join("\n\n");
}

export function formatAgent(agent) {
  return [
    `#${agent.id} ${agent.name}`,
    `Stage: ${agent.stageLabel}`,
    `Goal: ${agent.goal}`,
    `Inputs: ${agent.inputs.join("; ")}`,
    `Outputs: ${agent.outputs.join("; ")}`,
  ].join("\n");
}
