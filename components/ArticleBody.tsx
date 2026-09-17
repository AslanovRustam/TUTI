import Image from "next/image";

import type { PreparedBlock } from "@/content/articles";
import { getArt } from "@/content/images";

/**
 * Тіло статті: блоки з content/articles.ts у розмітку.
 *
 * Розміри тут навмисно не успадковуються від секцій — у тексті статті
 * важливий власний ритм: рядок ~70 знаків, однаковий вертикальний крок,
 * заголовки з великим відступом зверху й малим знизу.
 */
export default function ArticleBody({ blocks }: { blocks: PreparedBlock[] }) {
  return (
    <div className="text-[1.0625rem] leading-[1.75] sm:text-[1.125rem]">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={block.id}
                id={block.id}
                className="mt-12 scroll-mt-28 text-[clamp(1.5rem,3vw,2rem)] first:mt-0"
              >
                {block.text}
              </h2>
            );

          case "h3":
            return (
              <h3 key={block.id} id={block.id} className="mt-9 scroll-mt-28 text-[1.35rem]">
                {block.text}
              </h3>
            );

          case "h4":
            return (
              <h4
                key={block.id}
                id={block.id}
                className="font-display mt-7 scroll-mt-28 text-[1.1rem] font-extrabold"
              >
                {block.text}
              </h4>
            );

          case "ul":
            return (
              <ul key={i} className="mt-5 space-y-2.5">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="bg-sun mt-[0.7em] block h-1.5 w-1.5 shrink-0 rounded-full"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );

          case "ol":
            return (
              <ol key={i} className="mt-5 space-y-2.5">
                {block.items.map((item, n) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="bg-sun-soft text-sun-deep font-display mt-[0.2em] grid h-6 w-6 shrink-0 place-items-center rounded-full text-sm font-extrabold"
                    >
                      {n + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            );

          case "image":
            return (
              <figure key={i} className="mt-9">
                <Image
                  src={getArt(block.art)}
                  alt={block.alt}
                  sizes="(min-width: 1024px) 736px, 94vw"
                  className="block w-full rounded-[1.5rem]"
                />
                {block.caption && (
                  <figcaption className="text-ink-soft mt-3 text-sm leading-relaxed">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "quote":
            return (
              <figure
                key={i}
                className="border-sun bg-sun-soft/70 mt-9 rounded-[1.25rem] border-l-4 px-5 py-5 sm:px-6"
              >
                <blockquote className="text-[1.15rem] leading-snug font-bold italic sm:text-[1.3rem]">
                  {block.text}
                </blockquote>
                {block.source && (
                  <figcaption className="text-ink-soft mt-2.5 text-sm font-semibold">
                    — {block.source}
                  </figcaption>
                )}
              </figure>
            );

          default:
            return (
              <p key={i} className="mt-5 first:mt-0">
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
