import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { notesRoutes } from "./routes/notes";

// Define the type for environment bindings
type Bindings = {
  // Add KV namespace binding when implemented
  // NOTES_KV: KVNamespace;
  [key: string]: unknown;
};

// Create Hono app instance
const app = new Hono<{ Bindings: Bindings }>();

// Add logger middleware (should be early)
app.use("*", logger());

// Configure CORS middleware
app.use(
  "*",
  cors({
    origin: ["*"], // In production, restrict to your frontend domains
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Mount notes routes
app.route("/notes", notesRoutes);

// 404 handler for undefined routes
app.all("*", (c) => {
  return c.json({ error: "Not Found" }, 404);
});

// Export the app for Cloudflare Workers
export default app;
