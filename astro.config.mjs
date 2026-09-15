// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://tutigames.com", // TODO: справжній домен

  // Панель розробника заважає дивитися макет. У зібрану версію вона
  // не потрапляє в будь-якому разі — це інструмент лише для dev.
  devToolbar: { enabled: false },

  vite: {
    plugins: [tailwindcss()],
  },
});
