import { type JSX } from "react";
import { useParams } from "react-router-dom";
import { games, type GameData } from "./Games.ts";

type GamePageProps = {
    onBack?: () => void;
};

function renderPlatformIcon(platform: string): JSX.Element | null {
    if (platform === "PC") {
        return (
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-zinc-100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="5" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 19H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 16V19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
    );
    }

    if (platform === "Mobile") {
        return (
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-zinc-100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="7" y="2.5" width="10" height="19" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10.5 5H13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="18" r="0.9" fill="currentColor" />
            </svg>
    );
    }

    if (platform === "VR") {
        return (
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-zinc-100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 9.5C4 7.84315 5.34315 6.5 7 6.5H17C18.6569 6.5 20 7.84315 20 9.5V13.2C20 14.8569 18.6569 16.2 17 16.2H14.3L12.7 13.9C12.3728 13.43 11.6272 13.43 11.3 13.9L9.7 16.2H7C5.34315 16.2 4 14.8569 4 13.2V9.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="8.5" cy="11.3" r="1.1" fill="currentColor" />
        <circle cx="15.5" cy="11.3" r="1.1" fill="currentColor" />
            </svg>
    );
    }

    return null;
}

function getStatusClasses(status: string): string {
    if (status === "Published") {
        return "border-emerald-400/30 bg-emerald-500/20 text-emerald-300";
    }

    if (status === "In Development") {
        return "border-amber-400/30 bg-amber-500/20 text-amber-300";
    }

    return "border-violet-400/30 bg-violet-500/20 text-violet-300";
}

export default function GameProjectPage({ onBack }: GamePageProps): JSX.Element {
    const { slug } = useParams();
    const game: GameData | undefined = games.find((g) => g.slug === slug);

    if (!game) {
        return (
            <div className="min-h-screen flex items-center justify-center text-zinc-400">
                Game not found
            </div>
        );
    }

    const contextText: string = game.projectContext ?? game.fullDescription;
    const roleText: string = game.role ?? "Game Developer";
    const contributions: string[] = game.contributions ?? [];
    const highlights: string[] = game.technicalHighlights ?? [];

    return (
        <div className="min-h-screen bg-[#060814] text-zinc-100">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
            {onBack ? (
                        <button
                            type="button"
                    onClick={onBack}
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                    >
                    Back
                    </button>
    ) : null}

    <p className="text-xs uppercase tracking-[0.28em] text-zinc-400">
        Project Page
    </p>
    </div>

    <a
    href={game.link}
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:brightness-110 active:scale-[0.98]"
        >
        {game.cta}
        </a>
        </div>

        <section className="overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,_rgba(255,255,255,0.04)_0%,_rgba(255,255,255,0.02)_100%)] shadow-2xl shadow-black/30">
    <div className="relative aspect-[16/7] overflow-hidden">
    <img
        src={game.image}
    alt={game.title}
    className="h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,8,20,0.08)_0%,rgba(6,8,20,0.26)_45%,rgba(6,8,20,0.92)_100%)]" />

    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
    <div className="min-w-0">
    <div className="mb-3 flex items-center gap-2">
        {renderPlatformIcon(game.platform)}
    <span className="text-sm uppercase tracking-[0.22em] text-zinc-300">
        {game.platform}
        </span>
        </div>

        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
        {game.title}
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-300 sm:text-lg">
        {game.description}
        </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3">
    <span className={`rounded-full border px-4 py-2 text-sm font-medium ${getStatusClasses(game.status)}`}>
    {game.status === "In Development" ? "In Dev" : game.status}
    </span>

    <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
        {game.genre}
        </span>

        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200">
        {game.year}
        </span>
        </div>
        </div>
        </div>
        </div>

        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)] lg:p-10">
    <div className="space-y-8">
    <section>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-300">
        About the Project
    </p>
    <p className="mt-4 max-w-4xl text-base leading-8 text-zinc-300">
    {contextText}
    </p>
    </section>

    <section>
    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-300">
        My Contributions
    </p>

    {contributions.length > 0 ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {contributions.map((item) => (
                    <div
                        key={item}
                className="rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm leading-6 text-zinc-200"
                    >
                    {item}
                    </div>
    ))}
        </div>
    ) : (
        <p className="mt-4 text-sm leading-7 text-zinc-400">
            Contribution details coming soon.
    </p>
    )}
    </section>

    <section>
    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-300">
        Gallery
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03]">
    <img
        src={game.image}
    alt={`${game.title} main screenshot`}
    className="aspect-[16/10] h-full w-full object-cover"
        />
        </div>

        <div className="flex min-h-[220px] items-center justify-center rounded-[24px] border border-dashed border-white/10 bg-white/[0.02] px-6 text-center text-sm leading-7 text-zinc-400">
        Additional screenshots can be added here later.
    </div>
    </div>
    </section>
    </div>

    <div className="space-y-6">
    <section className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-300">
        Role
        </p>
        <p className="mt-4 text-sm leading-7 text-zinc-200">
        {roleText}
        </p>
        </section>

        <section className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-300">
        Technical Highlights
    </p>

    {highlights.length > 0 ? (
        <div className="mt-4 space-y-3">
            {highlights.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm leading-7 text-zinc-300">
                <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-300" />
                    <span>{item}</span>
                    </div>
    ))}
        </div>
    ) : (
        <p className="mt-4 text-sm leading-7 text-zinc-400">
            Technical details coming soon.
    </p>
    )}
    </section>

    <section className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-300">
        Quick Info
    </p>

    <div className="mt-4 space-y-3 text-sm text-zinc-300">
    <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-3">
    <span className="text-zinc-400">Genre</span>
        <span>{game.genre}</span>
        </div>

        <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-3">
    <span className="text-zinc-400">Platform</span>
        <span>{game.platform}</span>
        </div>

        <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-3">
    <span className="text-zinc-400">Year</span>
        <span>{game.year}</span>
        </div>

        <div className="flex items-center justify-between gap-4">
    <span className="text-zinc-400">Status</span>
        <span>{game.status === "In Development" ? "In Dev" : game.status}</span>
        </div>
        </div>
        </section>
        </div>
        </div>
        </section>
        </div>
        </div>
);
}