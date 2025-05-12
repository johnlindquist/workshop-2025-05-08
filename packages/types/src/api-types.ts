/**
 * Represents a note object as defined in the API.
 */
export interface Note {
  /**
   * Unique identifier for the note (UUID format).
   * @readonly
   */
  readonly id: string;
  /**
   * The title of the note. Optional.
   */
  title?: string;
  /**
   * The main body of the note.
   */
  content: string;
  /**
   * ISO 8601 date string representing when the note was created.
   * @readonly
   */
  readonly createdAt: string; // date-time format maps to string in TypeScript
  /**
   * ISO 8601 date string representing when the note was last updated.
   * @readonly
   */
  readonly updatedAt: string; // date-time format maps to string in TypeScript
}

/**
 * Represents the structure of an error response from the API.
 */
export interface ErrorResponse {
  /**
   * HTTP status code.
   */
  statusCode: number;
  /**
   * A human-readable error message.
   */
  message: string;
  /**
   * (Optional) A short error code or type (e.g., "Not Found", "Validation Error").
   */
  error?: string;
}

/**
 * Represents the request body for creating a note.
 */
export interface CreateNotePayload {
  title?: string;
  content: string;
}

/**
 * Represents the request body for updating a note.
 * All fields are optional for partial updates.
 */
export interface UpdateNotePayload {
  title?: string;
  content?: string;
}
