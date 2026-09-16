import Image from "next/image";

import Section from "@/components/Section";
import { getArt } from "@/content/images";
import { about } from "@/content/site";

// Кожна мордочка гойдається у свій бік і у своєму темпі — інакше чотири
// однакові рухи поруч читаються як миготіння, а не як живий декор.
type FloatStyle = React.CSSProperties & { "--float-tilt": string };

const FLOAT: FloatStyle[] = [
  { "--float-tilt": "-5deg", animationDuration: "6s" },
  { "--float-tilt": "4deg", animationDuration: "7s", animationDelay: "-2s" },
  { "--float-tilt": "-3deg", animationDuration: "6.5s", animationDelay: "-4s" },
  { "--float-tilt": "6deg", animationDuration: "7.5s", animationDelay: "-1s" },
];

export default function About() {
  return (
    <Section id="about">
      <h2 className="mx-auto max-w-3xl text-center text-[clamp(1.9rem,4.5vw,3.25rem)]">
        {about.title}
      </h2>

      {/* Мордочки визирають з-над карток, тому в списку є верхній відступ
          під них, а самі картки тягнуться на однакову висоту. */}
      <ul className="mt-24 grid gap-x-4 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
        {about.values.map((value, i) => (
          <li
            key={value.title}
            className="bg-paper-deep relative flex flex-col rounded-[1.5rem] px-6 pt-20 pb-10"
          >
            <Image
              src={getArt(value.face)}
              alt={value.faceAlt}
              quality={90}
              sizes="256px"
              style={FLOAT[i % FLOAT.length]}
              className="animate-float absolute -top-12 left-5 h-auto w-28"
            />
            <h3 className="text-lg">{value.title}</h3>
            <p className="text-ink-soft mt-2.5 leading-relaxed">{value.text}</p>
          </li>
        ))}
      </ul>

      <div className="mt-16 max-w-4xl space-y-5">
        <p className="text-[clamp(1.15rem,2.2vw,1.5rem)] leading-snug font-bold">{about.lead}</p>
        {about.story.map((para) => (
          <p key={para} className="text-ink-soft text-lg leading-relaxed font-semibold">
            {para}
          </p>
        ))}
      </div>
    </Section>
  );
}
