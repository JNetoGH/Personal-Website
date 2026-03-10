export type GameData = {
    title: string;
    genre: string;
    platform: string;
    year: string;
    status: string;
    description: string;
    fullDescription: string;
    tags: string[];
    image: string;
    cta: string;
    link: string;
    video?: string;
    youtube?: string;
    videoStartOffset?: number;
};

// defaults
// image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
// video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
export const games: GameData[] = [
    {
        title: "Indigo Force",
        genre: "Action",
        platform: "PC",
        year: "2026",
        status: "In Development",
        description: "PC boss arena twin-stick shooter focused on fast boss fights.",
        fullDescription: "Fast-paced action prototype built around boss encounters, modular enemy systems, and stylized arenas. Focused on combat feel, readable attacks, and encounter pacing.",
        tags: ["Boss Combat", "Encounter Design", "Action"],
        image: "/thumbnails/indigo-force-thumbnail.png",
        youtube: "https://www.youtube.com/embed/Ukafi9JuWig",
        cta: "Play",
        link: "https://lordjneto.itch.io/indigo-force-boss-demo",
    },
    {
        title: "Mad Kart Racing",
        genre: "Racing",
        platform: "Mobile",
        year: "2025",
        status: "Published",
        description: "Online multiplayer kart racing game for mobile, focused on arcade handling and competitive play.",
        fullDescription: "Online multiplayer kart racing game built with Unity for mobile. I contributed in gameplay systems, kart handling, VFX and power-up logic, plus UI and Azure-backed store integrations within a small agile team at Gamearound.",
        tags: ["Multiplayer", "Kart Handling", "Power-ups"],
        image: "/thumbnails/mad-kart-racing-thumbnail.webp",
        youtube: "https://www.youtube.com/embed/tY3SWgjkVto",
        cta: "Play",
        link: "https://play.google.com/store/apps/details?id=com.gamearound.metakartracers",
        videoStartOffset: 21,
    },
    {
        title: "TrollFall",
        genre: "VR Shooter",
        platform: "VR",
        year: "2026",
        status: "Prototype",
        description: "VR defense shooter where players protect a barricade from incoming trolls.",
        fullDescription: "Virtual reality shooting game where the player defends a barricade against waves of enemies. Focus on spatial awareness, aiming mechanics, and wave-based gameplay.",
        tags: ["Wave Defense", "VR Interaction", "Combat"],
        image: "/thumbnails/trollfall-thumbnail.png",
        youtube: "https://www.youtube.com/embed/CeyQQVBW4Ds",
        cta: "Play",
        link: "https://hugo-martins.itch.io/trollfall",
        videoStartOffset: 10,
    },
    {
        title: "Fish and Hooks",
        genre: "Casual",
        platform: "Mobile",
        year: "2024",
        status: "Published",
        description: "Mobile fishing game built around timing, progression, and escalating difficulty.",
        fullDescription: "Arcade-style fishing game focused on timing mechanics and progressive difficulty, where players unlock new challenges and improve efficiency across runs.",
        tags: ["Timing Mechanics", "Progression", "Arcade"],
        image: "/thumbnails/fish-and-hooks-thumbnail.png",
        youtube: "https://www.youtube.com/embed/vRhzqWo0sbk",
        cta: "Play",
        link: "https://lordjneto.itch.io/fish-and-hooks",
    },
    {
        title: "Eden's path",
        genre: "Puzzle adventure",
        platform: "PC",
        year: "2023",
        status: "Prototype",
        description: "Puzzle adventure set across paradise-like islands that hide the truth about the player's sins.",
        fullDescription: "Narrative puzzle adventure where the player explores peaceful islands that slowly reveal a darker truth. Each island presents environmental puzzles that uncover clues about the player's past sins, leading toward a final revelation.",
        tags: ["Puzzle", "Cutscenes", "Interactive"],
        image: "/thumbnails/edens-path-thumbnail.png",
        youtube: "https://www.youtube.com/embed/-C2r6jgz7z0",
        cta: "Play",
        link: "https://lordjneto.itch.io/edens-path",
        videoStartOffset: 5,
    },
    {
        title: "Placeholder Game 2",
        genre: "Adventure",
        platform: "Mobile",
        year: "2026",
        status: "Prototype",
        description: "Second placeholder project card for testing portfolio composition.",
        fullDescription: "Second placeholder project used to test spacing, balance, and presentation of additional portfolio items before replacing them with real games.",
        tags: ["Prototype", "UI", "Placeholder"],
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
        video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        cta: "Play",
        link: "#",
    },
];
