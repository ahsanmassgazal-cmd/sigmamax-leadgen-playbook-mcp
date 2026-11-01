// Single default-exported handler. Works whether Vercel runs the project as one server app
// (auto-detected entrypoint) or as separate functions under api/. Routes /mcp and the landing page.
import mcpHandler from "./api/mcp.js";
import landing from "./api/index.js";

export default async function handler(req, res) {
  const path = (req.url || "/").split("?")[0].replace(/\/+$/, "") || "/";
  if (path === "/mcp" || path === "/api/mcp") return mcpHandler(req, res);
  if (path === "/" || path === "/api" || path === "/api/index") return landing(req, res);
  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ error: "Not found. The MCP endpoint is /mcp" }));
}
