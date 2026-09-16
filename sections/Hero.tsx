import Image from "next/image";

import Button from "@/components/Button";
import { getArt } from "@/content/images";
import { hero } from "@/content/site";

// Наклейки показуються великими, тому й віддаються великими: next/image
// за замовчуванням тисне до 75 і бере найближчий розмір знизу, а на
// такій дрібній графіці це одразу видно як мило.
const STICKER_QUALITY = 90;

export default function Hero() {
  return (
    <section
      id="top"
      className="stars stars-fall relative overflow-hidden px-5 pt-32 pb-16 sm:px-8 sm:pt-36 sm:pb-24"
    >
      <h1 className="hero-pop mx-auto max-w-[68rem] text-center text-[clamp(3.5rem,10.5vw,8.75rem)]">
        {/* Смужки висять на куті «Т»: right/bottom прив'язані до самого
            слова, тож декор їде за текстом на будь-якій ширині. Зсув
            зроблено від'ємним margin, а не translate — translate тут
            зайнятий анімацією появи. */}
        <span className="relative inline-block">
          {hero.title.start}
          <Image
            src={getArt("decor-lines")}
            alt=""
            quality={STICKER_QUALITY}
            sizes="(min-width: 640px) 352px, 128px"
            style={{ "--deco-tilt": "-40deg" } as React.CSSProperties}
            className="hero-deco pointer-events-none absolute right-full bottom-full -mr-[0.34em] -mb-[0.44em] h-auto w-16 sm:w-[11rem]"
          />
        </span>{" "}
        {hero.title.middle}{" "}
        <span className="relative inline-block">
          {hero.title.end}
          <Image
            src={getArt("decor-star")}
            alt=""
            quality={STICKER_QUALITY}
            sizes="(min-width: 640px) 256px, 112px"
            style={{ "--deco-tilt": "14deg" } as React.CSSProperties}
            className="hero-deco pointer-events-none absolute -right-6 -bottom-4 h-auto w-14 sm:-right-[5.125rem] sm:-bottom-6 sm:w-[8rem]"
          />
        </span>
      </h1>

      {/* Декор живе поза кадром, який анімується й обрізає вміст */}
      <div className="relative mx-auto mt-6 max-w-[88rem] sm:mt-8">
        <div className="hero-rise overflow-hidden rounded-[2.5rem]">
          <Image
            src={getArt(hero.cover)}
            alt={hero.coverAlt}
            sizes="(min-width: 1472px) 1408px, 94vw"
            className="block w-full"
            priority
          />
        </div>

        <Image
          src={getArt("decor-stars-trio")}
          alt=""
          quality={STICKER_QUALITY}
          sizes="(min-width: 640px) 352px, 160px"
          style={{ "--deco-tilt": "-12deg", animationDelay: "0.6s" } as React.CSSProperties}
          className="hero-deco pointer-events-none absolute -top-7 -left-2 h-auto w-20 sm:-top-12 sm:-left-4 sm:w-[11rem] 2xl:-left-10"
        />
        <Image
          src={getArt("decor-cubes")}
          alt=""
          quality={STICKER_QUALITY}
          sizes="(min-width: 640px) 352px, 160px"
          style={{ "--deco-tilt": "10deg", animationDelay: "0.7s" } as React.CSSProperties}
          className="hero-deco pointer-events-none absolute -right-2 -bottom-6 h-auto w-20 sm:-right-4 sm:-bottom-12 sm:w-[11rem] 2xl:-right-10"
        />
      </div>

      {/* Під картинкою: текст ліворуч, кнопки праворуч */}
      <div className="mx-auto mt-8 flex max-w-[88rem] flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-2xl text-[clamp(1.15rem,2.4vw,1.6rem)] leading-snug font-bold">
          {hero.lead}
        </p>

        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <Button href={hero.primary.href} size="lg">
            {hero.primary.label}
          </Button>
          <Button href={hero.secondary.href} variant="outline" size="lg">
            {hero.secondary.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
