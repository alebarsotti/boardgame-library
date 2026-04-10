const { test, expect, devices } = require("@playwright/test");

test("theme controls and section identities render across desktop and mobile", async ({ browser, page }) => {
  await page.goto("/index.html", { waitUntil: "networkidle" });

  await expect(page.locator("#theme-segment-header")).toBeVisible();
  await expect(page.locator("body")).toHaveAttribute("data-page", "home");
  await expect(page.locator("body")).toHaveAttribute("data-theme", "light");

  await page.getByRole("button", { name: "Explorar", exact: true }).click();
  await expect(page.locator("body")).toHaveAttribute("data-page", "browse");
  await expect(page.locator("#workspace-panel")).toBeVisible();

  await page.getByRole("button", { name: "Archivo", exact: true }).click();
  await expect(page.locator("body")).toHaveAttribute("data-page", "archive");
  await expect(page.locator("#workspace-panel")).toBeVisible();

  await page.getByRole("button", { name: "Azar", exact: true }).click();
  await expect(page.locator("body")).toHaveAttribute("data-page", "random");
  await expect(page.locator("#random-panel")).toBeVisible();

  await page.getByRole("button", { name: "Ajustes", exact: true }).click();
  await expect(page.locator("body")).toHaveAttribute("data-page", "settings");
  await expect(page.locator("#theme-segment-settings")).toBeVisible();

  await page.getByRole("button", { name: "Oscuro", exact: true }).first().click();
  await expect(page.locator("body")).toHaveAttribute("data-theme", "dark");
  await expect(page.getByRole("button", { name: "Oscuro", exact: true }).first()).toHaveClass(/is-active/);

  await page.reload({ waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Ajustes", exact: true }).click();
  await expect(page.locator("body")).toHaveAttribute("data-theme", "dark");
  await expect(page.getByRole("button", { name: "Oscuro", exact: true }).first()).toHaveClass(/is-active/);
  await expect(page.locator("#theme-segment-settings").getByRole("button", { name: "Oscuro", exact: true })).toHaveClass(/is-active/);

  const mobile = await browser.newContext({
    ...devices["iPhone 13"],
    colorScheme: "dark"
  });
  const mobilePage = await mobile.newPage();
  await mobilePage.goto("http://127.0.0.1:4173/index.html", { waitUntil: "networkidle" });
  await mobilePage.getByRole("button", { name: "Ajustes", exact: true }).click();
  await expect(mobilePage.locator(".theme-switch")).toBeVisible();
  await expect(mobilePage.locator("#theme-segment-settings")).toBeVisible();
  await mobile.close();
});
