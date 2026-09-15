/**
 * Кольорові теми блоків.
 *
 * Класи записані повними рядками навмисно: Tailwind сканує вихідний
 * код і не побачить клас, зібраний через конкатенацію на льоту.
 *
 * `text` — окремий темний варіант: solid-кольори на світлому тлі
 * дають 1.4–2.4:1 і не проходять WCAG AA.
 */

export type Tone = "sky" | "grass" | "honey" | "coral" | "berry";

export const tones: Record<Tone, { solid: string; soft: string; text: string; dot: string }> = {
  sky: { solid: "bg-sky", soft: "bg-sky-soft", text: "text-sky-deep", dot: "bg-sky" },
  grass: { solid: "bg-grass", soft: "bg-grass-soft", text: "text-grass-deep", dot: "bg-grass" },
  honey: { solid: "bg-honey", soft: "bg-honey-soft", text: "text-honey-deep", dot: "bg-honey" },
  coral: { solid: "bg-coral", soft: "bg-coral-soft", text: "text-coral-deep", dot: "bg-coral" },
  berry: { solid: "bg-berry", soft: "bg-berry-soft", text: "text-berry-deep", dot: "bg-berry" },
};
