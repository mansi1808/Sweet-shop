import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

import { createProxyMiddleware } from "http-proxy-middleware";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Proxy /api requests to the backend
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
      pathRewrite: { "^/": "/api/" },
      onProxyReq: (proxyReq, req, res) => {
        // Optional: Log proxy requests for debugging
        // console.log(`Proxying ${req.method} ${req.path} to backend`);
      },
      onError: (err, req, res) => {
        console.error("Proxy error:", err);
        res.status(500).json({ message: "Proxy error: Could not connect to backend" });
      },
    })
  );

  return httpServer;
}
