import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server'; // Changed to relative path
import { z } from 'zod';
import {
    getNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote,
} from './api-client';
import type {
    Note,
    CreateNotePayload,
    UpdateNotePayload,
} from '@repo/types';

// Example note data matching the Note type
const mockNote1: Note = {
    id: "a1b2c3d4-e5f6-7890-1234-567890abcdef", // Use fixed UUID
    title: 'Test Note 1', // Keep distinct title for some tests if needed
    content: 'Content 1',
    pinned: false,
    color: '#ffffff',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
};
const mockNote2: Note = {
    id: "b2c3d4e5-f6a7-8901-2345-67890abcdef0", // Use fixed UUID
    title: 'Test Note 2', // Keep distinct title
    content: 'Content 2',
    pinned: true,
    color: '#eeeeee',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787/v1";

describe('API Client', () => {
    // Note: MSW setup is now handled globally in vitest.setup.ts

    it('getNotes should fetch and validate notes', async () => {
        const notes = await getNotes();
        expect(notes).toHaveLength(2); // Will use initialMockNotes from handlers.ts
        expect(notes[0].title).toEqual(initialMockNotes[0].title); // Adjust expectations based on global mock
        expect(notes[1].title).toEqual(initialMockNotes[1].title);
        // Zod validation happens within fetchApi, if it throws, test fails
    });

    it('getNotes should handle server error', async () => {
        server.use(
            http.get(`${API_BASE_URL}/notes`, () => {
                return HttpResponse.json({ message: 'Server down' }, { status: 500 });
            })
        );

        await expect(getNotes()).rejects.toThrow('Server down');
    });

    it('getNoteById should fetch and validate a single note', async () => {
        server.use(
            http.get(`${API_BASE_URL}/notes/${mockNote1.id}`, () => {
                return HttpResponse.json(mockNote1);
            })
        );
        const note = await getNoteById(mockNote1.id);
        expect(note).toEqual(mockNote1);
    });

    it('getNoteById should handle not found', async () => {
        const nonExistentId = 'uuid-non-existent';
        server.use(
            http.get(`${API_BASE_URL}/notes/${nonExistentId}`, () => {
                return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
            })
        );
        await expect(getNoteById(nonExistentId)).rejects.toThrow('Not Found');
    });

    it('createNote should send payload and return validated note', async () => {
        const payload: CreateNotePayload = { title: 'New Note', content: 'New Content' };
        const expectedId = 'new-uuid';

        server.use(
            http.post(`${API_BASE_URL}/notes`, async ({ request }) => {
                const sentPayload = await request.json();
                expect(sentPayload).toEqual(payload);
                const responseNote: Note = {
                    id: expectedId,
                    ...payload,
                    pinned: false,
                    color: undefined,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                };
                return HttpResponse.json(responseNote, { status: 201 });
            })
        );

        const newNote = await createNote(payload);
        expect(newNote.id).toBe(expectedId);
        expect(newNote.title).toBe(payload.title);
        expect(newNote.content).toBe(payload.content);
    });

    it('updateNote should send payload and return validated note', async () => {
        const noteId = mockNote1.id;
        const payload: UpdateNotePayload = { title: 'Updated Title', pinned: true };

        server.use(
            http.put(`${API_BASE_URL}/notes/${noteId}`, async ({ request }) => {
                const sentPayload = await request.json();
                expect(sentPayload).toEqual(payload);
                const responseNote: Note = {
                    ...mockNote1,
                    ...payload,
                    updatedAt: new Date().toISOString(),
                };
                return HttpResponse.json(responseNote);
            })
        );

        const updatedNote = await updateNote(noteId, payload);
        expect(updatedNote.id).toBe(noteId);
        expect(updatedNote.title).toBe(payload.title);
        expect(updatedNote.pinned).toBe(payload.pinned);
    });

    it('deleteNote should send delete request', async () => {
        const noteId = mockNote1.id;
        let deleteCalled = false;

        server.use(
            http.delete(`${API_BASE_URL}/notes/${noteId}`, () => {
                deleteCalled = true;
                return new HttpResponse(null, { status: 204 });
            })
        );

        await deleteNote(noteId);
        expect(deleteCalled).toBe(true);
        // fetchApi returns undefined for 204, Zod schema is z.undefined()
    });

    it('deleteNote should handle not found', async () => {
        const noteId = 'non-existent-id';
        server.use(
            http.delete(`${API_BASE_URL}/notes/${noteId}`, () => {
                return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
            })
        );

        await expect(deleteNote(noteId)).rejects.toThrow('Not Found');
    });

    it('fetchApi should handle validation errors', async () => {
        server.use(
            http.get(`${API_BASE_URL}/notes`, () => {
                // Return data that does NOT match NoteSchema (e.g., missing content)
                return HttpResponse.json([{ id: '1', title: 'Invalid' }]);
            })
        );

        await expect(getNotes()).rejects.toThrow('Invalid data received from server.');
    });

});

// Add initialMockNotes from handlers.ts for comparison if not already available
const initialMockNotes: Note[] = [
    {
        id: "a1b2c3d4-e5f6-7890-1234-567890abcdef", // Fixed UUID from handlers.ts
        title: "First Mock Scroll",
        content: "This is the first note stored in the mock service worker.",
        pinned: true,
        color: "#ffcc80",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "b2c3d4e5-f6a7-8901-2345-67890abcdef0", // Fixed UUID from handlers.ts
        title: "Second Mock Scroll",
        content: "Another entry in the annals of mock data.",
        pinned: false,
        color: "#80cbc4",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
]; 