import Image, { getImageProps } from "next/image";

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
      className="stars stars-fall relative overflow-hidden px-5 pt-32 pb-16 sm:px-8 sm:pb-24 lg:pt-28"
    >
      {/* Рамка переносу в em, а не в rem: інакше на середніх ширинах
          заголовок вміщався в один рядок, «Тут» ставало впритул до краю
          рамки, і смужки на його куті вилітали за екран. */}
      <h1 className="hero-pop mx-auto max-w-[7.8em] text-center text-[clamp(2.8rem,8.4vw,7rem)]">
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
            className="hero-deco pointer-events-none absolute right-full bottom-full -mr-[0.34em] -mb-[0.44em] h-auto w-[3.2rem] sm:w-[8.8rem]"
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
            className="hero-deco pointer-events-none absolute -right-[1.2rem] -bottom-[0.8rem] h-auto w-[2.8rem] sm:-right-[4.1rem] sm:-bottom-[1.2rem] sm:w-[6.4rem]"
          />
        </span>
      </h1>

      {/* Декор живе поза кадром, який анімується й обрізає вміст */}
      <div className="relative mx-auto mt-6 max-w-7xl">
        {/* На великому екрані кадр міряється не пропорцією, а часткою
            вікна: фіксована пропорція, з якою кнопки влазять і на 900,
            на 1080 давала б непотрібно вузьку смугу. Межі знизу й
            зверху — щоб на дуже низьких чи дуже високих вікнах кадр не
            вироджувався. На телефоні перший екран однаково не вміщає
            секцію, тож там кадр лишається рідним. */}
        <div className="hero-rise aspect-[16/9] overflow-hidden rounded-[2.5rem] lg:aspect-auto lg:h-[40vh] lg:max-h-[27.5rem] lg:min-h-[19rem]">
          <Cover />
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

      {/* Під картинкою: текст ліворуч, кнопки праворуч. Відступ трохи
          більший за решту: у правому куті над кнопками висять кубики. */}
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
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

/**
 * Обкладинка героя двома кадрами.
 *
 * Широкий намальований одразу під низьку смугу, тож на десктопі його
 * лишається хіба трохи підрізати. Звичайний кадр лишається телефону:
 * там 7:3 перетворилося б на стрічку заввишки з палець.
 *
 * <picture> збирається руками, бо next/image вміє лише один кадр;
 * getImageProps дає готові srcSet від того самого оптимізатора.
 */
function Cover() {
  const wide = getArt(hero.coverWide);
  const tall = getArt(hero.cover);

  const {
    props: { srcSet: wideSrcSet },
  } = getImageProps({
    src: wide,
    alt: hero.coverAlt,
    width: wide.width,
    height: wide.height,
    sizes: "(min-width: 1344px) 1280px, 94vw",
  });

  const {
    props: { srcSet: tallSrcSet, ...rest },
  } = getImageProps({
    src: tall,
    alt: hero.coverAlt,
    width: tall.width,
    height: tall.height,
    sizes: "94vw",
    priority: true,
  });

  return (
    <picture className="block h-full w-full">
      <source
        media="(min-width: 1024px)"
        srcSet={wideSrcSet}
        sizes="(min-width: 1344px) 1280px, 94vw"
      />
      <img
        {...rest}
        srcSet={tallSrcSet}
        className="block h-full w-full object-cover object-center"
      />
    </picture>
  );
}
