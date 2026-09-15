import { getImageProps } from "next/image";

import Section from "@/components/Section";
import { getArt } from "@/content/images";
import { apps, games } from "@/content/site";
import { tones, type Tone } from "@/content/tones";

const titleBySlug = new Map(games.map((g) => [g.slug, g.title]));

/**
 * Дві версії кадру: широка для десктопа й вертикальна для телефона.
 * <Image> міняти джерело за медіа-запитом не вміє, тому збираємо
 * <picture> самі — getImageProps віддає готові srcSet від того самого
 * оптимізатора, що й звичайний <Image>.
 */
function Cover({ app }: { app: (typeof apps)[number] }) {
  const wide = getArt(app.cover);
  const tall = getArt(app.coverTall);
  const alt = `Кадр із гри «${app.title}»`;

  const {
    props: { srcSet: wideSrcSet },
  } = getImageProps({
    src: wide,
    alt,
    width: wide.width,
    height: wide.height,
    sizes: "(min-width: 1280px) 1280px, 96vw",
  });

  const {
    props: { srcSet: tallSrcSet, ...rest },
  } = getImageProps({
    src: tall,
    alt,
    width: tall.width,
    height: tall.height,
    sizes: "96vw",
  });

  return (
    <picture>
      <source media="(min-width: 640px)" srcSet={wideSrcSet} sizes="(min-width: 1280px) 1280px, 96vw" />
      <img
        {...rest}
        srcSet={tallSrcSet}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
    </picture>
  );
}

export default function Apps() {
  return (
    <Section id="apps">
      <header className="mx-auto max-w-2xl text-center">
        <h2 className="text-[clamp(1.9rem,4.5vw,3.25rem)]">Наші ігри</h2>
        <p className="mt-3 text-lg text-ink-soft">
          Чотири застосунки, десять міні-ігор. Усі в розробці — напишіть, і ми повідомимо про реліз.
        </p>
      </header>

      {/* Картки липкі з наростаючим відступом — при скролі вони наїжджають
          одна на одну, і згори видно край попередньої. На телефоні відступ
          менший: інакше низ картки не встигають прочитати до того,
          як наїде наступна. */}
      <ul className="mt-14 space-y-6">
        {apps.map((app, i) => (
          <li
            key={app.slug}
            className="sticky top-[var(--stick-sm)] sm:top-[var(--stick-md)]"
            style={
              {
                "--stick-sm": `${1.25 + i * 0.75}rem`,
                "--stick-md": `${6.5 + i * 1.25}rem`,
              } as React.CSSProperties
            }
          >
            <article className="relative aspect-[2/3] overflow-hidden rounded-[2rem] ring-1 ring-ink/10 sm:aspect-[1881/836]">
              <Cover app={app} />

              {/* Текстовий блок унизу, з відступом 8px від краю картки.
                  На телефоні — на всю ширину: у вертикальних кадрах низ порожній.
                  На десктопі — зліва: у широких кадрах персонаж дістає майже до
                  низу, і блок на всю ширину його б перекривав. */}
              <div className="absolute right-2 bottom-2 left-2 rounded-[1.5rem] bg-white/95 p-5 backdrop-blur-sm sm:right-auto sm:max-w-[27rem] sm:p-7">
                <span className="inline-block rounded-full bg-honey px-3 py-1 text-sm font-bold">
                  Скоро
                </span>
                <h3 className="mt-3.5 text-2xl sm:text-3xl">{app.title}</h3>
                <p className={`mt-1 font-bold ${tones[app.tone as Tone].text}`}>{app.tagline}</p>
                <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">{app.description}</p>

                <ul className="mt-7 flex flex-wrap gap-2">
                  {app.games.map((slug) => (
                    <li
                      key={slug}
                      className="rounded-full bg-paper-deep px-3 py-1 text-sm font-semibold text-ink-soft"
                    >
                      {titleBySlug.get(slug) ?? slug}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
