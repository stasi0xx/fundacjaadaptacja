import React, { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL!,
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY!
);

type Category = "Wszystkie" | "Akcje specjalne" | "Eventy" | "Koncerty";

type Project = {
    id: string;
    title: string;
    category: Exclude<Category, "Wszystkie">;
    imageUrl: string;
    imageAlt: string;
};

const CATEGORIES: Category[] = ["Wszystkie", "Akcje specjalne", "Eventy", "Koncerty"];

const ALL_PROJECTS: Project[] = [
    { id: "p1", title: "Koncert Mandaryny", category: "Koncerty", imageUrl: "/BG.jpg", imageAlt: "Zdjęcie ze sceny podczas koncertu" },
    { id: "p2", title: "106. GDYŃSKIE URODZINY NIEPODLEGŁEJ", category: "Eventy", imageUrl: "/images/realizacje/parada-1.jpg", imageAlt: "Zdjęcie z parady ulicznej" },
    { id: "p3", title: "NOCNE ZWIEDZANIE MUZEUM", category: "Akcje specjalne", imageUrl: "/images/realizacje/akcja-1.jpg", imageAlt: "Zwiedzający w muzeum nocą" },
    { id: "p4", title: "FESTYN RODZINNY W PARKU", category: "Eventy", imageUrl: "/images/realizacje/event-1.jpg", imageAlt: "Uczestnicy festynu na świeżym powietrzu" },
    { id: "p5", title: "SCENA LETNIA NAD MORZEM", category: "Koncerty", imageUrl: "/images/realizacje/koncert-2.jpg", imageAlt: "Letnia scena koncertowa nad morzem" },
    { id: "p6", title: "WIECZÓR Z GWIAZDAMI", category: "Akcje specjalne", imageUrl: "/images/realizacje/akcja-2.jpg", imageAlt: "Uroczyste wydarzenie z gośćmi" },
    { id: "p7", title: "MIEJSKI PIKNIK SĄSIEDZKI", category: "Eventy", imageUrl: "/images/realizacje/event-2.jpg", imageAlt: "Piknik miejski z uczestnikami" },
    { id: "p8", title: "KONCERT CHARYTATYWNY", category: "Koncerty", imageUrl: "/images/realizacje/koncert-3.jpg", imageAlt: "Koncert charytatywny na scenie" }
];

const NaszeRealizacje = () => {
    const [activeCategory, setActiveCategory] = useState<Category>("Wszystkie");
    const [visibleCount, setVisibleCount] = useState<number>(3);
    const [projects, setProjects] = useState<Project[]>(ALL_PROJECTS);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        void fetchProjects();
    }, []);

    async function fetchProjects() {
        setLoading(true);
        setErrorMsg(null);
        const { data, error } = await supabase.from("wydarzenia").select("*");
        if (error) {
            console.error(error);
            setErrorMsg("Nie udało się pobrać danych z bazy.");
        } else if (data) {
            // UWAGA: zakładam, że kolumny w tabeli mają nazwy: id, title, category, imageUrl, imageAlt.
            // Jeśli w Twojej tabeli nazywają się inaczej (np. image_url), zmapuj je tutaj odpowiednio.
            setProjects(data as unknown as Project[]);
        }
        setLoading(false);
    }

    const filtered = useMemo(() => {
        if (activeCategory === "Wszystkie") return projects;
        return projects.filter((p) => p.category === activeCategory);
    }, [activeCategory, projects]);

    const visibleProjects = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);

    const canShowMore = visibleCount < filtered.length;

    const handleCategoryClick = (cat: Category) => {
        setActiveCategory(cat);
        setVisibleCount(3);
    };

    return (
        <section id="realizacje" className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <header className="mb-8 sm:mb-10">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Nasze Realizacje
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Przeglądaj wybrane projekty i wydarzenia. Skorzystaj z filtrów, aby zawęzić wyniki.
                    </p>
                </header>

                <nav aria-label="Filtr kategorii" className="mb-8">
                    <ul className="flex flex-wrap gap-2">
                        {CATEGORIES.map((cat) => {
                            const isActive = activeCategory === cat;
                            return (
                                <li key={cat}>
                                    <button
                                        type="button"
                                        onClick={() => handleCategoryClick(cat)}
                                        aria-pressed={isActive}
                                        className={[
                                            "rounded-full border px-4 py-2 text-sm transition",
                                            isActive
                                                ? "border-blue-600 bg-blue-600 text-white shadow"
                                                : "border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50",
                                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        ].join(" ")}
                                    >
                                        {cat}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {loading && (
                    <p className="mb-6 text-sm text-gray-500">Ładowanie danych...</p>
                )}
                {errorMsg && (
                    <p className="mb-6 text-sm text-red-600">{errorMsg}</p>
                )}

                <div
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    role="list"
                    aria-label="Galeria zrealizowanych wydarzeń"
                >
                    {visibleProjects.map((project) => (
                        <article
                            key={project.id}
                            className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                            role="listitem"
                            data-category={project.category}
                        >
                            <figure>
                                <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                                    <img
                                        src={project.imageUrl}
                                        alt={project.imageAlt}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                    />
                                </div>
                                <figcaption className="p-4">
                                    <h3 className="line-clamp-2 text-base font-semibold text-gray-900">
                                        {project.title}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{project.category}</p>
                                </figcaption>
                            </figure>
                        </article>
                    ))}
                </div>

                <div className="mt-10 flex justify-center">
                    {canShowMore ? (
                        <button
                            type="button"
                            onClick={() => setVisibleCount((c) => c + 3)}
                            className="rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                        >
                            Pokaż więcej
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setVisibleCount(3)}
                            className="rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                        >
                            Pokaż mniej
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default NaszeRealizacje;