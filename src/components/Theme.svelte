<script lang="ts">
    export let theme: string;

    let themeCSS: string;

    $: themeCSS = `body {--gray1: ${theme}; --gray2: #1c1c1c; --gray4: #282828; --gray6: #343434; --gray8: #505050; --gray9: #707070; --gray11: #a0a0a0; --gray12: #ededed; --shadow: rgba(0, 0, 0, 0.2); --font: "Inter";}`
</script>

<svelte:head>
    {@html "<style>" + themeCSS + "</style>"}
</svelte:head>