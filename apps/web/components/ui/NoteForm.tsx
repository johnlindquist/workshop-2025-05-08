import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const noteSchema = z.object({
  content: z.string().min(1, "Note cannot be empty"),
});

type NoteForm = z.infer<typeof noteSchema>;

interface NoteFormProps {
  onAdd: (content: string) => void;
}

export function NoteForm({ onAdd }: NoteFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NoteForm>({ resolver: zodResolver(noteSchema) });

  const onSubmit = (data: NoteForm) => {
    console.log("[Note] Create", { content: data.content });
    onAdd(data.content);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: 24 }}>
      <input
        {...register("content")}
        placeholder="Type a new note..."
        className="border p-2 rounded w-full mb-2"
      />
      {errors.content && <div className="text-red-500 text-xs mb-2">{errors.content.message}</div>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Note
      </button>
    </form>
  );
}
