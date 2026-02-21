// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://bildung.work",
  integrations: [mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ["4b09210dcf51.ngrok.app"],
    },
  },
});
