// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import { loadEnv } from "vite";

const env = loadEnv("", process.cwd(), "");
const ngrokHost = env.NGROK_HOST;

// https://astro.build/config
export default defineConfig({
  site: "https://bildung.work",
  integrations: [mdx(), sitemap()],

  fonts: [
    {
      provider: fontProviders.local(),
      name: "Inter",
      cssVariable: "--font-inter",
      fallbacks: ["sans-serif"],
      featureSettings: "'zero' 1",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/InterVariable.woff2"],
            weight: "100 900",
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/InterVariable-Italic.woff2"],
            weight: "100 900",
            style: "italic",
          },
        ],
      },
    },
    {
      provider: fontProviders.fontsource(),
      name: "Geist Mono",
      cssVariable: "--font-geist-mono",
      weights: ["100 900"],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["monospace"],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ngrokHost ? [ngrokHost] : [],
    },
  },
});
