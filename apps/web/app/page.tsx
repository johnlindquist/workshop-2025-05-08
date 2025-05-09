"use client";
import {
  AlertTriangle,
  Archive,
  BellRing,
  BookOpen,
  CheckSquare,
  Edit3,
  Feather,
  Grip,
  Image as ImageIcon,
  Lightbulb,
  Lock,
  Menu,
  Mic,
  Moon,
  Palette,
  Plus,
  RefreshCcw,
  Search,
  Settings2,
  Sun,
  Trash2,
  UserCircle,
  X,
} from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

const initialNotesData = [
  {
    id: "1",
    title: "Incantations Vol. I",
    content:
      "Whispers of the old gods, bound in shadow and ink. Remember the verse of summoning for the equinox.",
    pinned: true,
    color: "bg-stone-800/70",
  },
  {
    id: "2",
    title: "Alchemical Concoctions",
    content:
      "The recipe for the Elixir of Night: moonshade, wolfsbane, and three drops of raven's tear. Handle with extreme caution.",
    pinned: false,
    color: "bg-stone-800/70",
  },
  {
    id: "3",
    title: "Cartography of Forgotten Realms",
    content:
      "A map fragment depicting the Sunken City of Aethel. The path is treacherous, guarded by spectral sentinels.",
    pinned: false,
    color: "bg-stone-800/70",
  },
  {
    id: "4",
    title: "Prophecies of the Blood Moon",
    content:
      "When the moon weeps crimson, the veil thins. The seventh son of a seventh son shall rise.",
    pinned: true,
    color: "bg-red-900/50",
  },
  {
    id: "5",
    title: "Herbalism - Darkwood Flora",
    content:
      "Nightshade: potent sedative. Corpseflower: attracts spirits. Shadowmoss: thrives in places untouched by light.",
    pinned: false,
    color: "bg-stone-800/70",
  },
];

// --- Types for props ---
type IconWrapperProps = { icon: React.ElementType; size?: number; className?: string };
type NavItemProps = {
  icon: React.ElementType;
  text: string;
  isActive: boolean;
  onClick: () => void;
  colors: Record<string, string>;
};

function IconWrapper({ icon: Icon, size = 20, className = "" }: IconWrapperProps) {
  return <Icon size={size} className={`inline-block ${className}`} />;
}

function NavItem({ icon, text, isActive, onClick, colors }: NavItemProps) {
  return (
    <li>
      <button
        type="button"
        className={`flex items-center w-full px-4 py-2 my-1 rounded-lg transition-colors duration-150 text-left gap-3 font-medium text-base ${isActive ? colors.sidebarActive : colors.sidebarHover}`}
        onClick={onClick}
      >
        <IconWrapper icon={icon} size={20} className="mr-2" />
        {text}
      </button>
    </li>
  );
}

const DEBUG_UI = typeof process !== "undefined" && process.env.NEXT_PUBLIC_DEBUG_UI === "true";

export default function App() {
  const [notes, setNotes] = useState(initialNotesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeNavItem, setActiveNavItem] = useState("Notes");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState("dark");
  const [isTakeNoteFocused, setIsTakeNoteFocused] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const takeNoteRef = useRef<HTMLDivElement>(null);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (takeNoteRef.current && !takeNoteRef.current.contains(event.target as Node)) {
        if (newNoteTitle || newNoteContent) handleAddNote();
        setIsTakeNoteFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [newNoteTitle, newNoteContent]);

  const handleAddNote = () => {
    if (newNoteTitle.trim() === "" && newNoteContent.trim() === "") return;
    const newNote = {
      id: Date.now().toString(),
      title: newNoteTitle || "Untitled Scroll",
      content: newNoteContent,
      pinned: false,
      color: "bg-stone-800/70",
    };
    setNotes((prev) => [newNote, ...prev]);
    setNewNoteTitle("");
    setNewNoteContent("");
  };

  const filteredNotes = notes
    .filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

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

  const handleTogglePin = (id: string) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));
    console.log("[Note] Pin toggle", { id });
  };

  const handleDelete = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    console.log("[Note] Delete", { id });
  };

  const handleStartEdit = (note: (typeof initialNotesData)[0]) => {
    setEditingNoteId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const handleSaveEdit = (id: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, title: editTitle, content: editContent } : n)),
    );
    setEditingNoteId(null);
    setEditTitle("");
    setEditContent("");
    console.log("[Note] Edit", { id, title: editTitle, content: editContent });
  };

  const handleCancelEdit = () => {
    setEditingNoteId(null);
    setEditTitle("");
    setEditContent("");
  };

  return (
    <div
      className={`flex flex-col h-screen font-['Crimson_Text',_serif] ${currentThemeColors.bgBody} ${currentThemeColors.textPrimary} overflow-hidden`}
    >
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-2 h-16 ${currentThemeColors.bgHeader} border-b ${currentThemeColors.borderHeader} shadow-lg shadow-stone-950/30 ${DEBUG_UI ? "border-4 border-yellow-500" : ""}`}
      >
        {DEBUG_UI && (
          <div className="absolute left-2 top-0 bg-yellow-500 text-black px-2 text-xs z-50">
            HEADER
          </div>
        )}
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
              className={`p-2 ${currentThemeColors.iconColor} ${currentThemeColors.iconHover}`}
            >
              <IconWrapper icon={Search} size={20} />
            </button>
            <input
              type="search"
              placeholder="Search thy scrolls..."
              className={`w-full h-full bg-transparent outline-none px-2 text-sm ${currentThemeColors.textPrimary} ${currentThemeColors.searchPlaceholder}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
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
          className={` ${sidebarOpen ? "w-64" : "w-0"} transition-all duration-300 ease-in-out flex-shrink-0 ${currentThemeColors.bgSidebar} border-r ${currentThemeColors.borderSidebar} shadow-md shadow-stone-950/20 overflow-y-auto scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-stone-800/50 ${DEBUG_UI ? "border-4 border-blue-500" : ""}`}
        >
          {DEBUG_UI && (
            <div className="absolute left-2 top-0 bg-blue-500 text-white px-2 text-xs z-50">
              SIDEBAR
            </div>
          )}
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
                <li />
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
        <main
          className={`flex-1 flex flex-col items-center px-8 py-8 overflow-y-auto ${DEBUG_UI ? "border-4 border-green-500" : ""}`}
        >
          {DEBUG_UI && (
            <div className="absolute left-2 top-0 bg-green-500 text-black px-2 text-xs z-50">
              MAIN
            </div>
          )}
          {/* Note Input Bar */}
          <div
            ref={takeNoteRef}
            className={`w-full max-w-2xl mb-8 rounded-xl border ${currentThemeColors.takeNoteBorder} ${currentThemeColors.takeNoteBg} shadow-lg p-6 transition-all ${isTakeNoteFocused ? "ring-2 ring-red-700" : ""} ${DEBUG_UI ? "border-4 border-pink-500 relative" : ""}`}
            onClick={() => setIsTakeNoteFocused(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (newNoteTitle || newNoteContent) handleAddNote();
                setIsTakeNoteFocused(false);
              }
            }}
          >
            {DEBUG_UI && (
              <div className="absolute left-2 top-0 bg-pink-500 text-black px-2 text-xs z-50">
                NOTE INPUT
              </div>
            )}
            <input
              className="w-full bg-transparent text-lg font-semibold outline-none mb-2 placeholder-stone-500"
              placeholder="Scribe a new enchantment..."
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              onFocus={() => setIsTakeNoteFocused(true)}
            />
            {isTakeNoteFocused && (
              <>
                <textarea
                  className="w-full bg-transparent outline-none resize-none min-h-[60px] mb-2 placeholder-stone-400"
                  placeholder="Whisper thy secrets..."
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  rows={2}
                />
                <div className="flex items-center gap-2 justify-end">
                  <button type="button" className="p-2" title="Checklist">
                    <CheckSquare size={18} />
                  </button>
                  <button type="button" className="p-2" title="Image">
                    <ImageIcon size={18} />
                  </button>
                  <button type="button" className="p-2" title="Mic">
                    <Mic size={18} />
                  </button>
                  <button
                    type="button"
                    className="ml-2 px-4 py-2 rounded-lg bg-red-900 text-red-100 font-semibold hover:bg-red-800 transition"
                    onClick={handleAddNote}
                  >
                    Add
                  </button>
                </div>
              </>
            )}
          </div>
          {/* Sectioned Notes */}
          <section
            className={`w-full max-w-6xl ${DEBUG_UI ? "border-4 border-purple-500 relative" : ""}`}
          >
            {DEBUG_UI && (
              <div className="absolute left-2 top-0 bg-purple-500 text-white px-2 text-xs z-50">
                NOTES SECTION
              </div>
            )}
            {/* Sacred Texts (Pinned) */}
            <h2 className="mb-2 text-xs tracking-widest text-stone-400 font-semibold">
              SACRED TEXTS
            </h2>
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 ${DEBUG_UI ? "border-2 border-orange-500 relative" : ""}`}
            >
              {DEBUG_UI && (
                <div className="absolute left-2 top-0 bg-orange-500 text-black px-2 text-xs z-50">
                  SACRED TEXTS GRID
                </div>
              )}
              {filteredNotes
                .filter((n) => n.pinned)
                .map((note) => (
                  <div
                    key={note.id}
                    className={`relative rounded-xl border-2 ${note.color} ${currentThemeColors.noteCardBorder} ${currentThemeColors.noteCardHoverBorder} p-6 shadow-lg transition-all ${DEBUG_UI ? "border-4 border-red-500" : ""}`}
                  >
                    {DEBUG_UI && (
                      <div className="absolute left-2 top-0 bg-red-500 text-white px-2 text-xs z-50">
                        NOTE CARD
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-700 text-white mr-1"
                        title="Unpin"
                        onClick={() => handleTogglePin(note.id)}
                      >
                        <Lock size={16} />
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-stone-800 text-stone-300 border border-stone-700"
                        title="Delete"
                        onClick={() => handleDelete(note.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-stone-800 text-stone-300 border border-stone-700"
                        title="Edit"
                        onClick={() => handleStartEdit(note)}
                      >
                        <Edit3 size={16} />
                      </button>
                    </div>
                    {editingNoteId === note.id ? (
                      <>
                        <input
                          className="w-full bg-transparent text-lg font-bold outline-none mb-2 font-['EB_Garamond',_serif]"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <textarea
                          className="w-full bg-transparent outline-none resize-none min-h-[60px] mb-2 font-['Crimson_Text',_serif]"
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          rows={2}
                        />
                        <div className="flex gap-2 justify-end">
                          <button
                            type="button"
                            className="px-3 py-1 rounded bg-green-700 text-white"
                            onClick={() => handleSaveEdit(note.id)}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className="px-3 py-1 rounded bg-gray-700 text-white"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="font-bold text-lg mb-2 font-['EB_Garamond',_serif]">
                          {note.title}
                        </div>
                        <div className="text-stone-300 text-sm font-['Crimson_Text',_serif]">
                          {note.content}
                        </div>
                      </>
                    )}
                  </div>
                ))}
            </div>
            {/* Common Scrolls (Unpinned) */}
            <h2 className="mb-2 text-xs tracking-widest text-stone-400 font-semibold">
              COMMON SCROLLS
            </h2>
            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${DEBUG_UI ? "border-2 border-cyan-500 relative" : ""}`}
            >
              {DEBUG_UI && (
                <div className="absolute left-2 top-0 bg-cyan-500 text-black px-2 text-xs z-50">
                  COMMON SCROLLS GRID
                </div>
              )}
              {filteredNotes
                .filter((n) => !n.pinned)
                .map((note) => (
                  <div
                    key={note.id}
                    className={`relative rounded-xl border-2 ${note.color} ${currentThemeColors.noteCardBorder} ${currentThemeColors.noteCardHoverBorder} p-6 shadow-lg transition-all ${DEBUG_UI ? "border-4 border-lime-500" : ""}`}
                  >
                    {DEBUG_UI && (
                      <div className="absolute left-2 top-0 bg-lime-500 text-black px-2 text-xs z-50">
                        NOTE CARD
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-stone-800 text-stone-300 border border-stone-700"
                        title="Pin"
                        onClick={() => handleTogglePin(note.id)}
                      >
                        <Feather size={16} />
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-stone-800 text-stone-300 border border-stone-700"
                        title="Delete"
                        onClick={() => handleDelete(note.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-stone-800 text-stone-300 border border-stone-700"
                        title="Edit"
                        onClick={() => handleStartEdit(note)}
                      >
                        <Edit3 size={16} />
                      </button>
                    </div>
                    {editingNoteId === note.id ? (
                      <>
                        <input
                          className="w-full bg-transparent text-lg font-bold outline-none mb-2 font-['EB_Garamond',_serif]"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <textarea
                          className="w-full bg-transparent outline-none resize-none min-h-[60px] mb-2 font-['Crimson_Text',_serif]"
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          rows={2}
                        />
                        <div className="flex gap-2 justify-end">
                          <button
                            type="button"
                            className="px-3 py-1 rounded bg-green-700 text-white"
                            onClick={() => handleSaveEdit(note.id)}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className="px-3 py-1 rounded bg-gray-700 text-white"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="font-bold text-lg mb-2 font-['EB_Garamond',_serif]">
                          {note.title}
                        </div>
                        <div className="text-stone-300 text-sm font-['Crimson_Text',_serif]">
                          {note.content}
                        </div>
                      </>
                    )}
                  </div>
                ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
