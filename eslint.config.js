import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginSvelte from "eslint-plugin-svelte";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
	{
		rules: {
			"no-unused-vars": "error",
			"no-unused-imports": "error",
			"no-multiple-empty-lines": "warn",
			"import/prefer-default-export": "off",
			"no-duplicate-imports": "error",
			camelCase: "warn",
		},
	},
	{ files: ["**/*.{js,mjs,cjs,ts}"] },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	eslintConfigPrettier,
	...eslintPluginSvelte.configs["flat/prettier"],
];
