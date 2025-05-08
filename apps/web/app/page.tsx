import Image from "next/image";
import styles from "./page.module.css";
import { Card } from "../components/ui/card";
import { useNotesStore } from "../store/notes";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const noteSchema = z.object({
  content: z.string().min(1, "Note cannot be empty"),
});

type NoteForm = z.infer<typeof noteSchema>;

export default function Home() {
  const { notes, addNote } = useNotesStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NoteForm>({ resolver: zodResolver(noteSchema) });

  const onSubmit = (data: NoteForm) => {
    addNote(data.content);
    reset();
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
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
          {notes.map((note) => (
            <Card key={note.id} className="mb-2">
              <div className="p-4">
                <div className="font-bold">{note.content}</div>
                <div className="text-xs text-gray-500">
                  {new Date(note.createdAt).toLocaleString()}
                </div>
              </div>
            </Card>
          ))}
        </div>
        <Image
          className={styles.logo}
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

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
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
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
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
