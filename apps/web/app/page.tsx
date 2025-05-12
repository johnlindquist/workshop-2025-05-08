"use client";

import { MoreVerticalIcon, RedoIcon, UndoIcon } from "@/components/gothic/CustomIcons";
import { IconWrapper } from "@/components/gothic/IconWrapper";
import { NavItem } from "@/components/gothic/NavItem";
import { NoteCard } from "@/components/gothic/NoteCard";
import type { Note } from "@repo/types";
import {
  AlertTriangle,
  Archive,
  BellRing,
  BookOpen,
  CheckSquare,
  Edit3,
  Feather,
  Image as ImageIcon,
  Lock,
  Menu,
  Mic,
  Moon,
  Palette,
  RefreshCcw,
  Search,
  Settings2,
  Sun,
  Trash2,
  UserCircle,
} from "lucide-react";
import React, {
  useState,
  useEffect,
  useRef,
  MouseEvent as ReactMouseEvent,
  type ChangeEvent,
  FocusEvent,
  type KeyboardEvent,
} from "react";
import { useGetNotes, useCreateNote, useUpdateNote, useDeleteNote } from "@/hooks/use-notes";

export default function GothicPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeNavItem, setActiveNavItem] = useState("Notes");
  const [isTakeNoteFocused, setIsTakeNoteFocused] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState("dark"); // 'dark' or 'light' (though gothic is dark by nature)

  const takeNoteRef = useRef<HTMLDivElement>(null);

  // --- React Query Hooks for Notes ---
  const { data: notes = [], isLoading: isLoadingNotes, error: notesError } = useGetNotes();
  const createNoteMutation = useCreateNote();
  const updateNoteMutation = useUpdateNote();
  const deleteNoteMutation = useDeleteNote();
  // --- End React Query Hooks ---

  // Handle clicks outside the take note area to blur
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (takeNoteRef.current && !takeNoteRef.current.contains(event.target as Node)) {
        if (newNoteTitle || newNoteContent) {
          handleAddNote(); // Add note if there's content
        }
        setIsTakeNoteFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside as EventListener);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside as EventListener);
    };
  }, [newNoteTitle, newNoteContent]);

  const handleAddNote = () => {
    if (newNoteTitle.trim() === "" && newNoteContent.trim() === "") return;
    createNoteMutation.mutate(
      {
        title: newNoteTitle || "Untitled Scroll", // Default title
        content: newNoteContent,
        // pinned: false, // API will set defaults or handle this
        // color: "bg-stone-800/70", // API will set defaults or handle this
      },
      {
        onSuccess: () => {
          setNewNoteTitle("");
          setNewNoteContent("");
          // setIsTakeNoteFocused(false); // Optional: Keep focused
        },
        onError: (error) => {
          console.error("Failed to add note:", error);
          // TODO: Show user feedback, e.g., toast notification
        },
      },
    );
  };

  const handleDeleteNote = (id: string) => {
    deleteNoteMutation.mutate(id, {
      onError: (error) => {
        console.error("Failed to delete note:", error);
        // TODO: User feedback
      },
    });
  };

  const togglePinNote = (id: string) => {
    const noteToUpdate = notes.find((n) => n.id === id);
    if (!noteToUpdate) return;

    updateNoteMutation.mutate(
      {
        noteId: id,
        payload: { pinned: !noteToUpdate.pinned },
      },
      {
        onError: (error) => {
          console.error("Failed to pin note:", error);
          // TODO: User feedback
        },
      },
    );
  };

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  const filteredNotes = (notes || []) // Ensure notes is not undefined
    .filter(
      (note) =>
        note.title
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) || // title can be undefined
        note.content.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    // Pinned notes first, then by updatedAt (newest first) or createdAt if updatedAt is not available
    .sort((a, b) => {
      if (a.pinned !== b.pinned) {
        return a.pinned ? -1 : 1;
      }
      const dateA = new Date(a.updatedAt || a.createdAt).getTime();
      const dateB = new Date(b.updatedAt || b.createdAt).getTime();
      return dateB - dateA;
    });

  // Add Google Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const currentThemeColors = {
    bgBody: theme === "dark" ? "bg-stone-950" : "bg-amber-50",
    textPrimary: theme === "dark" ? "text-stone-200" : "text-stone-800",
    textSecondary: theme === "dark" ? "text-stone-400" : "text-stone-600",
    bgHeader:
      theme === "dark" ? "bg-stone-900/80 backdrop-blur-md" : "bg-amber-100/80 backdrop-blur-md",
    borderHeader: theme === "dark" ? "border-stone-700" : "border-amber-300",
    bgSidebar: theme === "dark" ? "bg-stone-900" : "bg-amber-100",
    borderSidebar: theme === "dark" ? "border-stone-700" : "border-amber-300",
    sidebarHover: theme === "dark" ? "hover:bg-stone-800" : "hover:bg-amber-200",
    sidebarActive: theme === "dark" ? "bg-red-900/70 text-red-100" : "bg-red-700 text-amber-50",
    iconColor: theme === "dark" ? "text-stone-400" : "text-stone-500",
    iconHover: theme === "dark" ? "hover:text-stone-100" : "hover:text-stone-900",
    searchBg: theme === "dark" ? "bg-stone-800/50" : "bg-amber-200/50",
    searchFocusBg: theme === "dark" ? "bg-stone-700/70" : "bg-amber-200/90",
    searchPlaceholder: theme === "dark" ? "placeholder-stone-500" : "placeholder-stone-400",
    takeNoteBg: theme === "dark" ? "bg-stone-900" : "bg-amber-100",
    takeNoteBorder: theme === "dark" ? "border-stone-700" : "border-amber-400",
    noteCardBg: theme === "dark" ? "bg-stone-800/70" : "bg-amber-100/80",
    noteCardBorder: theme === "dark" ? "border-stone-700/50" : "border-amber-300",
    noteCardHoverBorder: theme === "dark" ? "hover:border-red-700/70" : "hover:border-red-500/70",
    buttonBg:
      theme === "dark" ? "bg-stone-700 hover:bg-stone-600" : "bg-stone-600 hover:bg-stone-700",
    buttonText: theme === "dark" ? "text-stone-200" : "text-amber-50",
  };

  if (isLoadingNotes) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${currentThemeColors.bgBody} ${currentThemeColors.textPrimary}`}
      >
        Loading scrolls...
      </div>
    );
  }

  if (notesError) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${currentThemeColors.bgBody} text-red-500`}
      >
        Error fetching scrolls: {notesError.message}
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col h-screen font-['Crimson_Text',_serif] ${currentThemeColors.bgBody} ${currentThemeColors.textPrimary} overflow-hidden`}
    >
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-2 h-16 ${currentThemeColors.bgHeader} border-b ${currentThemeColors.borderHeader} shadow-lg shadow-stone-950/30`}
      >
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-3 rounded-full ${currentThemeColors.iconHover} ${currentThemeColors.iconColor} transition-colors`}
          >
            <IconWrapper icon={Menu} size={24} />
          </button>
          <IconWrapper icon={BookOpen} size={32} className="mx-2 text-red-700" />
          <h1 className="text-2xl font-['UnifrakturCook',_serif] text-red-500 select-none">
            Grimoire Scribe
          </h1>
        </div>

        <div className="flex-grow max-w-2xl mx-4">
          <form
            className={`flex items-center w-full h-10 ${currentThemeColors.searchBg} rounded-lg border border-transparent focus-within:border-red-700 focus-within:${currentThemeColors.searchFocusBg} transition-all`}
          >
            <button
              type="button"
              onClick={() => {
                /* Implement search logic if needed */
              }}
              className={`p-2 ${currentThemeColors.iconColor} ${currentThemeColors.iconHover}`}
            >
              <IconWrapper icon={Search} size={20} />
            </button>
            <input
              type="search"
              placeholder="Search thy scrolls..."
              className={`w-full h-full bg-transparent outline-none px-2 text-sm ${currentThemeColors.textPrimary} ${currentThemeColors.searchPlaceholder}`}
              value={searchTerm}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>

        <div className="flex items-center">
          <button
            type="button"
            className={`p-3 rounded-full ${currentThemeColors.iconHover} ${currentThemeColors.iconColor} transition-colors`}
          >
            <IconWrapper icon={RefreshCcw} size={20} />
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className={`p-3 rounded-full ${currentThemeColors.iconHover} ${currentThemeColors.iconColor} transition-colors`}
          >
            <IconWrapper icon={theme === "dark" ? Sun : Moon} size={20} />
          </button>
          <button
            type="button"
            className={`p-3 rounded-full ${currentThemeColors.iconHover} ${currentThemeColors.iconColor} transition-colors`}
          >
            <IconWrapper icon={Settings2} size={20} />
          </button>
          <button
            type="button"
            className={`p-2 rounded-full ${currentThemeColors.iconHover} ${currentThemeColors.iconColor} transition-colors ml-2`}
          >
            <UserCircle size={28} className="bg-stone-700 text-stone-500 rounded-full p-0.5" />
          </button>
        </div>
      </header>

      {/* Main Area */}
      <div className="flex flex-1 pt-16 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={` ${sidebarOpen ? "w-64" : "w-0"} transition-all duration-300 ease-in-out flex-shrink-0 ${currentThemeColors.bgSidebar} border-r ${currentThemeColors.borderSidebar} shadow-md shadow-stone-950/20 overflow-y-auto scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-stone-800/50`}
        >
          {sidebarOpen && (
            <nav className="p-2">
              <ul>
                {["Notes", "Reminders", "Archive", "Trash"].map((item) => (
                  <NavItem
                    key={item}
                    icon={
                      item === "Notes"
                        ? Feather
                        : item === "Reminders"
                          ? BellRing
                          : item === "Archive"
                            ? Archive
                            : Trash2
                    }
                    text={item}
                    isActive={activeNavItem === item}
                    onClick={() => setActiveNavItem(item)}
                    colors={currentThemeColors}
                  />
                ))}
                <li className={`my-2 border-t ${currentThemeColors.borderSidebar}`} />
                <NavItem
                  key="Edit Labels"
                  icon={Edit3}
                  text="Edit Glyphs"
                  isActive={activeNavItem === "Edit Glyphs"}
                  onClick={() => setActiveNavItem("Edit Glyphs")}
                  colors={currentThemeColors}
                />
              </ul>
              <div
                className={`mt-auto p-4 text-xs ${currentThemeColors.textSecondary} border-t ${currentThemeColors.borderSidebar}`}
              >
                <p>
                  &copy; {new Date().getFullYear()} Grimoire Scribe. All rights reserved to the
                  shadows.
                </p>
              </div>
            </nav>
          )}
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-transparent">
          <div
            ref={takeNoteRef}
            className={`max-w-xl mx-auto mb-8 p-3 md:p-4 rounded-lg ${currentThemeColors.takeNoteBg} border ${currentThemeColors.takeNoteBorder} shadow-xl shadow-stone-950/40 transition-all duration-200`}
          >
            {!isTakeNoteFocused && !newNoteTitle && !newNoteContent ? (
              <button
                type="button"
                className={`flex justify-between items-center p-2 w-full cursor-text ${currentThemeColors.textSecondary}`}
                onClick={() => setIsTakeNoteFocused(true)}
                onKeyDown={(e: KeyboardEvent) => {
                  if (e.key === "Enter") setIsTakeNoteFocused(true);
                }}
              >
                <span>Scribe a new enchantment...</span>
                <div className="flex space-x-2">
                  <IconWrapper icon={CheckSquare} className={currentThemeColors.iconColor} />
                  <IconWrapper icon={ImageIcon} className={currentThemeColors.iconColor} />
                  <IconWrapper icon={Mic} className={currentThemeColors.iconColor} />
                </div>
              </button>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder="Title of Thy Scroll"
                  className={`w-full bg-transparent outline-none p-2 mb-2 text-lg font-['EB_Garamond',_serif] font-semibold ${currentThemeColors.textPrimary} placeholder-stone-500`}
                  value={newNoteTitle}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setNewNoteTitle(e.target.value)}
                  onFocus={() => setIsTakeNoteFocused(true)}
                />
                <textarea
                  placeholder="Unleash thy thoughts here..."
                  rows={3}
                  className={`w-full bg-transparent outline-none p-2 text-sm resize-none scrollbar-thin scrollbar-thumb-stone-600 scrollbar-track-transparent ${currentThemeColors.textPrimary} placeholder-stone-500`}
                  value={newNoteContent}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setNewNoteContent(e.target.value)
                  }
                  onFocus={() => setIsTakeNoteFocused(true)}
                  // autoFocus removed due to linting rule, consider alternative UX // Auto-focus content if title is empty
                />
                <div className="flex justify-between items-center mt-3">
                  <div className="flex space-x-1">
                    {[
                      { icon: BellRing, name: "BellRingTakeNote" },
                      { icon: Palette, name: "PaletteTakeNote" },
                      { icon: ImageIcon, name: "ImageTakeNote" },
                      { icon: Archive, name: "ArchiveTakeNote" },
                      { icon: MoreVerticalIcon, name: "MoreTakeNote" },
                      { icon: CheckSquare, name: "CheckSquareTakeNote" },
                    ].map((item) => (
                      <button
                        type="button"
                        key={item.name}
                        className={`p-2 rounded-full ${currentThemeColors.iconColor} ${currentThemeColors.iconHover} transition-colors`}
                      >
                        <IconWrapper icon={item.icon} size={18} />
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={handleAddNote}
                    className={`px-6 py-2 rounded ${currentThemeColors.buttonBg} ${currentThemeColors.buttonText} text-sm font-semibold transition-colors`}
                  >
                    Seal Scroll
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Notes Grid */}
          {filteredNotes.length > 0 ? (
            <div className="pb-16">
              {filteredNotes.filter((n) => n.pinned).length > 0 && (
                <>
                  <h2
                    className={`text-xs ${currentThemeColors.textSecondary} uppercase font-semibold tracking-wider mb-3 ml-1`}
                  >
                    Sacred Texts
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                    {filteredNotes
                      .filter((note) => note.pinned)
                      .map((note) => (
                        <NoteCard
                          key={note.id}
                          note={note}
                          onDelete={() => handleDeleteNote(note.id)}
                          onPin={() => togglePinNote(note.id)}
                          colors={currentThemeColors}
                          theme={theme}
                        />
                      ))}
                  </div>
                </>
              )}
              {filteredNotes.filter((n) => !n.pinned).length > 0 && (
                <>
                  <h2
                    className={`text-xs ${currentThemeColors.textSecondary} uppercase font-semibold tracking-wider mb-3 ml-1`}
                  >
                    Common Scrolls
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredNotes
                      .filter((note) => !note.pinned)
                      .map((note) => (
                        <NoteCard
                          key={note.id}
                          note={note}
                          onDelete={() => handleDeleteNote(note.id)}
                          onPin={() => togglePinNote(note.id)}
                          colors={currentThemeColors}
                          theme={theme}
                        />
                      ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className={`text-center py-16 ${currentThemeColors.textSecondary}`}>
              <IconWrapper icon={Archive} size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">The archives are barren.</p>
              <p>No scrolls found matching thy query, or perhaps all have turned to dust.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
