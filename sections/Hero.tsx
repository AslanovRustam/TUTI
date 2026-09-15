import Image from "next/image";

import Button from "@/components/Button";
import { getArt } from "@/content/images";
import { hero } from "@/content/site";

export default function Hero() {
  return (
    <section id="top" className="stars relative px-5 pt-32 pb-16 sm:px-8 sm:pt-40 sm:pb-24">
      <h1 className="mx-auto max-w-5xl text-center text-[clamp(3.1rem,9.5vw,6.6rem)]">
        {hero.title}
      </h1>

      <div className="mx-auto mt-14 max-w-6xl overflow-hidden rounded-[2.5rem]">
        <Image
          src={getArt(hero.cover)}
          alt={hero.coverAlt}
          sizes="(min-width: 1280px) 1152px, 94vw"
          className="block w-full"
          priority
        />
      </div>

      {/* Під картинкою: текст ліворуч, кнопки праворуч */}
      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-2xl text-[clamp(1.15rem,2.4vw,1.6rem)] leading-snug font-bold">
          {hero.lead}
        </p>

        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <Button href={hero.primary.href} size="lg">
            {hero.primary.label}
          </Button>
          <Button href={hero.secondary.href} variant="paper" size="lg">
            {hero.secondary.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
