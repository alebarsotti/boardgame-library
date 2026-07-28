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
  await expect(page.locator(".page-nav .segment-button svg")).toHaveCount(6);
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

  await openPageByNav(page, "Historial");
  await expect(page.locator("body")).toHaveAttribute("data-page", "history");
  await expect(page.locator("#history-panel")).toBeVisible();
  await expect(page.locator(".history-chart")).toBeVisible();
  await expect(page.locator(".history-month-chart")).toBeVisible();
  await expect(page.locator("#history-year-chart .apexcharts-canvas")).toBeVisible();
  await expect(page.locator("#history-month-chart .apexcharts-canvas")).toBeVisible();
  await page.locator("[data-history-chart-mode='line']").click();
  await expect(page.locator(".history-chart")).toHaveAttribute("data-chart-mode", "line");
  await expect(page.locator(".history-month-chart")).toHaveAttribute("data-chart-mode", "line");

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
    await openPageByNav(page, "Historial");
    await expect(page.locator("#history-panel")).toBeVisible();
    await expect(page.locator(".history-chart")).toBeVisible();
    await expect(page.locator(".history-month-chart")).toBeVisible();
    await expect(page.locator("#history-year-chart .apexcharts-canvas")).toBeVisible();
    await page.locator("[data-history-chart-mode='line']").click();
    await expect(page.locator(".history-chart")).toHaveAttribute("data-chart-mode", "line");
    await openPageByNav(page, "Ajustes");
    await expect(page.locator(".theme-switch")).toBeVisible();
    await expect(page.locator("#theme-segment-settings")).toBeVisible();
  });
});

test("history page updates scope, selected year, and detail drill-in", async ({ page }) => {
  await page.goto(appUrl, { waitUntil: "load" });
  await openPageByNav(page, "Historial");

  await expect(page.locator("body")).toHaveAttribute("data-page", "history");
  await expect(page.locator(".history-kpis")).toBeVisible();
  await expect(page.locator("#history-year-chart .apexcharts-canvas")).toBeVisible();
  await expect(page.locator("#history-month-chart .apexcharts-canvas")).toBeVisible();
  expect(await page.locator("#history-year-selector [data-history-year]").count()).toBeGreaterThan(0);

  await page.locator("[data-history-scope='all']").click();
  await expect(page.locator("[data-history-scope='all']")).toHaveAttribute("aria-pressed", "true");
  await page.locator("[data-history-chart-mode='line']").click();
  await expect(page.locator(".history-chart")).toHaveAttribute("data-chart-mode", "line");
  await expect(page.locator(".history-month-chart")).toHaveAttribute("data-chart-mode", "line");

  const lastBar = page.locator("#history-year-selector [data-history-year]").last();
  const selectedYear = await lastBar.getAttribute("data-history-year");
  await lastBar.click({ force: true });
  await expect(page.locator(".history-list-card h3")).toContainText((selectedYear || "").trim());
  await expect(page.locator(".history-month-chart")).toHaveAttribute("aria-label", new RegExp((selectedYear || "").trim()));

  const monthWithData = await page.evaluate(() => {
    const buttons = [...document.querySelectorAll("#history-month-selector [data-history-month]")];
    const target = buttons.find((button) => {
      const label = button.getAttribute("aria-label") || "";
      const match = label.match(/:\s*(\d+)/);
      return match && Number(match[1]) > 0;
    });
    return target ? { month: target.getAttribute("data-history-month"), label: target.textContent?.trim() || "" } : null;
  });
  expect(monthWithData).not.toBeNull();
  await page.evaluate((month) => {
    const button = document.querySelector(`#history-month-selector [data-history-month='${month}']`);
    if (!(button instanceof HTMLButtonElement)) throw new Error("Month selector button unavailable");
    button.click();
  }, monthWithData.month);
  await expect(page.locator(".history-list-card h3")).toContainText((monthWithData.label || "").trim());

  const firstHistoryItem = page.locator(".history-detail-item").first();
  await expect(firstHistoryItem).toBeVisible();
  await firstHistoryItem.click();
  await expect(page.locator("#details-dialog")).toBeVisible();
  await expect(page.locator("#detail-title")).toBeVisible();
});

test("hash route hydrates archive filters with a canonical URL", async ({ page }) => {
  await page.goto(
    `${appUrl}#/archive?search=munchkin&players=2&duration=standard,quick&weight=heavy,light&lang=english&best=2&age=adult&sort=rating&dir=desc&view=list&rec=duo`,
    { waitUntil: "load" }
  );

  await expect(page.locator("body")).toHaveAttribute("data-page", "archive");
  await expect(page.locator("#workspace-panel")).toBeVisible();
  await expect(page.locator("#search-input")).toHaveValue("munchkin");
  await expect(page.locator("#games-grid")).toHaveClass(/list-view/);
  await expect(page.locator("#sort-filter select")).toHaveValue("rating");
  await expect(page.locator("[data-filter-key='sortDirection'][data-filter-value='desc']")).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("[data-filter-key='players'][data-filter-value='2']")).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("[data-filter-key='bestPlayers'][data-filter-value='2']")).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("[data-filter-key='age'][data-filter-value='adult']")).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("[data-filter-key='physicalLanguage'][data-filter-value='english']")).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("[data-filter-key='recommendation'][data-filter-value='duo']")).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("[data-filter-key='duration'][data-filter-value='quick']")).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("[data-filter-key='duration'][data-filter-value='standard']")).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("[data-filter-key='weight'][data-filter-value='light']")).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("[data-filter-key='weight'][data-filter-value='heavy']")).toHaveAttribute("aria-pressed", "true");
  await expect(page).toHaveURL(/#\/archive\?search=munchkin&players=2&duration=quick%2Cstandard&weight=light%2Cheavy&lang=english&best=2&age=adult&sort=rating&dir=desc&view=list&rec=duo$/);
});

test("hash route supports browser back and forward across sections", async ({ page }) => {
  await page.goto(appUrl, { waitUntil: "load" });

  await openPageByNav(page, "Explorar");
  await expect(page.locator("body")).toHaveAttribute("data-page", "browse");
  await expect(page).toHaveURL(/#\/browse\?/);

  await page.getByRole("button", { name: "Rápidos", exact: true }).click();
  await expect(page).toHaveURL(/#\/browse\?.*rec=quick/);

  await openPageByNav(page, "Historial");
  await expect(page.locator("body")).toHaveAttribute("data-page", "history");
  await expect(page).toHaveURL(/#\/history$/);

  await page.goBack();
  await expect(page.locator("body")).toHaveAttribute("data-page", "browse");
  await expect(page.locator("[data-filter-key='recommendation'][data-filter-value='quick']")).toHaveAttribute("aria-pressed", "true");
  await expect(page).toHaveURL(/#\/browse\?.*rec=quick/);

  await page.goBack();
  await expect(page.locator("body")).toHaveAttribute("data-page", "browse");
  await expect(page.locator("[data-filter-key='recommendation'][data-filter-value='quick']")).toHaveAttribute("aria-pressed", "false");
  await expect(page).toHaveURL(/#\/browse\?sort=name&dir=asc&view=grid$/);

  await page.goBack();
  await expect(page.locator("body")).toHaveAttribute("data-page", "home");
  await expect(page).toHaveURL(/#\/home$/);

  await page.goForward();
  await expect(page.locator("body")).toHaveAttribute("data-page", "browse");
  await expect(page.locator("[data-filter-key='recommendation'][data-filter-value='quick']")).toHaveAttribute("aria-pressed", "false");

  await page.goForward();
  await expect(page.locator("body")).toHaveAttribute("data-page", "browse");
  await expect(page.locator("[data-filter-key='recommendation'][data-filter-value='quick']")).toHaveAttribute("aria-pressed", "true");
});

test("detail modal syncs with hash routing and survives reload", async ({ page }) => {
  await page.goto(`${appUrl}#/browse?search=munchkin&sort=name&dir=asc&view=grid`, { waitUntil: "load" });

  const baseCard = page.locator(".game-card").filter({ has: page.getByText("Munchkin", { exact: true }) });
  await baseCard.locator(".game-card__button").click();
  await expect(page.locator("#details-dialog")).toBeVisible();
  await expect(page.locator("#detail-title")).toContainText("Munchkin");
  await expect(page).toHaveURL(/#\/browse\?.*game=\d+/);

  const detailUrl = page.url();

  await page.goBack();
  await expect(page.locator("#details-dialog")).not.toBeVisible();
  await expect(page).not.toHaveURL(/game=\d+/);

  await page.goForward();
  await expect(page.locator("#details-dialog")).toBeVisible();
  await expect(page.locator("#detail-title")).toContainText("Munchkin");

  await page.goto(detailUrl, { waitUntil: "load" });
  await expect(page.locator("#details-dialog")).toBeVisible();
  await expect(page.locator("#detail-title")).toContainText("Munchkin");
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
  await page.evaluate(() => {
    const targetGame = typeof findGameById === "function" ? findGameById(266667) : null;
    if (!targetGame || typeof openDetails !== "function") throw new Error("Virus! 2 fixture unavailable");
    openDetails(targetGame);
  });
  await expect(page.locator("#details-dialog")).toBeVisible();
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

test("owned expansions can raise the base game's max players", async ({ page }) => {
  await page.goto(appUrl, { waitUntil: "load" });
  await openPageByNav(page, "Explorar");
  await page.locator("#search-input").fill("Pócimas y Brebajes");
  await page.locator("[data-filter-key='players'][data-filter-value='5']").click();
  await expect(page.locator(".game-card__title")).toContainText(["Pócimas y Brebajes"]);
  await openFirstDetail(page);
  await expect(page.locator("#detail-title")).toContainText("Pócimas y Brebajes");
  await expect(page.locator("#detail-summary-row")).toContainText("2-5");
});

test("Munchkin and its expansions expose the rules guide", async ({ page }) => {
  await page.goto(appUrl, { waitUntil: "load" });
  await openPageByNav(page, "Explorar");
  await page.locator("#search-input").fill("Munchkin");

  const baseCard = page.locator(".game-card").filter({ has: page.getByText("Munchkin", { exact: true }) });
  await baseCard.locator(".game-card__button").click();
  await expect(page.getByRole("link", { name: "Leer resumen de reglas" })).toBeVisible();
  await page.locator('[data-expansion-id="3943"]').click();
  await expect(page.locator("#detail-title")).toContainText("Munchkin 2: Hacha Sobrenatural");
  await expect(page.getByRole("link", { name: "Leer resumen de reglas" })).toBeVisible();
});

test("Munchkin rules guide supports navigation, anchors, theme, and print layout", async ({ page }) => {
  await page.goto(appUrl, { waitUntil: "load" });
  await openPageByNav(page, "Explorar");
  await page.locator("#search-input").fill("Munchkin");
  const baseCard = page.locator(".game-card").filter({ has: page.getByText("Munchkin", { exact: true }) });
  await baseCard.locator(".game-card__button").click();
  await page.getByRole("link", { name: "Leer resumen de reglas" }).click();

  await expect(page).toHaveTitle(/Munchkin · Resumen de reglas/);
  await expect(page.locator(".rules-game-summary h1")).toContainText("Munchkin");
  await expect(page.locator(".rules-game-summary__cover img")).toBeVisible();
  await expect(page.locator(".rules-game-summary__meta")).toContainText("3–6");
  await expect(page.locator(".rules-game-summary__meta")).toContainText("60–120 min");
  await expect(page.locator(".rules-game-summary__description")).toHaveText("Matá a los monstruos · Robá los tesoros · Traicioná a tus amigos");
  const manualsMenu = page.locator(".rules-manuals-menu");
  const closedTopbarHeight = await page.locator(".rules-topbar").evaluate((element) => element.getBoundingClientRect().height);
  await manualsMenu.locator("summary").click();
  await expect(manualsMenu).toHaveJSProperty("open", true);
  await expect(manualsMenu.locator(".rules-manuals-menu__panel")).toHaveCSS("position", "absolute");
  await expect(manualsMenu.locator(".rules-manuals-menu__panel")).toHaveCSS("display", "grid");
  const openTopbarHeight = await page.locator(".rules-topbar").evaluate((element) => element.getBoundingClientRect().height);
  expect(openTopbarHeight).toBe(closedTopbarHeight);
  const onlineRulesLink = manualsMenu.getByRole("link", { name: "Juego base", exact: true });
  await expect(onlineRulesLink).toHaveAttribute("href", /preview=Munchkin_Reglamento_Web\.pdf/);
  await expect(onlineRulesLink).toHaveAttribute("target", "_blank");
  await expect(manualsMenu.getByRole("link", { name: /Munchkin 2/ })).toHaveAttribute("href", /Munchkin2_Reglamento_Web\.pdf/);
  await expect(manualsMenu.getByRole("link", { name: /Munchkin 3/ })).toHaveAttribute("href", /Munchkin3_Reglamento_Web\.pdf/);
  await page.locator(".rules-game-summary h1").click();
  await expect(manualsMenu).toHaveJSProperty("open", false);
  await manualsMenu.locator("summary").click();
  await expect(manualsMenu).toHaveJSProperty("open", true);
  await page.keyboard.press("Escape");
  await expect(manualsMenu).toHaveJSProperty("open", false);
  await expect(page.locator("#turno .rule-card").first()).toContainText("Monstruo → combatilo.");
  await expect(page.locator("#turno .rule-card").first()).toContainText("Maldición → resolvela.");
  await expect(page.locator("#turno .rule-card").first()).toContainText("Otra → conservala o jugala.");
  await expect(page.locator("#items")).toContainText(/Ítems, [Ee]quipo y Tesoros/);
  await expect(page.locator("main")).not.toContainText(/Objetos?/);
  await expect(page.locator("#preparacion")).toContainText("Formá dos mazos");
  await expect(page.locator("#turno")).toContainText("jugá uno de tu mano");
  await expect(page.locator("#combate")).toContainText("Si no podés ganar");
  await expect(page.locator("#cartas")).toContainText("Mercenario");
  await expect(page.locator("main")).not.toContainText(/Hireling|Compañero/);
  const decksInfoButton = page.getByRole("button", { name: "Más información sobre los mazos" });
  const charityInfoButton = page.getByRole("button", { name: "Más información sobre Caridad" });
  await expect(page.locator(".rule-info-button .material-symbols-outlined")).toHaveCount(6);
  await expect(charityInfoButton.locator(".material-symbols-outlined")).toHaveText("info");
  await expect(page.locator("#mazos-info")).toBeHidden();
  await expect(page.locator("#caridad-info")).toBeHidden();
  await decksInfoButton.click();
  await expect(page.locator("#mazos-info")).toBeVisible();
  await expect(page.locator("#mazos-info")).toHaveText("No se pueden revisar las cartas descartadas, a menos que una carta diga lo contrario.");
  await charityInfoButton.click();
  await expect(page.locator("#mazos-info")).toBeHidden();
  await expect(charityInfoButton).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#caridad-info")).toBeVisible();
  await expect(page.locator("#caridad-info")).toContainText("Si hay empate, dividí las cartas equitativamente.");
  await expect(page.locator("#caridad-info")).toContainText("Si vos sos el de menor nivel (solo o en empate), descartá las cartas.");
  await page.keyboard.press("Escape");
  await expect(page.locator("#caridad-info")).toBeHidden();
  await expect(page.locator("#combate")).toBeVisible();
  await expect(page.locator("#combate")).toHaveJSProperty("open", true);
  await expect(page.locator("#combate .combat-stage")).toHaveCount(3);
  await expect(page.locator("#combate .combat-stage__heading h3")).toHaveText(["Compará las fuerzas", "Antes de resolver", "Resolvé el resultado"]);
  await expect(page.locator("#pedir-ayuda > div")).toBeHidden();
  await page.locator("#pedir-ayuda > summary").click();
  await expect(page.locator("#pedir-ayuda > div")).toBeVisible();
  await expect(page.locator("#pedir-ayuda")).toContainText("un solo jugador");
  await expect(page.locator("#pedir-ayuda")).not.toContainText("El ayudante no gana nivel");
  const victoryOutcome = page.locator("#combate .combat-outcome--success");
  await expect(victoryOutcome).toContainText("El ayudante no gana nivel por defecto");
  await expect(victoryOutcome).toContainText("Si vencieron juntos, robá los Tesoros boca arriba");
  const failedOutcome = page.locator("#combate .combat-outcome--escape");
  await expect(failedOutcome).toContainText("Pedí ayuda, escapá o usá una carta");
  await expect(failedOutcome).toContainText("Vencer sin matar");
  await expect(page.locator("#vencer-sin-matar")).toHaveCount(0);
  await expect(page.locator("#escape-combate")).toHaveJSProperty("open", true);
  await expect(page.locator("#escape-combate > div")).toBeVisible();
  await expect(page.locator("main")).not.toContainText(/\b(?:huir|huida|huís)\b/i);
  await expect(page.locator("body")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("#combate .rules-grid--escape")).toHaveCSS("grid-template-columns", /.+ .+/);
  await expect(page.locator("#combate .rules-grid--escape .rule-card > p")).toHaveCount(0);
  await expect(page.locator("#combate .rules-grid--escape .rule-info-button")).toHaveCount(4);
  const escapeInfoButton = page.getByRole("button", { name: "Más información sobre escapar", exact: true });
  await escapeInfoButton.click();
  await expect(page.locator("#escapar-info")).toContainText("Con 5 o 6 escapás");
  await expect(page.locator("#escapar-info")).toContainText("Tampoco se puede saquear la sala.");
  const deathInfoButton = page.getByRole("button", { name: "Más información sobre morir" });
  await deathInfoButton.click();
  await expect(page.locator("#escapar-info")).toBeHidden();
  await expect(page.locator("#muerte-info")).toBeVisible();
  await expect(page.locator("#muerte-info")).toContainText("Revivís");
  await expect(page.locator("#muerte-info")).toContainText("Mientras estés muerto");
  await page.getByRole("link", { name: "Personaje", exact: true }).click();
  await expect(page.locator("#personaje")).toHaveJSProperty("open", true);
  await page.locator("#super-munchkin > summary").click();
  await expect(page.locator("#super-munchkin > div")).toBeVisible();
  await expect(page.locator("#super-munchkin")).toContainText("dos Clases distintas");
  await expect(page.locator("#super-munchkin")).toContainText("Los costos de sus habilidades se siguen pagando.");
  await page.locator("#mestizo > summary").click();
  await expect(page.locator("#mestizo > div")).toBeVisible();
  await expect(page.locator("#mestizo")).toContainText("dos Razas distintas");
  await expect(page.locator("#mestizo")).toContainText("obtenés sus ventajas e ignorás sus desventajas");
  await page.getByRole("link", { name: "Expansiones", exact: true }).click();
  await expect(page.locator("#expansiones")).toHaveJSProperty("open", true);
  await expect(page.locator("#expansiones")).toContainText("Potenciadores de Ítem");
  await expect(page.locator("#expansiones")).toContainText("no podés moverlo");
  await expect(page.locator("#expansiones")).toContainText("Sin reglas generales nuevas");
  await expect(page.locator("#expansiones").getByRole("link", { name: "Ver reglamento", exact: true })).toHaveCount(0);
  await page.getByRole("link", { name: "Reglas clave", exact: true }).click();
  await expect(page.locator("#reglas-clave .rule-callout__title .rule-card-icon")).toBeVisible();

  await page.emulateMedia({ media: "print" });
  await expect(page.locator(".rules-topbar")).toBeHidden();
  await expect(page.locator(".rules-toc")).toBeHidden();
});
