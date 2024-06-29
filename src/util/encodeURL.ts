import { rammerheadEncode } from "./rammerheadEncode";

declare global {
    interface Window {
        __uv$config: {
            prefix: string
            encodeUrl: (url: string) => string
        }
    }
}

async function encodeURL(service: string, url: string) {
    switch (service) {
        case "ultraviolet":
            return window.location.origin + window.__uv$config.prefix + window.__uv$config.encodeUrl(url)
            break;
        case "rammerhead":
            return window.location.origin + await rammerheadEncode(url)
            break;
    }
}

export { encodeURL }