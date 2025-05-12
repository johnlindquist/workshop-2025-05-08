import { z } from "zod";

export const NoteSchema = z.object({
    id: z.string().uuid(),
    title: z.string().optional(),
    content: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type Note = z.infer<typeof NoteSchema>;

export const CreateNoteSchema = NoteSchema.omit({ id: true, createdAt: true, updatedAt: true });
export type CreateNoteInput = z.infer<typeof CreateNoteSchema>;

export const UpdateNoteSchema = CreateNoteSchema.partial();
export type UpdateNoteInput = z.infer<typeof UpdateNoteSchema>; 