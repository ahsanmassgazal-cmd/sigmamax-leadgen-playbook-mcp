// Simple landing page so the Vercel root URL isn't a 404.
export default function handler(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(`<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Lead Gen Playbook MCP</title>
<body style="font-family:system-ui;max-width:640px;margin:48px auto;padding:0 16px;line-height:1.5">
<h1>Lead Gen Playbook MCP</h1>
<p>A free MCP server with 100 lead-generation agent prompts. No customer data, nothing is sent anywhere.</p>
<p><b>Connect:</b> add this URL as a custom connector / remote MCP server:</p>
<pre style="background:#f4f4f4;padding:12px;border-radius:8px">${"https://" + (req.headers.host || "your-app.vercel.app")}/mcp</pre>
<p>Built by <a href="https://sigmamaxaisolutions.com/">Sigma Max AI Solutions</a>. MIT licensed.</p>
</body>`);
}
