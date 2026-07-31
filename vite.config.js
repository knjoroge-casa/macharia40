import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Praying You Into Forty',
        short_name: 'Into Forty',
        description: 'Twenty-eight morning prayers for Macharia',
        start_url: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#F4EEE1',
        theme_color: '#F4EEE1',
        icons: []
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}']
      }
    })
  ]
})
