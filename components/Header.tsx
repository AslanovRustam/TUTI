import Link from "next/link";

import Wordmark from "./Wordmark";
import { nav } from "@/content/site";

export default function Header() {
  return (
    <header
      id="site-header"
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      data-header
    >
      {/* Після скролу смуга стискається в «острівець»: білий фон
          вмикається класом із SiteScripts. */}
      <div
        data-bar
        className="ease-soft mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-300 sm:px-6"
      >
        <Wordmark />

        <nav aria-label="Головна навігація" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:bg-ink hover:text-paper inline-block rounded-full px-4 py-2 text-[0.95rem] font-bold transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          data-menu-toggle
          aria-expanded="false"
          aria-controls="mobile-menu"
          className="bg-paper-deep ease-bounce grid h-10 w-10 place-items-center rounded-full transition-transform duration-300 hover:-translate-y-0.5 md:hidden"
        >
          <span className="sr-only">Меню</span>
          <span aria-hidden="true" className="relative block h-3.5 w-4.5">
            <span
              className="bg-ink absolute inset-x-0 top-0 h-[2px] rounded-full transition-transform duration-300"
              data-bar-top
            />
            <span
              className="bg-ink absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full transition-opacity duration-200"
              data-bar-mid
            />
            <span
              className="bg-ink absolute inset-x-0 bottom-0 h-[2px] rounded-full transition-transform duration-300"
              data-bar-bot
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        data-menu
        hidden
        className="mx-auto mt-2 max-w-7xl rounded-[1.75rem] bg-white p-3 md:hidden"
      >
        <ul className="flex flex-col gap-0.5">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                data-menu-link
                className="hover:bg-paper-deep block rounded-[1.1rem] px-4 py-3 text-lg font-bold"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
