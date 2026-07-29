import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/cgroup32/test2/tar2/',
  plugins: [react()],
})