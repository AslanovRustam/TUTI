import Image from "next/image";

import Section from "@/components/Section";
import { getArt } from "@/content/images";
import { games } from "@/content/site";

// Наклейки показуються великими — віддаємо їх без зайвого стиснення.
const STICKER_QUALITY = 90;

// Три великі плитки зверху, решта — квадратики під ними.
const FEATURED = 3;

export default function Games() {
  const featured = games.slice(0, FEATURED);
  const rest = games.slice(FEATURED);

  return (
    <Section tone="grass">
      <header className="mx-auto max-w-2xl text-center">
        <h2 className="text-[clamp(1.9rem,4.5vw,3.25rem)]">Десять міні-ігор</h2>
        <p className="mt-3 text-lg">Кожна вчить чогось одного й займає кілька хвилин</p>
      </header>

      {/* На телефоні перша плитка займає обидві колонки — три однакові
          широкі картки одна під одною розтягнули б блок удвічі. */}
      <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {featured.map((game, i) => (
          <li
            key={game.slug}
            className={[
              "relative",
              i === 0
                ? "col-span-2 aspect-[16/9] sm:col-span-1 sm:aspect-[4/3]"
                : "aspect-square sm:aspect-[4/3]",
            ].join(" ")}
          >
            <Frame game={game} big delay={i * 70} />
            {/* Кубики на куті першої картки — рамка сітки лишається
                чистою, декор висить поверх неї. */}
            {i === 0 && (
              <Image
                src={getArt("decor-cubes")}
                alt=""
                quality={STICKER_QUALITY}
                sizes="(min-width: 640px) 288px, 176px"
                className="pointer-events-none absolute -top-8 -left-5 h-auto w-24 -rotate-12 min-[1440px]:-left-14 sm:-top-14 sm:-left-5 sm:w-40"
              />
            )}
          </li>
        ))}
      </ul>

      {/* Сім квадратиків. Остання плитка розтягується на дві колонки там,
          де ряд інакше лишився б із діркою: 2 колонки -> 3+3+1, 4 -> 4+3. */}
      <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {rest.map((game, i) => (
          <li
            key={game.slug}
            className={[
              "relative",
              i === rest.length - 1
                ? "col-span-2 aspect-[2/1] lg:col-span-1 lg:aspect-square"
                : "aspect-square",
            ].join(" ")}
          >
            <Frame game={game} delay={(i % 4) * 60} clearRight={i === rest.length - 1} />
            {i === rest.length - 1 && (
              <Image
                src={getArt("decor-stars-trio")}
                alt=""
                quality={STICKER_QUALITY}
                sizes="(min-width: 640px) 224px, 160px"
                className="pointer-events-none absolute -right-4 -bottom-8 h-auto w-20 rotate-12 sm:-right-5 sm:-bottom-14 sm:w-28"
              />
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}

type FrameProps = {
  game: (typeof games)[number];
  big?: boolean;
  delay: number;
  /** Праворуч унизу лежить наклейка — звільняємо під неї місце в підписі. */
  clearRight?: boolean;
};

function Frame({ game, big = false, delay, clearRight = false }: FrameProps) {
  return (
    <div
      className={[
        "reveal group relative h-full overflow-hidden",
        big ? "reveal-card" : "reveal-tile",
      ].join(" ")}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Image
        src={getArt(game.cover)}
        alt=""
        sizes={big ? "(min-width: 640px) 33vw, 96vw" : "(min-width: 1024px) 14vw, 48vw"}
        className="ease-bounce block h-full w-full object-cover object-[50%_58%] transition-transform duration-500 group-hover:scale-105"
      />

      <div className="from-ink/95 via-ink/40 absolute inset-0 bg-gradient-to-t to-transparent" />

      <div
        className={[
          "absolute inset-x-0 bottom-0 p-3 sm:p-3.5",
          clearRight ? "pr-12 sm:pr-14" : "",
        ].join(" ")}
      >
        <h3
          className={["text-paper leading-tight", big ? "text-lg sm:text-xl" : "text-sm"].join(" ")}
        >
          {game.title}
        </h3>
        <p
          className={[
            "text-paper/70 mt-1 font-semibold",
            big ? "text-xs" : "text-[0.6875rem]",
          ].join(" ")}
        >
          {game.skill}
        </p>
      </div>
    </div>
  );
}
