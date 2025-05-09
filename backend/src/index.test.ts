import { beforeEach, describe, expect, it } from "vitest";
import app, { fetch as appFetch } from "./index";

// Mock KVNamespace
const mockKV = () => {
    const store: Record<string, string> = {};
    return {
        get: async (key: string) => store[key] || null,
        put: async (key: string, value: string) => {
            store[key] = value;
        },
        list: async () => ({ keys: Object.keys(store).map((name) => ({ name })) }),
    };
};

const fetchHandler = appFetch || app.fetch;

describe("API", () => {
    let env: { NOTES: ReturnType<typeof mockKV> };

    beforeEach(() => {
        env = { NOTES: mockKV() };
    });

    it("GET /health returns status ok", async () => {
        const req = new Request("http://localhost/health");
        const res = await fetchHandler(req, env);
        expect(res.status).toBe(200);
        const json = await res.json();
        expect(json).toEqual({ status: "ok" });
    });

    it("POST /notes with valid note", async () => {
        const note = { id: "1", content: "test note" };
        const req = new Request("http://localhost/notes", {
            method: "POST",
            body: JSON.stringify(note),
            headers: { "Content-Type": "application/json" },
        });
        const res = await fetchHandler(req, env);
        expect(res.status).toBe(201);
        const json = await res.json();
        expect(json).toMatchObject(note);
    });

    it("POST /notes with invalid note", async () => {
        const req = new Request("http://localhost/notes", {
            method: "POST",
            body: JSON.stringify({ foo: "bar" }),
            headers: { "Content-Type": "application/json" },
        });
        const res = await fetchHandler(req, env);
        expect(res.status).toBe(400);
        const json = await res.json();
        expect(json.error).toBe("Invalid note");
    });

    it("GET /notes returns all notes", async () => {
        // Add a note first
        await env.NOTES.put("1", JSON.stringify({ id: "1", content: "test note" }));
        const req = new Request("http://localhost/notes");
        const res = await fetchHandler(req, env);
        expect(res.status).toBe(200);
        const json = await res.json();
        expect(Array.isArray(json)).toBe(true);
        expect(json[0]).toMatchObject({ id: "1", content: "test note" });
    });
});
