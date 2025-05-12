import { Note, CreateNoteInput, UpdateNoteInput } from '@app/types';
import { v4 as uuidv4 } from 'uuid';

/**
 * Service class for managing notes
 * This provides an in-memory implementation for note storage
 */
export class NoteService {
    // In-memory storage for notes
    private notes: Map<string, Note> = new Map();

    /**
     * Get all notes
     * @returns Promise resolving to an array of Notes
     */
    async getAllNotes(): Promise<Note[]> {
        return Array.from(this.notes.values());
    }

    /**
     * Get a note by ID
     * @param id The ID of the note to retrieve
     * @returns Promise resolving to a Note if found, or null
     */
    async getNoteById(id: string): Promise<Note | null> {
        return this.notes.get(id) || null;
    }

    /**
     * Create a new note
     * @param input Data for creating a new note
     * @returns Promise resolving to the created Note
     */
    async createNote(input: CreateNoteInput): Promise<Note> {
        const now = new Date();
        const id = uuidv4();

        const note: Note = {
            id,
            ...input,
            createdAt: now,
            updatedAt: now,
        };

        this.notes.set(id, note);
        return note;
    }

    /**
     * Update an existing note
     * @param id The ID of the note to update
     * @param input Data for updating the note
     * @returns Promise resolving to the updated Note, or null if not found
     */
    async updateNote(id: string, input: UpdateNoteInput): Promise<Note | null> {
        const existingNote = this.notes.get(id);

        if (!existingNote) {
            return null;
        }

        const updatedNote: Note = {
            ...existingNote,
            ...input,
            updatedAt: new Date(),
        };

        this.notes.set(id, updatedNote);
        return updatedNote;
    }

    /**
     * Delete a note by ID
     * @param id The ID of the note to delete
     * @returns Promise resolving to true if deleted, false if not found
     */
    async deleteNote(id: string): Promise<boolean> {
        if (!this.notes.has(id)) {
            return false;
        }

        this.notes.delete(id);
        return true;
    }
}
