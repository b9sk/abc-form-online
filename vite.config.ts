import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        open: true,
    },
    base: "/abc-form-online/", // Replace with your repo name
});
