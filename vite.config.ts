import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [svelte(), tailwindcss()],
  ssr: {
    noExternal: ["three", "troika-three-text"],
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
