import { beforeEach, describe, expect, it } from "vitest";
import { useNotesStore } from "./notes";

// Helper to reset Zustand store state between tests
beforeEach(() => {
  useNotesStore.setState({ notes: [] });
});

describe("useNotesStore", () => {
  it("adds a note", () => {
    useNotesStore.getState().addNote("Test note");
    const notes = useNotesStore.getState().notes;
    expect(notes.length).toBe(1);
    expect(notes[0].content).toBe("Test note");
  });

  it("edits a note", () => {
    useNotesStore.getState().addNote("Original");
    const id = useNotesStore.getState().notes[0].id;
    useNotesStore.getState().editNote(id, "Updated");
    expect(useNotesStore.getState().notes[0].content).toBe("Updated");
  });

  it("deletes a note", () => {
    useNotesStore.getState().addNote("To delete");
    const id = useNotesStore.getState().notes[0].id;
    useNotesStore.getState().deleteNote(id);
    expect(useNotesStore.getState().notes.length).toBe(0);
  });
});
