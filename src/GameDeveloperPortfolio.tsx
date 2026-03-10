import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { games, type GameData } from "./Games.ts";

// PAGE SETTINGS
const HEADER_OPACITY_BLUR_PERCENT = 85;
const HEADER_VERTICAL_PADDING = "py-3";
const FOOTER_VERTICAL_PADDING = "py-6";

const SECTION_VERTICAL_PADDING = "py-16";
const SECTION_DISPLAY_ANIMATION_DURATION = "2000ms";
const SECTION_ANIMATION_HIDDEN_STATE = "translate-y-20 opacity-0";
const PLAY_VIDEO_PREVIEW_MOBILE_HEIGHT_PERCENT = 50;

const CONTROLLER_CLIPART_SIZE_PX = 100;
const CONTROLLER_CLIPART_OFFSET_X_DESKTOP_PX = -80;
const CONTROLLER_CLIPART_OFFSET_X_MOBILE_PX = 120;

const MOBILE_VISIBLE_GAMES_COUNT: number = 4;

// TYPING EFFECT
type ProfileSuffix = {
  text: string;
  highlight: boolean;
};
const PROFILE_TYPING_SUFFIXES: ProfileSuffix[] = [
  { text: "s...", highlight: false },
  { text: " experiences", highlight: true }
];
const PROFILE_TYPING_SPEED_MS = 60;
const PROFILE_BACKSPACE_SPEED_MS = 30;
const PROFILE_PAUSE_AFTER_WORD_MS = 2000;

type SkillItem = {
  label: string;
  starred?: boolean;
};

const technologies: SkillItem[] = [
  { label: "Unity", starred: true },
  { label: "C#", starred: true },
  { label: "Netcode" },
  { label: "Azure PlayFab", starred: true },
  { label: "C++" },
  { label: "Git" , starred: true },
  { label: "Python" },
  { label: "HTML / CSS" },
  { label: "React" },
  { label: "JavaScript" },
  { label: "TypeScript" },
];

const concepts: SkillItem[] = [
  { label: "PC ", starred: true },
  { label: "Mobile", starred: true },
  { label: "Virtual Reality"},
  { label: "UX / UI", starred: true},
  { label: "Multiplayer"},
  { label: "Agile Methods" },
  { label: "Game Design", starred: true },
  { label: "Level Design", starred: true },
  // { label: "Prototyping" },
  { label: "Optimization" },
];

function getYoutubeHoverSrc(url: string, offset?: number): string {
  let videoId: string | null = null;

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      videoId = parsed.pathname.replace("/", "");
    } else if (parsed.pathname.includes("/embed/")) {
      videoId = parsed.pathname.split("/embed/")[1];
    } else if (parsed.searchParams.has("v")) {
      videoId = parsed.searchParams.get("v");
    }
  } catch {
    return url;
  }

  if (!videoId) {
    return url;
  }

  const start = offset ?? 0;

  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0&playsinline=1&start=${start}`;
}

function getYoutubeModalSrc(url: string, offset?: number): string {
  const separator = url.includes("?") ? "&" : "?";
  const start = offset ?? 0;
  return `${url}${separator}start=${start}`;
}

function renderSkillStar(): React.JSX.Element {
  return (
      <span className="skill-star" aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12 3.8L14.25 8.36L19.28 9.09L15.64 12.63L16.5 17.62L12 15.25L7.5 17.62L8.36 12.63L4.72 9.09L9.75 8.36L12 3.8Z"
            fill="url(#skillStarGradient)"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="1.1"
            strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="skillStarGradient" x1="6" y1="4" x2="18" y2="18" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F5D0FE" />
            <stop offset="0.45" stopColor="#C084FC" />
            <stop offset="1" stopColor="#818CF8" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}

function renderPlatformIcon(platform: string): React.JSX.Element | null {
  if (platform === "PC") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-zinc-100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="5" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M9 19H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M12 16V19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    );
  }

  if (platform === "Mobile") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-zinc-100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="7" y="2.5" width="10" height="19" rx="2.5" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M10.5 5H13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="12" cy="18" r="0.9" fill="currentColor"/>
      </svg>
    );
  }

  if (platform === "VR") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-zinc-100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 9.5C4 7.84315 5.34315 6.5 7 6.5H17C18.6569 6.5 20 7.84315 20 9.5V13.2C20 14.8569 18.6569 16.2 17 16.2H14.3L12.7 13.9C12.3728 13.43 11.6272 13.43 11.3 13.9L9.7 16.2H7C5.34315 16.2 4 14.8569 4 13.2V9.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <circle cx="8.5" cy="11.3" r="1.1" fill="currentColor"/>
        <circle cx="15.5" cy="11.3" r="1.1" fill="currentColor"/>
      </svg>
    );
  }

  return null;
}

export default function GameDeveloperPortfolio() {

  const [selectedGame, setSelectedGame] = useState<GameData | null>(null);
  const [activeMobilePreview, setActiveMobilePreview] = useState<string | null>(null);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const [profileReady, setProfileReady] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("profile");
  const [profileSuffixIndex, setProfileSuffixIndex] = useState<number>(0);
  const [profileTypedLength, setProfileTypedLength] = useState<number>(0);
  const [profileDeleting, setProfileDeleting] = useState<boolean>(false);
  const [showAllGamesMobile, setShowAllGamesMobile] = useState<boolean>(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const gameCardRefs = useRef<Array<HTMLElement | null>>([]);
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  useLayoutEffect(() => {
    const updateHeaderHeight = () => {
      const nextHeight = headerRef.current?.offsetHeight ?? 0;
      setHeaderHeight((previous) => (previous === nextHeight ? previous : nextHeight));
    };

    updateHeaderHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeaderHeight();
    });

    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    window.addEventListener("resize", updateHeaderHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  useEffect(() => {
    if (selectedGame) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedGame]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const root = document.getElementById("root");

    const previousHtmlBackground = html.style.background;
    const previousBodyBackground = body.style.background;
    const previousRootBackground = root?.style.background ?? "";
    const previousHtmlMinHeight = html.style.minHeight;
    const previousBodyMinHeight = body.style.minHeight;
    const previousRootMinHeight = root?.style.minHeight ?? "";

    html.style.background = "#060814";
    body.style.background = "#060814";
    html.style.minHeight = "100%";
    body.style.minHeight = "100%";

    if (root) {
      root.style.background = "#060814";
      root.style.minHeight = "100%";
    }

    return () => {
      html.style.background = previousHtmlBackground;
      body.style.background = previousBodyBackground;
      html.style.minHeight = previousHtmlMinHeight;
      body.style.minHeight = previousBodyMinHeight;

      if (root) {
        root.style.background = previousRootBackground;
        root.style.minHeight = previousRootMinHeight;
      }
    };
  }, []);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "JNeto Website";

    return () => {
      document.title = previousTitle;
    };
  }, []);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "JNeto Website";

    const existingFavicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    const favicon = existingFavicon ?? document.createElement("link");

    favicon.rel = "icon";
    favicon.type = "image/png";
    favicon.href = "/favicon.png";

    const existingNoTranslateMeta = document.querySelector<HTMLMetaElement>('meta[name="google"][content="notranslate"]');
    const noTranslateMeta = existingNoTranslateMeta ?? document.createElement("meta");

    noTranslateMeta.setAttribute("name", "google");
    noTranslateMeta.setAttribute("content", "notranslate");

    if (!existingNoTranslateMeta) {
      document.head.appendChild(noTranslateMeta);
    }

    if (!existingFavicon) {
      document.head.appendChild(favicon);
    }

    return () => {
      document.title = previousTitle;

      if (!existingNoTranslateMeta && noTranslateMeta.parentNode) {
        noTranslateMeta.parentNode.removeChild(noTranslateMeta);
      }
    };
  }, []);

  useEffect(() => {
    const updateMobilePreview = () => {
      if (window.innerWidth >= 640) {
        setActiveMobilePreview(null);
        return;
      }

      const cards: HTMLElement[] = Array.from(
        document.querySelectorAll<HTMLElement>("[data-preview-card]")
      );

      if (cards.length === 0) {
        setActiveMobilePreview(null);
        return;
      }

      const viewportCenter: number =
        window.innerHeight * (1 - PLAY_VIDEO_PREVIEW_MOBILE_HEIGHT_PERCENT / 100);
      let closestId: string | null = null;
      let closestDistance: number = Number.POSITIVE_INFINITY;

      cards.forEach((card) => {
        const rect: DOMRect = card.getBoundingClientRect();
        const cardCenter: number = rect.top + rect.height * 0.5;
        const distance: number = Math.abs(cardCenter - viewportCenter);
        const isVisible: boolean = rect.bottom > 80 && rect.top < window.innerHeight - 80;

        if (isVisible && distance < closestDistance) {
          closestDistance = distance;
          closestId = card.dataset.previewCard ?? null;
        }
      });

      if (closestDistance > 180) {
        setActiveMobilePreview(null);
        return;
      }

      setActiveMobilePreview((previous) => (previous === closestId ? previous : closestId));
    };

    updateMobilePreview();

    window.addEventListener("scroll", updateMobilePreview, { passive: true });
    window.addEventListener("resize", updateMobilePreview);

    return () => {
      window.removeEventListener("scroll", updateMobilePreview);
      window.removeEventListener("resize", updateMobilePreview);
    };
  }, []);

  useEffect(() => {
    const timeoutId: number = window.setTimeout(() => {
      setProfileReady(true);
    }, 120);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const currentWord: string = PROFILE_TYPING_SUFFIXES[profileSuffixIndex].text;

    let timeoutId: number;

    if (!profileDeleting) {
      if (profileTypedLength < currentWord.length) {
        timeoutId = window.setTimeout(() => {
          setProfileTypedLength((v) => v + 1);
        }, PROFILE_TYPING_SPEED_MS);
      } else {
        timeoutId = window.setTimeout(() => {
          setProfileDeleting(true);
        }, PROFILE_PAUSE_AFTER_WORD_MS);
      }
    } else {
      if (profileTypedLength > 0) {
        timeoutId = window.setTimeout(() => {
          setProfileTypedLength((v) => v - 1);
        }, PROFILE_BACKSPACE_SPEED_MS);
      } else {
        timeoutId = window.setTimeout(() => {
          setProfileDeleting(false);
          setProfileSuffixIndex((i) => (i + 1) % PROFILE_TYPING_SUFFIXES.length);
        }, 0);
      }
    }

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [profileTypedLength, profileDeleting, profileSuffixIndex]);


  useEffect(() => {
    const sectionIds: string[] = ["games", "skills", "contact"];

    const observer: IntersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id: string = entry.target.id;

            setVisibleSections((previous) => {
              if (previous[id]) {
                return previous;
              }

              return { ...previous, [id]: true };
            });

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    sectionIds.forEach((id) => {
      const element: HTMLElement | null = document.getElementById(id);

      if (!element) {
        return;
      }

      const rect: DOMRect = element.getBoundingClientRect();
      const alreadyVisible: boolean = rect.top < window.innerHeight * 0.9;

      if (alreadyVisible) {
        setVisibleSections((previous) => ({ ...previous, [id]: true }));
        return;
      }

      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const sectionIds: string[] = ["profile", "games", "skills", "contact"];

    const updateActiveSection = () => {
      const viewportHeight: number = window.innerHeight;
      let bestSection: string = "profile";
      let bestVisibleRatio: number = 0;

      sectionIds.forEach((id) => {
        const element: HTMLElement | null = document.getElementById(id);

        if (!element) {
          return;
        }

        const rect: DOMRect = element.getBoundingClientRect();
        const visibleTop: number = Math.max(rect.top, 0);
        const visibleBottom: number = Math.min(rect.bottom, viewportHeight);
        const visibleHeight: number = Math.max(0, visibleBottom - visibleTop);
        const visibleRatio: number = visibleHeight / viewportHeight;

        if (visibleRatio > bestVisibleRatio) {
          bestVisibleRatio = visibleRatio;
          bestSection = id;
        }
      });

      if (bestVisibleRatio >= 0.51) {
        setActiveSection((previous) => (previous === bestSection ? previous : bestSection));
        return;
      }

      setActiveSection((previous) => (previous === bestSection ? previous : bestSection));
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const scrollTo = (id: string) => {
    const element: HTMLElement | null = document.getElementById(id);

    if (!element) {
      return;
    }

    const elementTop: number = element.getBoundingClientRect().top + window.scrollY;
    const targetTop: number = Math.max(0, elementTop - headerHeight);

    window.scrollTo({
      top: targetTop,
      behavior: "smooth"
    });
  };

  const MOBILE_COLLAPSE_SCROLL_INDEX: number = MOBILE_VISIBLE_GAMES_COUNT - 1;
  const visibleGames: GameData[] = showAllGamesMobile || window.innerWidth >= 640
    ? games
    : games.slice(0, MOBILE_VISIBLE_GAMES_COUNT);

  const handleToggleGamesMobile = () => {
    if (showAllGamesMobile) {
      const targetCard = gameCardRefs.current[MOBILE_COLLAPSE_SCROLL_INDEX];

      setShowAllGamesMobile(false);

      window.setTimeout(() => {
        if (!targetCard) {
          return;
        }

        const targetTop = targetCard.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: "smooth"
        });
      }, 50);

      return;
    }

    setShowAllGamesMobile(true);
  };

  return (
      <div
        translate="no"
        className="notranslate min-h-screen overflow-x-hidden bg-[#060814] text-zinc-100 selection:bg-violet-300/30 selection:text-white"
      >
        <header
          ref={headerRef}
          className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-md transition-all duration-500"
          style={{
            backgroundColor: `rgba(6,8,20,${HEADER_OPACITY_BLUR_PERCENT / 100})`
          }}
        >
          <div className={`mx-auto flex max-w-7xl flex-col items-start gap-3 px-6 ${HEADER_VERTICAL_PADDING} md:flex-row md:items-center md:justify-between lg:px-8`}>
            <div>
              <div className="flex items-baseline gap-2 md:hidden">
                <h1 className="text-xl font-semibold tracking-tight">JNeto</h1>
                <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-400">
                  Game Developer Portfolio
                </p>
              </div>

              <div className="hidden md:block">
                <p className="text-xs uppercase tracking-[0.28em] text-zinc-400">
                  Game Developer Portfolio
                </p>
                <h1 className="text-xl font-semibold tracking-tight">JNeto (João Neto)</h1>
              </div>
            </div>

            <nav className="flex flex-wrap gap-4 text-sm text-zinc-300 md:gap-6">
              <button
                type="button"
                onClick={() => scrollTo("profile")}
                className={`flex flex-col items-center leading-none transition ${activeSection === "profile" ? "text-violet-300" : "hover:text-white"}`}
              >
                <div className={`h-[2px] w-5 rounded bg-violet-300 transition-opacity ${activeSection === "profile" ? "opacity-100" : "opacity-0"}`} />
                <span className="mt-[3px]">Profile</span>
              </button>
              <button
                type="button"
                onClick={() => scrollTo("games")}
                className={`flex flex-col items-center leading-none transition ${activeSection === "games" ? "text-violet-300" : "hover:text-white"}`}
              >
                <div className={`h-[2px] w-5 rounded bg-violet-300 transition-opacity ${activeSection === "games" ? "opacity-100" : "opacity-0"}`} />
                <span className="mt-[3px]">Games</span>
              </button>
              <button
                type="button"
                onClick={() => scrollTo("skills")}
                className={`flex flex-col items-center leading-none transition ${activeSection === "skills" ? "text-violet-300" : "hover:text-white"}`}
              >
                <div className={`h-[2px] w-5 rounded bg-violet-300 transition-opacity ${activeSection === "skills" ? "opacity-100" : "opacity-0"}`} />
                <span className="mt-[3px]">Skills</span>
              </button>
              <button
                type="button"
                onClick={() => scrollTo("contact")}
                className={`flex flex-col items-center leading-none transition ${activeSection === "contact" ? "text-violet-300" : "hover:text-white"}`}
              >
                <div className={`h-[2px] w-5 rounded bg-violet-300 transition-opacity ${activeSection === "contact" ? "opacity-100" : "opacity-0"}`} />
                <span className="mt-[3px]">Contact</span>
              </button>
            </nav>
          </div>
        </header>

        <main translate="no" className="notranslate" style={{ paddingTop: headerHeight }}>
          <section
              id="profile"
              className="border-b border-white/5 bg-[radial-gradient(circle_at_top,_rgba(120,119,198,0.16),_rgba(30,41,59,0.08),_transparent_60%),linear-gradient(180deg,_#060814_0%,_#0b1020_55%,_#0a0d18_100%)]"
          >
            <div
              className={`mx-auto max-w-7xl px-6 lg:px-8 ${SECTION_VERTICAL_PADDING}`}
            >
              <div
                className={`relative transform-gpu transition-[transform,opacity] ease-[cubic-bezier(0.22,1,0.36,1)] ${profileReady ? "translate-y-0 opacity-100" : SECTION_ANIMATION_HIDDEN_STATE}`}
                style={{ transitionDuration: SECTION_DISPLAY_ANIMATION_DURATION }}
              >
                <div className="pointer-events-none absolute inset-0 hidden lg:block" style={{ transform: "translateY(-10%)" }}>
                  <div className="accent-rain-line absolute right-[300px] top-[10px] h-[54px] w-[10px] rounded-full bg-violet-300/95" />
                  <div className="accent-rain-line accent-rain-delay-1 absolute right-[206px] top-[2px] h-[42px] w-[8px] rounded-full bg-violet-300/90" />
                  <div className="accent-rain-line accent-rain-delay-2 absolute right-[134px] top-[44px] h-[24px] w-[7px] rounded-full bg-violet-300/85" />
                  <div className="accent-rain-line accent-rain-delay-3 absolute right-[252px] top-[116px] h-[22px] w-[8px] rounded-full bg-violet-300/90" />
                  <div className="accent-rain-line accent-rain-delay-4 absolute right-[356px] top-[182px] h-[28px] w-[9px] rounded-full bg-violet-300/85" />
                  <div className="accent-rain-line accent-rain-delay-5 absolute right-[172px] top-[166px] h-[46px] w-[9px] rounded-full bg-violet-300/95" />
                  <div className="accent-rain-line accent-rain-delay-6 absolute right-[82px] top-[224px] h-[34px] w-[8px] rounded-full bg-violet-300/88" />
                  <div className="accent-rain-line accent-rain-delay-7 absolute right-[278px] top-[274px] h-[18px] w-[7px] rounded-full bg-violet-300/82" />
                  <div className="accent-rain-line accent-rain-delay-8 absolute right-[156px] top-[306px] h-[16px] w-[6px] rounded-full bg-violet-300/78" />
                  <div className="accent-rain-line accent-rain-delay-9 absolute right-[12px] top-[292px] h-[38px] w-[9px] rounded-full bg-violet-300/90" />
                </div>
                <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-300">
                  <span className="text-violet-300">Developer</span> •{" "}
                  <span className="text-violet-300">Designer</span> •{" "}
                  <span className="text-violet-300">Maker</span>
                </p>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <h2 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                    Gameplay-focused developer building responsive systems for game
                    <span
                      className={
                        PROFILE_TYPING_SUFFIXES[profileSuffixIndex].highlight
                          ? "bg-gradient-to-r from-fuchsia-400 via-violet-500 to-indigo-500 bg-[length:200%_100%] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(168,85,247,0.55)]"
                          : ""
                      }
                    >
                      {PROFILE_TYPING_SUFFIXES[profileSuffixIndex].text.slice(0, profileTypedLength)}
                    </span>
                    <span className="typing-caret"></span>
                  </h2>

                  <div className="relative shrink-0">
                    <div
                      className="controller-clipart pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 -rotate-[18deg] drop-shadow-[0_10px_20px_rgba(0,0,0,0.45)]"
                      style={{
                        width: CONTROLLER_CLIPART_SIZE_PX,
                        ["--controller-left-desktop" as string]: `${CONTROLLER_CLIPART_OFFSET_X_DESKTOP_PX}px`,
                        ["--controller-left-mobile" as string]: `${CONTROLLER_CLIPART_OFFSET_X_MOBILE_PX}px`
                      } as React.CSSProperties}
                    >
                      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-auto w-full">
                        <path d="M24 50C27 39 37 32 49 32H79C91 32 101 39 104 50L110 73C114 88 103 102 88 102C80 102 73 98 69 92L66 88C64.8 86.5 63.2 86.5 62 88L59 92C55 98 48 102 40 102C25 102 14 88 18 73L24 50Z" fill="#F4F5F7"/>
                        <path d="M24 50C27 39 37 32 49 32H79C91 32 101 39 104 50L110 73C114 88 103 102 88 102C80 102 73 98 69 92L66 88C64.8 86.5 63.2 86.5 62 88L59 92C55 98 48 102 40 102C25 102 14 88 18 73L24 50Z" stroke="#D7D9E0" strokeWidth="4"/>
                        <rect x="33" y="56" width="22" height="8" rx="3" fill="#5B5F6B"/>
                        <rect x="40" y="49" width="8" height="22" rx="3" fill="#5B5F6B"/>
                        <circle cx="86" cy="56" r="6" fill="#A855F7"/>
                        <circle cx="98" cy="66" r="6" fill="#818CF8"/>
                        <circle cx="80" cy="70" r="5" fill="#D1D5DB"/>
                        <circle cx="91" cy="79" r="5" fill="#D1D5DB"/>
                        <circle cx="53" cy="80" r="8" fill="#2C3140"/>
                        <circle cx="75" cy="80" r="8" fill="#2C3140"/>
                      </svg>
                    </div>
                    <div className="absolute inset-0 scale-150 rounded-xl bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.55)_0%,_rgba(139,92,246,0.38)_30%,_rgba(99,102,241,0.22)_55%,_rgba(6,8,20,0)_75%)] opacity-80 blur-2xl mix-blend-screen"></div>
                    <img
                        src="/profile.png"
                        alt="Profile"
                        className="relative h-28 w-40 rounded-xl object-cover [object-position:50%_12%] sm:h-48 sm:w-32 sm:[object-position:50%_50%]"
                    />
                  </div>
                </div>

                <p className="mt-6 max-w-3xl text-base leading-7 text-zinc-300 sm:text-lg">
                  I’m JNeto, a developer and designer working across gameplay programming, encounter design,
                  UI direction, and rapid iteration.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                      type="button"
                      onClick={() => scrollTo("games")}
                      className="inline-flex rounded-2xl bg-zinc-100 px-5 py-3 text-sm font-medium text-[#0a0d18] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-white active:scale-[0.99]"
                  >
                    View Games
                  </button>

                  <button
                      type="button"
                      onClick={() => scrollTo("contact")}
                      className="inline-flex rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-zinc-100 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-white/10 active:scale-[0.99]"
                  >
                    Get in Touch
                  </button>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-2">
                  <div className="rounded-[28px] border border-zinc-800 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.05] hover:shadow-xl hover:shadow-black/20">
                    <p className="text-sm text-zinc-400">Focus</p>
                    <h3 className="mt-2 text-xl font-semibold">Gameplay systems</h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-300">
                      Combat feel, modular architecture, animation logic, and encounter pacing.
                    </p>
                  </div>

                  <div className="rounded-[28px] border border-zinc-800 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.05] hover:shadow-xl hover:shadow-black/20">
                    <p className="text-sm text-zinc-400">Availability</p>
                    <h3 className="mt-2 text-xl font-semibold">Freelance & studio roles</h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-300">
                      Available for remote or on-site roles in gameplay and UI development.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="games" className="border-t border-white/5 bg-[#070b16]">
            <div
              className={`relative mx-auto max-w-7xl px-6 lg:px-8 ${SECTION_VERTICAL_PADDING}`}
            >
              <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent lg:inset-x-8"></div>
              <div
                className={`mb-10 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between transform-gpu transition-[transform,opacity] ease-[cubic-bezier(0.22,1,0.36,1)] ${visibleSections.games ? "translate-y-0 opacity-100" : SECTION_ANIMATION_HIDDEN_STATE}`}
                style={{ transitionDuration: SECTION_DISPLAY_ANIMATION_DURATION }}
              >
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-violet-300">Games</p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                    Project showcase
                  </h2>
                </div>
              </div>

              <div className="relative">
                <div
                  className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transform-gpu transition-[transform,opacity] ease-[cubic-bezier(0.22,1,0.36,1)] ${visibleSections.games ? "translate-y-0 opacity-100" : SECTION_ANIMATION_HIDDEN_STATE}`}
                  style={{ transitionDuration: SECTION_DISPLAY_ANIMATION_DURATION }}
                >
                {visibleGames.map((game) => (
                    <article
                        key={game.title}
                        ref={(element) => {
                          gameCardRefs.current[games.findIndex((item) => item.title === game.title)] = element;
                        }}
                        data-preview-card={game.title}
                        onClick={() => setSelectedGame(game)}
                        className="group cursor-pointer overflow-hidden rounded-[28px] border border-zinc-800 bg-white/[0.03] shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.01] hover:border-white/15 hover:bg-white/[0.05] hover:shadow-black/35 will-change-transform"
                    >
                      <div className="relative isolate aspect-[15/8.45] overflow-hidden rounded-t-[28px]">
                        <img
                            src={game.image}
                            alt={game.title}
                            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                                game.video || game.youtube
                                    ? activeMobilePreview === game.title
                                        ? "opacity-0 sm:opacity-100 sm:group-hover:opacity-0"
                                        : "opacity-100 sm:group-hover:opacity-0"
                                    : "opacity-100"
                            }`}
                        />

                        {game.video ? (
                            <video
                                src={game.video}
                                autoPlay
                                muted
                                loop
                                playsInline
                                onLoadedMetadata={(e) => {
                                  const video = e.currentTarget;
                                  const offset = game.videoStartOffset ?? 0;
                                  const targetTime = Math.min(offset, Math.max(0, video.duration - 0.1));
                                  video.currentTime = Number.isFinite(targetTime) ? targetTime : offset;
                                }}
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                                className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                                    activeMobilePreview === game.title
                                        ? "opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                                        : "opacity-0 sm:group-hover:opacity-100"
                                }`}
                            />
                        ) : game.youtube ? (
                            <iframe
                                src={getYoutubeHoverSrc(game.youtube, game.videoStartOffset)}
                                title={`${game.title} preview`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                                className={`pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-300 ${
                                    activeMobilePreview === game.title
                                        ? "opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                                        : "opacity-0 sm:group-hover:opacity-100"
                                }`}
                            />
                        ) : null}
                      </div>

                      <div className="p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2 min-w-0">
                            <h3 className="text-2xl font-semibold tracking-tight">{game.title}</h3>
                            {renderPlatformIcon(game.platform)}
                          </div>
                          <span
                            className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${
                              game.status === "Published"
                                ? "border-emerald-400/30 bg-emerald-500/20 text-emerald-300"
                                : game.status === "In Development"
                                  ? "border-amber-400/30 bg-amber-500/20 text-amber-300"
                                  : "border-violet-400/30 bg-violet-500/20 text-violet-300"
                            }`}
                          >
                            {game.status === "In Development" ? "In Dev" : game.status}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-zinc-400">
                          {game.genre} • {game.platform} • {game.year}
                        </p>
                        <p className="mt-3 text-sm leading-6 text-zinc-300">{game.description}</p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {game.tags.map((tag: string) => (
                              <span
                                  key={tag}
                                  className="rounded-full border border-white/5 bg-white/[0.04] px-3 py-1 text-xs text-zinc-300"
                              >
                          {tag}
                        </span>
                          ))}
                        </div>

                      </div>
                    </article>
                ))}
                </div>

                {!showAllGamesMobile && games.length > MOBILE_VISIBLE_GAMES_COUNT && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-16 h-24 bg-gradient-to-b from-transparent via-[#070b16]/85 to-[#070b16] sm:hidden"></div>
                )}

                {games.length > MOBILE_VISIBLE_GAMES_COUNT && (
                  <div className="mt-6 flex justify-center sm:hidden">
                    <button
                      type="button"
                      onClick={handleToggleGamesMobile}
                      className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.99] ${
                        showAllGamesMobile
                          ? "bg-gradient-to-r from-rose-500 via-red-500 to-orange-500"
                          : "bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500"
                      }`}
                    >
                      {showAllGamesMobile ? "Show less" : "See more"}
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className={`games-toggle-chevron h-4 w-4 transition-transform duration-300 ${showAllGamesMobile ? "rotate-180" : "rotate-0"}`}                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section id="skills" className="border-t border-white/5 bg-[#080d19]">
            <div
              className={`relative mx-auto max-w-7xl px-6 lg:px-8 ${SECTION_VERTICAL_PADDING}`}
            >
              <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent lg:inset-x-8"></div>
              <div
                className={`mb-10 transform-gpu transition-[transform,opacity] ease-[cubic-bezier(0.22,1,0.36,1)] ${visibleSections.skills ? "translate-y-0 opacity-100" : SECTION_ANIMATION_HIDDEN_STATE}`}
                style={{ transitionDuration: SECTION_DISPLAY_ANIMATION_DURATION }}
              >
                <p className="text-sm uppercase tracking-[0.28em] text-violet-300">Skills</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Tools and strengths
                </h2>
              </div>

              <div
                className={`grid gap-6 md:grid-cols-2 transform-gpu transition-[transform,opacity] ease-[cubic-bezier(0.22,1,0.36,1)] ${visibleSections.skills ? "translate-y-0 opacity-100" : SECTION_ANIMATION_HIDDEN_STATE}`}
                style={{ transitionDuration: SECTION_DISPLAY_ANIMATION_DURATION }}
              >
                <div className="rounded-[32px] border border-zinc-800 bg-white/[0.03] p-8 transition-all duration-300 hover:bg-white/[0.04] hover:shadow-xl hover:shadow-black/20">
                  <div className="relative z-10">
                    <div className="mb-5">
                      <p className="text-sm uppercase tracking-[0.22em] text-zinc-400">Technologies</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {technologies.map((technology) => (
                        <span
                          key={technology.label}
                          className={`skill-chip ${technology.starred ? "skill-chip-starred" : ""}`}
                        >
                          {technology.starred ? renderSkillStar() : null}
                          <span className="relative z-[1]">{technology.label}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-[32px] border border-zinc-800 bg-white/[0.03] p-8 transition-all duration-300 hover:bg-white/[0.04] hover:shadow-xl hover:shadow-black/20">
                  <div className="relative z-10">
                    <div className="mb-5">
                      <p className="text-sm uppercase tracking-[0.22em] text-zinc-400">Concepts</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {concepts.map((concept) => (
                        <span
                          key={concept.label}
                          className={`skill-chip ${concept.starred ? "skill-chip-starred" : ""}`}
                        >
                          {concept.starred ? renderSkillStar() : null}
                          <span className="relative z-[1]">{concept.label}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="contact" className="border-t border-white/10 bg-[#070b16]">
            <div
              className={`relative mx-auto max-w-7xl px-6 lg:px-8 ${SECTION_VERTICAL_PADDING}`}
            >
              <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent lg:inset-x-8"></div>
              <div
                className={`mb-10 transform-gpu transition-[transform,opacity] ease-[cubic-bezier(0.22,1,0.36,1)] ${visibleSections.contact ? "translate-y-0 opacity-100" : SECTION_ANIMATION_HIDDEN_STATE}`}
                style={{ transitionDuration: SECTION_DISPLAY_ANIMATION_DURATION }}
              >
                <p className="text-sm uppercase tracking-[0.28em] text-violet-300">Contact</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Let’s build something worth playing
                </h2>
              </div>

              <div
                className={`rounded-[32px] border border-zinc-800 bg-gradient-to-br from-white/[0.05] via-[#0b1020] to-[#0a0d18] p-8 transition-all duration-300 hover:bg-white/[0.04] hover:shadow-xl hover:shadow-black/20 sm:p-10 transform-gpu transition-[transform,opacity] ease-[cubic-bezier(0.22,1,0.36,1)] ${visibleSections.contact ? "translate-y-0 opacity-100" : SECTION_ANIMATION_HIDDEN_STATE}`}
                style={{ transitionDuration: SECTION_DISPLAY_ANIMATION_DURATION }}
              >
                <div className="max-w-2xl space-y-1 text-sm leading-7 text-zinc-300">
                  <p>
                    <span className="text-violet-300">Email:</span> jneto.developer@gmail.com
                  </p>
                  <p>
                    <span className="text-violet-300">Phone:</span> +351 932109299
                  </p>
                  <p>
                    <span className="text-violet-300">Location:</span> Lisbon, Portugal
                  </p>
                  <p>
                    <span className="text-violet-300">LinkedIn:</span>{" "}
                    <a
                        href="https://linkedin.com/in/jnetodev"
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-300 transition hover:text-white"
                    >
                      linkedin.com/in/jnetodev
                    </a>
                  </p>
                  <p>
                    <span className="text-violet-300">Itch.io:</span>{" "}
                    <a
                        href="https://lordjneto.itch.io"
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-300 transition hover:text-white"
                    >
                      lordjneto.itch.io
                    </a>
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                      href="mailto:jneto.developer@gmail.com"
                      className="inline-flex rounded-2xl bg-zinc-100 px-5 py-3 text-sm font-medium text-[#0a0d18] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-white active:scale-[0.99]"
                  >
                    Email Me
                  </a>
                  <a
                      href="/Joao-Neto-Resume-CV-Gamedev.pdf"
                      download="Joao-Neto-Resume-CV-Gamedev.pdf"
                      className="inline-flex rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-zinc-100 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-white/10 active:scale-[0.99]"
                  >
                    Download CV
                  </a>
                </div>
              </div>
            </div>
          </section>

          {selectedGame && (
              <div
                  onClick={() => setSelectedGame(null)}
                  className="fixed inset-0 z-[100] flex items-center justify-center overflow-x-hidden bg-black/85 px-6 py-10 animate-[fadeIn_.2s_ease-out]"
              >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="relative max-h-[90vh] w-full max-w-5xl overflow-visible rounded-[32px] border border-white/10 bg-[#0a0d18] shadow-2xl shadow-black/50 animate-[modalIn_.25s_ease-out]"
                >
                  <button
                      type="button"
                      onClick={() => setSelectedGame(null)}
                      aria-label="Close modal"
                      className="absolute -right-3 -top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-red-300/20 bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 text-white shadow-xl shadow-black/40 transition-all duration-300 hover:scale-105 hover:brightness-110 active:scale-95"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>

                  <div className="max-h-[90vh] overflow-y-auto">
                    <div className="aspect-[16/6] overflow-hidden">
                      {selectedGame.video ? (
                          <video
                              src={selectedGame.video}
                              autoPlay
                              muted
                              loop
                              playsInline
                              onLoadedMetadata={(e) => {
                                const video = e.currentTarget;
                                const offset = selectedGame.videoStartOffset ?? 0;
                                const targetTime = Math.min(offset, Math.max(0, video.duration - 0.1));
                                video.currentTime = Number.isFinite(targetTime) ? targetTime : offset;
                              }}
                              className="h-full w-full object-cover"
                          />
                      ) : selectedGame.youtube ? (
                          <iframe
                              src={getYoutubeModalSrc(selectedGame.youtube, selectedGame.videoStartOffset)}
                              title={selectedGame.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                              className="h-full w-full"
                          />
                      ) : (
                          <img
                              src={selectedGame.image}
                              alt={selectedGame.title}
                              className="h-full w-full object-cover"
                          />
                      )}
                    </div>

                    <div className="p-8">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <h3 className="text-3xl font-semibold tracking-tight">{selectedGame.title}</h3>
                          {renderPlatformIcon(selectedGame.platform)}
                        </div>
                        <span
                          className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${
                            selectedGame.status === "Published"
                              ? "border-emerald-400/30 bg-emerald-500/20 text-emerald-300"
                              : selectedGame.status === "In Development"
                                ? "border-amber-400/30 bg-amber-500/20 text-amber-300"
                                : "border-violet-400/30 bg-violet-500/20 text-violet-300"
                          }`}
                        >
                          {selectedGame.status === "In Development" ? "In Dev" : selectedGame.status}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-zinc-400">
                        {selectedGame.genre} • {selectedGame.platform} • {selectedGame.year}
                      </p>

                      <p className="mt-5 max-w-5xl text-base leading-7 text-zinc-300">
                        {selectedGame.fullDescription}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {selectedGame.tags.map((tag: string) => (
                            <span
                                key={tag}
                                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-300"
                            >
                        {tag}
                      </span>
                        ))}
                      </div>

                      <a
                          href={selectedGame.link}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-6 inline-flex rounded-2xl bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:brightness-110 active:scale-[0.98]"
                      >
                        {selectedGame.cta}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
          )}
        </main>

        <footer translate="no" className="notranslate border-t border-white/10 bg-[#060814]">
          <div className={`mx-auto flex max-w-7xl flex-col gap-4 px-6 ${FOOTER_VERTICAL_PADDING} text-sm text-zinc-400 lg:flex-row lg:items-center lg:justify-between lg:px-8`}>
            <p>© {new Date().getFullYear()} JNeto (Joao Neto). All rights reserved.</p>
          </div>
        </footer>

        <style>{`
        .skill-chip {
          position: relative;
          display: inline-flex;
          align-items: center;
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255,255,255,0.04);
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          color: rgb(228 228 231);
          transition: transform 200ms ease, background 200ms ease, border-color 200ms ease;
        }

        .skill-chip:hover {
          transform: translateY(-2px);
          background: rgba(255,255,255,0.08);
          border-color: rgba(255, 255, 255, 0.12);
        }

        .skill-chip-starred {
          box-shadow: 0 0 0 1px rgba(168,85,247,0.14);
        }

        .skill-star {
          position: absolute;
          top: -16px;
          right: -16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 999px;
          background:
            radial-gradient(circle at center, rgba(255,255,255,0.18) 0%, rgba(192,132,252,0.22) 26%, rgba(168,85,247,0.12) 44%, rgba(168,85,247,0.05) 60%, rgba(168,85,247,0) 78%);
          border: 0;
          box-shadow: none;
          pointer-events: none;
          animation: skillStarPulse 2.8s ease-in-out infinite;
          will-change: transform, opacity, filter;
          z-index: 2;
        }
        @keyframes skillStarPulse {
          0%, 100% {
            transform: scale(0.94);
            opacity: 0.78;
            filter: drop-shadow(0 0 4px rgba(255,255,255,0.16)) drop-shadow(0 0 12px rgba(192,132,252,0.28));
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
            filter: drop-shadow(0 0 6px rgba(255,255,255,0.22)) drop-shadow(0 0 18px rgba(192,132,252,0.42));
          }
        }

        .accent-rain-line {
          box-shadow: 0 0 18px rgba(196, 132, 252, 0.35);
          animation: accentRainFall 6.2s linear infinite;
          will-change: transform, opacity;
        }

        .accent-rain-delay-1 { animation-delay: -0.8s; }
        .accent-rain-delay-2 { animation-delay: -1.6s; }
        .accent-rain-delay-3 { animation-delay: -2.1s; }
        .accent-rain-delay-4 { animation-delay: -2.9s; }
        .accent-rain-delay-5 { animation-delay: -3.7s; }
        .accent-rain-delay-6 { animation-delay: -4.2s; }
        .accent-rain-delay-7 { animation-delay: -4.9s; }
        .accent-rain-delay-8 { animation-delay: -5.4s; }
        .accent-rain-delay-9 { animation-delay: -5.9s; }

        @keyframes accentRainFall {
          0% {
            transform: translate3d(0, -26px, 0);
            opacity: 0;
          }
          12% {
            opacity: 0.95;
          }
          78% {
            opacity: 0.9;
          }
          100% {
            transform: translate3d(0, 120px, 0);
            opacity: 0;
          }
        }

        .controller-clipart {
          left: var(--controller-left-desktop);
          animation: controllerFloat 4.8s ease-in-out infinite;
          transform-origin: center center;
          will-change: transform;
        }

        @media (max-width: 639px) {
          .skill-chip {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
          }

          .controller-clipart {
            left: var(--controller-left-mobile);
          }
        }

        .typing-caret {
          display: inline-block;
          width: 2px;
          height: 0.7em;
          margin-left: 6px;
          background: linear-gradient(180deg, #a855f7, #6366f1);
          animation: caretBlink 1.25s steps(1) infinite;
          vertical-align: baseline;
        }

        @keyframes controllerFloat {
          0%, 100% {
            transform: translateY(-50%) rotate(-18deg);
          }
          50% {
            transform: translateY(calc(-50% - 8px)) rotate(-16deg);
          }
        }
        @keyframes caretBlink {
          0%, 50%, 100% { opacity: 1; }
          35%, 85% { opacity: 0; }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .games-toggle-chevron {
          animation: gamesChevronFloat 1.4s ease-in-out infinite;
        }
        
        @keyframes gamesChevronFloat {
          0%, 100% {
            translate: 0 0;
          }
          50% {
            translate: 0 3px;
          }
        }
      `}</style>
      </div>
  );
}