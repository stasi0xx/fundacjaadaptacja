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

function PartnerCard({ partner, index }: { partner: Partner; index: number }) {
    const { ref, inView } = useInViewOnce<HTMLAnchorElement>();
    return (
        <a
            ref={ref}
            href={partner.url || "#"}
            target={partner.url ? "_blank" : undefined}
            rel={partner.url ? "noopener noreferrer" : undefined}
            className={[
                "group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                "rounded-lg",
                "transition-all duration-500 ease-out",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
            ].join(" ")}
            style={{ transitionDelay: `${index * 60}ms` }}
            aria-label={partner.name}
        >
            <div
                className={[
                    "flex items-center justify-center",
                    "h-20 sm:h-24",
                    "rounded-lg",
                    "border border-gray-200 dark:border-gray-800",
                    "bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm",
                    "shadow-sm",
                    "transition-all duration-300",
                    "group-hover:shadow-md group-hover:-translate-y-0.5",
                ].join(" ")}
            >
                <img
                    src={partner.logoSrc}
                    alt={partner.alt ?? partner.name}
                    loading="lazy"
                    className="max-h-10 sm:max-h-12 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                />
            </div>
            <div className="mt-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                {partner.name}
            </div>
        </a>
    );
}

export function TrustedBy({ title = "Zaufali Nam", partners, className }: TrustedByProps) {
  return (
    <section
      aria-labelledby="trusted-by-title"
      className={["w-full", className].filter(Boolean).join(" ")}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h2
          id="trusted-by-title"
          className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-gray-950  drop-shadow-sm"
        >
          {title}
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {partners.map((p, i) => (
            <PartnerCard key={p.id} partner={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}