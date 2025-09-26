import React from "react";

export type Partner = {
    id: string;
    name: string;
    logoSrc: string;
    alt?: string;
    url?: string;
};

type TrustedByProps = {
    title?: string;
    partners: Partner[];
    className?: string;
};

function useInViewOnce<T extends HTMLElement>(options?: IntersectionObserverInit) {
    const ref = React.useRef<T | null>(null);
    const [inView, setInView] = React.useState(false);

    React.useEffect(() => {
        if (!ref.current || inView) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    setInView(true);
                }
            },
            { rootMargin: "0px 0px -10% 0px", threshold: 0.1, ...(options || {}) }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [inView, options]);

    return { ref, inView } as const;
}

function PartnerSlide({
                          partner,
                          index,
                          scale,
                      }: {
    partner: Partner;
    index: number;
    scale: number;
}) {
    const { ref, inView } = useInViewOnce<HTMLAnchorElement>();
    const zIndex = Math.round(scale * 100); // wyższy z-index dla środkowego

    return (
        <li
            data-slide-index={index}
            className="snap-center shrink-0 px-2"
            style={{ width: "11rem" }} // ~ w-44; można dostosować
            aria-hidden={scale < 1.0}
        >
            <a
                ref={ref}
                href={partner.url || "#"}
                target={partner.url ? "_blank" : undefined}
                rel={partner.url ? "noopener noreferrer" : undefined}
                className={[
                    "group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                    "rounded-lg",
                    "transition-all duration-500 ease-out will-change-transform",
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                ].join(" ")}
                style={{
                    transitionDelay: `${index * 60}ms`,
                    transform: `scale(${scale})`,
                    zIndex,
                }}
                aria-label={partner.name}
            >
                <div
                    className={[
                        "flex items-center justify-center",
                        "h-20 sm:h-24",
                        "rounded-lg",
                        "border border-blue-200/50 dark:border-blue-800/60",
                        "bg-blue-800/20 dark:bg-blue-900/30 backdrop-blur-sm",
                        "shadow-sm",
                        "transition-all duration-300",
                        "group-hover:shadow-md group-hover:-translate-y-0.5",
                    ].join(" ")}
                >
                    <img
                        src={partner.logoSrc}
                        alt={partner.alt ?? partner.name}
                        loading="lazy"
                        className="max-h-12 sm:max-h-14 lg:max-h-16 w-auto object-contain transition-all duration-300"
                    />
                </div>
                <div className="mt-2 text-center text-sm font-medium text-gray-700 truncate">
                    {partner.name}
                </div>
            </a>
        </li>
    );
}

export function TrustedBy({ title = "Zaufali Nam", partners, className }: TrustedByProps) {
    const scrollRef = React.useRef<HTMLDivElement | null>(null);
    const [scales, setScales] = React.useState<number[]>(
        () => partners.map(() => 0.96) // bazowa skala dla nie-środkowych
    );
    const [activeIndex, setActiveIndex] = React.useState(0);
    const rafRef = React.useRef<number | null>(null);

    const computeScales = React.useCallback(() => {
        const scroller = scrollRef.current;
        if (!scroller) return;

        const containerRect = scroller.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;

        const items = Array.from(
            scroller.querySelectorAll<HTMLElement>("[data-slide-index]")
        );
        if (items.length === 0) return;

        const nextScales: number[] = new Array(items.length);
        let bestIdx = 0;
        let bestDist = Number.POSITIVE_INFINITY;

        // maksymalna odległość normalizująca (pół szerokości kontenera)
        const maxDist = Math.max(1, containerRect.width * 0.5);

        items.forEach((el, i) => {
            const r = el.getBoundingClientRect();
            const center = r.left + r.width / 2;
            const dist = Math.abs(center - containerCenter);
            const t = Math.min(dist / maxDist, 1); // 0 w środku, 1 na brzegu
            // skala od 0.96 do 1.08 (delikatne powiększenie w środku)
            const scale = 0.96 + (1 - t) * 0.12;
            nextScales[i] = Number(scale.toFixed(3));

            if (dist < bestDist) {
                bestDist = dist;
                bestIdx = i;
            }
        });

        setScales(nextScales);
        setActiveIndex(bestIdx);
    }, []);

    const onScroll = React.useCallback(() => {
        if (rafRef.current != null) return;
        rafRef.current = window.requestAnimationFrame(() => {
            rafRef.current = null;
            computeScales();
        });
    }, [computeScales]);

    React.useEffect(() => {
        computeScales();
        const scroller = scrollRef.current;
        if (!scroller) return;

        scroller.addEventListener("scroll", onScroll, { passive: true });

        const ro = new ResizeObserver(() => computeScales());
        ro.observe(scroller);

        window.addEventListener("resize", computeScales);

        return () => {
            scroller.removeEventListener("scroll", onScroll);
            ro.disconnect();
            window.removeEventListener("resize", computeScales);
            if (rafRef.current != null) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
        };
    }, [computeScales, onScroll]);

    const scrollToIndex = (idx: number) => {
        const scroller = scrollRef.current;
        if (!scroller) return;
        const el = scroller.querySelector<HTMLElement>(`[data-slide-index="${idx}"]`);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    };

    const goPrev = () => scrollToIndex(Math.max(0, activeIndex - 1));
    const goNext = () => scrollToIndex(Math.min(partners.length - 1, activeIndex + 1));

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            goPrev();
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            goNext();
        }
    };

    return (
        <section
            aria-labelledby="trusted-by-title"
            className={["w-full ", className].filter(Boolean).join(" ")}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 ">
                <h2
                    id="trusted-by-title"
                    className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-gray-950 drop-shadow-sm"
                >
                    {title}
                </h2>

                <div className="relative mt-8 overflow-hidden">
                    {/* Strzałka lewa */}
                    <button
                        type="button"
                        aria-label="Poprzedni"
                        onClick={goPrev}
                        className="absolute left-0 top-1/2 z-[200] -translate-y-1/2 rounded-full bg-white/90 p-2 shadow ring-1 ring-gray-300 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>

                    {/* Strzałka prawa */}
                    <button
                        type="button"
                        aria-label="Następny"
                        onClick={goNext}
                        className="absolute right-0 top-1/2 z-[200] -translate-y-1/2 rounded-full bg-white/90 p-2 shadow ring-1 ring-gray-300 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>

                    {/* Karuzela */}
                    <div
                        ref={scrollRef}
                        className={[
                            "relative overflow-x-auto",
                            "snap-x snap-mandatory",
                            "scroll-smooth",
                            "px-8",
                            "overscroll-none"// padding na krawędzie, aby środek miał miejsce
                        ].join(" ")}
                        role="region"
                        aria-roledescription="karuzela"
                        aria-label="Partnerzy"
                        tabIndex={0}
                        onKeyDown={onKeyDown}
                    >
                        <ul className="flex items-stretch gap-2 py-2">
                            {partners.map((p, i) => (
                                <PartnerSlide key={p.id} partner={p} index={i} scale={scales[i] ?? 0.96} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}