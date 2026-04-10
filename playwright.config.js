const { defineConfig, devices } = require("@playwright/test");
const pythonCommand = process.platform === "win32" ? "python" : "python3";

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 120000,
  fullyParallel: false,
  reporter: "line",
  use: {
    baseURL: "http://127.0.0.1:4173",
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
  ],
  webServer: {
    command: `${pythonCommand} -m http.server 4173 --bind 127.0.0.1`,
    url: "http://127.0.0.1:4173/index.html",
    reuseExistingServer: true,
    timeout: 120000
  }
});
