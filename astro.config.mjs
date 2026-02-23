// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import remarkGfm from "remark-gfm";
import { defineConfig, envField } from "astro/config";
import { loadEnv } from "vite";

const env = loadEnv("", process.cwd(), "");
const ngrokHost = env.NGROK_HOST;

// https://astro.build/config
export default defineConfig({
  site: "https://bildung.work",
  markdown: {
    remarkPlugins: [remarkGfm],
    remarkRehype: {
      clobberPrefix: "",
    },
  },
  integrations: [mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ngrokHost ? [ngrokHost] : [],
    },
  },
});
