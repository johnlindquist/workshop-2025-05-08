#!/usr/bin/env bun
import path from "node:path";
import fs from "fs-extra";

const workspaceRoot = path.resolve(__dirname, "../");
const mockFilePath = path.join(workspaceRoot, "docs/mocks/gothic-mock.tsx");
const webAppDir = path.join(workspaceRoot, "apps/web");
const webAppPagePath = path.join(webAppDir, "app/page.tsx");
const gothicComponentsDir = path.join(webAppDir, "components/gothic");
const libDir = path.join(webAppDir, "lib");
const initialNotesPath = path.join(libDir, "initial-notes.ts");
const customIconsPath = path.join(gothicComponentsDir, "CustomIcons.tsx");
const typesDir = path.join(webAppDir, "types");
const noteTypePath = path.join(typesDir, "note.ts");

const log = (message: string, type: "info" | "error" | "success" = "info") => {
  const prefix =
    type === "error"
      ? "\x1b[31mERROR\x1b[0m"
      : type === "success"
        ? "\x1b[32mSUCCESS\x1b[0m"
        : "\x1b[34mINFO\x1b[0m";
  console.log(`[${prefix}] ${message}`);
};

async function main() {
  log("Starting gothic mock application script...");

  try {
    await fs.ensureDir(gothicComponentsDir);
    log(`Ensured directory exists: ${gothicComponentsDir}`);
    await fs.ensureDir(libDir);
    log(`Ensured directory exists: ${libDir}`);
    await fs.ensureDir(typesDir);
    log(`Ensured directory exists: ${typesDir}`);

    // Clean up
    if (await fs.pathExists(webAppPagePath)) await fs.remove(webAppPagePath);
    if (await fs.pathExists(gothicComponentsDir)) await fs.emptyDir(gothicComponentsDir);
    if (await fs.pathExists(initialNotesPath)) await fs.remove(initialNotesPath);
    if (await fs.pathExists(noteTypePath)) await fs.remove(noteTypePath);
    log("Cleaned up target directories and files.");

    const mockContent = await fs.readFile(mockFilePath, "utf-8");
    log("Read mock file.");

    // Placeholder for Note type
    const noteTypeContent =
      "// apps/web/types/note.ts\n" +
      "export type Note = {\n" +
      "  id: string;\n" +
      "  title: string;\n" +
      "  content: string;\n" +
      "  pinned: boolean;\n" +
      "  color: string;\n" +
      "  createdAt?: string;\n" +
      "  updatedAt?: string;\n" +
      "  tags?: string[];\n" +
      "  isArchived?: boolean;\n" +
      "  isReminder?: boolean;\n" +
      "  reminderDateTime?: string;\n" +
      "};\n";
    await fs.writeFile(noteTypePath, noteTypeContent);
    log(`Created placeholder Note type definition: ${noteTypePath}`);

    // --- Component Extraction and Writing ---
    // This will be added incrementally

    // InitialNotesData
    const initialNotesRegex = /const initialNotesData = ([\s\S]*?];)/;
    const initialNotesMatch = mockContent.match(initialNotesRegex);
    if (initialNotesMatch?.[1]) {
      const initialNotesDataContent = `// apps/web/lib/initial-notes.ts\nimport { Note } from '@/types/note';\n\nexport const initialNotesData: Note[] = ${initialNotesMatch[1]};\n`;
      await fs.writeFile(initialNotesPath, initialNotesDataContent);
      log(`Created initial notes data: ${initialNotesPath}`);
    } else {
      log("Could not extract initialNotesData.", "error");
    }

    // IconWrapper
    const iconWrapperRegex = /const IconWrapper = \([\s\S]*?\);\s*\n/;
    const iconWrapperMatch = mockContent.match(iconWrapperRegex);
    if (iconWrapperMatch?.[0]) {
      // Preserve backticks within className for JSX template literal
      const iconWrapperSource = iconWrapperMatch[0].replace(
        "<Icon size={size} className={`inline-block ${className}`} />",
        "<Icon size={size} className={`inline-block ${className}`} />",
      );
      const iconWrapperContent = `// apps/web/components/gothic/IconWrapper.tsx\nimport React from 'react';\nimport { LucideProps } from 'lucide-react';\n\ntype IconWrapperProps = {\n  icon: React.ElementType<LucideProps>;\n  size?: number;\n  className?: string;\n};\n\nexport ${iconWrapperSource}`; // iconWrapperSource already contains "const IconWrapper = ..."
      await fs.writeFile(path.join(gothicComponentsDir, "IconWrapper.tsx"), iconWrapperContent);
      log("Created IconWrapper.tsx");
    } else {
      log("Could not extract IconWrapper.", "error");
    }

    // NavItem
    const navItemRegex = /const NavItem = \([\s\S]*?\);\s*\n/;
    const navItemMatch = mockContent.match(navItemRegex);
    if (navItemMatch?.[0]) {
      const navItemSource = navItemMatch[0]
        .replace(/<a/g, '<button type="button"')
        .replace(/<\/a>/g, "</button>")
        .replace(/href="#"/g, "")
        .replace(
          /onClick=\{\(e\) => \{ e\.preventDefault\(\); onClick\(\); \}\}/g,
          "onClick={onClick}",
        );
      const navItemContent = `// apps/web/components/gothic/NavItem.tsx\nimport React from 'react';\nimport { LucideProps } from 'lucide-react';\nimport { IconWrapper } from './IconWrapper';\n\ntype NavItemProps = {\n  icon: React.ElementType<LucideProps>;\n  text: string;\n  isActive: boolean;\n  onClick: () => void;\n  colors: Record<string, string>;\n};\n\nexport ${navItemSource}`;
      await fs.writeFile(path.join(gothicComponentsDir, "NavItem.tsx"), navItemContent);
      log("Created NavItem.tsx");
    } else {
      log("Could not extract NavItem.", "error");
    }

    // CustomIcons
    const customIconsRegex =
      /\/\/\s*Custom Icons[\s\S]*?(\nconst MoreVerticalIcon[\s\S]*?\);\s*\n)(\nconst UndoIcon[\s\S]*?\);\s*\n)?(\nconst RedoIcon[\s\S]*?\);\s*\n)?/;
    const customIconsMatch = mockContent.match(customIconsRegex);
    let customIconsSource = "import React from 'react';\n\n";
    if (customIconsMatch) {
      customIconsSource += (customIconsMatch[1] || "").replace(
        /<svg (.*?)>/g,
        "<svg $1><title>More Options</title>",
      );
      customIconsSource += (customIconsMatch[2] || "").replace(
        /<svg (.*?)>/g,
        "<svg $1><title>Undo Action</title>",
      );
      customIconsSource += (customIconsMatch[3] || "").replace(
        /<svg (.*?)>/g,
        "<svg $1><title>Redo Action</title>",
      );
    }
    const customIconsFileContent = `// apps/web/components/gothic/CustomIcons.tsx\n${customIconsSource}`;
    await fs.writeFile(customIconsPath, customIconsFileContent);
    log("Created CustomIcons.tsx");

    // NoteCard
    const noteCardRegex = /const NoteCard = \([\s\S]*?\};\s*\n/;
    const noteCardMatch = mockContent.match(noteCardRegex);
    if (noteCardMatch?.[0]) {
      let noteCardSource = noteCardMatch[0];
      noteCardSource = noteCardSource.replace(
        /\(theme === 'dark' \?/,
        "(colors.bgBody === 'bg-stone-950' ?",
      );
      noteCardSource = noteCardSource.replace(
        /\{\[Palette, AlertTriangle, Archive, Trash2, MoreVerticalIcon\]\.map\(\(Icon, idx\) => \(/g,
        "{[ { icon: Palette, name: 'PaletteCardAction' }, { icon: AlertTriangle, name: 'AlertTriangleCardAction' }, { icon: Archive, name: 'ArchiveCardAction' }, { icon: Trash2, name: 'Trash2CardAction' }, { icon: MoreVerticalIcon, name: 'MoreCardAction' } ].map((item) => (",
      );
      noteCardSource = noteCardSource.replace(
        /<button key=\{idx\} onClick=\{Icon === Trash2 \? \(\) => onDelete\(note.id\) : null\}/g,
        '<button type="button" key={item.name} onClick={item.icon === Trash2 ? () => onDelete(note.id) : undefined}',
      );
      noteCardSource = noteCardSource.replace(
        /<IconWrapper icon=\{Icon\} size=\{16\} \/>/,
        "<IconWrapper icon={item.icon} size={16} />",
      );
      noteCardSource = noteCardSource.replace(
        /<button\s+onClick=\{\(\) => onPin\(note\.id\)\}/g,
        '<button type="button" onClick={() => onPin(note.id)}',
      );

      const noteCardContent = `// apps/web/components/gothic/NoteCard.tsx\nimport React, { useState } from 'react';\nimport { LucideProps, Palette, AlertTriangle, Archive, Trash2, Lock } from 'lucide-react';\nimport { IconWrapper } from './IconWrapper';\nimport { MoreVerticalIcon } from './CustomIcons';\nimport { Note } from '@/types/note';\n\ntype NoteCardProps = {\n  note: Note;\n  onDelete: (id: string) => void;\n  onPin: (id: string) => void;\n  colors: Record<string, string>; \n};\n\nexport ${noteCardSource}`;
      await fs.writeFile(path.join(gothicComponentsDir, "NoteCard.tsx"), noteCardContent);
      log("Created NoteCard.tsx");
    } else {
      log("Could not extract NoteCard.", "error");
    }

    // App Component (as page.tsx)
    const appComponentRegex = /function App\(\) \{[\s\S]*?export default App;/;
    const appComponentMatch = mockContent.match(appComponentRegex);
    if (appComponentMatch?.[0]) {
      let appSource = appComponentMatch[0];
      appSource = `'use client';\n\n${appSource}`;
      appSource = appSource.replace(/function App\(\)/, "export default function GothicPage()");
      appSource = appSource.replace(/export default App;/, "");

      appSource = appSource.replace(
        /import React, \{ useState, useEffect, useRef \} from 'react';/,
        "import React, { useState, useEffect, useRef, MouseEvent as ReactMouseEvent, ChangeEvent, FocusEvent, KeyboardEvent } from 'react';",
      );
      appSource = appSource.replace(
        /Menu, Search, RefreshCcw, Settings2, Grip, UserCircle,\s*Lightbulb, BellRing, Archive, Trash2, Edit3, CheckSquare,\s*Image as ImageIcon, Mic, Palette, AlertTriangle, X, Plus, Lock, BookOpen, Feather, Moon, Sun/,
        "Menu, Search, RefreshCcw, Settings2, UserCircle, BellRing, Archive, Trash2, Edit3, CheckSquare, Image as ImageIcon, Mic, Palette, Lock, BookOpen, Feather, Moon, Sun",
      );
      // For this complex replacement, using a string literal with backticks is okay as it's for the content being WRITTEN, not for log messages
      appSource = appSource.replace(
        /(\s*\}\s*from 'lucide-react';)/,
        `$1
import { IconWrapper } from '@/components/gothic/IconWrapper';
import { NavItem } from '@/components/gothic/NavItem';
import { NoteCard } from '@/components/gothic/NoteCard';
import { MoreVerticalIcon, UndoIcon, RedoIcon } from '@/components/gothic/CustomIcons';
import { initialNotesData } from '@/lib/initial-notes';
import { Note } from '@/types/note';`,
      );

      appSource = appSource.replace(
        /const takeNoteRef = useRef\(null\);/,
        "const takeNoteRef = useRef<HTMLDivElement>(null);",
      );
      appSource = appSource.replace(
        /\.sort\(\(a, b\) => \(b\.pinned - a\.pinned\)\);/,
        ".sort((a, b) => (b.pinned === a.pinned ? 0 : b.pinned ? -1 : 1));",
      );
      appSource = appSource.replace(/<button /g, '<button type="button" ');
      // This replacement also involves backticks FOR JSX, which is fine
      appSource = appSource.replace(
        /<li className=\{\`my-2 border-t \$\{currentThemeColors\.borderSidebar\}\`\}><\/li>/g,
        "<li className={`my-2 border-t ${currentThemeColors.borderSidebar}`} />",
      );
      appSource = appSource.replace(
        /(<div\s*className=\{\`flex justify-between items-center p-2 cursor-text \$\{currentThemeColors\.textSecondary\}\`\}\s*onClick=\{\(\) => setIsTakeNoteFocused\(true\)\}\s*>)/,
        '$1\n                                onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => { if (e.key === "Enter") setIsTakeNoteFocused(true); }}\n                                tabIndex={0}\n                                role="button"',
      );
      appSource = appSource.replace(/rows="3"/g, "rows={3}");
      appSource = appSource.replace(
        /autoFocus=\{isTakeNoteFocused && !newNoteTitle\}/g,
        "// autoFocus removed due to linting rule, consider alternative UX",
      );

      // This replacement involves backticks FOR a multi-line string for map, which is fine for generated code
      appSource = appSource.replace(
        /\{\[BellRing, Palette, ImageIcon, Archive, MoreVerticalIcon, UndoIcon, RedoIcon\]\.map\(\(Icon, idx\) => \(/g,
        `{[
                    { icon: BellRing, name: 'BellRingTakeNote' },
                    { icon: Palette, name: 'PaletteTakeNote' },
                    { icon: ImageIcon, name: 'ImageTakeNote' },
                    { icon: Archive, name: 'ArchiveTakeNote' },
                    { icon: MoreVerticalIcon, name: 'MoreTakeNote' },
                    { icon: UndoIcon, name: 'UndoTakeNote' },
                    { icon: RedoIcon, name: 'RedoTakeNote' }
                ].map((item) => (`,
      );
      appSource = appSource.replace(
        /<button type="button" {2}key=\{idx\}/g,
        '<button type="button" key={item.name}',
      );
      appSource = appSource.replace(
        /<IconWrapper icon=\{Icon\} size=\{18\} \/>/g,
        "<IconWrapper icon={item.icon} size={18} />",
      );

      appSource = appSource.replace(
        /useState\(initialNotesData\)/,
        "useState<Note[]>(initialNotesData)",
      );
      appSource = appSource.replace(/MouseEvent/g, "ReactMouseEvent");

      await fs.writeFile(webAppPagePath, appSource);
      log(`Created main page component: ${webAppPagePath}`);
    } else {
      log("Could not extract App component.", "error");
    }

    log("Script nearly completed. Final checks...", "success");
  } catch (error) {
    if (error instanceof Error) {
      log(`Script failed: ${error.message}`, "error");
      log(error.stack || "", "error");
    } else {
      log("Script failed with an unknown error.", "error");
    }
    process.exit(1);
  }
}

main();
