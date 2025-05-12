import { describe, expect, it } from "vitest";
import { CreateNoteSchema, NoteSchema, UpdateNoteSchema } from "../note";

describe("Note Schema", () => {
  it("should validate a valid note", () => {
    const now = new Date();
    const validNote = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      content: "This is a test note",
      createdAt: now,
      updatedAt: now,
    };

    const result = NoteSchema.safeParse(validNote);
    expect(result.success).toBe(true);
  });

  it("should validate a note with title", () => {
    const now = new Date();
    const validNote = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      title: "Test title",
      content: "This is a test note",
      createdAt: now,
      updatedAt: now,
    };

    const result = NoteSchema.safeParse(validNote);
    expect(result.success).toBe(true);
  });

  it("should reject an invalid note with no id", () => {
    const now = new Date();
    const invalidNote = {
      content: "This is a test note",
      createdAt: now,
      updatedAt: now,
    };

    const result = NoteSchema.safeParse(invalidNote);
    expect(result.success).toBe(false);
  });

  it("should reject an invalid note with invalid id", () => {
    const now = new Date();
    const invalidNote = {
      id: "not-a-uuid",
      content: "This is a test note",
      createdAt: now,
      updatedAt: now,
    };

    const result = NoteSchema.safeParse(invalidNote);
    expect(result.success).toBe(false);
  });

  it("should validate a valid CreateNoteInput", () => {
    const validInput = {
      content: "This is a test note",
    };

    const result = CreateNoteSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("should validate a valid UpdateNoteInput", () => {
    const validInput = {
      title: "Updated title",
    };

    const result = UpdateNoteSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });
});
