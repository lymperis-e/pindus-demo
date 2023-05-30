import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path'

import * as path from 'path'

let root = resolve(__dirname, 'src')
let outDir = resolve(__dirname, 'dist')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:  '/pindus-demo/',
  build: { 
    outDir,
    emptyOutDir: true,
  },
  server: {
    port: 8080,
    host: '0.0.0.0',
    https:false,
    hot: true
  },
  root: path.resolve(__dirname, 'src'),
  resolve: {
    alias: {
      '~nmodules': path.resolve(__dirname, 'node_modules')
    }
  },

})
