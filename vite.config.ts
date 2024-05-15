import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // Все запросы к API необходимо проксировать по причине CORS политики;
    proxy: {
      '/v3': 'http://transstage1.iwayex.com/transnextgen',
    },
  },
  plugins: [react()],
})