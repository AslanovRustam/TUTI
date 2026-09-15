"use client";

import { useEffect } from "react";

/**
 * Увесь клієнтський код сторінки: поява блоків при скролі та шапка
 * з мобільним меню. В Astro-версії це були два інлайн-скрипти.
 *
 * Компонент нічого не малює — лише навішує обробники після монтування.
 */
export default function SiteScripts() {
  // ── Поява блоків при скролі ────────────────────────────────────────
  // Стан двобічний: блок згортається, коли йде з екрана, тож анімація
  // однаково грає і вниз, і вгору.
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(".reveal");
    const showAll = () => items.forEach((el) => el.classList.add("is-visible"));

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      showAll();
      return;
    }

    // Блок із data-watch-parent анімується сам, а стежимо за його батьком:
    // трансформація зсуває рамку елемента, і спостереження за ним самим
    // дає блимання на межі екрана.
    const watched = new Map<Element, HTMLElement>();
    for (const item of items) {
      const target = item.hasAttribute("data-watch-parent") ? (item.parentElement ?? item) : item;
      watched.set(target, item);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          watched.get(entry.target)?.classList.toggle("is-visible", entry.isIntersecting);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.04 },
    );

    for (const target of watched.keys()) observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // ── Шапка й мобільне меню ──────────────────────────────────────────
  useEffect(() => {
    const bar = document.querySelector<HTMLElement>("[data-bar]");
    const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
    const menu = document.querySelector<HTMLElement>("[data-menu]");
    const barTop = document.querySelector<HTMLElement>("[data-bar-top]");
    const barMid = document.querySelector<HTMLElement>("[data-bar-mid]");
    const barBot = document.querySelector<HTMLElement>("[data-bar-bot]");

    // «Острівець» вмикається після скролу або поки відкрите мобільне меню —
    // інакше крізь нього просвічує текст сторінки. Перемикаємо тільки тло:
    // утиліти відступів конфліктували б із базовими, а хто з них виграє,
    // вирішує порядок у CSS, а не порядок класів на елементі.
    const FLOATING = ["bg-white"];

    function syncHeader() {
      if (!bar) return;
      const on = window.scrollY > 12 || menu?.hidden === false;
      for (const cls of FLOATING) bar.classList.toggle(cls, on);
    }

    function setOpen(open: boolean) {
      if (!menu || !toggle) return;
      menu.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
      syncHeader();
      barMid?.classList.toggle("opacity-0", open);
      barTop?.classList.toggle("translate-y-[6px]", open);
      barTop?.classList.toggle("rotate-45", open);
      barBot?.classList.toggle("-translate-y-[6px]", open);
      barBot?.classList.toggle("-rotate-45", open);
    }

    const onToggle = () => setOpen(menu ? menu.hidden !== false : false);
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onLink = () => setOpen(false);
    const links = document.querySelectorAll("[data-menu-link]");

    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });
    toggle?.addEventListener("click", onToggle);
    links.forEach((l) => l.addEventListener("click", onLink));
    document.addEventListener("keydown", onEscape);

    return () => {
      window.removeEventListener("scroll", syncHeader);
      toggle?.removeEventListener("click", onToggle);
      links.forEach((l) => l.removeEventListener("click", onLink));
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  return null;
}
