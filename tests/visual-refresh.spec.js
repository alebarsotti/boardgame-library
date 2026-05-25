const path = require("path");
const { pathToFileURL } = require("url");
const { test, expect, devices } = require("@playwright/test");
const mobileDevice = { ...devices["iPhone 13"] };
const appUrl = pathToFileURL(path.resolve(__dirname, "../index.html")).href;

delete mobileDevice.defaultBrowserType;

async function getVisibleTitles(page) {
  return page.locator(".game-card__title").evaluateAll((nodes) =>
    nodes.map((node) => node.textContent?.trim() || "").filter(Boolean)
  );
}

async function openPageByNav(page, label) {
  await page.getByRole("button", { name: label, exact: true }).click();
}

test("desktop smoke covers theme, nav, browse, random, and footer", async ({ page }) => {
  await page.goto(appUrl, { waitUntil: "load" });

  await expect(page.locator("#theme-segment-header")).toBeVisible();
  await expect(page.locator("body")).toHaveAttribute("data-page", "home");
  await expect(page.locator("body")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator(".site-footer__brand img")).toBeVisible();
  await expect(page.locator(".site-footer__brand")).toHaveAttribute("href", "https://boardgamegeek.com/");
  await expect(page.locator(".page-nav .segment-button svg")).toHaveCount(5);
  await expect(page.locator("#home-browse-action svg")).toBeVisible();
  await expect(page.locator("#home-random-action svg")).toBeVisible();

  await openPageByNav(page, "Explorar");
  await expect(page.locator("body")).toHaveAttribute("data-page", "browse");
  await expect(page.locator("#workspace-panel")).toBeVisible();
  await expect(page.locator("[data-i18n='searchLabel'] svg")).toBeVisible();
  await expect(page.locator("#recommendation-chips .chip svg").first()).toBeVisible();
  await page.getByRole("button", { name: "Rápidos", exact: true }).click();
  await expect(page.locator(".active-filters__list .chip svg").first()).toBeVisible();

  await openPageByNav(page, "Archivo");
  await expect(page.locator("body")).toHaveAttribute("data-page", "archive");
  await expect(page.locator("#workspace-panel")).toBeVisible();

  await openPageByNav(page, "Azar");
  await expect(page.locator("body")).toHaveAttribute("data-page", "random");
  await expect(page.locator("#random-panel")).toBeVisible();
  await expect(page.locator("#random-browse-action svg")).toBeVisible();
  await expect(page.locator("#random-page-trigger svg")).toBeVisible();

  await openPageByNav(page, "Ajustes");
  await expect(page.locator("body")).toHaveAttribute("data-page", "settings");
  await expect(page.locator("#theme-segment-settings")).toBeVisible();

  await page.getByRole("button", { name: "Oscuro", exact: true }).first().click();
  await expect(page.locator("body")).toHaveAttribute("data-theme", "dark");
  await expect(page.getByRole("button", { name: "Oscuro", exact: true }).first()).toHaveClass(/is-active/);

  await page.reload({ waitUntil: "networkidle" });
  await openPageByNav(page, "Ajustes");
  await expect(page.locator("body")).toHaveAttribute("data-theme", "dark");
  await expect(page.getByRole("button", { name: "Oscuro", exact: true }).first()).toHaveClass(/is-active/);
  await expect(page.locator("#theme-segment-settings").getByRole("button", { name: "Oscuro", exact: true })).toHaveClass(/is-active/);
});

test.describe("mobile smoke", () => {
  test.use({
    ...mobileDevice,
    colorScheme: "dark"
  });

  test("mobile smoke covers footer, filters shortcut, and settings", async ({ page }) => {
    await page.goto(appUrl, { waitUntil: "load" });
    await expect(page.locator(".site-footer__brand img")).toBeVisible();
    await expect(page.locator(".site-footer__brand")).toHaveAttribute("href", "https://boardgamegeek.com/");
    await openPageByNav(page, "Explorar");
    await expect(page.locator("#open-filters svg")).toBeVisible();
    await openPageByNav(page, "Ajustes");
    await expect(page.locator(".theme-switch")).toBeVisible();
    await expect(page.locator("#theme-segment-settings")).toBeVisible();
  });
});

test("browse supports ascending and descending sort direction", async ({ page }) => {
  await page.goto(appUrl, { waitUntil: "load" });
  await page.getByRole("button", { name: "Explorar", exact: true }).click();
  await expect(page.locator("body")).toHaveAttribute("data-page", "browse");

  const sortSelect = page.locator("#sort-filter select");
  await sortSelect.selectOption("name");

  await page.locator("[data-filter-key='sortDirection'][data-filter-value='asc']").click();
  const ascendingTitles = await getVisibleTitles(page);
  expect(ascendingTitles.length).toBeGreaterThan(1);
  expect(ascendingTitles).toEqual([...ascendingTitles].sort((left, right) => left.localeCompare(right, "es")));

  await page.locator("[data-filter-key='sortDirection'][data-filter-value='desc']").click();
  const descendingTitles = await getVisibleTitles(page);
  expect(descendingTitles).toEqual([...descendingTitles].sort((left, right) => right.localeCompare(left, "es")));
});
