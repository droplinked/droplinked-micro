import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
  resolve: {
    alias: {
      '@': '/src', // Maps @ to the src directory
    }
  }
})
