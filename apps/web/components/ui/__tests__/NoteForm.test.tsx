import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NoteForm } from "../NoteForm";

describe("NoteForm", () => {
  it("calls onAdd with note content", async () => {
    const onAdd = vi.fn();
    render(<NoteForm onAdd={onAdd} />);
    await fireEvent.change(screen.getByPlaceholderText(/type a new note/i), {
      target: { value: "Hello world" },
    });
    await fireEvent.click(screen.getByText(/add note/i));
    expect(onAdd).toHaveBeenCalledWith("Hello world");
  });

  it("shows validation error for empty note", async () => {
    const onAdd = vi.fn();
    render(<NoteForm onAdd={onAdd} />);
    await fireEvent.click(screen.getByText(/add note/i));
    expect(await screen.findByText(/cannot be empty/i)).toBeInTheDocument();
    expect(onAdd).not.toHaveBeenCalled();
  });
});
