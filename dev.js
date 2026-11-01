// Local HTTP dev server: node dev.js  ->  http://localhost:3000/mcp
import http from "node:http";
import handler from "./api/mcp.js";

export function startDevServer(port = 3000) {
  const server = http.createServer(async (req, res) => {
    if (req.url !== "/mcp") {
      res.statusCode = 404;
      return res.end("Not found. Use /mcp");
    }
    let body = "";
    for await (const chunk of req) body += chunk;
    try {
      req.body = body ? JSON.parse(body) : undefined;
    } catch {
      res.statusCode = 400;
      return res.end("Invalid JSON");
    }
    await handler(req, res);
  });
  return new Promise((resolve) => server.listen(port, () => resolve(server)));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.env.PORT || 3000);
  await startDevServer(port);
  console.log(`MCP dev server: http://localhost:${port}/mcp`);
}
