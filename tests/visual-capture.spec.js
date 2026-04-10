const { test, expect, devices } = require("@playwright/test");

async function openPageByNav(page, label) {
  await page.getByRole("button", { name: label, exact: true }).click();
  await page.waitForTimeout(150);
}

test("capture representative PR screenshots", async ({ browser, page }, testInfo) => {
  await page.goto("/index.html", { waitUntil: "networkidle" });
  await expect(page.locator("#theme-segment-header")).toBeVisible();

  await page.screenshot({ path: testInfo.outputPath("home-light.png"), fullPage: true });

  await openPageByNav(page, "Explorar");
  await expect(page.locator("body")).toHaveAttribute("data-page", "browse");
  await page.screenshot({ path: testInfo.outputPath("browse-light.png"), fullPage: true });

  await openPageByNav(page, "Archivo");
  await expect(page.locator("body")).toHaveAttribute("data-page", "archive");
  await page.screenshot({ path: testInfo.outputPath("archive-light.png"), fullPage: true });

  await openPageByNav(page, "Azar");
  await expect(page.locator("body")).toHaveAttribute("data-page", "random");
  await page.screenshot({ path: testInfo.outputPath("random-light.png"), fullPage: true });

  await openPageByNav(page, "Ajustes");
  await expect(page.locator("#theme-segment-settings")).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("settings-light.png"), fullPage: true });

  await page.getByRole("button", { name: "Oscuro", exact: true }).first().click();
  await expect(page.locator("body")).toHaveAttribute("data-theme", "dark");
  await page.screenshot({ path: testInfo.outputPath("settings-dark.png"), fullPage: true });

  await openPageByNav(page, "Explorar");
  await page.screenshot({ path: testInfo.outputPath("browse-dark.png"), fullPage: true });

  await openPageByNav(page, "Archivo");
  await page.screenshot({ path: testInfo.outputPath("archive-dark.png"), fullPage: true });

  const mobile = await browser.newContext({
    ...devices["iPhone 13"],
    colorScheme: "dark"
  });
  const mobilePage = await mobile.newPage();
  await mobilePage.goto("http://127.0.0.1:4173/index.html", { waitUntil: "networkidle" });
  await mobilePage.getByRole("button", { name: "Ajustes", exact: true }).click();
  await expect(mobilePage.locator(".theme-switch")).toBeVisible();
  await mobilePage.screenshot({ path: testInfo.outputPath("settings-mobile-dark.png"), fullPage: true });
  await mobile.close();
});
