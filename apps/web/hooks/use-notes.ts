import { createNote, deleteNote, getNoteById, getNotes, updateNote } from "@/lib/api-client";
import type { CreateNotePayload, Note, UpdateNotePayload } from "@repo/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const NOTE_QUERY_KEYS = {
  all: ["notes"] as const,
  list: () => [...NOTE_QUERY_KEYS.all, "list"] as const,
  detail: (id: string) => [...NOTE_QUERY_KEYS.all, "detail", id] as const,
};

/**
 * Hook to fetch all notes.
 */
export function useGetNotes() {
  return useQuery<Note[], Error>({
    queryKey: NOTE_QUERY_KEYS.list(),
    queryFn: getNotes,
  });
}

/**
 * Hook to fetch a single note by ID.
 * @param noteId The ID of the note to fetch.
 * @param options Optional query options.
 */
export function useGetNoteById(noteId: string, options?: { enabled?: boolean }) {
  return useQuery<Note, Error>({
    queryKey: NOTE_QUERY_KEYS.detail(noteId),
    queryFn: () => getNoteById(noteId),
    enabled: !!noteId && options?.enabled !== false, // Only run if noteId is provided and enabled
  });
}

/**
 * Hook to create a new note.
 */
export function useCreateNote() {
  const queryClient = useQueryClient();
  return useMutation<Note, Error, CreateNotePayload>({
    mutationFn: createNote,
    onSuccess: (newNote) => {
      // Invalidate the list query to refetch notes
      queryClient.invalidateQueries({ queryKey: NOTE_QUERY_KEYS.list() });
      // Optionally, update the cache directly
      // queryClient.setQueryData(NOTE_QUERY_KEYS.list(), (oldData: Note[] | undefined) => {
      //   return oldData ? [...oldData, newNote] : [newNote];
      // });
    },
    onError: (error) => {
      console.error("Failed to create note:", error);
      // Handle error appropriately (e.g., show notification)
    },
  });
}

/**
 * Hook to update an existing note.
 */
export function useUpdateNote() {
  const queryClient = useQueryClient();
  return useMutation<Note, Error, { noteId: string; payload: UpdateNotePayload }>({
    mutationFn: ({ noteId, payload }) => updateNote(noteId, payload),
    onSuccess: (updatedNote) => {
      // Invalidate both the list and the specific note detail query
      queryClient.invalidateQueries({ queryKey: NOTE_QUERY_KEYS.list() });
      queryClient.invalidateQueries({ queryKey: NOTE_QUERY_KEYS.detail(updatedNote.id) });
      // Optionally, update the cache directly
      // queryClient.setQueryData(NOTE_QUERY_KEYS.detail(updatedNote.id), updatedNote);
      // queryClient.setQueryData(NOTE_QUERY_KEYS.list(), (oldData: Note[] | undefined) =>
      //   oldData?.map((note) => (note.id === updatedNote.id ? updatedNote : note)),
      // );
    },
    onError: (error, variables) => {
      console.error(`Failed to update note ${variables.noteId}:`, error);
      // Handle error
    },
  });
}

/**
 * Hook to delete a note by ID.
 */
export function useDeleteNote() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteNote,
    onSuccess: (_, noteId) => {
      // Invalidate the list query
      queryClient.invalidateQueries({ queryKey: NOTE_QUERY_KEYS.list() });
      // Remove the note from the detail cache if it exists
      queryClient.removeQueries({ queryKey: NOTE_QUERY_KEYS.detail(noteId) });
      // Optionally, update the list cache directly
      // queryClient.setQueryData(NOTE_QUERY_KEYS.list(), (oldData: Note[] | undefined) =>
      //   oldData?.filter((note) => note.id !== noteId),
      // );
    },
    onError: (error, noteId) => {
      console.error(`Failed to delete note ${noteId}:`, error);
      // Handle error
    },
  });
}
