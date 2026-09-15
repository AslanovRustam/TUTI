import Image from "next/image";

import Section from "@/components/Section";
import { getArt } from "@/content/images";
import { about } from "@/content/site";

export default function About() {
  return (
    <Section id="about">
      <h2 className="mx-auto max-w-3xl text-center text-[clamp(1.9rem,4.5vw,3.25rem)]">
        {about.title}
      </h2>

      {/* Бенто: велика ілюстрація, під нею — пункти на підкладках */}
      <div className="mt-12 grid gap-4">
        <div className="overflow-hidden rounded-[2rem]">
          <Image
            src={getArt(about.cover)}
            alt={about.coverAlt}
            sizes="(min-width: 1280px) 1280px, 96vw"
            className="block w-full"
          />
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {about.values.map((value) => (
            <li key={value.title} className="rounded-[1.5rem] bg-paper-deep p-6">
              <h3 className="text-lg">{value.title}</h3>
              <p className="mt-2.5 leading-relaxed text-ink-soft">{value.text}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 max-w-4xl space-y-5">
        <p className="text-[clamp(1.15rem,2.2vw,1.5rem)] leading-snug font-bold">{about.lead}</p>
        {about.story.map((para) => (
          <p key={para} className="text-lg leading-relaxed font-semibold text-ink-soft">
            {para}
          </p>
        ))}
      </div>
    </Section>
  );
}
