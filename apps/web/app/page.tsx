"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card } from "../components/ui/card";
import { useNotesStore } from "../store/notes";
import type { Note } from "../mocks/notes";

const noteSchema = z.object({
  content: z.string().min(1, "Note cannot be empty"),
});

type NoteForm = z.infer<typeof noteSchema>;

export default function Home() {
  const { notes, addNote, editNote, deleteNote } = useNotesStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NoteForm>({ resolver: zodResolver(noteSchema) });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const onSubmit = (data: NoteForm) => {
    addNote(data.content);
    reset();
  };

  const startEdit = (noteId: string, currentContent: string) => {
    setEditingId(noteId);
    setEditContent(currentContent);
  };

  const saveEdit = (noteId: string) => {
    if (editContent.trim()) {
      editNote(noteId, editContent);
      setEditingId(null);
      setEditContent("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-2xl mx-auto py-8 px-4">
        <h2>Mock Notes</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: 24 }}>
          <input
            {...register("content")}
            placeholder="Type a new note..."
            className="border p-2 rounded w-full mb-2"
          />
          {errors.content && (
            <div className="text-red-500 text-xs mb-2">{errors.content.message}</div>
          )}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Note
          </button>
        </form>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {notes.map((note: Note) => (
            <Card key={note.id} className="mb-2">
              <div className="p-4 flex items-center justify-between">
                {editingId === note.id ? (
                  <>
                    <input
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="border p-2 rounded w-full mr-2"
                    />
                    <button
                      type="button"
                      onClick={() => saveEdit(note.id)}
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
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
                        onClick={() => startEdit(note.id, note.content)}
                        className="bg-yellow-400 text-black px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteNote(note.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>
        <Image
          className="mx-auto my-8"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>app/page.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 mt-8 justify-center">
          <a
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="mx-0"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-200 text-gray-900 px-4 py-2 rounded shadow hover:bg-gray-300 transition"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="w-full py-4 border-t flex justify-center gap-8 mt-8 text-sm text-gray-500 bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
