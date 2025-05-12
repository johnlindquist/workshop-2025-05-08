import { Hono } from "hono";
import { z } from "zod";
import { NoteService } from "../services/noteService";
import { CreateNoteSchema, UpdateNoteSchema } from "@app/types";
import { Context, Next } from "hono";

// Create a router for notes endpoints
const notesRoutes = new Hono();

// Initialize note service
const noteService = new NoteService();

// Validation schema for note ID
const IdParamSchema = z.object({
  id: z.string().uuid(),
});

// Error handling middleware
const errorHandler = async (c: Context, next: Next) => {
  try {
    await next();
  } catch (error) {
    console.error("Error handling request:", error);

    if (error instanceof z.ZodError) {
      return c.json({ error: "Invalid input", details: error.issues }, 400);
    }

    return c.json({ error: "Internal server error" }, 500);
  }
};

// Apply error handling middleware
notesRoutes.use("*", errorHandler);

// GET /notes - Retrieve all notes
notesRoutes.get("/", async (c) => {
  const notes = await noteService.getAllNotes();
  return c.json(notes);
});

// GET /notes/:id - Retrieve a specific note by ID
notesRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");

  try {
    // Validate ID
    IdParamSchema.parse({ id });

    const note = await noteService.getNoteById(id);

    if (!note) {
      return c.json({ error: "Note not found" }, 404);
    }

    return c.json(note);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: "Invalid note ID", details: error.issues }, 400);
    }
    throw error;
  }
});

// POST /notes - Create a new note
notesRoutes.post("/", async (c) => {
  try {
    const input = await c.req.json();

    // Validate input
    const parsedInput = CreateNoteSchema.parse(input);

    // Create the note
    const newNote = await noteService.createNote(parsedInput);

    return c.json(newNote, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: "Invalid note data", details: error.issues }, 400);
    }
    throw error;
  }
});

// PUT /notes/:id - Update an existing note
notesRoutes.put("/:id", async (c) => {
  const id = c.req.param("id");

  try {
    // Validate ID
    IdParamSchema.parse({ id });

    const input = await c.req.json();

    // Validate input
    const parsedInput = UpdateNoteSchema.parse(input);

    // Update the note
    const updatedNote = await noteService.updateNote(id, parsedInput);

    if (!updatedNote) {
      return c.json({ error: "Note not found" }, 404);
    }

    return c.json(updatedNote);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: "Invalid input", details: error.issues }, 400);
    }
    throw error;
  }
});

// DELETE /notes/:id - Delete a note
notesRoutes.delete("/:id", async (c) => {
  const id = c.req.param("id");

  try {
    // Validate ID
    IdParamSchema.parse({ id });

    const success = await noteService.deleteNote(id);

    if (!success) {
      return c.json({ error: "Note not found" }, 404);
    }

    return c.body(null, 204);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: "Invalid note ID", details: error.issues }, 400);
    }
    throw error;
  }
});

export { notesRoutes };
