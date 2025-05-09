// Entry point for Cloudflare Worker backend API
// Export fetch handler for Cloudflare Worker compatibility
import { Hono } from "hono";
import { z } from "zod";

type KVNamespace = {
    get: (key: string) => Promise<string | null>;
    put: (key: string, value: string) => Promise<void>;
    list: () => Promise<{ keys: { name: string }[] }>;
};

const app = new Hono<{ Bindings: { NOTES: KVNamespace } }>();

app.get("/health", (c) => c.json({ status: "ok" }));

// Zod schema for note
const noteSchema = z.object({
    id: z.string(),
    content: z.string(),
});

// GET /notes - list all notes
app.get("/notes", async (c) => {
    try {
        console.log('[GET /notes] env:', c.env);
        const kv = c.env?.NOTES;
        if (!kv) {
            console.error('[GET /notes] KV binding missing');
            return c.json({ error: 'KV binding missing' }, 500);
        }
        const list = await kv.list();
        console.log('[GET /notes] list:', list);
        const notes = await Promise.all(
            (list.keys || []).map(async (key: { name: string }) => {
                const value = await kv.get(key.name);
                console.log(`[GET /notes] key: ${key.name}, value:`, value);
                return value ? JSON.parse(value) : null;
            })
        );
        console.log('[GET /notes] notes:', notes);
        return c.json(notes.filter(Boolean));
    } catch (err) {
        console.error('[GET /notes] error:', err);
        return c.json({ error: 'Internal Server Error', details: String(err) }, 500);
    }
});

// POST /notes - create a note
app.post("/notes", async (c) => {
    try {
        console.log('[POST /notes] env:', c.env);
        const kv = c.env?.NOTES;
        if (!kv) {
            console.error('[POST /notes] KV binding missing');
            return c.json({ error: 'KV binding missing' }, 500);
        }
        const body = await c.req.json();
        console.log('[POST /notes] body:', body);
        const parse = noteSchema.safeParse(body);
        if (!parse.success) {
            console.error('[POST /notes] invalid note:', parse.error.errors);
            return c.json({ error: "Invalid note", details: parse.error.errors }, 400);
        }
        const note = parse.data;
        await kv.put(note.id, JSON.stringify(note));
        console.log('[POST /notes] note stored:', note);
        return c.json(note, 201);
    } catch (err) {
        console.error('[POST /notes] error:', err);
        return c.json({ error: 'Internal Server Error', details: String(err) }, 500);
    }
});

app.all("*", (c) => c.json({ error: "Not Found" }, 404));

export const fetch = app.fetch;
export default { fetch };
