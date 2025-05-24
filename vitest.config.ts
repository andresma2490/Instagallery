import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: ["src/setupTests.ts", "**/*.d.ts", "src/mocks/**/*.ts"],
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
