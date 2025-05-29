import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',               // Allow external access from any IP
    port: 3000,                    // Set explicit port
    strictPort: true,              // Don't auto-increment port
    allowedHosts: [
      'all',
      'vscode-internal-1834-beta.beta01.cloud.kavia.ai'
    ],                             // Explicitly allow user-requested host
    cors: true,                    // Enable CORS
    headers: {
      'Access-Control-Allow-Origin': '*', // Ensure no CORS issues
    },
    watch: {
      usePolling: true             // Use polling for file changes (important in some remote FS)
    }
  }
})
