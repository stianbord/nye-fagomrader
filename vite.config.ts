import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const reloadOnResultChange = (): Plugin => ({
  name: 'reload-on-result-change',
  handleHotUpdate({ file, server }) {
    if (!file.endsWith('/src/result.tsx')) return
    server.ws.send({ type: 'full-reload' })
    return []
  },
})

// https://vite.dev/config/
export default defineConfig({
  base: '/nye-fagomrader/',
  plugins: [react(), reloadOnResultChange()],
  server: {
    port: 5174,
  },
})
