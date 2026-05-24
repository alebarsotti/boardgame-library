const { test, expect, devices } = require("@playwright/test");

async function getVisibleTitles(page) {
  return page.locator(".game-card__title").evaluateAll((nodes) =>
    nodes.map((node) => node.textContent?.trim() || "").filter(Boolean)
  );
}

test("theme controls and section identities render across desktop and mobile", async ({ browser, page }) => {
  await page.goto("/index.html", { waitUntil: "networkidle" });

  await expect(page.locator("#theme-segment-header")).toBeVisible();
  await expect(page.locator("body")).toHaveAttribute("data-page", "home");
  await expect(page.locator("body")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator(".site-footer__brand img")).toBeVisible();
  await expect(page.locator(".site-footer__brand")).toHaveAttribute("href", "https://boardgamegeek.com/");

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
  await expect(mobilePage.locator(".site-footer__brand img")).toBeVisible();
  await expect(mobilePage.locator(".site-footer__brand")).toHaveAttribute("href", "https://boardgamegeek.com/");
  await mobilePage.getByRole("button", { name: "Ajustes", exact: true }).click();
  await expect(mobilePage.locator(".theme-switch")).toBeVisible();
  await expect(mobilePage.locator("#theme-segment-settings")).toBeVisible();
  await mobile.close();
});

test("browse supports ascending and descending sort direction", async ({ page }) => {
  await page.goto("/index.html", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Explorar", exact: true }).click();
  await expect(page.locator("body")).toHaveAttribute("data-page", "browse");

  const sortSelect = page.locator("#sort-filter select");
  await sortSelect.selectOption("name");

  await page.getByRole("button", { name: "Ascending", exact: true }).click();
  const ascendingTitles = await getVisibleTitles(page);
  expect(ascendingTitles.length).toBeGreaterThan(1);
  expect(ascendingTitles).toEqual([...ascendingTitles].sort((left, right) => left.localeCompare(right, "es")));

  await page.getByRole("button", { name: "Descending", exact: true }).click();
  const descendingTitles = await getVisibleTitles(page);
  expect(descendingTitles).toEqual([...descendingTitles].sort((left, right) => right.localeCompare(left, "es")));
});
