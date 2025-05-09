import type { MoreVerticalIcon } from "@/components/ui/custom-icons";
import { MoreVerticalIcon as MoreVerticalIconComponent } from "@/components/ui/custom-icons";
import IconWrapper from "@/components/ui/icon-wrapper";
import { AlertTriangle, Archive, Lock, Palette, Trash2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface Note {
  id: string;
  title: string;
  content: string;
  pinned: boolean;
  color?: string; // Make color optional as it has a fallback
}

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
  onPin: (id: string) => void;
  colors: Record<string, string>; // Consider a more specific type for colors
  theme: string;
}

// Note Card Component
const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete, onPin, colors, theme }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Determine background color: use note.color if available, otherwise fallback based on theme.
  const noteBackgroundColor =
    note.color || (theme === "dark" ? "bg-stone-800/70" : "bg-amber-100/80");

  const actionIcons: {
    name: string;
    icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;
  }[] = [
    { name: "Palette", icon: Palette },
    { name: "AlertTriangle", icon: AlertTriangle },
    { name: "Archive", icon: Archive },
    { name: "Trash2", icon: Trash2 },
    { name: "MoreVerticalIcon", icon: MoreVerticalIconComponent },
  ];

  return (
    <div
      className={`relative p-4 rounded-lg border ${colors.noteCardBorder} ${colors.noteCardHoverBorder} shadow-lg shadow-stone-950/30 transition-all duration-200 break-inside-avoid-column group ${noteBackgroundColor}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // Removed inline style for background color, using Tailwind class now
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
          {actionIcons.map(({ name, icon: Icon }) => (
            <button
              type="button"
              key={name}
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

export default NoteCard;
