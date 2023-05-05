import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/my-tasks/",
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
  },
});
