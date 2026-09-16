import Image from "next/image";

import Button from "@/components/Button";
import Section from "@/components/Section";
import { getArt } from "@/content/images";
import { careers, contact } from "@/content/site";

export default function Careers() {
  const hasOpenings = careers.openings.length > 0;

  return (
    <Section id="careers" tone="honey">
      <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-6">
        <div>
          <h2 className="text-[clamp(1.9rem,4.5vw,3.25rem)]">{careers.title}</h2>
          <p className="mt-3 text-lg">{careers.lead}</p>

          {hasOpenings ? (
            <ul className="mt-9 space-y-3">
              {careers.openings.map((job) => (
                <li key={job.title} className="card rounded-[1.75rem] bg-white p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-xl">{job.title}</h3>
                    <span className="text-ink-soft text-sm font-bold">{job.type}</span>
                  </div>
                  <p className="text-ink-soft mt-2 text-[0.95rem]">{job.text}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-9 rounded-[1.75rem] bg-white p-7 sm:p-8">
              <h3 className="text-xl sm:text-2xl">{careers.fallback.title}</h3>
              <p className="text-ink-soft mt-3 leading-relaxed">{careers.fallback.text}</p>
              <Button href={`mailto:${contact.email}?subject=Портфоліо`} className="mt-6">
                {careers.fallback.cta}
              </Button>
            </div>
          )}

          <ul className="bg-honey-soft mt-5 rounded-[1.75rem] p-6 sm:p-7">
            {careers.perks.map((perk, i) => (
              <li
                key={perk}
                className={["flex items-start gap-3 font-semibold", i > 0 ? "mt-3" : ""].join(" ")}
              >
                <span
                  aria-hidden="true"
                  className="bg-honey-deep/50 mt-2 block h-2 w-2 shrink-0 rounded-full"
                />
                {perk}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:mx-0 lg:ml-auto">
          <div className="overflow-hidden rounded-[2rem]">
            <Image
              src={getArt(careers.cover)}
              alt={careers.coverAlt}
              sizes="(min-width: 1024px) 384px, 90vw"
              className="block aspect-[3/4] w-full object-cover object-top"
            />
          </div>

          {/* Дзеркальний нахил до героя: там смужки дивляться вліво-вгору,
              тут — вправо-вгору, бо кут картинки правий. */}
          <Image
            src={getArt("decor-lines")}
            alt=""
            quality={90}
            sizes="192px"
            className="pointer-events-none absolute -top-8 -right-4 h-auto w-20 rotate-[40deg] sm:-top-10 sm:-right-8 sm:w-24"
          />
        </div>
      </div>
    </Section>
  );
}
