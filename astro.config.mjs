import { defineConfig } from "astro/config";

export default defineConfig({
   site: "https://mahfujmustafa.dev",
   trailingSlash: "never",
   build: {
      format: "file",
   },
   image: {
      layout: "constrained",
   },
});
