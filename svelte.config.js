import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { preprocessThrelte } from "@threlte/preprocess";
import seqPreprocessor from "svelte-sequential-preprocessor";

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: seqPreprocessor([vitePreprocess(), preprocessThrelte()]),
};
