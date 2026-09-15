/**
 * Доступ до картинок за іменем.
 *
 * В Astro-версії це робив import.meta.glob, у Next такого немає —
 * тому імпорти прописані явно. Плюс: помилку в імені видно одразу,
 * бо TypeScript знає всі ключі.
 */
import type { StaticImageData } from "next/image";

import backpacks01 from "@/assets/games/backpacks-01.jpg";
import backpacks02 from "@/assets/games/backpacks-02.jpg";
import bibaLevel from "@/assets/games/biba-level.jpg";
import bibaSled from "@/assets/games/biba-sled.jpg";
import borsch01 from "@/assets/games/borsch-01.jpg";
import borsch02 from "@/assets/games/borsch-02.jpg";
import borsch04 from "@/assets/games/borsch-04.jpg";
import campClean from "@/assets/games/camp-clean.jpg";
import campSilhouettesClean from "@/assets/games/camp-silhouettes-clean.jpg";
import hutDressed from "@/assets/games/hut-dressed.jpg";
import hutSweaters from "@/assets/games/hut-sweaters.jpg";

import bibaTall from "@/assets/app-covers/biba-tall.webp";
import bibaWide from "@/assets/app-covers/biba-wide.webp";
import campTall from "@/assets/app-covers/camp-tall.webp";
import campWide from "@/assets/app-covers/camp-wide.webp";
import homeTall from "@/assets/app-covers/home-tall.webp";
import homeWide from "@/assets/app-covers/home-wide.webp";
import kitchenTall from "@/assets/app-covers/kitchen-tall.webp";
import kitchenWide from "@/assets/app-covers/kitchen-wide.webp";

import cabinIndoors from "@/assets/illustrations/cabin-indoors.webp";
import campLake from "@/assets/illustrations/camp-lake.webp";
import campfireCooking from "@/assets/illustrations/campfire-cooking.webp";
import crewWinter from "@/assets/illustrations/crew-winter.webp";
import heroTuti from "@/assets/illustrations/hero-tuti.webp";
import logo from "@/assets/illustrations/logo.webp";
import shapesMeadow from "@/assets/illustrations/shapes-meadow.webp";
import winterSnowman from "@/assets/illustrations/winter-snowman.webp";

import castTurnaroundDressed from "@/assets/characters/cast-turnaround-dressed.jpg";

const art = {
  "backpacks-01": backpacks01,
  "backpacks-02": backpacks02,
  "biba-level": bibaLevel,
  "biba-sled": bibaSled,
  "biba-tall": bibaTall,
  "biba-wide": bibaWide,
  "borsch-01": borsch01,
  "borsch-02": borsch02,
  "borsch-04": borsch04,
  "cabin-indoors": cabinIndoors,
  "camp-clean": campClean,
  "camp-lake": campLake,
  "camp-silhouettes-clean": campSilhouettesClean,
  "camp-tall": campTall,
  "camp-wide": campWide,
  "campfire-cooking": campfireCooking,
  "cast-turnaround-dressed": castTurnaroundDressed,
  "crew-winter": crewWinter,
  "hero-tuti": heroTuti,
  "home-tall": homeTall,
  "home-wide": homeWide,
  "hut-dressed": hutDressed,
  "hut-sweaters": hutSweaters,
  "kitchen-tall": kitchenTall,
  "kitchen-wide": kitchenWide,
  logo: logo,
  "shapes-meadow": shapesMeadow,
  "winter-snowman": winterSnowman,
} satisfies Record<string, StaticImageData>;

export type ArtName = keyof typeof art;

export function getArt(name: string): StaticImageData {
  const found = art[name as ArtName];
  if (!found) {
    throw new Error(`Немає зображення "${name}". Доступні: ${Object.keys(art).join(", ")}`);
  }
  return found;
}
