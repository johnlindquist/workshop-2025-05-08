import { Hono } from "hono";
import { NoteService } from "../services/noteService";

// Create a router for notes endpoints
const notesRoutes = new Hono();

// Initialize note service
const noteService = new NoteService();

// GET /notes - Retrieve all notes
notesRoutes.get("/", async (c) => {
  // This will be implemented in the next commit
  return c.json({ message: "List notes endpoint (not implemented yet)" });
});

// GET /notes/:id - Retrieve a specific note by ID
notesRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");
  // This will be implemented in the next commit
  return c.json({ message: `Get note with ID: ${id} (not implemented yet)` });
});

// POST /notes - Create a new note
notesRoutes.post("/", async (c) => {
  // This will be implemented in the next commit
  return c.json({ message: "Create note endpoint (not implemented yet)" }, 201);
});

// PUT /notes/:id - Update an existing note
notesRoutes.put("/:id", async (c) => {
  const id = c.req.param("id");
  // This will be implemented in the next commit
  return c.json({ message: `Update note with ID: ${id} (not implemented yet)` });
});

// DELETE /notes/:id - Delete a note
notesRoutes.delete("/:id", async (c) => {
  const id = c.req.param("id");
  // This will be implemented in the next commit
  return c.json({ message: `Delete note with ID: ${id} (not implemented yet)` }, 204);
});

export { notesRoutes };
