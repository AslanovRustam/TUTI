import SocialIcon from "./SocialIcon";
import Wordmark from "./Wordmark";
import { contact, footer, nav, site } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="stars relative px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 text-center lg:grid-cols-3 lg:items-start lg:text-left">
          <div>
            <Wordmark size="md" className="mx-auto lg:mx-0" />
            <p className="text-ink-soft mx-auto mt-4 max-w-sm text-sm leading-relaxed lg:mx-0">
              {footer.note}
            </p>
          </div>

          {/* Посередині — навігація рядком, без заголовка, і соцмережі під нею */}
          <div className="flex flex-col items-center gap-5">
            <nav aria-label="Розділи сайту">
              <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="text-sm font-semibold hover:underline">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <ul className="flex items-center justify-center gap-2.5">
              {contact.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-paper-deep ease-bounce hover:bg-honey grid h-11 w-11 place-items-center rounded-full transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <SocialIcon name={social.label} className="h-5 w-5" />
                    <span className="sr-only">{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:text-right">
            <h2 className="text-base font-bold">Зв&apos;язок</h2>
            <a
              href={`mailto:${contact.email}`}
              className="text-ink-soft hover:text-ink mt-3 inline-block text-sm hover:underline"
            >
              {contact.email}
            </a>
          </div>
        </div>

        <div className="border-ink/10 mt-12 flex flex-col items-center gap-4 border-t pt-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-ink-soft text-sm">
            © {year} {site.name}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {footer.legal.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-ink-soft hover:text-ink text-sm hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
