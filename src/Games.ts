export type GameData = {
    title: string;
    slug: string;
    genre: string;
    platform: string;
    year: string;
    status: string;
    description: string;
    fullDescription: string;
    projectContext?: string;
    role?: string;
    contributions?: string[];
    technicalHighlights?: string[];
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
        slug: "indigo-force",
        genre: "Action",
        platform: "PC",
        year: "2026",
        status: "In Development",
        description: "PC boss arena twin-stick shooter focused on fast boss fights.",
        fullDescription: "Fast-paced action prototype built around boss encounters, modular enemy systems, and stylized arenas. Focused on combat feel, readable attacks, and encounter pacing.",
        projectContext: "Solo action prototype focused on boss encounters, combat readability, and encounter pacing.",
        role: "Solo Developer and Designer",
        contributions: [
            "Gameplay programming",
            "Boss encounter design",
            "Combat feel and responsiveness design",
            "UI and feedback polish",
        ],
        technicalHighlights: [
            "Modular enemy systems",
            "Readable attack telegraphs",
        ],
        tags: ["Boss Combat", "Encounter Design", "Action"],
        image: "/thumbnails/indigo-force-thumbnail.png",
        youtube: "https://www.youtube.com/embed/Ukafi9JuWig",
        cta: "Play",
        link: "https://lordjneto.itch.io/indigo-force-boss-demo",
    },
    {
        title: "Mad Kart Racing",
        slug: "mad-kart-racing",
        genre: "Racing",
        platform: "Mobile",
        year: "2025",
        status: "Published",
        description: "Online multiplayer kart racing game for mobile, focused on arcade and competitive play.",
        fullDescription: "Online multiplayer kart racing game built with Unity for mobile. I contributed in gameplay systems, kart handling, VFX and power-up logic, plus UI and Azure-backed store integrations within a small agile team at Gamearound.",
        projectContext: "Mobile multiplayer kart racing project developed within a small team at Gamearound.",
        role: "Gameplay Programmer",
        contributions: [
            "C# Tooling",
            "UI and store integration support",
            "Kart handling tuning",
            "Power-up logic",
        ],
        technicalHighlights: [
            "Arcade driving feel",
            "Store's back-end integration on UI",
        ],
        tags: ["Multiplayer", "Kart Handling", "Power-ups"],
        image: "/thumbnails/mad-kart-racing-thumbnail.webp",
        youtube: "https://www.youtube.com/embed/tY3SWgjkVto",
        cta: "Play",
        link: "https://play.google.com/store/apps/details?id=com.gamearound.metakartracers",
        videoStartOffset: 21,
    },
    {
        title: "TrollFall",
        slug: "trollfall",
        genre: "VR Shooter",
        platform: "VR",
        year: "2026",
        status: "Prototype",
        description: "VR defense shooter where players protect a barricade from incoming trolls.",
        fullDescription: "Virtual reality shooting game where the player defends a barricade against waves of enemies. Focus on spatial awareness, aiming mechanics, and wave-based gameplay.",
        projectContext: "Prototype VR wave-defense experience centered on spatial awareness and barricade defense.",
        role: "Gameplay and VR Developer",
        contributions: [
            "VR gameplay implementation",
            "Wave-based combat design",
            "Enemy pressure balancing",
            "Interaction feel tuning",
        ],
        technicalHighlights: [
            "VR aiming and interaction flow",
            "Wave escalation structure",
        ],
        tags: ["Wave Defense", "VR Interaction", "Combat"],
        image: "/thumbnails/trollfall-thumbnail.png",
        youtube: "https://www.youtube.com/embed/CeyQQVBW4Ds",
        cta: "Play",
        link: "https://hugo-martins.itch.io/trollfall",
        videoStartOffset: 10,
    },
    {
        title: "Fish and Hooks",
        slug: "fish-and-hooks",
        genre: "Casual",
        platform: "Mobile",
        year: "2024",
        status: "Published",
        description: "Mobile fishing game built around timing, progression, and escalating difficulty.",
        fullDescription: "Arcade-style fishing game focused on timing mechanics and progressive difficulty, where players unlock new challenges and improve efficiency across runs.",
        projectContext: "Casual mobile fishing game built around timing, progression, and escalating challenge.",
        role: "Gameplay Developer",
        contributions: [
            "Core fishing loop implementation",
            "Timing mechanics tuning",
            "Progression structure",
            "Difficulty pacing",
        ],
        technicalHighlights: [
            "Timing-based gameplay loop",
            "Escalating challenge design",
        ],
        tags: ["Timing Mechanics", "Progression", "Arcade"],
        image: "/thumbnails/fish-and-hooks-thumbnail.png",
        youtube: "https://www.youtube.com/embed/vRhzqWo0sbk",
        cta: "Play",
        link: "https://lordjneto.itch.io/fish-and-hooks",
    },
    {
        title: "Eden's path",
        slug: "edens-path",
        genre: "Puzzle adventure",
        platform: "PC",
        year: "2023",
        status: "Prototype",
        description: "Puzzle adventure set across paradise-like islands that hide the truth about the player's sins.",
        fullDescription: "Narrative puzzle adventure where the player explores peaceful islands that slowly reveal a darker truth. Each island presents environmental puzzles that uncover clues about the player's past sins, leading toward a final revelation.",
        projectContext: "Narrative puzzle prototype built around environmental storytelling and gradual revelation.",
        role: "Gameplay Developer and Puzzle Designer",
        contributions: [
            "Puzzle flow design",
            "Narrative pacing support",
            "Environmental interaction setup",
            "Cutscene integration",
        ],
        technicalHighlights: [
            "Environmental puzzle structure",
            "Narrative clue progression",
        ],
        tags: ["Puzzle", "Cutscenes", "Interactive"],
        image: "/thumbnails/edens-path-thumbnail.png",
        youtube: "https://www.youtube.com/embed/-C2r6jgz7z0",
        cta: "Play",
        link: "https://lordjneto.itch.io/edens-path",
        videoStartOffset: 5,
    },
    {
        title: "Bone Breaker",
        slug: "bone-breaker",
        genre: "Arcade",
        platform: "PC",
        year: "2024",
        status: "Prototype",
        description: "Fast-paced arcade game where players smash skeleton enemies and survive escalating waves.",
        fullDescription: "Arcade-style action game focused on quick reactions and enemy-clearing gameplay. Players fight through waves of skeleton enemies, breaking bones and racking up points while trying to survive increasingly chaotic encounters.",
        projectContext: "Arcade prototype focused on fast reactions, enemy waves, and score-driven survival.",
        role: "Gameplay Developer",
        contributions: [
            "Enemy wave gameplay",
            "Combat pacing",
            "Arcade scoring flow",
            "Moment responsiveness",
        ],
        technicalHighlights: [
            "Wave-based survival loop",
            "Score-driven arcade progression",
        ],
        tags: ["Arcade", "Enemy Waves", "Action"],
        image: "/thumbnails/bone-breaker-thumbnail.png",
        youtube: "https://www.youtube.com/embed/6ZsHu2egLSw",
        cta: "Play",
        link: "https://sabrinasilvaart.itch.io/bone-breaker",
    },
];
