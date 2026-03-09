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
};

export const games: GameData[] = [
    {
        title: "Indigo Force",
        genre: "Action",
        platform: "PC",
        year: "2026",
        status: "In Development",
        description: "PC boss arena twin-stick shooter focused on fast boss fights.",
        fullDescription: "Fast-paced action prototype built around boss encounters, modular enemy systems, and stylized arenas. Focused on combat feel, readable attacks, and encounter pacing.",
        tags: ["PC", "Programming", "Design"],
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
        tags: ["Mobile", "Gameplay Programming", "UI Integration"],
        image: "/thumbnails/mad-kart-racing-thumbnail.webp",
        youtube: "https://www.youtube.com/embed/tY3SWgjkVto",
        cta: "Play",
        link: "https://play.google.com/store/apps/details?id=com.gamearound.metakartracers",
    },
    {
        title: "Fish and Hooks",
        genre: "Casual",
        platform: "Mobile",
        year: "2024",
        status: "Prototype",
        description: "Mobile fishing game built around timing, progression, and escalating difficulty.",
        fullDescription: "Arcade-style fishing game focused on timing mechanics and progressive difficulty, where players unlock new challenges and improve efficiency across runs.",
        tags: ["Mobile", "Programming", "Design"],
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
        video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        cta: "Play",
        link: "https://lordjneto.itch.io/fish-and-hooks",
    },
    {
        title: "TrollFall",
        genre: "VR Shooter",
        platform: "VR",
        year: "2026",
        status: "Prototype",
        description: "VR defense shooter where players protect a barricade from incoming trolls.",
        fullDescription: "Virtual reality shooting game where the player defends a barricade against waves of enemies. Focus on spatial awareness, aiming mechanics, and wave-based gameplay.",
        tags: ["VR", "Programming", "Combat"],
        image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=1200&q=80",
        video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        cta: "Play",
        link: "https://hugo-martins.itch.io/trollfall",
    },
];