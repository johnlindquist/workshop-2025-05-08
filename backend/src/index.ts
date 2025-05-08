// Entry point for Cloudflare Worker backend API
// Export fetch handler for Cloudflare Worker compatibility
import { Hono } from 'hono';

const app = new Hono();

app.get('/health', (c) => c.json({ status: 'ok' }));

app.all('*', (c) => c.json({ error: 'Not Found' }, 404));

export default { fetch: app.fetch };
