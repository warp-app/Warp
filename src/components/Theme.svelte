<script lang="ts">
    import Values from 'values.js'

    export let theme: string;

    let color: any;
    let colors: string[];
    $: color = new Values(theme);
    $: colors = color.tints(16).reverse().concat(color.shades(16)).map((i: any) => `rgb(${i.rgb})`).reverse();

    let themeCSS: string;

    $: themeCSS = `body {--gray1: ${colors[0]}; --gray2: ${colors[1]}; --gray4: ${colors[3]}; --gray6: ${colors[5]}; --gray8: ${colors[7]}; --gray9: ${colors[8]}; --gray11: ${colors[10]}; --gray12: ${colors[11]}; --shadow: rgba(0, 0, 0, 0.2); --font: "Inter";}`
</script>

<svelte:head>
    {@html "<style>" + themeCSS + "</style>"}
</svelte:head>