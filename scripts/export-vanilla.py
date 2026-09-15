"""
Збирає ванільну версію сайту з готової збірки Astro.

Береться саме зібраний dist/, а не вихідники: так верстка й вигляд
збігаються з оригіналом точно, без ризику розійтися при ручному
переписуванні. На виході — самодостатня тека, яку можна віддавати
на будь-який хостинг і правити руками:

    ports/vanilla/
      index.html      — уся розмітка, відформатована
      styles.css      — увесь CSS (згенерував Tailwind, але це звичайний CSS)
      main.js         — два скрипти: поява блоків і шапка з меню
      assets/         — картинки, шрифти, фавікони з людськими іменами

Запуск:  npm run build && python scripts/export-vanilla.py
"""

import re
import shutil
import subprocess
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
OUT = ROOT / "ports" / "vanilla"
ASSETS = OUT / "assets"

ASSET_RE = re.compile(r"/_astro/([A-Za-z0-9._\-]+?)\.([A-Za-z0-9_-]+)\.(webp|css|woff2|js|png|jpg|svg)")


def clean_name(stem: str, ext: str, path: Path) -> str:
    """Ім'я без хешів. Для картинок додаємо ширину, бо одна вихідна
    картинка дає кілька розмірів і без цього вони б перетерлися."""
    if ext == "webp":
        with Image.open(path) as im:
            return f"{stem}-{im.width}.webp"
    return f"{stem}.{ext}"


def collect(text: str, mapping: dict[str, str]) -> str:
    """Замінює посилання /_astro/... на assets/... і копіює файли."""

    def swap(m: re.Match) -> str:
        stem, _hash, ext = m.group(1), m.group(2), m.group(3)
        src = DIST / "_astro" / f"{stem}.{_hash}.{ext}"
        if not src.exists():
            return m.group(0)
        if m.group(0) not in mapping:
            name = clean_name(stem, ext, src)
            shutil.copy2(src, ASSETS / name)
            mapping[m.group(0)] = name
        return f"assets/{mapping[m.group(0)]}"

    return ASSET_RE.sub(swap, text)


def prettify(path: Path, parser: str) -> None:
    """Prettier уже є в проєкті — проганяємо через нього, щоб файли
    були читабельні, а не в один рядок після мініфікації."""
    try:
        subprocess.run(
            ["npx", "prettier", "--write", "--parser", parser, str(path)],
            cwd=ROOT,
            check=True,
            capture_output=True,
            shell=True,
        )
    except subprocess.CalledProcessError as e:
        print(f"  ! prettier не впорався з {path.name}: {e.stderr.decode(errors='replace')[:200]}")


def main() -> None:
    html_path = DIST / "index.html"
    if not html_path.exists():
        raise SystemExit("Немає dist/index.html — спершу `npm run build`")

    # Чистимо вміст, а не саму теку: на Windows її може тримати
    # відкритий провідник або редактор, і rmdir тоді падає.
    ASSETS.mkdir(parents=True, exist_ok=True)
    for item in OUT.iterdir():
        if item.is_dir():
            shutil.rmtree(item, ignore_errors=True)
        else:
            item.unlink(missing_ok=True)
    ASSETS.mkdir(parents=True, exist_ok=True)

    html = html_path.read_text(encoding="utf-8")
    mapping: dict[str, str] = {}

    # 1. Скрипти. Зі збірки вони вийшли б мініфікованими, тому беремо
    #    читабельну версію з scripts/vanilla-main.js — це той самий код,
    #    що й у Layout.astro та Header.astro, лише без TypeScript.
    shutil.copy2(ROOT / "scripts" / "vanilla-main.js", OUT / "main.js")
    html = re.sub(r'<script type="module">.*?</script>', "", html, flags=re.S)

    # 2. CSS — окремим файлом
    css_match = re.search(r'<link rel="stylesheet" href="(/_astro/[^"]+\.css)"', html)
    if not css_match:
        raise SystemExit("Не знайшов посилання на CSS у dist/index.html")
    css_src = DIST / css_match.group(1).lstrip("/")
    css = collect(css_src.read_text(encoding="utf-8"), mapping)
    (OUT / "styles.css").write_text(css, encoding="utf-8")
    html = html.replace(css_match.group(0), '<link rel="stylesheet" href="styles.css"')

    # 3. Картинки в розмітці
    html = collect(html, mapping)

    # 4. Фавікони
    for name in ("favicon.svg", "favicon.ico"):
        src = DIST / name
        if src.exists():
            shutil.copy2(src, ASSETS / name)
            html = html.replace(f'href="/{name}"', f'href="assets/{name}"')

    # 5. Підключаємо винесений скрипт
    html = html.replace("</body>", '  <script type="module" src="main.js"></script>\n</body>')

    (OUT / "index.html").write_text(html, encoding="utf-8")

    print("Форматую…")
    prettify(OUT / "index.html", "html")
    prettify(OUT / "styles.css", "css")
    prettify(OUT / "main.js", "babel")

    imgs = len([p for p in ASSETS.iterdir() if p.suffix == ".webp"])
    fonts = len([p for p in ASSETS.iterdir() if p.suffix == ".woff2"])
    print(f"\nports/vanilla готова:")
    print(f"  index.html  {len((OUT / 'index.html').read_text(encoding='utf-8')) / 1024:.1f} KB")
    print(f"  styles.css  {len((OUT / 'styles.css').read_text(encoding='utf-8')) / 1024:.1f} KB")
    print(f"  main.js     {len((OUT / 'main.js').read_text(encoding='utf-8')) / 1024:.1f} KB")
    print(f"  assets/     {imgs} картинок, {fonts} шрифтів")


if __name__ == "__main__":
    main()
