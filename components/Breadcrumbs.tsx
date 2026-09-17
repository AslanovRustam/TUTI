import Link from "next/link";

/**
 * Хлібні крихти. Останній пункт — сама сторінка, тому він без посилання
 * і позначений aria-current.
 */
type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Ви тут">
      <ol className="text-ink-soft flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden="true" className="text-ink/25">
                /
              </span>
            )}

            {item.href ? (
              <Link href={item.href} className="hover:text-ink hover:underline">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink line-clamp-1">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
