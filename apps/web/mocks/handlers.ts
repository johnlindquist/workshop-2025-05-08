import type { CreateNotePayload, Note, UpdateNotePayload } from "@repo/types";
import { http, HttpResponse, delay } from "msw";
import { v4 as uuidv4 } from "uuid";

// In-memory storage for mock notes
const mockNotes = new Map<string, Note>();

// Seed with some initial data (adjust as needed)
const initialMockNotes: Note[] = [
  {
    id: "a1b2c3d4-e5f6-7890-1234-567890abcdef", // Fixed UUID
    title: "First Mock Scroll",
    content: "This is the first note stored in the mock service worker.",
    pinned: true,
    color: "#ffcc80", // Example color
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // Yesterday
    updatedAt: new Date().toISOString(),
  },
  {
    id: "b2c3d4e5-f6a7-8901-2345-67890abcdef0", // Fixed UUID
    title: "Second Mock Scroll",
    content: "Another entry in the annals of mock data.",
    pinned: false,
    color: "#80cbc4", // Example color
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

for (const note of initialMockNotes) {
  mockNotes.set(note.id, note);
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787/v1";

export const handlers = [
  // GET /notes
  http.get(`${API_BASE_URL}/notes`, async () => {
    await delay(150); // Simulate network delay
    const notes = Array.from(mockNotes.values());
    return HttpResponse.json(notes);
  }),

  // GET /notes/:noteId
  http.get(`${API_BASE_URL}/notes/:noteId`, async ({ params }) => {
    await delay(100);
    const { noteId } = params;
    if (typeof noteId !== "string") {
      return HttpResponse.json({ message: "Invalid note ID" }, { status: 400 });
    }
    const note = mockNotes.get(noteId);
    if (!note) {
      return HttpResponse.json({ message: "Note not found" }, { status: 404 });
    }
    return HttpResponse.json(note);
  }),

  // POST /notes
  http.post(`${API_BASE_URL}/notes`, async ({ request }) => {
    await delay(200);
    const payload = (await request.json()) as CreateNotePayload;
    if (!payload || typeof payload.content !== "string") {
      return HttpResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    const newNote: Note = {
      id: uuidv4(),
      title: payload.title || "Untitled Scroll",
      content: payload.content,
      pinned: false,
      color: undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockNotes.set(newNote.id, newNote);
    return HttpResponse.json(newNote, { status: 201 });
  }),

  // PUT /notes/:noteId
  http.put(`${API_BASE_URL}/notes/:noteId`, async ({ params, request }) => {
    await delay(180);
    const { noteId } = params;
    if (typeof noteId !== "string") {
      return HttpResponse.json({ message: "Invalid note ID" }, { status: 400 });
    }
    const existingNote = mockNotes.get(noteId);
    if (!existingNote) {
      return HttpResponse.json({ message: "Note not found" }, { status: 404 });
    }

    const payload = (await request.json()) as UpdateNotePayload;

    const updatedNote: Note = {
      ...existingNote,
      ...payload, // Apply partial updates
      updatedAt: new Date().toISOString(),
    };
    mockNotes.set(noteId, updatedNote);
    return HttpResponse.json(updatedNote);
  }),

  // DELETE /notes/:noteId
  http.delete(`${API_BASE_URL}/notes/:noteId`, async ({ params }) => {
    await delay(120);
    const { noteId } = params;
    if (typeof noteId !== "string") {
      return HttpResponse.json({ message: "Invalid note ID" }, { status: 400 });
    }
    const deleted = mockNotes.delete(noteId);
    if (!deleted) {
      return HttpResponse.json({ message: "Note not found" }, { status: 404 });
    }
    // Return 204 No Content for DELETE success
    return new HttpResponse(null, { status: 204 });
  }),
];
