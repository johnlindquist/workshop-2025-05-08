export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  pinned: boolean;
  color: string;
};

export const notes: Note[] = [
  {
    id: "1",
    title: "First mock note",
    content: "First mock note",
    createdAt: new Date().toISOString(),
    pinned: false,
    color: "bg-stone-800/70",
  },
  {
    id: "2",
    title: "Second mock note",
    content: "Second mock note",
    createdAt: new Date().toISOString(),
    pinned: false,
    color: "bg-stone-800/70",
  },
];
