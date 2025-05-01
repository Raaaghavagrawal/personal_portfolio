import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3010, // Change this to your desired port
    host: '0.0.0.0', // This allows access from other devices on your network
    open: true, // Automatically open the browser
    strictPort: true, // Exit if port is already in use
  }
}); 