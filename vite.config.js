import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add the resolve object to set up aliases
  resolve: {
    alias: {
      "@contexts": "/src/contexts", // Add more aliases as needed
    },
  },
  // Server configuration
  server: {
    port: 3000,
  },
});
