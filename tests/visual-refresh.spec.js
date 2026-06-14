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

async function openFirstDetail(page) {
  await page.locator(".game-card__button").first().click();
  await expect(page.locator("#details-dialog")).toBeVisible();
  await expect(page.locator("#detail-hero")).toBeVisible();
  await expect(page.locator("#detail-summary-row")).toBeVisible();
}

async function getBaseGameWithExpansionFixture(page) {
  return page.evaluate(() => {
    const games = window.__BGG_LIBRARY_DATA__?.games || [];
    const findGameById = (id) => games.find((game) => game.id === id);
    const baseGame = games.find((game) =>
      game.own &&
      Array.isArray(game.expansionIds) &&
      game.expansionIds.some((expansionId) => {
        const expansion = findGameById(expansionId);
        return expansion?.requiresGameId === game.id;
      })
    );

    if (!baseGame) return null;

    const expansionId = baseGame.expansionIds.find((candidateId) => {
      const expansion = findGameById(candidateId);
      return expansion?.requiresGameId === baseGame.id;
    });
    const expansion = findGameById(expansionId);
    if (!expansion) return null;

    return {
      baseId: baseGame.id,
      baseName: baseGame.name,
      expansionId: expansion.id,
      expansionName: expansion.name
    };
  });
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
  await openFirstDetail(page);
  await expect(page.locator("#detail-title")).toBeVisible();
  await expect(page.locator("#detail-cover")).toBeVisible();
  await expect(page.locator("#detail-quick-facts")).toBeVisible();
  await expect(page.locator("#details-dialog")).toHaveJSProperty("open", true);
  await page.locator("#details-close").click();
  await expect(page.locator("#details-dialog")).not.toBeVisible();

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
    await openFirstDetail(page);
    await expect(page.locator("#detail-summary-row")).toBeVisible();
    const dialogBox = await page.locator("#details-dialog").boundingBox();
    expect(dialogBox?.width || 0).toBeGreaterThan(360);
    const mobileColumns = await page.locator(".detail-layout").evaluate((node) =>
      window.getComputedStyle(node).gridTemplateColumns.split(" ").filter(Boolean).length
    );
    expect(mobileColumns).toBe(1);
    const closeBox = await page.locator("#details-close").boundingBox();
    expect((closeBox?.x || 0) + (closeBox?.width || 0)).toBeGreaterThan((dialogBox?.width || 0) - 24);
    await page.locator("#details-content").evaluate((node) => {
      node.scrollTop = node.scrollHeight;
    });
    const scrollState = await page.locator("#details-content").evaluate((node) => ({
      scrollTop: node.scrollTop,
      clientHeight: node.clientHeight,
      scrollHeight: node.scrollHeight
    }));
    expect(scrollState.scrollTop + scrollState.clientHeight).toBeGreaterThanOrEqual(scrollState.scrollHeight - 4);
    await page.locator("#details-close").click();
    await expect(page.locator("#details-dialog")).not.toBeVisible();
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

test("expansion detail links back to its base game", async ({ page }) => {
  await page.goto(appUrl, { waitUntil: "load" });
  const fixture = await getBaseGameWithExpansionFixture(page);
  expect(fixture).not.toBeNull();

  await openPageByNav(page, "Explorar");
  await page.locator("#search-input").fill(fixture.baseName);
  await openFirstDetail(page);
  await page.locator(`[data-expansion-id="${fixture.expansionId}"]`).click();
  await expect(page.locator("#detail-title")).toContainText(fixture.expansionName);
  await expect(page.locator(".detail-subtitle")).toContainText(`Requiere juego base: ${fixture.baseName}`);
  await expect(page.locator(".detail-subtitle [data-base-game-id]")).toContainText(fixture.baseName);
  await page.locator(`[data-base-game-id="${fixture.baseId}"]`).click();
  await expect(page.locator("#detail-title")).toContainText(fixture.baseName);
});

test("detail subtitle avoids near-duplicate secondary names", async ({ page }) => {
  await page.goto(appUrl, { waitUntil: "load" });
  await openPageByNav(page, "Explorar");
  await page.locator("#search-input").fill("Virus! 2");
  await openFirstDetail(page);
  await expect(page.locator("#detail-title")).toContainText("Virus! 2 Evolución");
  await expect(page.locator(".detail-subtitle")).not.toContainText("Virus! 2 Evolution");
  await expect(page.locator(".detail-subtitle")).toContainText("Expansión");
  await expect(page.locator(".detail-subtitle")).toContainText("Requiere juego base: Virus!");
});

test("physical language UI only keeps English and Spanish", async ({ page }) => {
  await page.goto(appUrl, { waitUntil: "load" });
  await openPageByNav(page, "Explorar");
  await expect(page.locator("#physical-language-filter")).not.toContainText("Portugués");
  await expect(page.locator("#physical-language-filter")).not.toContainText("Francés");
  await expect(page.locator("#physical-language-filter")).not.toContainText("Alemán");

  await page.evaluate(() => {
    const targetGame = typeof findGameById === "function" ? findGameById(182078) : null;
    if (!targetGame || typeof openDetails !== "function") throw new Error("Ticket to Ride Map Collection 5 fixture unavailable");
    openDetails(targetGame);
  });
  await expect(page.locator("#details-dialog")).toBeVisible();
  await expect(page.locator("#detail-title")).toContainText("Ticket to Ride Map Collection 5");
  await expect(page.locator("#detail-summary-row")).toContainText("Inglés, Español");
  await expect(page.locator("#detail-summary-row")).not.toContainText("Portugués");
  await expect(page.locator("#detail-summary-row")).not.toContainText("Francés");
  await expect(page.locator("#detail-summary-row")).not.toContainText("Alemán");
});
