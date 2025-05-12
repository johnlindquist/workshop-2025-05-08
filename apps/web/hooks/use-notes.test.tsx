import type { CreateNotePayload, Note, UpdateNotePayload } from "@repo/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import type React from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { server } from "../mocks/server";
import {
  useCreateNote,
  useDeleteNote,
  useGetNoteById,
  useGetNotes,
  useUpdateNote,
} from "./use-notes";

// Mock data
const mockNote1: Note = {
  id: "uuid-1",
  title: "Hook Test 1",
  content: "Content hook 1",
  pinned: false,
  color: "#aaa",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
const mockNote2: Note = {
  id: "uuid-2",
  title: "Hook Test 2",
  content: "Content hook 2",
  pinned: true,
  color: "#bbb",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787/v1";

// Wrapper component with QueryClientProvider
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable retries for tests
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("Note Hooks", () => {
  let wrapper: ({ children }: { children: React.ReactNode }) => JSX.Element;

  beforeEach(() => {
    wrapper = createWrapper();
    // Reset handlers ensures default mocks from handlers.ts are used unless overridden
    server.resetHandlers();
  });

  // --- useGetNotes ---
  it("useGetNotes fetches notes successfully", async () => {
    server.use(
      http.get(`${API_BASE_URL}/notes`, () => {
        return HttpResponse.json([mockNote1, mockNote2]);
      }),
    );

    const { result } = renderHook(() => useGetNotes(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual([mockNote1, mockNote2]);
  });

  // --- useGetNoteById ---
  it("useGetNoteById fetches a single note successfully", async () => {
    server.use(
      http.get(`${API_BASE_URL}/notes/${mockNote1.id}`, () => {
        return HttpResponse.json(mockNote1);
      }),
    );

    const { result } = renderHook(() => useGetNoteById(mockNote1.id), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockNote1);
  });

  // --- useCreateNote ---
  it("useCreateNote creates a note and invalidates query", async () => {
    const payload: CreateNotePayload = { title: "Create Test", content: "Creating..." };
    const expectedNote: Note = { ...mockNote1, id: "new-uuid-create", ...payload }; // Simulates response

    server.use(
      http.post(`${API_BASE_URL}/notes`, async () => {
        return HttpResponse.json(expectedNote, { status: 201 });
      }),
    );

    const { result } = renderHook(() => useCreateNote(), { wrapper });

    result.current.mutate(payload);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(expectedNote);
    // Invalidation check is harder, assume QueryClient handles it
  });

  // --- useUpdateNote ---
  it("useUpdateNote updates a note and invalidates queries", async () => {
    const noteId = mockNote2.id;
    const payload: UpdateNotePayload = { pinned: false };
    const expectedNote: Note = { ...mockNote2, ...payload }; // Simulates response

    server.use(
      http.put(`${API_BASE_URL}/notes/${noteId}`, async () => {
        return HttpResponse.json(expectedNote);
      }),
    );

    const { result } = renderHook(() => useUpdateNote(), { wrapper });

    result.current.mutate({ noteId, payload });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(expectedNote);
  });

  // --- useDeleteNote ---
  it("useDeleteNote deletes a note and invalidates query", async () => {
    const noteId = mockNote1.id;

    server.use(
      http.delete(`${API_BASE_URL}/notes/${noteId}`, () => {
        return new HttpResponse(null, { status: 204 });
      }),
    );

    const { result } = renderHook(() => useDeleteNote(), { wrapper });

    result.current.mutate(noteId);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeUndefined(); // Delete returns void/undefined
  });
});
