import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import * as path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
