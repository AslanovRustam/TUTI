"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Кнопка «скопіювати посилання».
 *
 * Єдине місце на сторінці статті, якому потрібен клієнтський код —
 * решта кнопок поділитися це звичайні посилання.
 */
export default function CopyLink({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Буфер може бути недоступний (немає https або користувач заборонив) —
      // тоді просто нічого не повідомляємо, посилання лишається в адресі.
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="bg-paper-deep ease-bounce hover:bg-sun-soft inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-bold transition-transform duration-300 hover:-translate-y-0.5"
    >
      <svg
        aria-hidden="true"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {copied ? (
          <path d="M4 12.5 9.5 18 20 6.5" />
        ) : (
          <path d="M10 13.5a4 4 0 0 0 6 .5l2.5-2.5a4 4 0 0 0-5.7-5.7L11.5 7M14 10.5a4 4 0 0 0-6-.5l-2.5 2.5a4 4 0 0 0 5.7 5.7L12.5 17" />
        )}
      </svg>
      {copied ? "Скопійовано" : "Копіювати"}
      <span aria-live="polite" className="sr-only">
        {copied ? "Посилання скопійовано" : ""}
      </span>
    </button>
  );
}
