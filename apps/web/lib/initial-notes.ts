// apps/web/lib/initial-notes.ts
import type { Note } from "@/types/note";

export const initialNotesData: Note[] = [
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
