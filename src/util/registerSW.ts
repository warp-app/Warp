import { wispURL } from "../config"

declare global {
    interface Window {
        BareMux: {
            SetTransport: (name: string, config: any) => Promise<void>
        }
    }
}

async function registerSW(): Promise<void> {
    if ('serviceWorker' in navigator) {
        await navigator.serviceWorker.register("/sw.js")

        await window.BareMux.SetTransport("EpxMod.EpoxyClient", { wisp: wispURL })
    }
}

export { registerSW }