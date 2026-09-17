"use client";

import { useEffect, useState } from "react";

import type { Heading } from "@/content/articles";

/**
 * Навігація по заголовках статті.
 *
 * Активний пункт рахується не IntersectionObserver, а позицією
 * заголовків: у довгому розділі жоден заголовок не перетинає екран,
 * і спостерігач лишив би підсвітку порожньою. Тут же активним завжди
 * є останній заголовок, який уже проїхав лінію читання.
 */
const READING_LINE = 160;

export default function Toc({ items }: { items: Heading[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      let current = items[0].id;

      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= READING_LINE) current = item.id;
      }

      // Внизу сторінки далі скролити нема куди, тож останній розділ
      // інакше ніколи б не підсвітився.
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
      setActive(atBottom ? items[items.length - 1].id : current);
    };

    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Зміст статті" className="lg:sticky lg:top-28">
      <h2 className="text-ink-soft text-xs font-extrabold tracking-[0.12em] uppercase">Зміст</h2>

      <ul className="border-ink/10 mt-4 space-y-1 border-l">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              className={[
                "-ml-px block border-l-2 py-1.5 text-sm leading-snug transition-colors duration-200",
                item.level === 3 ? "pl-4" : "pl-4 font-semibold",
                active === item.id
                  ? "border-sun text-ink"
                  : "text-ink-soft hover:text-ink border-transparent",
              ].join(" ")}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
