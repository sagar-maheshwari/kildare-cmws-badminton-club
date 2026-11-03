import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  base: '/kildare-cmws-badminton-club/',
  plugins: [react()],
})