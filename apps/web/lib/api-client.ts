import type { CreateNotePayload, ErrorResponse, Note, UpdateNotePayload } from "@repo/types";
import { z } from "zod";

// Define Zod schemas based on TypeScript types
const NoteSchema = z.object({
  id: z.string().uuid(),
  title: z.string().optional(),
  content: z.string(),
  pinned: z.boolean().optional(),
  color: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

const NotesArraySchema = z.array(NoteSchema);

const ErrorResponseSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
  error: z.string().optional(),
});

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787/v1"; // Default for local dev

// Helper function for API requests
async function fetchApi<T>(
  url: string,
  responseSchema: z.ZodType<T>,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      // Add Authorization header if needed
      // 'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    let errorData: ErrorResponse;
    try {
      // Attempt to parse error response according to ErrorResponse schema
      const errorJson = await response.json();
      errorData = ErrorResponseSchema.parse(errorJson);
    } catch (parseError) {
      // Fallback if parsing fails or response is not JSON
      errorData = {
        statusCode: response.status,
        message: response.statusText || "An unknown API error occurred",
      };
    }
    console.error("API Error:", errorData);
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  // Handle 204 No Content specifically for DELETE
  if (response.status === 204) {
    // Casting to T, assuming upstream handles `undefined` for DELETEs.
    return undefined as T;
  }

  const data = await response.json();
  try {
    return responseSchema.parse(data);
  } catch (validationError) {
    console.error("API Response Validation Error:", validationError);
    throw new Error("Invalid data received from server.");
  }
}

// API Client Functions

/**
 * Fetches all notes.
 */
export const getNotes = (): Promise<Note[]> => {
  return fetchApi(`${API_BASE_URL}/notes`, NotesArraySchema, { method: "GET" });
};

/**
 * Fetches a single note by ID.
 */
export const getNoteById = (noteId: string): Promise<Note> => {
  if (!noteId) throw new Error("Note ID is required.");
  return fetchApi(`${API_BASE_URL}/notes/${noteId}`, NoteSchema, { method: "GET" });
};

/**
 * Creates a new note.
 */
export const createNote = (payload: CreateNotePayload): Promise<Note> => {
  return fetchApi(`${API_BASE_URL}/notes`, NoteSchema, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

/**
 * Updates an existing note.
 */
export const updateNote = (noteId: string, payload: UpdateNotePayload): Promise<Note> => {
  if (!noteId) throw new Error("Note ID is required for update.");
  return fetchApi(`${API_BASE_URL}/notes/${noteId}`, NoteSchema, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
};

/**
 * Deletes a note by ID. Returns void on success.
 */
export const deleteNote = (noteId: string): Promise<void> => {
  if (!noteId) throw new Error("Note ID is required for delete.");
  // Use z.undefined() for the schema as fetchApi expects a schema,
  // and it returns undefined for 204 responses.
  return fetchApi(`${API_BASE_URL}/notes/${noteId}`, z.undefined(), { method: "DELETE" });
};
