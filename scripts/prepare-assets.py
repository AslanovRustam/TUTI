"""
Готує вихідні матеріали з _source/screenshots до src/assets.

- обрізає інтерфейс Procreate зі скріншотів
- ріже широкий рівень на кадр + панораму
- вирізає персонажів із рівного сірого тла в прозорий PNG
- дає осмислені імена файлів

Запуск:  python scripts/prepare-assets.py
Потрібно: pip install pillow
"""

import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "_source" / "screenshots"
ILLUS = ROOT / "_source" / "illustrations"
OUT_ILLUS = ROOT / "assets" / "illustrations"
APPCOVERS = ROOT / "_source" / "app-covers"
OUT_APPCOVERS = ROOT / "assets" / "app-covers"
SOCIAL = ROOT / "_source" / "social" / "social"
OUT_SOCIAL = ROOT / "assets" / "social"
FACES = ROOT / "_source" / "faces"
OUT_FACES = ROOT / "assets" / "faces"
DECOR = ROOT / "_source" / "decor"
OUT_DECOR = ROOT / "assets" / "decor"
CURSORS = ROOT / "_source" / "cursors"
OUT_CURSORS = ROOT / "assets" / "cursors"
OUT_GAMES = ROOT / "assets" / "games"
OUT_CHARS = ROOT / "assets" / "characters"

JPG_QUALITY = 86
MAGIC = (255, 0, 255)


def p(name: str) -> Path:
    return SRC / f"photo_2026-09-10_{name}.jpg"


# (вихідний кадр, ім'я на виході, рамка обрізки або None)
SCENES = [
    # Приготуй борщ
    ("11-59-38", "borsch-01", None),
    ("11-59-40", "borsch-02", None),
    ("11-59-41", "borsch-03", None),
    ("11-59-42", "borsch-04", None),
    # Сортуй за кольором (рюкзаки)
    ("12-00-29", "backpacks-01", None),
    ("12-00-30", "backpacks-02", None),
    # Біба в Карпатах
    ("12-00-33", "biba-sled", (63, 84, 894, 925)),
    ("12-00-34", "biba-snowmobile", (63, 84, 894, 925)),
    # Збери картину (табір)
    ("12-01-55", "camp-01", None),
    ("12-01-56", "camp-02", None),
    ("12-01-58", "camp-silhouettes", None),
    # Великий і малий (хата)
    ("12-02-02", "hut-before", (93, 93, 1169, 897)),
    ("12-02-04", "hut-dressed", None),
    ("12-02-08", "hut-sweaters", None),
]

# Аркуші персонажів — лишаються як є, тло вже біле
SHEETS = [
    ("11-59-28", "biba-turnaround"),
    ("12-01-59", "cast-turnaround"),
    ("12-02-00", "cast-turnaround-dressed"),
]

# Рівне сіре тло -> прозорий PNG
CUTOUTS = [
    ("12-02-05", "bear-squirrel-base"),
    ("12-02-06", "bear-squirrel-overalls"),
    ("12-02-07", "bear-squirrel-bags"),
]


def save_jpg(im: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    im.convert("RGB").save(path, quality=JPG_QUALITY, optimize=True, progressive=True)
    print(f"  {path.relative_to(ROOT)}  {im.size[0]}x{im.size[1]}")


def cutout(im: Image.Image) -> Image.Image:
    """Заливає тло від кутів і робить його прозорим із м'яким краєм."""
    flat = im.convert("RGB")
    w, h = flat.size
    for seed in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]:
        ImageDraw.floodfill(flat, seed, MAGIC, thresh=42)

    import numpy as np

    arr = np.array(flat)
    bg = (arr[:, :, 0] == MAGIC[0]) & (arr[:, :, 1] == MAGIC[1]) & (arr[:, :, 2] == MAGIC[2])

    alpha = Image.fromarray(((~bg) * 255).astype("uint8"), mode="L")
    alpha = alpha.filter(ImageFilter.GaussianBlur(0.6))

    out = im.convert("RGBA")
    out.putalpha(alpha)
    return out.crop(out.getbbox())


def copy_illustrations() -> None:
    """Мальовані ілюстрації без ігрового інтерфейсу.

    Кладуться в _source/illustrations під будь-якими іменами — беруться
    як є, тільки перетискаються у WebP і отримують чисте ім'я файлу.
    """
    if not ILLUS.is_dir():
        return
    files = sorted(
        p for p in ILLUS.iterdir() if p.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp"}
    )
    if not files:
        print("Ілюстрації: тека _source/illustrations порожня — пропускаю")
        return

    print("Ілюстрації:")
    OUT_ILLUS.mkdir(parents=True, exist_ok=True)
    for src in files:
        im = Image.open(src)
        if im.mode in ("RGBA", "LA", "P"):
            # прозорість лишаємо і зрізаємо порожні поля — це потрібно лого
            im = im.convert("RGBA")
            box = im.getbbox()
            if box:
                im = im.crop(box)
        else:
            im = im.convert("RGB")
        if im.width > 2000:
            im = im.resize((2000, round(im.height * 2000 / im.width)), Image.LANCZOS)
        out = OUT_ILLUS / f"{src.stem.lower()}.webp"
        im.save(out, quality=86, method=6)
        print(f"  {out.relative_to(ROOT)}  {im.size[0]}x{im.size[1]}")


def copy_social() -> None:
    """Іконки соцмереж: жорсткий колір міняємо на currentColor, щоб вони
    успадковували колір тексту, і прибираємо width/height — розмір задає CSS."""
    if not SOCIAL.is_dir():
        return

    names = {
        "insta": "instagram",
        "telegram": "telegram",
        "youtube": "youtube",
        "linkdin": "linkedin",
    }

    files = sorted(p for p in SOCIAL.iterdir() if p.suffix.lower() == ".svg")
    if not files:
        return

    print("Іконки соцмереж:")
    OUT_SOCIAL.mkdir(parents=True, exist_ok=True)
    for src in files:
        svg = src.read_text(encoding="utf-8")
        svg = re.sub(r'stroke="#[0-9a-fA-F]{3,8}"', 'stroke="currentColor"', svg)
        svg = re.sub(r'\s(?:width|height)="\d+"', "", svg, count=2)
        out = OUT_SOCIAL / f"{names.get(src.stem, src.stem)}.svg"
        out.write_text(svg, encoding="utf-8")
        print(f"  {out.relative_to(ROOT)}")


# Курсори: ширина в CSS-пікселях і гаряча точка в частках кадру.
# Ширини підібрані так, щоб сама рукавичка скрізь виглядала однаково —
# у кадрах із зірочками чи знаком вона займає меншу частку висоти.
# Гарячі точки — верхівка рукавички, а не декору над нею.
#
# Простого пальця (_source/cursors/pointer.png) тут навмисно немає:
# звичайним курсором стала стрілка, а зірочки лишилися ознакою
# клікабельного. Файл лежить у _source, якщо палець захочуть повернути.
CURSOR_SPECS = {
    "default": (30, 0.280, 0.030),
    "cta": (40, 0.450, 0.245),
    "active": (37, 0.380, 0.230),
    "not-allowed": (30, 0.500, 0.330),
    "grab": (30, 0.500, 0.500),
}


def copy_cursors() -> None:
    """Готує по два кадри на курсор: 1x і 2x для image-set.

    Розміри й гарячі точки треба тримати синхронними з app/globals.css —
    у CSS вони записані числами, бо cursor не вміє відсотків.
    """
    if not CURSORS.is_dir():
        return
    print("Курсори:")
    OUT_CURSORS.mkdir(parents=True, exist_ok=True)
    for name, (width, hx, hy) in CURSOR_SPECS.items():
        src = CURSORS / f"{name}.png"
        if not src.is_file():
            print(f"  ! немає {src.relative_to(ROOT)}")
            continue
        im = Image.open(src).convert("RGBA")
        im = im.crop(im.getbbox())
        height = round(im.height * width / im.width)
        for factor, suffix in ((1, ""), (2, "-2x")):
            out = OUT_CURSORS / f"{name}{suffix}.png"
            im.resize((width * factor, height * factor), Image.LANCZOS).save(out, optimize=True)
        print(
            f"  {name:12} {width}x{height}  гаряча точка "
            f"{round(hx * width)} {round(hy * height)}"
        )


def copy_stickers(src_dir: Path, out_dir: Path, label: str, box: int = 1100) -> None:
    """Дрібна графіка з прозорим тлом: мордочки персонажів і декор.

    Береться як є, тільки зрізаються порожні поля по альфі (інакше кожна
    наклейка тягне за собою невидимий запас і її не притиснути до краю
    картки) і зменшується до `box` по довшій стороні.

    `box` навмисно великий: наклейки показуються до ~220 CSS-пікселів,
    а на екранах 2x це вже 440 — з 512 вони милилися.
    """
    if not src_dir.is_dir():
        return
    files = sorted(p for p in src_dir.iterdir() if p.suffix.lower() in {".png", ".webp"})
    if not files:
        return

    print(f"{label}:")
    out_dir.mkdir(parents=True, exist_ok=True)
    for src in files:
        im = Image.open(src).convert("RGBA")
        bbox = im.getbbox()
        if bbox:
            im = im.crop(bbox)
        if max(im.size) > box:
            k = box / max(im.size)
            im = im.resize((round(im.width * k), round(im.height * k)), Image.LANCZOS)
        out = out_dir / f"{src.stem.lower()}.webp"
        im.save(out, quality=92, method=6)
        print(f"  {out.relative_to(ROOT)}  {im.size[0]}x{im.size[1]}")


def copy_app_covers() -> None:
    """Обкладинки застосунків: широкі для десктопа (*-wide) і вертикальні
    для мобільного (*-tall). Персонаж угорі, низ лишений під текстовий блок."""
    if not APPCOVERS.is_dir():
        return
    files = sorted(
        p for p in APPCOVERS.iterdir() if p.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp"}
    )
    if not files:
        return

    print("Обкладинки застосунків:")
    OUT_APPCOVERS.mkdir(parents=True, exist_ok=True)
    for src in files:
        im = Image.open(src).convert("RGB")
        if im.width > 1900:
            im = im.resize((1900, round(im.height * 1900 / im.width)), Image.LANCZOS)
        out = OUT_APPCOVERS / f"{src.stem}.webp"
        im.save(out, quality=86, method=6)
        print(f"  {out.relative_to(ROOT)}  {im.size[0]}x{im.size[1]}")


def main() -> None:
    copy_social()
    copy_cursors()
    copy_stickers(FACES, OUT_FACES, "Мордочки персонажів")
    copy_stickers(DECOR, OUT_DECOR, "Декор")
    copy_app_covers()
    copy_illustrations()

    print("Сцени ігор:")
    for name, out, box in SCENES:
        im = Image.open(p(name))
        if box:
            im = im.crop(box)
        save_jpg(im, OUT_GAMES / f"{out}.jpg")

    # Сцена табору без ігрової панелі справа — для героя на сайті
    camp = Image.open(p("12-01-55"))
    save_jpg(camp.crop((0, 0, 1086, camp.height)), OUT_GAMES / "camp-clean.jpg")

    sil = Image.open(p("12-01-58"))
    save_jpg(sil.crop((0, 0, 1086, sil.height)), OUT_GAMES / "camp-silhouettes-clean.jpg")

    # Широкий рівень: ігровий кадр + панорама на всю ширину
    wide = Image.open(p("12-01-53"))
    save_jpg(wide.crop((0, 0, 632, wide.height)), OUT_GAMES / "biba-level.jpg")
    save_jpg(wide, OUT_GAMES / "biba-level-wide.jpg")

    print("Аркуші персонажів:")
    for name, out in SHEETS:
        save_jpg(Image.open(p(name)), OUT_CHARS / f"{out}.jpg")

    print("Вирізані персонажі:")
    OUT_CHARS.mkdir(parents=True, exist_ok=True)
    for name, out in CUTOUTS:
        im = cutout(Image.open(p(name)))
        # WebP, а не PNG: із прозорістю ті самі кадри важать у ~10 разів менше
        # (0.8 MB -> 80 KB), і в збірку не тягнеться зайве.
        path = OUT_CHARS / f"{out}.webp"
        im.save(path, quality=90, method=6)
        print(f"  {path.relative_to(ROOT)}  {im.size[0]}x{im.size[1]}")


if __name__ == "__main__":
    main()
