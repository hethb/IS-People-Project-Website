import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config: fast dev server + React Fast Refresh for class demos.
export default defineConfig({
  plugins: [react()],
});
