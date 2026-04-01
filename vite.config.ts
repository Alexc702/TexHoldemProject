import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { threeLinesSaveApiPlugin } from "./vite.three-lines-save-api.js";

export default defineConfig({
  plugins: [react(), threeLinesSaveApiPlugin()],
});
