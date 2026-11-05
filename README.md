# SigmaMax Lead Gen Playbook MCP — GCC Edition

A free, open-source [Model Context Protocol](https://modelcontextprotocol.io) server providing **100 enterprise lead-generation agent prompt specifications**, 10 canonical departments, 12 funnel stages, and GCC market specializations (UAE, Saudi Arabia, Oman, Qatar, Bahrain).

Connect it to Claude Desktop, Cursor, Antigravity, or any remote MCP client to architect, qualify, and execute B2B sales pipelines.

- **Zero Data Risk:** Stateless architecture. No customer data stored. No outbound emails or messages sent directly. Every output is a safe, high-quality draft for human review.
- **100 Agents across 10 Departments:** Market Research & Strategy, Lead Sourcing, Signals & Triggers, Data Hygiene, Copywriting, Deliverability & Campaigns, Reply Response Desk, Sales Enablement, Pipeline Nurture, and Regional Compliance / RevOps.
- **GCC Market Differentiators:**
  - WhatsApp Business opt-in messaging and template validation.
  - Statutory Data Protection review (UAE Federal Decree-Law No. 45/2021, Saudi PDPL Royal Decree M/19, Oman Royal Decree 6/2022).
  - Bilingual Arabic / English phrasing, plus Urdu and Hindi variants.
  - Regional calendar planning (Sunday-to-Thursday workweeks, Friday prayer blackouts, Ramadan adjusted hours).
  - 18 GCC Industry Packs including Building Materials, Pharma Export, and Private Aviation.
- Built by [SigmaMax AI Solutions](https://sigmamaxaisolutions.com/) (Muscat, Sultanate of Oman). MIT licensed.

---

## Available MCP Tools

| Tool | Description |
|---|---|
| `get_industry_pack` | Access structured GCC industry packs with buyer personas, pain points, BANT questions, objections, and disqualification rules |
| `build_persona` | Generate role-specific GCC buyer persona cards with regional compliance and buying criteria |
| `build_sequence` | Build 1-5 step multi-channel outreach sequences across Email, LinkedIn, and WhatsApp Business |
| `recommend_agents` | Describe your commercial goal; get an ordered list of agents and matching workflows |
| `get_workflow` | Ready-made multi-agent workflow chains (e.g. `gcc-enterprise-outreach`, `buying-committee-penetration`, `reply-desk`) |
| `build_prompt` | Copy-ready prompt for any agent, filled with your company, offer, ICP, tone, and language |
| `get_agent` | Full prompt specification, inputs, outputs, and rules for one agent (by number 1-100, slug, or name) |
| `search_agents` | Search across the 100-agent catalog by keyword |
| `list_agents` / `list_stages` | Browse all agents by funnel stage or department |
| `about_sigmamax` | Operational contact details and custom enterprise AI pilot builds |

Also exposes resource `leadgen://catalog` (complete JSON catalog) and prompt template `start_lead_gen`.

---

## How to Connect

### 1. Remote Hosted MCP (Claude Web, Mobile & Cloud)
In Claude (or any remote MCP client), go to **Settings → Connectors → Add Custom Connector** and enter:
```
https://sigmamax-leadgen-playbook-mcp.vercel.app/mcp
```

### 2. Claude Desktop (Stdio Configuration)
Add the following to your `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "sigmamax-leadgen-playbook": {
      "command": "node",
      "args": ["C:/Users/ghizl/sigmamax-leadgen-playbook-mcp/src/stdio.js"]
    }
  }
}
```

### 3. Direct CLI Execution
```bash
git clone https://github.com/ahsanmassgazal-cmd/sigmamax-leadgen-playbook-mcp.git
cd sigmamax-leadgen-playbook-mcp
npm install
node src/stdio.js
```

---

## Example Interaction

> **User:** "We manufacture galvanized structural fasteners in Oman and want to expand into Saudi EPC contractors. Recommend the right workflow, fetch the industry pack, and draft the initial bilingual outreach."
>
> **Claude with Playbook MCP:** Calls `recommend_agents`, retrieves `gcc-enterprise-outreach`, loads `gcc_building_materials` industry pack, calls `build_persona` for the Procurement Lead, and outputs ready-to-use bilingual drafts with statutory PDPL compliance notes.

---

## Contact & Commercial Services

SigmaMax AI Solutions provides private, dedicated enterprise AI pilots and custom GTM orchestrators.

- **Founder & CEO:** Mohomed Ahsan
- **Headquarters:** Muscat, Sultanate of Oman
- **Official Phone / WhatsApp:** [+968 7694 1459](https://wa.me/96876941459)
- **Email:** [ahsansigmamaxai@gmail.com](mailto:ahsansigmamaxai@gmail.com)
- **Production Pilot:** [https://sigma-lead-ai-pilot.sigmamaxaisolutions.com](https://sigma-lead-ai-pilot.sigmamaxaisolutions.com)
- **License:** MIT
