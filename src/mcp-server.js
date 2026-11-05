import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { AGENTS, STAGES, WORKFLOWS, getAgent, searchAgents, recommend } from "./agents.js";
import { buildPrompt, formatAgent } from "./prompts.js";

export const SERVER_INFO = { name: "sigmamax-leadgen-playbook", version: "1.0.0" };

const READ_ONLY = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false };

const text = (t) => ({ content: [{ type: "text", text: t }] });
const json = (o) => text(JSON.stringify(o, null, 2));
const err = (m) => ({ isError: true, content: [{ type: "text", text: m }] });

const brief = (a) => ({ id: a.id, name: a.name, stage: a.stage, department: a.department, goal: a.goal });

export function createServer() {
  const server = new McpServer(SERVER_INFO, {
    instructions:
      "Lead Gen Playbook GCC Edition: 100 prompt-based lead-generation agents grouped by 10 departments and 12 funnel stages. " +
      "Start with recommend_agents or get_workflow, then use build_prompt to get a ready-to-run prompt. " +
      "This server holds no customer data and sends nothing; every output is a draft for human review.",
  });

  server.registerTool(
    "list_stages",
    {
      title: "List funnel stages",
      description: "List the 12 lead-generation funnel stages and how many agents each contains.",
      inputSchema: {},
      annotations: READ_ONLY,
    },
    async () =>
      json(
        STAGES.map((s) => ({ key: s.key, label: s.label, agents: AGENTS.filter((a) => a.stage === s.key).length, ids: `${s.from}-${s.to}` })),
      ),
  );

  server.registerTool(
    "list_agents",
    {
      title: "List agents",
      description: "List the lead-generation agents, optionally filtered by stage key (see list_stages).",
      inputSchema: { stage: z.string().optional().describe("Stage key, e.g. 'copywriting'") },
      annotations: READ_ONLY,
    },
    async ({ stage }) => {
      if (stage && !STAGES.some((s) => s.key === stage)) {
        return err(`Unknown stage "${stage}". Valid stages: ${STAGES.map((s) => s.key).join(", ")}`);
      }
      return json(AGENTS.filter((a) => !stage || a.stage === stage).map(brief));
    },
  );

  server.registerTool(
    "get_agent",
    {
      title: "Get one agent",
      description: "Get the full spec of one agent by number (1-100), slug or name.",
      inputSchema: { agent: z.string().describe("Agent number, slug or name, e.g. '26' or 'cold-email-copywriter'") },
      annotations: READ_ONLY,
    },
    async ({ agent }) => {
      const a = getAgent(agent);
      return a ? text(formatAgent(a)) : err(`No agent found for "${agent}". Try search_agents.`);
    },
  );

  server.registerTool(
    "search_agents",
    {
      title: "Search agents",
      description: "Keyword search across agent names, goals, inputs and outputs.",
      inputSchema: {
        query: z.string().min(2).describe("Keywords, e.g. 'follow up email'"),
        limit: z.number().int().min(1).max(25).optional().describe("Max results (default 10)"),
      },
      annotations: READ_ONLY,
    },
    async ({ query, limit }) => {
      const found = searchAgents(query, limit ?? 10);
      return found.length ? json(found.map(brief)) : text(`No agents matched "${query}".`);
    },
  );

  server.registerTool(
    "build_prompt",
    {
      title: "Build a ready-to-use prompt",
      description:
        "Create a complete, copy-ready prompt for one agent, filled with your context. Returns text only; nothing is sent anywhere.",
      inputSchema: {
        agent: z.string().describe("Agent number, slug or name"),
        company: z.string().optional().describe("Your company"),
        offer: z.string().optional().describe("What you offer"),
        icp: z.string().optional().describe("Ideal customer profile"),
        audience: z.string().optional().describe("The prospect or audience for this task"),
        tone: z.string().optional().describe("e.g. friendly, formal, direct"),
        language: z.string().optional().describe("Output language, e.g. English or Arabic"),
        notes: z.string().optional().describe("Anything else the agent should know"),
      },
      annotations: READ_ONLY,
    },
    async ({ agent, ...context }) => {
      const a = getAgent(agent);
      return a ? text(buildPrompt(a, context)) : err(`No agent found for "${agent}". Try search_agents.`);
    },
  );

  server.registerTool(
    "recommend_agents",
    {
      title: "Recommend agents for a goal",
      description: "Describe what you want to achieve; get a short, ordered list of agents and matching workflows.",
      inputSchema: {
        goal: z.string().min(3).describe("e.g. 'I want to start cold email outreach to distributors'"),
        limit: z.number().int().min(1).max(15).optional().describe("Max agents (default 8)"),
      },
      annotations: READ_ONLY,
    },
    async ({ goal, limit }) => {
      const r = recommend(goal, limit ?? 8);
      return json({
        workflows: r.workflows.map((w) => ({ key: w, title: WORKFLOWS[w].title })),
        agents: r.agents.map(brief),
        next: "Call build_prompt with an agent id and your context to get a ready-to-use prompt.",
      });
    },
  );

  server.registerTool(
    "get_workflow",
    {
      title: "Get a workflow",
      description: "Get a ready-made, ordered chain of agents for a common job. Omit the name to list all workflows.",
      inputSchema: { name: z.string().optional().describe("Workflow key, e.g. 'reply-desk'") },
      annotations: READ_ONLY,
    },
    async ({ name }) => {
      if (!name) {
        return json(Object.entries(WORKFLOWS).map(([key, w]) => ({ key, title: w.title, description: w.description, steps: w.agents.length })));
      }
      const w = WORKFLOWS[name];
      if (!w) return err(`Unknown workflow "${name}". Valid: ${Object.keys(WORKFLOWS).join(", ")}`);
      return json({
        key: name,
        title: w.title,
        description: w.description,
        steps: w.agents.map((id, i) => ({ step: i + 1, ...brief(AGENTS.find((a) => a.id === id)) })),
      });
    },
  );

  server.registerTool(
    "get_industry_pack",
    {
      title: "Get GCC industry pack",
      description: "Get structured buyer personas, pain points, qualification questions, objections, and disqualification rules for a GCC industry (e.g. 'gcc_building_materials', 'pharma_export_two_sided', 'private_aviation_b2b2c', or omit pack_id to list all 18 packs).",
      inputSchema: { pack_id: z.string().optional().describe("Industry pack ID, e.g. 'gcc_building_materials'") },
      annotations: READ_ONLY,
    },
    async ({ pack_id }) => {
      const PACKS = {
        gcc_building_materials: {
          id: "gcc_building_materials",
          industry: "Building Materials & Industrial Supplies",
          countries: ["AE", "SA", "OM", "QA", "BH"],
          personas: [
            { title: "Head of Procurement", focus: "Price stability, 60-90 day payment terms, mill test certificates" },
            { title: "Project Director", focus: "Milestone delivery guarantees, penalty avoidance, on-site staging" },
            { title: "Managing Director / Owner", focus: "Working capital, bank guarantees, package deals" },
            { title: "QA/QC Materials Engineer", focus: "ESMA / SASO / ASTM compliance approval" },
            { title: "Senior Estimator / Tendering Lead", focus: "Tender spec matching, alternative approved equals" }
          ],
          pain_points: [
            "Sudden shipping rate volatility on imported structural materials",
            "Consultant rejection of uncertified non-GCC conforming material batches",
            "Cash flow pressure from 90-120 day contractor receivables vs 30 day supplier terms"
          ],
          qualification_questions: [
            "What credit facilities or LC structures are currently established for primary supplier lines?",
            "Who holds sign-off authority between the Project Director and Group Procurement on vendor approval?",
            "Which specific construction packages or projects have active supply deficits in Q1/Q2?"
          ],
          objections: [
            { trigger: "already_have_suppliers", counter: "We act as a secondary allocation partner for scarce specifications without long-term commitment." },
            { trigger: "price_only", counter: "We provide landed cost guarantees inclusive of customs duties, VAT, and site offloading." }
          ],
          disqualification_rules: [
            "Cannot verify commercial registration in UAE/KSA/Oman",
            "Consumer retail with zero wholesale/project billing capacity"
          ]
        },
        pharma_export_two_sided: {
          id: "pharma_export_two_sided",
          industry: "Pharmaceutical Export & Formulations",
          countries: ["AE", "SA", "OM", "IN", "KE", "NG"],
          personas: [
            { title: "Regulatory Affairs Director", focus: "CTD dossier readiness, GCC Health Council registration" },
            { title: "Head of International Business", focus: "Distributor appointment, MOQs, export credit insurance" },
            { title: "Institutional Procurement Lead", focus: "MOH formulary listing, cold-chain validation" }
          ],
          pain_points: [
            "12-18 month dossier approval latency with SFDA / UAE MoHAP",
            "Cold chain excursion risks in transit"
          ],
          qualification_questions: [
            "What is the cost reduction per unit versus originator patent drugs?",
            "Who is the Economic Buyer with allocation power for the generic tender quota?"
          ]
        },
        private_aviation_b2b2c: {
          id: "private_aviation_b2b2c",
          industry: "Private Aviation Charter & Aircraft Services",
          countries: ["AE", "SA", "OM", "QA", "BH", "GB"],
          personas: [
            { title: "Chief Pilot / Fleet Operations Manager", focus: "Empty-leg yield optimization, dispatch reliability" },
            { title: "Family Office Chief of Staff", focus: "Discretion, cabin privacy, guaranteed short-notice availability" },
            { title: "Aircraft Charter Broker", focus: "Instant quoting, tail confirmation, commission protection" }
          ],
          pain_points: [
            "Repositioning flights operating empty with 100% fixed burn rate",
            "Slot congestion at executive terminals during regional summits"
          ]
        }
      };

      if (!pack_id) {
        return json({
          total_packs: 18,
          featured_packs: Object.values(PACKS).map(p => ({ id: p.id, industry: p.industry, countries: p.countries })),
          additional_gcc_industries: [
            "Fasteners, Fixings & Hardware", "Electrical & MEP Supplies", "Industrial Consumables & MRO",
            "HVAC & Commercial Refrigeration", "Structural Steel & Metal Fabrication", "Heavy Equipment & Plant Hire",
            "Cross-Border Logistics & Freight", "Oilfield & Petrochem Supplies", "Packaging & Warehousing",
            "Commercial Flooring & Tiles", "Solar PV & Renewable Hardware", "Safety Gear & PPE",
            "Civil Works & Aggregates", "Marine & Offshore Chandlery", "Plumbing, Valves & Water Filtration"
          ]
        });
      }

      const p = PACKS[pack_id];
      if (!p) return err(`Unknown industry pack "${pack_id}". Available: ${Object.keys(PACKS).join(", ")}`);
      return json(p);
    },
  );

  server.registerTool(
    "build_persona",
    {
      title: "Build persona card",
      description: "Generate a structured buyer persona card for a given industry, role, and target country.",
      inputSchema: {
        industry: z.string().describe("Target industry, e.g. 'Building Materials'"),
        role: z.string().describe("Target role title, e.g. 'Procurement Manager'"),
        country: z.string().optional().describe("GCC country code: AE, SA, OM, QA, BH"),
      },
      annotations: READ_ONLY,
    },
    async ({ industry, role, country }) => {
      const c = (country || "AE").toUpperCase();
      return json({
        role,
        industry,
        country: c,
        primary_focus: `Procurement cost stability, reliable delivery milestones, and certified compliance in ${c}`,
        key_objections: ["Vendor already approved on master vendor list", "Requires 60-90 day credit facility"],
        recommended_channels: ["email", "whatsapp_business"],
        language_preference: c === "SA" ? "Arabic preferred or bilingual AR/EN" : "Bilingual AR/EN or English professional"
      });
    },
  );

  server.registerTool(
    "build_sequence",
    {
      title: "Build multi-channel sequence",
      description: "Build an end-to-end respectful outreach sequence across Email, LinkedIn, or WhatsApp Business.",
      inputSchema: {
        industry: z.string().describe("Target industry"),
        channel: z.enum(["email", "linkedin", "whatsapp", "multichannel"]).optional().describe("Outreach channel"),
        steps: z.number().int().min(1).max(5).optional().describe("Number of touchpoints (default 3)"),
        language: z.enum(["en", "ar", "bilingual", "hi", "ur"]).optional().describe("Target language"),
      },
      annotations: READ_ONLY,
    },
    async ({ industry, channel = "multichannel", steps = 3, language = "en" }) => {
      return json({
        industry,
        primary_channel: channel,
        total_steps: steps,
        language,
        cadence_notes: "Sunday-to-Thursday business hours. Avoid Friday prayer times and adjusted Ramadan work hours.",
        sequence: [
          { step: 1, day: 1, channel: channel === "multichannel" ? "email" : channel, objective: "Context and shared regional value proposition with low friction CTA" },
          { step: 2, day: 4, channel: channel === "multichannel" ? "linkedin" : channel, objective: "Specific case study / specification matching reference" },
          { step: 3, day: 8, channel: channel === "multichannel" ? "whatsapp" : channel, objective: "Brief verification inquiry with polite opt-out instruction" }
        ].slice(0, steps)
      });
    },
  );

  server.registerTool(
    "about_sigmamax",
    {
      title: "About Sigma Max AI Solutions",
      description: "Who built this playbook and how to reach them for custom AI agents or MCP builds.",
      inputSchema: {},
      annotations: READ_ONLY,
    },
    async () =>
      text(
        [
          "Sigma Max AI Solutions (Muscat, Sultanate of Oman) builds enterprise AI agents, GTM orchestrators, and MCP servers.",
          "Founder & CEO: Mohomed Ahsan",
          "Website: https://sigmamaxaisolutions.com/",
          "Email: ahsansigmamaxai@gmail.com",
          "Official Phone / WhatsApp: +968 7694 1459",
          "Production AI Pilot: https://sigma-lead-ai-pilot.sigmamaxaisolutions.com/",
          "License: MIT (Free, open-source Lead Gen Playbook GCC Edition).",
        ].join("\n"),
      ),
  );

  server.registerResource(
    "catalog",
    "leadgen://catalog",
    { title: "Full 100-agent catalog", description: "Every agent with stage, department, goal, inputs and outputs (JSON).", mimeType: "application/json" },
    async (uri) => ({ contents: [{ uri: uri.href, mimeType: "application/json", text: JSON.stringify(AGENTS, null, 2) }] }),
  );

  server.registerPrompt(
    "start_lead_gen",
    {
      title: "Start lead generation",
      description: "Kick off a guided lead-generation plan using this playbook.",
      argsSchema: {
        business: z.string().describe("What your business sells"),
        market: z.string().describe("Who and where you want to sell to"),
      },
    },
    ({ business, market }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text:
              `I sell: ${business}\nI want to reach: ${market}\n\n` +
              "Use the lead gen playbook tools: call recommend_agents for my goal, show me the suggested workflow, then use build_prompt for the first two agents with my context. Draft only; I approve before anything is sent.",
          },
        },
      ],
    }),
  );

  return server;
}
