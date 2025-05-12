import type { Note } from "@repo/types";
import { AlertTriangle, Archive, Lock, LucideProps, Palette, Trash2 } from "lucide-react";
// apps/web/components/gothic/NoteCard.tsx
import React, { useState } from "react";
import { MoreVerticalIcon } from "./CustomIcons";
import { IconWrapper } from "./IconWrapper";

type NoteCardProps = {
  note: Note;
  onDelete: (id: string) => void;
  onPin: (id: string) => void;
  colors: Record<string, string>;
  theme: string;
};

export const NoteCard = ({ note, onDelete, onPin, colors, theme }: NoteCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative p-4 rounded-lg border ${note.color} ${colors.noteCardBorder} ${colors.noteCardHoverBorder} shadow-lg shadow-stone-950/30 transition-all duration-200 break-inside-avoid-column group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor:
          note.color ||
          (colors.bgBody === "bg-stone-950" ? "rgba(41, 37, 36, 0.7)" : "rgba(250, 240, 230, 0.8)"),
      }} // Use note.color or default
    >
      {note.title && (
        <h3
          className={`text-lg font-['EB_Garamond',_serif] font-semibold mb-2 ${colors.textPrimary} break-words`}
        >
          {note.title}
        </h3>
      )}
      <p
        className={`text-sm ${colors.textSecondary} whitespace-pre-wrap break-words leading-relaxed`}
      >
        {note.content}
      </p>

      <div
        className={`absolute -top-2 -right-2 transition-opacity duration-200 ${isHovered || note.pinned ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
      >
        <button
          type="button"
          onClick={() => onPin(note.id)}
          title={note.pinned ? "Unseal Scroll" : "Seal Scroll (Pin)"}
          className={`p-1.5 rounded-full ${note.pinned ? "bg-red-700 text-amber-100" : `${colors.iconColor} bg-stone-700/80 hover:bg-red-800 hover:text-amber-100`} transition-colors`}
        >
          <IconWrapper icon={Lock} size={14} />
        </button>
      </div>

      <div
        className={`mt-3 pt-2 border-t ${colors.borderSidebar} border-dashed transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
      >
        <div className="flex items-center justify-start space-x-1">
          {[Palette, AlertTriangle, Archive, Trash2, MoreVerticalIcon].map((Icon) => (
            <button
              type="button"
              key={Icon.name}
              onClick={Icon === Trash2 ? () => onDelete(note.id) : undefined}
              className={`p-1.5 rounded-full ${colors.iconColor} hover:text-red-400 transition-colors`}
            >
              <IconWrapper icon={Icon} size={16} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
