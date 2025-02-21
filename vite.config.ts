import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    root: "./", // Explicitly set root to project directory
    publicDir: "public", // Ensure public folder is served
});