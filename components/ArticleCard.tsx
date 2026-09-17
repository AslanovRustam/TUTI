import Image from "next/image";
import Link from "next/link";

import type { ArticleCardData } from "@/content/articles";

/**
 * Картка статті. Приймає готові дані, а не саму статтю: ця картка
 * рендериться і на клієнті (фільтр на сторінці всіх статей), а тягнути
 * туди тексти всіх статей заради заголовка й дати не варто.
 */
type Props = {
  card: ArticleCardData;
  /** Картка на кольоровій секції — підкладка має бути білою. */
  onColor?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export default function ArticleCard({ card, onColor = false, className = "", style }: Props) {
  return (
    <li
      className={[
        "card group relative flex flex-col p-4",
        onColor ? "bg-white" : "bg-paper-deep",
        className,
      ].join(" ")}
      style={style}
    >
      <Image
        src={card.cover}
        alt=""
        sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
        className="block aspect-[4/3] w-full rounded-[1.25rem] object-cover"
      />

      <div className="flex flex-1 flex-col px-2 pt-5 pb-2">
        <ul className="flex flex-wrap gap-1.5">
          {card.tags.map((tag) => (
            <li
              key={tag}
              className="bg-sky-soft text-sky-deep rounded-full px-2.5 py-1 text-xs font-bold"
            >
              {tag}
            </li>
          ))}
        </ul>

        <h3 className="mt-3 text-lg">
          {/* Посилання розтягнуте на всю картку: клікати саме по
              заголовку незручно, а зайвий <a> навколо картинки додав би
              скрінрідеру другу однакову ціль. */}
          <Link href={`/articles/${card.slug}`} className="after:absolute after:inset-0">
            {card.title}
          </Link>
        </h3>

        <p className="text-ink-soft mt-2 text-[0.95rem] leading-relaxed">{card.excerpt}</p>

        <p className="text-ink-soft mt-auto pt-4 text-xs font-semibold">
          {card.dateLabel} · {card.readingMinutes} хв читання
        </p>
      </div>
    </li>
  );
}
