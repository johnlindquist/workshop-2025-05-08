import React, { useState } from "react";
import { Card } from "./card";
import type { Note } from "../../mocks/notes";

interface NoteCardProps {
  note: Note;
  onEdit: (id: string, content: string) => void;
  onDelete: (id: string) => void;
}

export function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(note.content);

  const handleEdit = () => {
    if (editContent.trim()) {
      console.log("[Note] Edit", { id: note.id, content: editContent });
      onEdit(note.id, editContent);
      setEditing(false);
    }
  };

  return (
    <Card className="mb-2">
      <div className="p-4 flex items-center justify-between">
        {editing ? (
          <>
            <input
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="border p-2 rounded w-full mr-2"
            />
            <button
              type="button"
              onClick={handleEdit}
              className="bg-green-500 text-white px-2 py-1 rounded mr-2"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="bg-gray-300 text-black px-2 py-1 rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <div>
              <div className="font-bold">{note.content}</div>
              <div className="text-xs text-gray-500">
                {new Date(note.createdAt).toLocaleString()}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="bg-yellow-400 text-black px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => {
                  console.log("[Note] Delete", { id: note.id });
                  onDelete(note.id);
                }}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
