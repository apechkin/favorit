import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig, loadEnv } from "vite";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      babel({
        presets: [reactCompilerPreset()],
      }),
      tailwindcss()
    ],

    server: {
      host: true,
      allowedHosts: ["mycaddy.local"],

      proxy: {
        "/api": {
          target: "http://api.favorit-parts.ru",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/?/, "/hs/hsprice/"),
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              const apiKey = env.FAVORIT_API_KEY;

              if (!apiKey) {
                return;
              }

              const url = new URL(proxyReq.path, "http://api.favorit-parts.ru");

              url.searchParams.set("key", apiKey);

              proxyReq.path = `${url.pathname}${url.search}`;
            });
          },
        },
      },
    },
  };
});
