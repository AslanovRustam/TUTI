/**
 * Транслітерація українського тексту в якір.
 *
 * Потрібна для посилань на заголовки всередині статті: кирилиця в
 * адресі працює, але при копіюванні перетворюється на %D0%B7%D0%B0…
 * і посилання стає нечитабельним.
 *
 * Спрощена КМУ-2010: на початку слова є/ї/й/ю/я дають ye/yi/y/yu/ya,
 * усередині — ie/i/i/iu/ia.
 */
const HEAD: Record<string, string> = {
  є: "ye",
  ї: "yi",
  й: "y",
  ю: "yu",
  я: "ya",
};

const BODY: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "h",
  ґ: "g",
  д: "d",
  е: "e",
  є: "ie",
  ж: "zh",
  з: "z",
  и: "y",
  і: "i",
  ї: "i",
  й: "i",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "kh",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "shch",
  ь: "",
  ю: "iu",
  я: "ia",
};

export function slugify(text: string): string {
  let out = "";
  let atWordStart = true;

  for (const raw of text.toLowerCase()) {
    const letter = (atWordStart ? HEAD[raw] : undefined) ?? BODY[raw];

    if (letter !== undefined) {
      out += letter;
      atWordStart = false;
    } else if (/[a-z0-9]/.test(raw)) {
      out += raw;
      atWordStart = false;
    } else {
      out += "-";
      atWordStart = true;
    }
  }

  return out.replace(/-+/g, "-").replace(/^-|-$/g, "");
}
