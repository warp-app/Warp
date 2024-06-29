import MillionLint from '@million/lint';
import { defineConfig, ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
//@ts-ignore
import { epoxyPath } from '@mercuryworkshop/epoxy-transport';
//@ts-ignore
import { baremuxPath } from '@mercuryworkshop/bare-mux';
import wisp from 'wisp-server-node';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    MillionLint.vite(),
    ViteMinifyPlugin(),
    {
      name: "server",
      configureServer(server: ViteDevServer) {
        if (server.httpServer) {
          const upgraders = server.httpServer.listeners(
            "upgrade"
          ) as any;

          for (const upgrader of upgraders) {
            server.httpServer.off("upgrade", upgrader);
          }

          server.httpServer.on("upgrade", (req, socket, head) => {
            if (req.url && req.url.endsWith("/wisp/")) {
              wisp.routeRequest(req, socket, head);
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