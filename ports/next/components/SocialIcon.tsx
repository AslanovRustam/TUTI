import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Іконка соцмережі. SVG лежать у assets/social — ті самі файли, що й
 * в Astro-версії, з stroke="currentColor". Читаємо їх на сервері під
 * час збірки, тож у клієнт їде вже готова розмітка.
 */
type Props = {
  name: string;
  className?: string;
};

const DIR = join(process.cwd(), "assets", "social");
const cache = new Map<string, string>();

function read(name: string): string {
  const key = name.toLowerCase();
  if (!cache.has(key)) {
    try {
      cache.set(key, readFileSync(join(DIR, `${key}.svg`), "utf8"));
    } catch {
      throw new Error(`Немає іконки "${name}" у assets/social`);
    }
  }
  return cache.get(key)!;
}

export default function SocialIcon({ name, className = "" }: Props) {
  return (
    <span
      aria-hidden="true"
      className={["block h-6 w-6 [&>svg]:h-full [&>svg]:w-full", className].join(" ")}
      dangerouslySetInnerHTML={{ __html: read(name) }}
    />
  );
}
