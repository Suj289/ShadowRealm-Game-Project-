import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",   // ensure correct asset loading
  plugins: [react()]
});
