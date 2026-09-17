"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import ArticleCard from "@/components/ArticleCard";
import type { ArticleCardData } from "@/content/articles";

type Props = {
  cards: ArticleCardData[];
  tags: string[];
  labels: {
    searchLabel: string;
    searchPlaceholder: string;
    allTag: string;
    empty: string;
  };
};

const ALL = "";

export default function ArticlesBrowser({ cards, tags, labels }: Props) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState(ALL);

  // Стрічка тем гортається вбік, коли тем більше, ніж влазить. Смуга
  // прокрутки схована, тож про запас з боків каже розчинення краю —
  // а докрутили вже чи ні, знає тільки JS.
  const strip = useRef<HTMLDivElement>(null);
  const [fade, setFade] = useState({ start: false, end: false });

  useEffect(() => {
    const el = strip.current;
    if (!el) return;

    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setFade({ start: el.scrollLeft > 4, end: max > 4 && el.scrollLeft < max - 4 });
    };

    // Стрічку можна тягнути мишкою — на тачскріні це й так робить палець,
    // а з мишкою інакше лишався б тільки shift+колесо.
    //
    // Навмисно без setPointerCapture: захоплення перенаправляє подальший
    // click на стрічку, і кнопки тем усередині перестають натискатися.
    // Тому рух і відпускання слухаємо на вікні.
    let holding = false;
    let from = 0;
    let at = 0;
    let dragged = false;

    const onDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      holding = true;
      dragged = false;
      from = event.clientX;
      at = el.scrollLeft;
    };

    const onMove = (event: PointerEvent) => {
      if (!holding) return;
      const shift = event.clientX - from;
      if (!dragged && Math.abs(shift) < 5) return;
      dragged = true;
      el.scrollLeft = at - shift;
    };

    const onUp = () => {
      holding = false;
    };

    // Тягнули — значить не тиснули: інакше кожне перетягування
    // закінчувалося б випадковим вибором теми під курсором.
    const onClick = (event: MouseEvent) => {
      if (!dragged) return;
      event.preventDefault();
      event.stopPropagation();
      dragged = false;
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("click", onClick, true);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    const observer = new ResizeObserver(update);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", update);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("click", onClick, true);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      observer.disconnect();
    };
  }, [tags]);

  const found = useMemo(() => {
    // localeCompare тут не потрібен, а от toLowerCase потрібен саме з
    // локаллю: без неї «І» та «і» в українській не збігаються.
    const needle = query.trim().toLocaleLowerCase("uk");

    return cards.filter((card) => {
      if (tag !== ALL && !card.tags.includes(tag)) return false;
      if (needle === "") return true;

      const haystack = [card.title, card.excerpt, ...card.tags].join(" ").toLocaleLowerCase("uk");
      return haystack.includes(needle);
    });
  }, [cards, query, tag]);

  return (
    <>
      <div className="mt-10 flex flex-col gap-5 lg:flex-row lg:items-center">
        <div
          ref={strip}
          data-fade-start={fade.start ? "" : undefined}
          data-fade-end={fade.end ? "" : undefined}
          className="tag-scroller min-w-0 select-none lg:flex-1"
        >
          <ul className="flex w-max gap-2 py-2">
            {[ALL, ...tags].map((item) => {
              const active = item === tag;
              return (
                <li key={item || "all"}>
                  <button
                    type="button"
                    onClick={() => setTag(item)}
                    aria-pressed={active}
                    className={[
                      "ease-bounce rounded-full px-4 py-2 text-sm font-bold whitespace-nowrap transition-all duration-300",
                      active
                        ? "bg-ink text-paper"
                        : "bg-paper-deep hover:bg-sky-soft hover:-translate-y-0.5",
                    ].join(" ")}
                  >
                    {item || labels.allTag}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="relative lg:w-80 lg:shrink-0">
          <label htmlFor="article-search" className="sr-only">
            {labels.searchLabel}
          </label>
          <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-ink-soft pointer-events-none absolute top-1/2 left-4 -translate-y-1/2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            id="article-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.searchPlaceholder}
            className="bg-paper-deep placeholder:text-ink-soft focus:ring-sky-deep w-full rounded-full py-3 pr-4 pl-11 text-[0.95rem] font-semibold focus:ring-2 focus:outline-none"
          />
        </div>
      </div>

      <p aria-live="polite" className="text-ink-soft mt-5 text-sm font-semibold">
        {found.length === 0
          ? labels.empty
          : `${found.length} ${plural(found.length, "стаття", "статті", "статей")}`}
      </p>

      {found.length > 0 && (
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {found.map((card) => (
            <ArticleCard key={card.slug} card={card} />
          ))}
        </ul>
      )}
    </>
  );
}

function plural(n: number, one: string, few: string, many: string): string {
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return many;
  const mod10 = n % 10;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
}
