// TUTI Games — увесь скрипт сторінки. Два незалежні шматки:
// поява блоків при скролі та шапка з мобільним меню.
// Більше на сторінці JS немає.

// ── Поява блоків при скролі ──────────────────────────────────────────
// Стан двобічний: блок згортається, коли йде з екрана, тож анімація
// однаково грає і вниз, і вгору.
//
// Блоки сховані засобами CSS, тому будь-який шлях, на якому спостерігач
// не запрацює, мусить показати їх одразу: вимкнений JS — <noscript>
// у розмітці; «менше руху» або старий браузер — гілка showAll.
(() => {
  const items = document.querySelectorAll(".reveal");
  const showAll = () => items.forEach((el) => el.classList.add("is-visible"));

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced || !("IntersectionObserver" in window)) {
    showAll();
    return;
  }

  // Блок із data-watch-parent анімується сам, а стежимо за його батьком:
  // трансформація зсуває рамку елемента, і спостереження за ним самим
  // дає блимання на межі екрана.
  const watched = new Map();
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
})();

// ── Шапка й мобільне меню ────────────────────────────────────────────
(() => {
  const bar = document.querySelector("[data-bar]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");
  const barTop = document.querySelector("[data-bar-top]");
  const barMid = document.querySelector("[data-bar-mid]");
  const barBot = document.querySelector("[data-bar-bot]");

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

  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });

  function setOpen(open) {
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

  toggle?.addEventListener("click", () => setOpen(menu ? menu.hidden !== false : false));

  for (const link of document.querySelectorAll("[data-menu-link]")) {
    link.addEventListener("click", () => setOpen(false));
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
})();
