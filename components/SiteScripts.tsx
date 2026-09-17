"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Увесь клієнтський код сторінки: поява блоків при скролі та шапка
 * з мобільним меню. В Astro-версії це були два інлайн-скрипти.
 *
 * Компонент нічого не малює — лише навішує обробники після монтування.
 */
export default function SiteScripts() {
  // Перехід між сторінками не перемонтовує цей компонент, тож без
  // залежності від шляху спостерігач лишався б на старій розмітці,
  // а блоки нової сторінки назавжди застрягли б прозорими.
  const pathname = usePathname();

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
  }, [pathname]);

  // ── Іскри за курсором ──────────────────────────────────────────────
  // Тільки для мишки: на тачскріні курсора немає, а pointermove там
  // приходить під час скролу й сипав би зірки посеред жесту.
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const layer = document.createElement("div");
    layer.className = "spark-layer";
    layer.setAttribute("aria-hidden", "true");
    document.body.appendChild(layer);

    // Іскра народжується не частіше ніж раз на 80 мс і не ближче ніж за
    // 30 px від попередньої — інакше за курсором тягнеться суцільна смуга.
    let lastX = 0;
    let lastY = 0;
    let nextAt = 0;

    const onMove = (event: PointerEvent) => {
      const now = performance.now();
      if (now < nextAt) return;

      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      if (dx * dx + dy * dy < 900) return;

      lastX = event.clientX;
      lastY = event.clientY;
      nextAt = now + 80;

      const spark = document.createElement("span");
      spark.className = "spark";
      spark.style.setProperty("--spark-size", `${8 + Math.random() * 10.4}px`);
      spark.style.setProperty("--spark-spin", `${Math.random() * 90 - 45}deg`);
      spark.style.left = `${event.clientX + (Math.random() * 20 - 10)}px`;
      spark.style.top = `${event.clientY + (Math.random() * 20 - 10)}px`;
      spark.addEventListener("animationend", () => spark.remove(), { once: true });
      layer.appendChild(spark);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      layer.remove();
    };
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
