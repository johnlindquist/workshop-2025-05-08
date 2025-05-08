import { create } from "zustand";
import { Note } from "../mocks/notes";

interface NotesState {
    notes: Note[];
    addNote: (content: string) => void;
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
})); 