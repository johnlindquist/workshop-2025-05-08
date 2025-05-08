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
    const list = await c.env.NOTES.list();
    const notes = await Promise.all(
        (list.keys || []).map(async (key: { name: string }) => {
            const value = await c.env.NOTES.get(key.name);
            return value ? JSON.parse(value) : null;
        })
    );
    return c.json(notes.filter(Boolean));
});

// POST /notes - create a note
app.post("/notes", async (c) => {
    const body = await c.req.json();
    const parse = noteSchema.safeParse(body);
    if (!parse.success) {
        return c.json({ error: "Invalid note", details: parse.error.errors }, 400);
    }
    const note = parse.data;
    await c.env.NOTES.put(note.id, JSON.stringify(note));
    return c.json(note, 201);
});

app.all("*", (c) => c.json({ error: "Not Found" }, 404));

export default { fetch: app.fetch };
