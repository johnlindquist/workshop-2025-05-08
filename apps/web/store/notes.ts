import { create } from "zustand";
import type { Note } from "../mocks/notes";

interface NotesState {
  notes: Note[];
  addNote: (title: string, content: string) => void;
  editNote: (id: string, update: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  initializeNotes: (initialNotes: Note[]) => void;
}

export const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  addNote: (title, content) =>
    set((state) => ({
      notes: [
        ...state.notes,
        {
          id: Math.random().toString(36).slice(2),
          title,
          content,
          createdAt: new Date().toISOString(),
          pinned: false,
          color: "bg-stone-800/70",
        },
      ],
    })),
  editNote: (id, update) =>
    set((state) => ({
      notes: state.notes.map((note) => (note.id === id ? { ...note, ...update } : note)),
    })),
  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    })),
  initializeNotes: (initialNotes) =>
    set(() => ({
      notes: initialNotes.map((note) => ({
        ...note,
        createdAt: note.createdAt || new Date().toISOString(),
        id: note.id || Math.random().toString(36).slice(2),
      })),
    })),
}));
