import React from "react";
import type { Note } from "../../mocks/notes";
import { NoteCard } from "./NoteCard";

interface NoteListProps {
  notes: Note[];
  onEdit: (id: string, content: string) => void;
  onDelete: (id: string) => void;
}

export function NoteList({ notes, onEdit, onDelete }: NoteListProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
