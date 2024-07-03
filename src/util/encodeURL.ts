import { rammerheadEncode } from "./rammerheadEncode";

declare global {
    interface Window {
        __uv$config: {
            prefix: string
            encodeUrl: (url: string) => string
        }
        __scramjet$config: {
            prefix: string
            codec: {
                encode: (url: string) => string
            }
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
        case "scramjet":
            return window.location.origin + window.__scramjet$config.prefix + window.__scramjet$config.codec.encode(url)
            break;
    }
}

export { encodeURL }