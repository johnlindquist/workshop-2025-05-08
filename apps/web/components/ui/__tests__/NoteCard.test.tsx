import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NoteCard } from "../NoteCard";
import type { Note } from "../../mocks/notes";

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
