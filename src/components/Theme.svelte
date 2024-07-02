<script lang="ts">
  import { hsvToHsl } from "../util/hsvToHsl";

  export let theme: number;

  interface ColorSchemeTypes {
    gray1: string
    gray2: string
    gray4: string
    gray6: string
    gray8: string
    gray9: string
    gray11: string
    gray12: string
  }

  let colorScheme: ColorSchemeTypes | any = {};
  $: colorScheme.gray1 = hsvToHsl(theme, 28, 9)
  $: colorScheme.gray2 = hsvToHsl(theme, 21, 11)
  $: colorScheme.gray4 = hsvToHsl(theme, 21, 16)
  $: colorScheme.gray6 = hsvToHsl(theme, 14, 20)
  $: colorScheme.gray8 = hsvToHsl(theme, 14, 31)
  $: colorScheme.gray9 = hsvToHsl(theme, 14, 44)
  $: colorScheme.gray11 = hsvToHsl(theme, 7, 63)
  $: colorScheme.gray12 = hsvToHsl(theme, 7, 93)

  let themeCSS: string;
  $: themeCSS = `body {--gray1: ${colorScheme.gray1}; --gray2: ${colorScheme.gray2}; --gray4: ${colorScheme.gray4}; --gray6: ${colorScheme.gray6}; --gray8: ${colorScheme.gray8}; --gray9: ${colorScheme.gray9}; --gray11: ${colorScheme.gray11}; --gray12: ${colorScheme.gray12}; --shadow: rgba(0, 0, 0, 0.2); --font: "Inter";}`
</script>

<svelte:head>
    {@html "<style>" + themeCSS + "</style>"}
</svelte:head>