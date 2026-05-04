import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['172.20.10.2'],
    },
  },
  redirects: {
    '/feedback': 'https://forms.gle/fAPNfHpUEQf5nfAf7',
  },
});
