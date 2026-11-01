// The Lead Gen Playbook catalog: 100 agent prompt specs organised by funnel stage.
// Each raw row: [id, name, goal, inputs ("|" separated), outputs ("|" separated)]

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
  [2, "Buyer Persona Agent", "Build buyer personas with roles, goals, objections and buying triggers.", "ICP|offer", "2-3 personas|top objections|trigger events"],
  [3, "Target Account Research Agent", "Turn public information about a target account into a short, usable brief.", "company name|website or notes|ICP", "account summary|fit notes|open questions"],
  [4, "Market Segmentation Agent", "Split a market into segments worth targeting and rank them.", "ICP|market notes", "segments|priority ranking|rationale"],
  [5, "Prospect List Builder Agent", "Plan a repeatable way to build a prospect list for an ICP.", "ICP|geography|data sources available", "list-building plan|search queries|fields to capture"],
  [6, "Company Finder Agent", "Create search strategies to find companies that match an ICP.", "ICP|geography", "search queries|directories to check|exclusion rules"],
  [7, "Contact Finder Agent", "Plan which roles to look for at a company and where to find them legitimately.", "company|personas", "target roles|public sources to check|what to leave blank"],
  [8, "Lead Qualification Agent", "Qualify a lead against stated criteria and explain the decision.", "lead information|qualification criteria", "qualified yes/no/maybe|reasons|missing information"],
  [9, "Lead Scoring Agent", "Design a transparent scoring model and score leads with reasons.", "ICP|lead data", "scoring rubric|score per lead|reasons"],
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
  [30, "Value Proposition Agent", "Write a clear value proposition for a segment.", "offer|segment", "value proposition|proof needed|variants"],
  [31, "Offer Angle Agent", "Find different angles to present the same offer.", "offer|persona", "5 angles|best for whom|risks"],
  [32, "Call-to-Action Agent", "Write low-friction calls to action.", "email draft|goal", "5 CTAs|friction rating|best pick"],
  [33, "Follow-Up Sequence Agent", "Write a follow-up sequence with sensible spacing.", "first email|goal|cadence", "follow-up emails|timing|stop rules"],
  [34, "Breakup Email Agent", "Write a polite final email to close a sequence.", "sequence so far", "breakup email|alternative version"],
  [35, "LinkedIn DM Writer Agent", "Write a short direct message draft for manual sending.", "prospect facts|offer", "DM draft|alternative version|follow-up"],
  [36, "Connection Request Writer Agent", "Write a short connection note within platform limits.", "prospect facts", "3 notes|character counts"],
  [37, "Voice Note Script Agent", "Write a short voice-note script.", "prospect facts|offer", "30-second script|opening line|call to action"],
  [38, "Outbound Campaign Planner Agent", "Plan an outbound campaign end to end.", "ICP|offer|channels|capacity", "campaign plan|timeline|success metrics"],
  [39, "Multichannel Sequencing Agent", "Combine email, LinkedIn and WhatsApp into one respectful sequence.", "channels allowed|persona", "multichannel sequence|day-by-day schedule|stop rules"],
  [40, "Send-Time Optimization Agent", "Suggest send windows from audience time zones and past results.", "audience time zones|past results", "send windows|test plan"],
  [41, "A/B Testing Agent", "Design an A/B test that changes one variable.", "goal|current copy", "hypothesis|variants|sample-size note"],
  [42, "Deliverability Audit Agent", "Audit email setup and practices for deliverability risks.", "sending setup|volume|content", "risk list|fixes|checklist"],
  [43, "Inbox Warm-Up Agent", "Plan a gradual sending ramp-up.", "domain age|target volume", "ramp schedule|guardrails"],
  [44, "Domain Reputation Agent", "Interpret domain reputation signals and recommend next steps.", "domain checks|bounce data", "reputation view|actions"],
  [45, "Spam Check Agent", "Review a draft for spam-trigger risk.", "email draft", "risk flags|safer rewrite"],
  [46, "Reply Categorization Agent", "Categorize a reply as positive, question, objection, not now, not interested, unsubscribe, out-of-office or bounce.", "reply text", "category|confidence|next action"],
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
  [57, "Qualification Question Agent", "List qualification questions.", "offer|criteria", "questions by topic|red flags"],
  [58, "Needs Analysis Agent", "Structure a needs analysis from call notes.", "call notes", "needs summary|gaps|next questions"],
  [59, "Pain Point Mapping Agent", "Map customer pains to the offer.", "notes|offer", "pain map|evidence|priority"],
  [60, "Decision Maker Mapper Agent", "Map who decides, who influences and who can block.", "organization information|notes", "role map|unknowns|next step"],
  [61, "Buying Committee Agent", "Map a buying committee and how to engage each member.", "account notes", "committee map|engagement plan"],
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
  [79, "Region Localization Agent", "Adapt tone and norms for a region.", "region|message", "localized version|cultural notes"],
  [80, "Multilingual Outreach Agent", "Write outreach in another language and flag it for native review.", "message|language|region", "translation|review flags"],
  [81, "Compliance Check Agent", "Review outreach for compliance risks. This is not legal advice.", "draft|country|channel", "risk flags|suggested edits|questions for counsel"],
  [82, "CRM Note Writer Agent", "Write clean, useful CRM notes.", "interaction summary", "CRM note|next step|date"],
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
  [95, "Outreach Performance Analyst Agent", "Analyze outreach results and find what to change.", "results", "findings|recommendations"],
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

export const AGENTS = raw.map(([id, name, goal, inputs, outputs]) => {
  const stage = stageOf(id);
  const inputList = inputs.split("|");
  const outputList = outputs.split("|");
  const tags = Array.from(
    new Set([stage.key, ...slug(name).split("-"), ...inputList.join(" ").toLowerCase().split(/[^a-z]+/)].filter((t) => t.length > 3)),
  );
  return { id, slug: slug(name), name, stage: stage.key, stageLabel: stage.label, goal, inputs: inputList, outputs: outputList, tags };
});

export const WORKFLOWS = {
  "zero-to-first-outreach": {
    title: "From zero to your first outreach",
    description: "Define who to target, build a small list, qualify it, and write the first safe messages.",
    agents: [1, 2, 5, 6, 7, 8, 9, 26, 28, 32, 45, 81],
  },
  "email-sequence": {
    title: "Write a complete email sequence",
    description: "First email, subject lines, follow-ups and a polite close, checked for spam risk and compliance.",
    agents: [26, 27, 29, 30, 33, 34, 45, 81],
  },
  "reply-desk": {
    title: "Handle replies",
    description: "Sort replies, draft answers, book meetings and keep the CRM tidy.",
    agents: [46, 47, 48, 49, 82, 83],
  },
  "linkedin-warm-outreach": {
    title: "Warm LinkedIn outreach (manual sending)",
    description: "Research a prospect from a pasted profile and draft a connection note and message.",
    agents: [3, 22, 28, 35, 36],
  },
  "list-quality": {
    title: "Clean and segment a list",
    description: "Verify, enrich, de-duplicate and segment a prospect list.",
    agents: [19, 20, 21, 24, 25, 98],
  },
  "weekly-review": {
    title: "Weekly review",
    description: "Plan the week, track KPIs, analyze results and feed learning back.",
    agents: [93, 94, 95, 96, 100],
  },
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
  ];
  for (const [re, wf] of rules) if (re.test(g)) picks.push(wf);
  const ids = [];
  for (const wf of picks) for (const id of WORKFLOWS[wf].agents) if (!ids.includes(id)) ids.push(id);
  for (const a of searchAgents(goal, limit)) if (!ids.includes(a.id)) ids.push(a.id);
  const final = (ids.length ? ids : WORKFLOWS["zero-to-first-outreach"].agents).slice(0, limit);
  return { workflows: picks, agents: final.map((id) => AGENTS.find((a) => a.id === id)) };
}
