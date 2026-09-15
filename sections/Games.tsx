import Image from "next/image";

import Section from "@/components/Section";
import { getArt } from "@/content/images";
import { games } from "@/content/site";

// Бенто на 10 плиток у сітці з 4 колонок — рівно чотири ряди без дірок:
//   [ 0 0 1 1 ]   0 — велика 2x2
//   [ 0 0 2 3 ]
//   [ 4 5 6 6 ]
//   [ 7 8 9 9 ]
// Класи записані повними рядками, бо Tailwind сканує вихідний код.
const SPANS = [
  "col-span-2 row-span-2",
  "col-span-2",
  "col-span-1",
  "col-span-1",
  "col-span-1",
  "col-span-1",
  "col-span-2",
  "col-span-1",
  "col-span-1",
  "col-span-2",
];

// На великій плитці назва більша — інакше вона губиться в кадрі.
const TITLE = [
  "text-xl sm:text-2xl",
  "text-lg",
  "text-base",
  "text-base",
  "text-base",
  "text-base",
  "text-lg",
  "text-base",
  "text-base",
  "text-lg",
];

export default function Games() {
  return (
    <Section tone="grass">
      <header className="mx-auto max-w-2xl text-center">
        <h2 className="text-[clamp(1.9rem,4.5vw,3.25rem)]">Десять міні-ігор</h2>
        <p className="mt-3 text-lg">Кожна вчить чогось одного й займає кілька хвилин</p>
      </header>

      <ul className="mt-12 grid auto-rows-[7rem] grid-cols-2 gap-3 sm:auto-rows-[8.5rem] md:grid-cols-4 lg:auto-rows-[10rem]">
        {games.map((game, i) => (
          <li
            key={game.slug}
            className={["reveal reveal-tile group relative overflow-hidden", SPANS[i]].join(" ")}
            style={{ transitionDelay: `${(i % 5) * 60}ms` }}
          >
            <Image
              src={getArt(game.cover)}
              alt=""
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="block h-full w-full object-cover object-[50%_58%] transition-transform duration-500 ease-bounce group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4">
              <h3 className={["leading-tight text-paper", TITLE[i]].join(" ")}>{game.title}</h3>
              <p className="mt-1 text-xs font-semibold text-paper/70">{game.skill}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
