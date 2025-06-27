import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify"; // netlifyをインポート

// https://astro.build/config
export default defineConfig({
  output: 'server', // Netlifyアダプターにはこの設定が必要です
  integrations: [
    tailwind(),
    netlify() // integrationsにnetlifyを追加
  ]
});