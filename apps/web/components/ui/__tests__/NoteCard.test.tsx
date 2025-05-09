import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import type { Note } from "../../mocks/notes";
import { NoteCard } from "../NoteCard";

const mockNote: Note = {
  id: "1",
  content: "Test note",
  createdAt: new Date().toISOString(),
};

describe("NoteCard", () => {
  it("calls onEdit with new content", () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    render(<NoteCard note={mockNote} onEdit={onEdit} onDelete={onDelete} />);
    fireEvent.click(screen.getByText(/edit/i));
    fireEvent.change(screen.getByDisplayValue(/test note/i), {
      target: { value: "Updated note" },
    });
    fireEvent.click(screen.getByText(/save/i));
    expect(onEdit).toHaveBeenCalledWith("1", "Updated note");
  });

  it("calls onDelete when delete is clicked", () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    render(<NoteCard note={mockNote} onEdit={onEdit} onDelete={onDelete} />);
    fireEvent.click(screen.getByText(/delete/i));
    expect(onDelete).toHaveBeenCalledWith("1");
  });
});
