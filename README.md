# Lead Gen Playbook MCP

A free [Model Context Protocol](https://modelcontextprotocol.io) server with **100 lead-generation agent prompts**, ready-made workflows, and a prompt builder. Connect it to Claude, ChatGPT-compatible clients, Antigravity or any MCP client, then ask for the agent you need.

- **No customer data. No network calls. Nothing is sent anywhere.** Every output is a draft for a human to review.
- 100 agents across 12 funnel stages (targeting, prospecting, signals, enrichment, copywriting, campaigns, replies, call prep, nurture, messaging and compliance, re-engagement, analytics).
- 6 ready workflows (zero-to-first-outreach, email sequence, reply desk, warm LinkedIn outreach, list quality, weekly review).
- Built by [Sigma Max AI Solutions](https://sigmamaxaisolutions.com/). MIT licensed.

## Tools

| Tool | What it does |
|---|---|
| `recommend_agents` | Describe your goal; get an ordered list of agents and matching workflows |
| `get_workflow` | Ready-made chain of agents for a common job (omit name to list all) |
| `build_prompt` | Copy-ready prompt for one agent, filled with your company, offer, ICP, tone, language |
| `get_agent` | Full spec of one agent (by number, slug or name) |
| `search_agents` | Keyword search across the catalog |
| `list_agents` / `list_stages` | Browse by stage |
| `about_sigmamax` | Who built this and how to reach them |

Also: resource `leadgen://catalog` (full JSON catalog) and prompt `start_lead_gen`.

## Connect

### Claude (hosted link, works on web, desktop and mobile)
Settings → Connectors → Add custom connector → paste your deployed URL, e.g.
`https://YOUR-PROJECT.vercel.app/mcp`

### Local (stdio), e.g. Claude Desktop or Antigravity
```json
{
  "mcpServers": {
    "leadgen-playbook": {
      "command": "npx",
      "args": ["-y", "github:ahsanmassgazal-cmd/sigmamax-leadgen-playbook-mcp"]
    }
  }
}
```
Or clone the repo and use `"command": "node", "args": ["/path/to/repo/src/stdio.js"]`.

## Try it

> "I sell industrial fasteners to distributors in the GCC. Use the lead gen playbook: recommend where to start, then build the prompt for the first two agents."

## Deploy your own copy (free)

1. Fork or push this repo to GitHub.
2. In [Vercel](https://vercel.com): New Project → import the repo → Deploy (no build settings or env vars needed).
3. Your endpoint is `https://<project>.vercel.app/mcp`. Opening the root URL shows a landing page.

## Develop

```bash
npm install
npm test        # 15 tests: catalog integrity, every tool, real HTTP endpoint
npm run dev     # http://localhost:3000/mcp
npm start       # stdio server
```

Server code is plain ESM JavaScript (no build step). The Vercel entry is `api/mcp.js` (stateless Streamable HTTP); the catalog lives in `src/agents.js`.

## Design rules

Every generated prompt tells the model to use only supplied facts, mark unknowns instead of guessing, produce drafts only, respect opt-outs, and flag legal or cultural risks for qualified human review. The compliance agent is not legal advice.

## Need something custom?

Sigma Max AI Solutions builds custom AI agents and MCP servers. Website: https://sigmamaxaisolutions.com/ · Email: ahsansigmamaxai@gmail.com · WhatsApp: +968 7694 1459

## License

MIT
