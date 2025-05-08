import { create } from "zustand";
import type { Note } from "../mocks/notes";

interface NotesState {
    notes: Note[];
    addNote: (content: string) => void;
    editNote: (id: string, content: string) => void;
    deleteNote: (id: string) => void;
}

export const useNotesStore = create<NotesState>((set) => ({
    notes: [],
    addNote: (content) =>
        set((state) => ({
            notes: [
                ...state.notes,
                {
                    id: Math.random().toString(36).slice(2),
                    content,
                    createdAt: new Date().toISOString(),
                },
            ],
        })),
    editNote: (id, content) =>
        set((state) => ({
            notes: state.notes.map((note) =>
                note.id === id ? { ...note, content } : note
            ),
        })),
    deleteNote: (id) =>
        set((state) => ({
            notes: state.notes.filter((note) => note.id !== id),
        })),
}));
