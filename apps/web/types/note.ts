// apps/web/types/note.ts
export type Note = {
  id: string;
  title: string;
  content: string;
  pinned: boolean;
  color: string;
  createdAt?: string;
  updatedAt?: string;
  tags?: string[];
  isArchived?: boolean;
  isReminder?: boolean;
  reminderDateTime?: string;
};
