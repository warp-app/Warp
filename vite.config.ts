import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
//@ts-ignore
import { ChemicalVitePlugin } from "chemicaljs";
import { ViteMinifyPlugin } from "vite-plugin-minify";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svelte(), ChemicalVitePlugin(), ViteMinifyPlugin()],
});
