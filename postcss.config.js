import tailwindcss from "@tailwindcss/postcss";
import tailwindConfig from "./tailwind.config.js";
import autoprefixer from "autoprefixer";

export default {
  plugins: [tailwindcss(tailwindConfig), autoprefixer],
};
