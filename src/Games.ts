export type GameData = {
    title: string;
    slug: string;
    genre: string;
    platform: string;
    year: string;
    status: string;
    quickDescription: string;
    fullDescription: string;
    role?: string;
    contributions?: string[];
    technicalHighlights?: string[];
    tags: string[];
    image: string;
    galleryPath: string;
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
        quickDescription: "Solo‑developed arena boss shooter built to explore tight combat feel and readable encounters.",
        fullDescription: "Personal project used to design boss encounters and experiment with scalable gameplay architecture. Built on my modular JNeto Game Entity Framework for reusable combat, entity, and gameplay systems.",
        role: "Solo Developer and Designer",
        contributions: [
            "Creation of a game entity framework",
            "Boss encounter and behaviour design",
            "Combat feedback and responsiveness",
            "Gameplay and VFX / SFX Integration",
        ],
        technicalHighlights: [
            "Modular enemy systems",
            "Readable attack telegraphs",
        ],
        tags: ["Boss Combat", "Encounter Design", "Action"],
        image: "/thumbnails/indigo-force-thumbnail.png",
        galleryPath: "indigo-force",
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
        quickDescription: "Online multiplayer kart racing game for mobile, focused on arcade and competitive play.",
        fullDescription: "First professional role at Gamearound, contributing to an online mobile kart racer. Worked on gameplay programming, VFX/SFX integration, C# tooling, and front‑end implementation of the in‑game store using backend purchase and currency APIs.",
        role: "Gameplay Programmer",
        contributions: [
            "C# Tooling (in-house tools)",
            "UI and store integration support",
            "Kart gameplay handling tuning",
            "Power-up logic and scaling",
        ],
        technicalHighlights: [
            "Arcade driving feel",
            "Store's back-end integration on UI",
        ],
        tags: ["Multiplayer", "Kart Handling", "Power-ups"],
        image: "/thumbnails/mad-kart-racing-thumbnail.webp",
        galleryPath: "mad-kart-racing",
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
        quickDescription: "VR defense shooter where players protect a barricade from incoming trolls.",
        fullDescription: "University VR project developed in a team of 5, focused on barricade defense against incoming waves of enemies. Implemented enemy systems, projectile combat, VR interactions, and performance optimizations to maintain stable VR frame rates.",        role: "Gameplay and VR Developer",
        contributions: [
            "Enemy and wave systems",
            "Projectile combat logic",
            "VR interaction mechanics",
            "Performance optimization for VR",
        ],
        technicalHighlights: [
            "VR aiming and interaction flow",
            "Wave escalation structure",
        ],
        tags: ["Wave Defense", "VR Interaction", "Combat"],
        image: "/thumbnails/trollfall-thumbnail.png",
        galleryPath: "trollfall",
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
        quickDescription: "Mobile fishing game built around timing, progression, and escalating difficulty.",
        fullDescription: "First mobile project developed in a team of 3. Implemented the core fishing mechanic, level structure, and designed the difficulty progression for this arcade-style game built around timing and increasingly challenging fish patterns.",
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
        galleryPath: "fish-and-hooks",
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
        quickDescription: "Puzzle adventure set across paradise-like islands that hide the truth about the player's sins.",
        fullDescription: "University puzzle‑adventure project developed in a team of 3, built around cutscene‑driven storytelling. Implemented systems including puzzles, inventory and crafting interactions, and early AI‑generated voice dialogue for narrative sequences.",
        role: "Gameplay Developer and Puzzle Designer",
        contributions: [
            "Puzzle gameplay systems",
            "Inventory and crafting mechanics",
            "Cutscene triggering and integration",
            "Gameplay interaction programming",
        ],
        technicalHighlights: [
            "Environmental puzzle structure",
            "Narrative clue progression",
        ],
        tags: ["Puzzle", "Cutscenes", "Interactive"],
        image: "/thumbnails/edens-path-thumbnail.png",
        galleryPath: "edens-path",
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
        quickDescription: "Fast-paced arcade game where players smash skeleton enemies and survive escalating waves.",
        fullDescription: "Game jam project developed in a team of 3, where I mentored two beginner developers. Players stop skeletons escaping the graveyard through waves, upgrades, and increasing difficulty.",
        role: "Gameplay Developer, Mentor and Designer",
        contributions: [
            "Mentoring junior teammates",
            "Combat and enemy systems",
            "Upgrade shop and progression",
            "Difficulty and wave balancing",
        ],
        technicalHighlights: [
            "Wave-based survival loop",
            "Upgrade-driven difficulty scaling",
        ],
        tags: ["Arcade", "Enemy Waves", "Action"],
        image: "/thumbnails/bone-breaker-thumbnail.png",
        galleryPath: "bone-breaker",
        youtube: "https://www.youtube.com/embed/6ZsHu2egLSw",
        cta: "Play",
        link: "https://sabrinasilvaart.itch.io/bone-breaker",
    },
];
