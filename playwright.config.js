const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 120000,
  fullyParallel: false,
  reporter: "line",
  use: {
    headless: true,
    trace: "on-first-retry"
  },
  projects: [
    {
      name: "desktop-chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 1200 },
        colorScheme: "light"
      }
    }
  ]
});
