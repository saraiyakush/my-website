import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://kushsaraiya.com',
  markdown: {
    shikiConfig: {
      theme: 'one-light'
    }
  },
  integrations: [icon()]
});
