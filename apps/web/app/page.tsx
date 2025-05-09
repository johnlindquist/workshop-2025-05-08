"use client";
import Image from "next/image";
import React from "react";
import { NoteForm } from "../components/ui/NoteForm";
import { NoteList } from "../components/ui/NoteList";
import { useNotesStore } from "../store/notes";

export default function Home() {
  const { notes, addNote, editNote, deleteNote } = useNotesStore();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-2xl mx-auto py-8 px-4">
        <h2>Mock Notes</h2>
        <NoteForm onAdd={addNote} />
        <NoteList notes={notes} onEdit={editNote} onDelete={deleteNote} />
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
