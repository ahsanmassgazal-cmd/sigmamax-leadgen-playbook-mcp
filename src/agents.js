// The Lead Gen Playbook catalog: 100 agent prompt specs organised by funnel stage and canonical department.
// Each raw row: [id, name, goal, inputs ("|" separated), outputs ("|" separated)]

export const DEPARTMENTS = [
  { key: "market_research", label: "Market Research & Strategy", stages: ["targeting"] },
  { key: "lead_sourcing", label: "Lead Sourcing & Prospecting", stages: ["prospecting"] },
  { key: "signals_planning", label: "Signals & Account Planning", stages: ["signals"] },
  { key: "data_hygiene", label: "Data Engineering & Enrichment", stages: ["enrichment"] },
  { key: "copywriting", label: "Outbound Copywriting & Messaging", stages: ["copywriting"] },
  { key: "campaigns_deliverability", label: "Campaigns & Mailbox Deliverability", stages: ["campaigns"] },
  { key: "inbound_response", label: "Inbound Conversion & Response Desk", stages: ["replies"] },
  { key: "sales_enablement", label: "Sales Enablement & Discovery", stages: ["sales-prep"] },
  { key: "pipeline_nurture", label: "Pipeline Acceleration & Nurture", stages: ["nurture"] },
  { key: "regional_compliance_revops", label: "Regional Compliance, Operations & Analytics", stages: ["messaging", "reengage-social", "ops-analytics"] }
];

export const STAGES = [
  { key: "targeting", label: "Targeting & Research", from: 1, to: 4, rules: "Be specific and decision-oriented. Separate facts from assumptions." },
  { key: "prospecting", label: "Prospecting & Qualification", from: 5, to: 9, rules: "Only recommend legitimate, public sources. Explain every qualification or score decision." },
  { key: "signals", label: "Signals & Account Planning", from: 10, to: 18, rules: "Treat signals as hints, not proof. State confidence and what would confirm each signal." },
  { key: "enrichment", label: "Enrichment & Data Hygiene", from: 19, to: 25, rules: "Never guess or invent contact details. Mark unknown fields as \"unknown\" and name the source for every filled field." },
  { key: "copywriting", label: "Copywriting & Sequences", from: 26, to: 37, rules: "Write short, plain, human copy. One idea and one clear ask per message. No hype, no false urgency." },
  { key: "campaigns", label: "Campaign Strategy & Deliverability", from: 38, to: 45, rules: "Favor small, safe, testable steps. Flag any practice that could hurt sender reputation." },
  { key: "replies", label: "Replies & Booking", from: 46, to: 50, rules: "Be polite and low-pressure. Always honor opt-outs immediately. Drafts only; a human approves before anything is sent." },
  { key: "sales-prep", label: "Call Prep & Discovery", from: 51, to: 62, rules: "Be practical and concise. Separate what is known from what must be asked." },
  { key: "nurture", label: "Nurture, Revival & Inbound", from: 63, to: 75, rules: "Add value in every touch. Respect prior conversations and opt-outs. Know when to stop." },
  { key: "messaging", label: "Messaging, Localization & Compliance", from: 76, to: 83, rules: "Claims must be truthful and supportable. Flag legal or cultural risks for a qualified human to review." },
  { key: "reengage-social", label: "Re-engagement, Prediction & Social", from: 84, to: 91, rules: "Be transparent about uncertainty. Follow each platform's rules; never automate against a platform's terms." },
  { key: "ops-analytics", label: "Operations & Analytics", from: 92, to: 100, rules: "Be concrete and measurable. Show your assumptions and what data is missing." },
];

const raw = [
  [1, "ICP Research Agent", "Define the ideal customer profile from what the business sells and who its best customers are.", "product or service description|best customers|target markets", "ICP summary|firmographic filters|exclusion criteria"],
  [2, "Persona Card Builder Agent", "Build buyer personas with roles, goals, objections, and buying triggers.", "ICP|offer", "2-3 personas|top objections|trigger events"],
  [3, "Buying Committee & Account Mapping Agent", "Turn public information into an account brief and stakeholder committee map.", "company name|website or notes|ICP", "account summary|committee roles|open questions"],
  [4, "Market Sizing & Segmentation Agent", "Calculate bottom-up market sizing, addressable accounts, and split market into ranked segments.", "ICP|market notes|territory", "TAM/SAM estimate|segments|priority ranking|rationale"],
  [5, "Prospect List Builder Agent", "Plan a repeatable way to build a prospect list for an ICP.", "ICP|geography|data sources available", "list-building plan|search queries|fields to capture"],
  [6, "Company Finder Agent", "Create search strategies to find companies that match an ICP.", "ICP|geography", "search queries|directories to check|exclusion rules"],
  [7, "Contact Finder Agent", "Plan which roles to look for at a company and where to find them legitimately.", "company|personas", "target roles|public sources to check|what to leave blank"],
  [8, "BANT & MEDDICC Qualification Agent", "Qualify a lead against BANT and MEDDICC criteria and explain the decision.", "lead information|qualification criteria", "qualified yes/no/maybe|reasons|missing information"],
  [9, "Disqualification Rules & Scoring Agent", "Design a transparent scoring model and enforce strict disqualification rules.", "ICP|lead data|regulatory constraints", "scoring rubric|disqualification triggers|score per lead|reasons"],
  [10, "Intent Signal Agent", "Identify buying-intent signals worth acting on.", "company notes|offer", "signals found|signal strength|suggested action"],
  [11, "Website Visitor Identification Agent", "Turn website visitor behavior into follow-up priorities while respecting consent.", "visitor activity summary|consent status", "priority list|suggested follow-up|privacy flags"],
  [12, "Job Change Trigger Agent", "Draft outreach angles for contacts who changed roles.", "contact change information|offer", "angle|timing|message draft"],
  [13, "Hiring Signal Agent", "Read job postings as signals of needs and priorities.", "job posting text|offer", "needs inferred|outreach angle|confidence"],
  [14, "Funding Signal Agent", "Use funding news as an outreach trigger.", "funding news|offer", "what changes for the company|angle|timing"],
  [15, "Technology Stack Research Agent", "Summarize which technology a company uses and what it implies for the offer.", "company's public technology information|offer", "stack summary|gaps|angle"],
  [16, "Competitor Customer Finder Agent", "Find companies that use a competitor and craft a switching angle.", "competitor|ICP", "search approach|switching angles|cautions"],
  [17, "Territory Planning Agent", "Divide accounts across sellers by territory.", "accounts|seller count|rules", "territory plan|balance check|gaps"],
  [18, "Account Prioritization Agent", "Rank accounts by fit, intent and effort.", "accounts|scoring criteria", "ranked list|reasons|next action"],
  [19, "Email Verifier Agent", "Plan email verification and interpret verification results.", "emails or results|tool used", "keep/fix/drop list|risk notes|hygiene rules"],
  [20, "Contact Enrichment Agent", "Specify what to enrich on a contact and from where, flagging unknowns.", "contact record|allowed sources", "enrichment plan|filled fields|unknowns"],
  [21, "Company Enrichment Agent", "Specify company enrichment fields and fill them only from provided sources.", "company record|sources", "enriched record|source per field|unknowns"],
  [22, "LinkedIn Profile Enrichment Agent", "Summarize a profile the user pastes in into outreach-relevant notes (no scraping).", "pasted profile text|offer", "talking points|common ground|cautions"],
  [23, "CRM Data Cleanup Agent", "Define cleanup rules for messy CRM data.", "sample records|CRM fields", "cleanup rules|fixes|dedupe keys"],
  [24, "Duplicate Detection Agent", "Detect likely duplicate companies or contacts and propose merges.", "records", "duplicate groups|confidence|merge proposal"],
  [25, "List Segmentation Agent", "Segment a list for tailored campaigns.", "list fields|campaign goal", "segments|messaging angle per segment|segment sizes"],
  [26, "Cold Email Copywriter Agent", "Write a short cold email draft.", "prospect context|offer|tone", "email draft|subject options|call to action"],
  [27, "Subject Line Agent", "Write subject lines in several styles.", "email body|audience", "5 subject lines|why each works|one to test first"],
  [28, "Personalization Agent", "Add relevant personalization grounded only in provided facts.", "prospect facts|draft", "personalized draft|facts used|facts missing"],
  [29, "First-Line Writer Agent", "Write an opening line grounded in a real fact.", "prospect facts", "3 first lines|fact used for each"],
  [30, "Pain-Point Library & Value Proposition Agent", "Map customer pain points with severity ratings to a clear value proposition.", "offer|segment|pain points", "value proposition|pain catalog|proof needed|variants"],
  [31, "Offer Angle Agent", "Find different angles to present the same offer.", "offer|persona", "5 angles|best for whom|risks"],
  [32, "Call-to-Action Agent", "Write low-friction calls to action.", "email draft|goal", "5 CTAs|friction rating|best pick"],
  [33, "Follow-Up Sequence Agent", "Write a follow-up sequence with sensible spacing.", "first email|goal|cadence", "follow-up emails|timing|stop rules"],
  [34, "Breakup Email Agent", "Write a polite final email to close a sequence.", "sequence so far", "breakup email|alternative version"],
  [35, "Channel Comparison & Selection Agent", "Compare response rates, touchpoint friction, and appropriateness across Email, LinkedIn, and WhatsApp.", "prospect facts|offer|territory", "channel comparison|recommended primary channel|fallback channel"],
  [36, "Connection Request Writer Agent", "Write a short connection note within platform limits.", "prospect facts", "3 notes|character counts"],
  [37, "Voice Note Script Agent", "Write a short voice-note script.", "prospect facts|offer", "30-second script|opening line|call to action"],
  [38, "Deliverability & DNS Checklist Agent", "Audit domain SPF, DKIM, DMARC, and mailbox protection guardrails.", "sending setup|volume|content|DNS records", "DNS checklist|risk list|mailbox warmup schedule"],
  [39, "WhatsApp Business Outreach Agent", "Draft compliant WhatsApp Business messages with explicit opt-in, template parameters, and zero-spam tone.", "opt-in status|prospect context|offer", "WhatsApp message draft|template parameters|opt-out instruction"],
  [40, "Send-Time Optimization Agent", "Suggest send windows from audience time zones and past results.", "audience time zones|past results", "send windows|test plan"],
  [41, "A/B Testing Agent", "Design an A/B test that changes one variable.", "goal|current copy", "hypothesis|variants|sample-size note"],
  [42, "Deliverability Audit Agent", "Audit email setup and practices for deliverability risks.", "sending setup|volume|content", "risk list|fixes|checklist"],
  [43, "Inbox Warm-Up Agent", "Plan a gradual sending ramp-up.", "domain age|target volume", "ramp schedule|guardrails"],
  [44, "Domain Reputation Agent", "Interpret domain reputation signals and recommend next steps.", "domain checks|bounce data", "reputation view|actions"],
  [45, "Spam Check Agent", "Review a draft for spam-trigger risk.", "email draft", "risk flags|safer rewrite"],
  [46, "Reply Classifier Agent", "Categorize a reply as positive, question, objection, not now, not interested, unsubscribe, out-of-office or bounce.", "reply text", "category|confidence|next action"],
  [47, "Positive Reply Handler Agent", "Draft a response to a positive reply.", "reply|context", "reply draft|proposed next step"],
  [48, "Objection Handling Agent", "Draft respectful responses to common objections without pressure.", "objection|offer", "response draft|alternative tone|when to stop"],
  [49, "Meeting Booking Agent", "Draft meeting-booking messages.", "reply|availability", "booking message|alternative slots"],
  [50, "Calendar Coordination Agent", "Coordinate time slots across time zones.", "participants|time zones|availability windows", "proposed slots|confirmation message"],
  [51, "No-Show Prevention Agent", "Reduce meeting no-shows with reminders and prep.", "meeting details", "reminder messages|prep note"],
  [52, "Reminder Sequence Agent", "Write a meeting reminder sequence.", "meeting details", "reminder schedule|messages"],
  [53, "Discovery Prep Agent", "Prepare for a discovery call.", "account brief|persona", "call plan|questions|risks"],
  [54, "Lead Handoff Agent", "Write a clean handoff from prospecting to sales.", "lead history", "handoff note|open questions"],
  [55, "SDR Script Agent", "Write a call script with branches.", "persona|offer", "script|branches|objection lines"],
  [56, "Call Opening Agent", "Write a short, permission-based call opening.", "persona|reason for call", "3 openings"],
  [57, "BANT & MEDDICC Question Builder Agent", "List structured BANT (Budget, Authority, Need, Timeline) and MEDDICC qualification questions.", "offer|criteria", "BANT questions|MEDDICC questions|red flags"],
  [58, "Needs Analysis Agent", "Structure a needs analysis from call notes.", "call notes", "needs summary|gaps|next questions"],
  [59, "Pain-Point Library Agent", "Map customer pains with severity ratings to the offer.", "notes|offer", "pain map|severity ratings|evidence required"],
  [60, "Decision Maker Mapper Agent", "Map who decides, who influences and who can block.", "organization information|notes", "role map|unknowns|next step"],
  [61, "Buying Committee Mapping Agent", "Map a buying committee and how to engage each member.", "account notes", "committee map|role coverage gaps|engagement plan"],
  [62, "Account Mapping Agent", "Map an account's structure and entry points.", "account notes", "entry points|account plan"],
  [63, "Trigger-Based Outreach Agent", "Write outreach prompted by a specific event.", "trigger|offer", "message draft|timing"],
  [64, "Reactivation Agent", "Re-open dormant conversations.", "history", "reactivation message|angle"],
  [65, "Lost Lead Revival Agent", "Revive lost leads respectfully.", "loss reason|history", "revival message|new reason to talk"],
  [66, "Referral Outreach Agent", "Ask for referrals politely.", "relationship|offer", "referral ask|make-it-easy blurb"],
  [67, "Partner Prospecting Agent", "Identify and approach potential partners.", "offer|partner profile", "partner criteria|pitch draft"],
  [68, "Event Lead Follow-Up Agent", "Follow up with people met at events.", "event|conversation notes", "follow-up draft"],
  [69, "Webinar Lead Follow-Up Agent", "Follow up with webinar attendees and no-shows.", "webinar|attendance", "follow-up drafts by segment"],
  [70, "Content Download Follow-Up Agent", "Follow up on content downloads without being pushy.", "asset|persona", "follow-up draft|next step"],
  [71, "Demo Request Qualification Agent", "Qualify demo requests quickly.", "request form|criteria", "qualify or route|questions"],
  [72, "Inbound Lead Routing Agent", "Route inbound leads to the right owner.", "lead data|routing rules", "owner|priority|response-time target"],
  [73, "Lead Nurturing Agent", "Plan a nurture track.", "persona|stage", "nurture plan|content map|exit rules"],
  [74, "Newsletter Nurture Agent", "Plan a lightweight newsletter.", "audience|offer", "editorial plan|issue draft"],
  [75, "Case Study Matching Agent", "Match case studies to prospects.", "prospect|case study list", "best matches|how to reference them"],
  [76, "Social Proof Agent", "Use proof truthfully and effectively.", "proof assets|prospect", "proof lines|where to place them"],
  [77, "ROI Messaging Agent", "Frame ROI honestly.", "offer|customer numbers", "ROI framing|assumptions|caveats"],
  [78, "Industry Personalization Agent", "Adapt messaging to an industry.", "industry|offer", "industry-specific messaging|jargon to use|proof needed"],
  [79, "GCC Regional & Cultural Planning Agent", "Adapt scheduling and messaging for GCC working weeks (Sun-Thu), Friday prayer times, Ramadan hours, and Eid cycles.", "target territory|campaign dates", "localized calendar schedule|cultural tone guidance|blackout windows"],
  [80, "Multilingual GCC Outreach Agent", "Draft outreach copy in English, Arabic, Hindi, or Urdu, including respectful bilingual Arabic/English variants.", "message|language (en, ar, hi, ur)|region", "localized translation|bilingual draft|cultural review flags"],
  [81, "GCC PDPL & Statutory Compliance Agent", "Review outreach and data processing against UAE Federal Decree-Law 45/2021, Saudi PDPL, and Oman Royal Decree 6/2022.", "draft|target country (AE, SA, OM)|channel", "statutory risk flags|PDPL compliance checklist|suggested edits"],
  [82, "Knowledge Base Writer Agent", "Write clean, approved knowledge entries, compliance guidelines, and operational SOPs.", "operational directives|regulatory notes", "knowledge base entry|summary|audit metadata"],
  [83, "Pipeline Update Agent", "Recommend a pipeline stage and next action.", "interaction|stage definitions", "stage recommendation|next action"],
  [84, "Lead Status Prediction Agent", "Estimate likelihood from history, with caveats.", "history|outcomes", "likelihood band|drivers|caveats"],
  [85, "Churned Prospect Recovery Agent", "Recover prospects who went quiet.", "history", "recovery message|when to stop"],
  [86, "Re-engagement Sequence Agent", "Build a re-engagement sequence.", "history", "sequence|timing"],
  [87, "Opportunity Scoring Agent", "Score opportunities with reasons.", "opportunity data|criteria", "score|reasons|next step"],
  [88, "Warm Intro Sourcing Agent", "Find warm-introduction paths to a target.", "network information|target", "intro paths|ask draft"],
  [89, "Social Selling Agent", "Plan social selling activity.", "profile|ICP", "weekly plan|post ideas"],
  [90, "Comment Prospecting Agent", "Draft thoughtful comments on a prospect's post.", "post text", "comment drafts"],
  [91, "Community Prospecting Agent", "Participate in communities in a useful, value-first way.", "community|ICP", "participation plan|value-first post ideas"],
  [92, "Prospect Research Brief Agent", "Write a one-page prospect brief from collected facts.", "collected facts", "brief|sources|unknowns"],
  [93, "Daily Prospecting Dashboard Agent", "Turn pipeline data into a daily plan.", "pipeline data", "today's priorities|counts"],
  [94, "KPI Tracking Agent", "Define and summarize outbound KPIs.", "goals|data", "KPI set|weekly summary"],
  [95, "Attribution Review & Multi-Touch Analyst Agent", "Analyze multi-touch attribution (first-touch, last-touch, linear) and channel revenue yield.", "touchpoint records|pipeline outcomes", "channel attribution report|ROI per channel|recommendations"],
  [96, "Sales Feedback Loop Agent", "Turn sales feedback into improvements.", "feedback", "changes to ICP, copy and process"],
  [97, "Appointment Setting Agent", "Plan and draft end-to-end appointment setting.", "leads|calendar rules", "booking plan|messages"],
  [98, "CRM Hygiene Agent", "Keep the CRM clean.", "rules|sample records", "hygiene checklist|weekly routine"],
  [99, "List Building Agent", "Build and maintain target lists.", "ICP|sources", "list plan|fields"],
  [100, "Lead Generation Manager Agent", "Coordinate the whole lead-generation process week by week.", "goals|capacity", "weekly plan|task assignments|review checkpoints"],
];

function slug(name) {
  return name.toLowerCase().replace(/ agent$/, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function stageOf(id) {
  return STAGES.find((s) => id >= s.from && id <= s.to);
}

function departmentOf(stageKey) {
  return DEPARTMENTS.find((d) => d.stages.includes(stageKey)) || DEPARTMENTS[0];
}

export const AGENTS = raw.map(([id, name, goal, inputs, outputs]) => {
  const stage = stageOf(id);
  const dept = departmentOf(stage.key);
  const inputList = inputs.split("|");
  const outputList = outputs.split("|");
  const tags = Array.from(
    new Set([stage.key, dept.key, ...slug(name).split("-"), ...inputList.join(" ").toLowerCase().split(/[^a-z]+/)].filter((t) => t.length > 3)),
  );
  return {
    id,
    slug: slug(name),
    name,
    stage: stage.key,
    stageLabel: stage.label,
    department: dept.key,
    departmentLabel: dept.label,
    goal,
    inputs: inputList,
    outputs: outputList,
    tags
  };
});

export const WORKFLOWS = {
  "zero-to-first-outreach": {
    title: "Zero to First Outreach",
    description: "Go from what you sell to your first personalized cold-email batch.",
    agents: [1, 2, 5, 26, 27, 45],
  },
  "email-sequence": {
    title: "Cold Email Sequence",
    description: "Create an end-to-end sequence with hooks, value props, follow-ups and spam-safe phrasing.",
    agents: [26, 27, 28, 30, 33, 45],
  },
  "signal-to-sequence": {
    title: "Signal to Sequence",
    description: "Turn an intent or hiring signal into an angle and a 3-touch sequence.",
    agents: [10, 13, 28, 30, 33, 45],
  },
  "reply-desk": {
    title: "Reply Desk",
    description: "Classify incoming replies, handle objections, and book calls.",
    agents: [46, 47, 48, 49, 50],
  },
  "linkedin-warm-outreach": {
    title: "LinkedIn Warm Outreach",
    description: "Prospect, connect and start conversations on LinkedIn respectfully without automation spam.",
    agents: [22, 36, 35, 89, 90],
  },
  "list-quality": {
    title: "List Quality & Deduplication",
    description: "Clean, deduplicate, verify emails, and enrich account records before launching campaigns.",
    agents: [19, 20, 23, 24, 25],
  },
  "lost-lead-revival": {
    title: "Lost Lead Revival",
    description: "Re-engage cold or closed-lost leads with a new angle.",
    agents: [64, 65, 86, 45],
  },
  "weekly-review": {
    title: "Weekly Outbound Performance Review",
    description: "Audit deliverability, track KPIs, evaluate channel attribution and optimize reply rates.",
    agents: [42, 94, 95, 96, 100],
  },
  "gcc-enterprise-outreach": {
    title: "GCC Enterprise Outreach (English & Arabic)",
    description: "Design compliant, respectful B2B outreach tailored for UAE, Saudi Arabia, and Oman business protocols.",
    agents: [1, 3, 35, 39, 79, 80, 81],
  },
  "buying-committee-penetration": {
    title: "Buying Committee Penetration",
    description: "Map all decision makers, evaluators, and champions to navigate multi-stakeholder corporate procurement.",
    agents: [3, 8, 57, 60, 61, 53],
  }
};

export function getAgent(ref) {
  if (ref === undefined || ref === null) return undefined;
  const s = String(ref).trim().toLowerCase();
  const n = Number(s);
  if (Number.isInteger(n)) return AGENTS.find((a) => a.id === n);
  return AGENTS.find((a) => a.slug === s || a.name.toLowerCase() === s || a.name.toLowerCase() === `${s} agent`);
}

export function searchAgents(query, limit = 10) {
  const terms = String(query).toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  if (!terms.length) return [];
  return AGENTS.map((a) => {
    const hay = `${a.name} ${a.goal} ${a.inputs.join(" ")} ${a.outputs.join(" ")} ${a.tags.join(" ")}`.toLowerCase();
    let score = 0;
    for (const t of terms) {
      if (a.name.toLowerCase().includes(t)) score += 3;
      if (a.tags.includes(t)) score += 2;
      if (hay.includes(t)) score += 1;
    }
    return { a, score };
  })
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score || x.a.id - y.a.id)
    .slice(0, limit)
    .map((x) => x.a);
}

export function recommend(goal, limit = 8) {
  const g = String(goal).toLowerCase();
  const picks = [];
  const rules = [
    [/(start|begin|zero|new|first)/, "zero-to-first-outreach"],
    [/(email|cold|sequence|follow)/, "email-sequence"],
    [/(reply|replies|respond|objection|book|meeting)/, "reply-desk"],
    [/(linkedin|social|connection)/, "linkedin-warm-outreach"],
    [/(list|clean|dedupe|duplicate|verify|enrich|crm)/, "list-quality"],
    [/(report|kpi|review|analytics|weekly|measure)/, "weekly-review"],
    [/(gcc|uae|saudi|oman|arabic|whatsapp)/, "gcc-enterprise-outreach"],
    [/(committee|stakeholder|procurement|decision)/, "buying-committee-penetration"],
  ];
  for (const [re, wf] of rules) if (re.test(g)) picks.push(wf);
  const ids = [];
  for (const wf of picks) for (const id of WORKFLOWS[wf].agents) if (!ids.includes(id)) ids.push(id);
  for (const a of searchAgents(goal, limit)) if (!ids.includes(a.id)) ids.push(a.id);
  const final = (ids.length ? ids : WORKFLOWS["zero-to-first-outreach"].agents).slice(0, limit);
  return { workflows: picks, agents: final.map((id) => AGENTS.find((a) => a.id === id)) };
}
