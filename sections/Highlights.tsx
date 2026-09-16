import Image from "next/image";

import Section from "@/components/Section";
import { getArt } from "@/content/images";
import { highlights } from "@/content/site";

export default function Highlights() {
  return (
    <Section tone="sky">
      <header className="mx-auto max-w-2xl text-center">
        <h2 className="text-[clamp(1.9rem,4.5vw,3.25rem)]">Що в роботі</h2>
        <p className="mt-3 text-lg">Ігри, які малюємо просто зараз</p>
      </header>

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((item, i) => (
          <li
            key={item.title}
            className="reveal reveal-card card flex flex-col bg-white p-4"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <Image
              src={getArt(item.cover)}
              alt=""
              sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
              className="block aspect-[4/3] w-full rounded-[1.25rem] object-cover"
            />

            <div className="flex flex-1 flex-col px-2 pt-5 pb-2">
              <h3 className="text-lg">{item.title}</h3>
              <p className="text-ink-soft mt-2.5 text-[0.95rem] leading-relaxed">{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
