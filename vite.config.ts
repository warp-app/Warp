import { defineConfig, ViteDevServer } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
//@ts-ignore
import { epoxyPath } from '@mercuryworkshop/epoxy-transport';
//@ts-ignore
import { baremuxPath } from '@mercuryworkshop/bare-mux';
import wisp from 'wisp-server-node';
//@ts-ignore
import createRammerhead from 'rammerhead/src/server/index.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    ViteMinifyPlugin(),
    {
      name: "server",
      configureServer(server: ViteDevServer) {
        if (server.httpServer) {
          const rh = createRammerhead();

          const rammerheadScopes = [
            "/rammerhead.js",
            "/hammerhead.js",
            "/transport-worker.js",
            "/task.js",
            "/iframe-task.js",
            "/worker-hammerhead.js",
            "/messaging",
            "/sessionexists",
            "/deletesession",
            "/newsession",
            "/editsession",
            "/needpassword",
            "/syncLocalStorage",
            "/api/shuffleDict"
          ];

          const rammerheadSession = /^\/[a-z0-9]{32}/;

          const shouldRouteRh = (req: any) => {
            const url = new URL(req.url, 'http://0.0.0.0');
            return (
              rammerheadScopes.includes(url.pathname) ||
              rammerheadSession.test(url.pathname)
            );
          }

          const routeRhRequest = (req: any, res: any) => {
            rh.emit("request", req, res);
          }

          const routeRhUpgrade = (req: any, socket: any, head: any) => {
            rh.emit("upgrade", req, socket, head);
          }

          server.middlewares.use((req, res, next) => {
            if (shouldRouteRh(req)) {
              routeRhRequest(req, res);
            } else {
              next()
            };
          });

          const upgraders = server.httpServer.listeners(
            "upgrade"
          ) as any;

          for (const upgrader of upgraders) {
            server.httpServer.off("upgrade", upgrader);
          }

          server.httpServer.on("upgrade", (req, socket, head) => {
            if (req.url && req.url.endsWith("/wisp/")) {
              wisp.routeRequest(req, socket, head);
            } else if (shouldRouteRh(req)) {
              routeRhUpgrade(req, socket, head);
            } else {
              for (const upgrader of upgraders) {
                upgrader(req, socket, head);
              }
            }
          });
        }
      },
    },
    viteStaticCopy({
      targets: [
        {
          src: `${uvPath}/**/*`.replace(/\\/g, '/'),
          dest: 'uv',
          overwrite: false
        },
        {
          src: `${epoxyPath}/**/*`.replace(/\\/g, '/'),
          dest: 'epoxy',
          overwrite: false
        },
        {
          src: `${baremuxPath}/**/*`.replace(/\\/g, '/'),
          dest: 'baremux',
          overwrite: false
        }
      ]
    })
  ]
});