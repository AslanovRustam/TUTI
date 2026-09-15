/**
 * Доступ до картинок за іменем файлу (без розширення).
 *
 * Astro вимагає статичних імпортів, щоб оптимізувати зображення,
 * тому збираємо їх через import.meta.glob і віддаємо за ключем —
 * так у site.ts можна писати просто "borsch-01".
 */

type Asset = { default: ImageMetadata };

const gameFiles = import.meta.glob<Asset>("../assets/games/*.{jpg,png,webp}", { eager: true });
const charFiles = import.meta.glob<Asset>("../assets/characters/*.{jpg,png,webp}", { eager: true });
const illusFiles = import.meta.glob<Asset>("../assets/illustrations/*.{jpg,png,webp}", {
  eager: true,
});
const appFiles = import.meta.glob<Asset>("../assets/app-covers/*.{jpg,png,webp}", { eager: true });

function index(files: Record<string, Asset>): Record<string, ImageMetadata> {
  const out: Record<string, ImageMetadata> = {};
  for (const [path, mod] of Object.entries(files)) {
    const key = path
      .split("/")
      .pop()!
      .replace(/\.(jpg|png|webp)$/, "");
    out[key] = mod.default;
  }
  return out;
}

export const gameArt = index(gameFiles);
export const charArt = index(charFiles);
export const illusArt = index(illusFiles);
export const appArt = index(appFiles);

/** Кидає зрозумілу помилку на збірці, якщо в контенті є друкарська помилка. */
export function art(name: string): ImageMetadata {
  const found = appArt[name] ?? illusArt[name] ?? gameArt[name] ?? charArt[name];
  if (!found) {
    throw new Error(
      `Немає зображення "${name}". Доступні: ${[...Object.keys(appArt), ...Object.keys(illusArt), ...Object.keys(gameArt), ...Object.keys(charArt)].join(", ")}`,
    );
  }
  return found;
}
