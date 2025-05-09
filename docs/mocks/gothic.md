import React, { useState, useEffect, useRef } from 'react';
import {
    Menu, Search, RefreshCcw, Settings2, Grip, UserCircle,
    Lightbulb, BellRing, Archive, Trash2, Edit3, CheckSquare,
    Image as ImageIcon, Mic, Palette, AlertTriangle, X, Plus, Lock, BookOpen, Feather, Moon, Sun
} from 'lucide-react';

// Sample initial notes - feel free to expand or modify
const initialNotesData = [
    { id: '1', title: 'Incantations Vol. I', content: 'Whispers of the old gods, bound in shadow and ink. Remember the verse of summoning for the equinox.', pinned: true, color: 'bg-stone-800/70' },
    { id: '2', title: 'Alchemical Concoctions', content: 'The recipe for the Elixir of Night: moonshade, wolfsbane, and three drops of raven\'s tear. Handle with extreme caution.', pinned: false, color: 'bg-stone-800/70' },
    { id: '3', title: 'Cartography of Forgotten Realms', content: 'A map fragment depicting the Sunken City of Aethel. The path is treacherous, guarded by spectral sentinels.', pinned: false, color: 'bg-stone-800/70' },
    { id: '4', title: 'Prophecies of the Blood Moon', content: 'When the moon weeps crimson, the veil thins. The seventh son of a seventh son shall rise.', pinned: true, color: 'bg-red-900/50' },
    { id: '5', title: 'Herbalism - Darkwood Flora', content: 'Nightshade: potent sedative. Corpseflower: attracts spirits. Shadowmoss: thrives in places untouched by light.', pinned: false, color: 'bg-stone-800/70' },
];

// Helper component for icons
const IconWrapper = ({ icon: Icon, size = 20, className = "" }) => (
    <Icon size={size} className={`inline-block ${className}`} />
);

// Main App Component
function App() {
    const [notes, setNotes] = useState(initialNotesData);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeNavItem, setActiveNavItem] = useState('Notes');
    const [isTakeNoteFocused, setIsTakeNoteFocused] = useState(false);
    const [newNoteTitle, setNewNoteTitle] = useState('');
    const [newNoteContent, setNewNoteContent] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [theme, setTheme] = useState('dark'); // 'dark' or 'light' (though gothic is dark by nature)

    const takeNoteRef = useRef(null);

    // Handle clicks outside the take note area to blur
    useEffect(() => {
        function handleClickOutside(event) {
            if (takeNoteRef.current && !takeNoteRef.current.contains(event.target)) {
                if (newNoteTitle || newNoteContent) {
                    handleAddNote(); // Add note if there's content
                }
                setIsTakeNoteFocused(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [newNoteTitle, newNoteContent]);


    const handleAddNote = () => {
        if (newNoteTitle.trim() === '' && newNoteContent.trim() === '') return;
        const newNote = {
            id: Date.now().toString(),
            title: newNoteTitle || "Untitled Scroll",
            content: newNoteContent,
            pinned: false,
            color: 'bg-stone-800/70', // Default new note color
        };
        setNotes(prevNotes => [newNote, ...prevNotes]);
        setNewNoteTitle('');
        setNewNoteContent('');
        // setIsTakeNoteFocused(false); // Keep it focused if they want to add another quickly
    };

    const handleDeleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const togglePinNote = (id) => {
        setNotes(notes.map(note => note.id === id ? { ...note, pinned: !note.pinned } : note));
    };
    
    const toggleTheme = () => {
        setTheme(currentTheme => currentTheme === 'dark' ? 'light' : 'dark');
    }

    const filteredNotes = notes
        .filter(note =>
            note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.content.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => (b.pinned - a.pinned)); // Pinned notes first


    // Add Google Fonts
    useEffect(() => {
        const link = document.createElement('link');
        link.href = "https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap";
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        return () => {
            document.head.removeChild(link);
        }
    }, []);
    
    const currentThemeColors = {
        bgBody: theme === 'dark' ? 'bg-stone-950' : 'bg-amber-50',
        textPrimary: theme === 'dark' ? 'text-stone-200' : 'text-stone-800',
        textSecondary: theme === 'dark' ? 'text-stone-400' : 'text-stone-600',
        bgHeader: theme === 'dark' ? 'bg-stone-900/80 backdrop-blur-md' : 'bg-amber-100/80 backdrop-blur-md',
        borderHeader: theme === 'dark' ? 'border-stone-700' : 'border-amber-300',
        bgSidebar: theme === 'dark' ? 'bg-stone-900' : 'bg-amber-100',
        borderSidebar: theme === 'dark' ? 'border-stone-700' : 'border-amber-300',
        sidebarHover: theme === 'dark' ? 'hover:bg-stone-800' : 'hover:bg-amber-200',
        sidebarActive: theme === 'dark' ? 'bg-red-900/70 text-red-100' : 'bg-red-700 text-amber-50',
        iconColor: theme === 'dark' ? 'text-stone-400' : 'text-stone-500',
        iconHover: theme === 'dark' ? 'hover:text-stone-100' : 'hover:text-stone-900',
        searchBg: theme === 'dark' ? 'bg-stone-800/50' : 'bg-amber-200/50',
        searchFocusBg: theme === 'dark' ? 'bg-stone-700/70' : 'bg-amber-200/90',
        searchPlaceholder: theme === 'dark' ? 'placeholder-stone-500' : 'placeholder-stone-400',
        takeNoteBg: theme === 'dark' ? 'bg-stone-900' : 'bg-amber-100',
        takeNoteBorder: theme === 'dark' ? 'border-stone-700' : 'border-amber-400',
        noteCardBg: theme === 'dark' ? 'bg-stone-800/70' : 'bg-amber-100/80',
        noteCardBorder: theme === 'dark' ? 'border-stone-700/50' : 'border-amber-300',
        noteCardHoverBorder: theme === 'dark' ? 'hover:border-red-700/70' : 'hover:border-red-500/70',
        buttonBg: theme === 'dark' ? 'bg-stone-700 hover:bg-stone-600' : 'bg-stone-600 hover:bg-stone-700',
        buttonText: theme === 'dark' ? 'text-stone-200' : 'text-amber-50',
    };


    return (
        <div className={`flex flex-col h-screen font-['Crimson_Text',_serif] ${currentThemeColors.bgBody} ${currentThemeColors.textPrimary} overflow-hidden`}>
            {/* Header */}
            <header className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-2 h-16 ${currentThemeColors.bgHeader} border-b ${currentThemeColors.borderHeader} shadow-lg shadow-stone-950/30`}>
                <div className="flex items-center">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`p-3 rounded-full ${currentThemeColors.iconHover} ${currentThemeColors.iconColor} transition-colors`}>
                        <IconWrapper icon={Menu} size={24} />
                    </button>
                    <IconWrapper icon={BookOpen} size={32} className="mx-2 text-red-700" />
                    <h1 className="text-2xl font-['UnifrakturCook',_serif] text-red-500 select-none">Grimoire Scribe</h1>
                </div>

                <div className="flex-grow max-w-2xl mx-4">
                    <form className={`flex items-center w-full h-10 ${currentThemeColors.searchBg} rounded-lg border border-transparent focus-within:border-red-700 focus-within:${currentThemeColors.searchFocusBg} transition-all`}>
                        <button type="submit" className={`p-2 ${currentThemeColors.iconColor} ${currentThemeColors.iconHover}`}>
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
                    <button className={`p-3 rounded-full ${currentThemeColors.iconHover} ${currentThemeColors.iconColor} transition-colors`}>
                        <IconWrapper icon={RefreshCcw} size={20} />
                    </button>
                    <button onClick={toggleTheme} className={`p-3 rounded-full ${currentThemeColors.iconHover} ${currentThemeColors.iconColor} transition-colors`}>
                        <IconWrapper icon={theme === 'dark' ? Sun : Moon} size={20} />
                    </button>
                    <button className={`p-3 rounded-full ${currentThemeColors.iconHover} ${currentThemeColors.iconColor} transition-colors`}>
                        <IconWrapper icon={Settings2} size={20} />
                    </button>
                    <button className={`p-2 rounded-full ${currentThemeColors.iconHover} ${currentThemeColors.iconColor} transition-colors ml-2`}>
                        <UserCircle size={28} className="bg-stone-700 text-stone-500 rounded-full p-0.5" />
                    </button>
                </div>
            </header>

            {/* Main Area */}
            <div className="flex flex-1 pt-16 overflow-hidden">
                {/* Sidebar */}
                <aside className={` ${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 ease-in-out flex-shrink-0 ${currentThemeColors.bgSidebar} border-r ${currentThemeColors.borderSidebar} shadow-md shadow-stone-950/20 overflow-y-auto scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-stone-800/50`}>
                    {sidebarOpen && (
                        <nav className="p-2">
                            <ul>
                                {['Notes', 'Reminders', 'Archive', 'Trash'].map(item => (
                                    <NavItem
                                        key={item}
                                        icon={item === 'Notes' ? Feather : item === 'Reminders' ? BellRing : item === 'Archive' ? Archive : Trash2}
                                        text={item}
                                        isActive={activeNavItem === item}
                                        onClick={() => setActiveNavItem(item)}
                                        colors={currentThemeColors}
                                    />
                                ))}
                                <li className={`my-2 border-t ${currentThemeColors.borderSidebar}`}></li>
                                 <NavItem
                                    key="Edit Labels"
                                    icon={Edit3}
                                    text="Edit Glyphs"
                                    isActive={activeNavItem === "Edit Glyphs"}
                                    onClick={() => setActiveNavItem("Edit Glyphs")}
                                    colors={currentThemeColors}
                                />
                            </ul>
                            <div className={`mt-auto p-4 text-xs ${currentThemeColors.textSecondary} border-t ${currentThemeColors.borderSidebar}`}>
                                <p>&copy; {new Date().getFullYear()} Grimoire Scribe. All rights reserved to the shadows.</p>
                            </div>
                        </nav>
                    )}
                </aside>

                {/* Content Area */}
                <main className="flex-1 p-4 md:p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-transparent">
                    <div ref={takeNoteRef} className={`max-w-xl mx-auto mb-8 p-3 md:p-4 rounded-lg ${currentThemeColors.takeNoteBg} border ${currentThemeColors.takeNoteBorder} shadow-xl shadow-stone-950/40 transition-all duration-200`}>
                        {!isTakeNoteFocused && !newNoteTitle && !newNoteContent ? (
                            <div
                                className={`flex justify-between items-center p-2 cursor-text ${currentThemeColors.textSecondary}`}
                                onClick={() => setIsTakeNoteFocused(true)}
                            >
                                <span>Scribe a new enchantment...</span>
                                <div className="flex space-x-2">
                                    <IconWrapper icon={CheckSquare} className={currentThemeColors.iconColor} />
                                    <IconWrapper icon={ImageIcon} className={currentThemeColors.iconColor} />
                                    <IconWrapper icon={Mic} className={currentThemeColors.iconColor} />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <input
                                    type="text"
                                    placeholder="Title of Thy Scroll"
                                    className={`w-full bg-transparent outline-none p-2 mb-2 text-lg font-['EB_Garamond',_serif] font-semibold ${currentThemeColors.textPrimary} placeholder-stone-500`}
                                    value={newNoteTitle}
                                    onChange={(e) => setNewNoteTitle(e.target.value)}
                                    onFocus={() => setIsTakeNoteFocused(true)}
                                />
                                <textarea
                                    placeholder="Unleash thy thoughts here..."
                                    rows="3"
                                    className={`w-full bg-transparent outline-none p-2 text-sm resize-none scrollbar-thin scrollbar-thumb-stone-600 scrollbar-track-transparent ${currentThemeColors.textPrimary} placeholder-stone-500`}
                                    value={newNoteContent}
                                    onChange={(e) => setNewNoteContent(e.target.value)}
                                    onFocus={() => setIsTakeNoteFocused(true)}
                                    autoFocus={isTakeNoteFocused && !newNoteTitle} // Auto-focus content if title is empty
                                />
                                <div className="flex justify-between items-center mt-3">
                                    <div className="flex space-x-1">
                                        {[BellRing, Palette, ImageIcon, Archive, MoreVerticalIcon, UndoIcon, RedoIcon].map((Icon, idx) => (
                                            <button key={idx} className={`p-2 rounded-full ${currentThemeColors.iconColor} ${currentThemeColors.iconHover} transition-colors`}>
                                                <IconWrapper icon={Icon} size={18} />
                                            </button>
                                        ))}
                                    </div>
                                    <button
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
                            {filteredNotes.filter(n => n.pinned).length > 0 && (
                                <>
                                    <h2 className={`text-xs ${currentThemeColors.textSecondary} uppercase font-semibold tracking-wider mb-3 ml-1`}>Sacred Texts</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                                        {filteredNotes.filter(note => note.pinned).map(note => (
                                            <NoteCard key={note.id} note={note} onDelete={handleDeleteNote} onPin={togglePinNote} colors={currentThemeColors} />
                                        ))}
                                    </div>
                                </>
                            )}
                            {filteredNotes.filter(n => !n.pinned).length > 0 && (
                                <>
                                   <h2 className={`text-xs ${currentThemeColors.textSecondary} uppercase font-semibold tracking-wider mb-3 ml-1`}>Common Scrolls</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                        {filteredNotes.filter(note => !note.pinned).map(note => (
                                            <NoteCard key={note.id} note={note} onDelete={handleDeleteNote} onPin={togglePinNote} colors={currentThemeColors} />
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

// Sidebar Navigation Item Component
const NavItem = ({ icon: Icon, text, isActive, onClick, colors }) => (
    <li className="my-1">
        <a
            href="#"
            onClick={(e) => { e.preventDefault(); onClick(); }}
            className={`flex items-center py-3 px-4 rounded-r-full transition-all duration-200 ease-in-out group
                        ${isActive ? colors.sidebarActive : `${colors.textSecondary} ${colors.sidebarHover} hover:text-stone-100`}
                        font-['EB_Garamond',_serif] text-sm font-medium`}
        >
            <IconWrapper icon={Icon} size={20} className={`mr-5 transition-colors ${isActive ? 'text-red-200' : `${colors.iconColor} group-hover:text-stone-100`}`} />
            <span className="truncate">{text}</span>
        </a>
    </li>
);

// Note Card Component
const NoteCard = ({ note, onDelete, onPin, colors }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`relative p-4 rounded-lg border ${note.color} ${colors.noteCardBorder} ${colors.noteCardHoverBorder} shadow-lg shadow-stone-950/30 transition-all duration-200 break-inside-avoid-column group`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ backgroundColor: note.color || (theme === 'dark' ? 'rgba(41, 37, 36, 0.7)' : 'rgba(250, 240, 230, 0.8)') }} // Use note.color or default
        >
            {note.title && <h3 className={`text-lg font-['EB_Garamond',_serif] font-semibold mb-2 ${colors.textPrimary} break-words`}>{note.title}</h3>}
            <p className={`text-sm ${colors.textSecondary} whitespace-pre-wrap break-words leading-relaxed`}>{note.content}</p>

            <div className={`absolute -top-2 -right-2 transition-opacity duration-200 ${isHovered || note.pinned ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                <button
                    onClick={() => onPin(note.id)}
                    title={note.pinned ? "Unseal Scroll" : "Seal Scroll (Pin)"}
                    className={`p-1.5 rounded-full ${note.pinned ? 'bg-red-700 text-amber-100' : `${colors.iconColor} bg-stone-700/80 hover:bg-red-800 hover:text-amber-100`} transition-colors`}
                >
                    <IconWrapper icon={Lock} size={14} />
                </button>
            </div>

            <div className={`mt-3 pt-2 border-t ${colors.borderSidebar} border-dashed transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                <div className="flex items-center justify-start space-x-1">
                    {[Palette, AlertTriangle, Archive, Trash2, MoreVerticalIcon].map((Icon, idx) => (
                         <button key={idx} onClick={Icon === Trash2 ? () => onDelete(note.id) : null} className={`p-1.5 rounded-full ${colors.iconColor} hover:text-red-400 transition-colors`}>
                            <IconWrapper icon={Icon} size={16} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Custom Icons (if needed, Lucide has most)
const MoreVerticalIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
  </svg>
);
const UndoIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>
  </svg>
);
const RedoIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 0 9-9 9 9 0 0 0 6 2.3L21 13"/>
  </svg>
);


export default App;

