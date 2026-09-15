import Section from "@/components/Section";
import SocialIcon from "@/components/SocialIcon";
import { contact } from "@/content/site";

export default function Contact() {
  return (
    <Section id="contact" tone="coral" className="mt-5 text-center">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-[clamp(2rem,5.5vw,3.75rem)]">{contact.title}</h2>

        <p className="mx-auto mt-3 max-w-lg text-lg">{contact.lead}</p>

        <a
          href={`mailto:${contact.email}`}
          className="card mt-10 inline-block rounded-full bg-white px-7 py-4 text-[clamp(1.05rem,3.5vw,1.6rem)] font-extrabold break-all"
        >
          {contact.email}
        </a>

        <ul className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
          {contact.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white/75 py-2 pr-4 pl-3 text-sm font-bold transition-all duration-300 ease-bounce hover:-translate-y-1 hover:bg-white"
              >
                <SocialIcon name={social.label} className="h-5 w-5" />
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
