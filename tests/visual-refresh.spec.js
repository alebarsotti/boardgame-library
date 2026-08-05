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

test("Ideal para 2 only includes games whose best player count is 2", async ({ page }) => {
  await page.goto(`${appUrl}#/browse?search=dnup&rec=duo`, { waitUntil: "load" });

  await expect(page.locator("[data-filter-key='recommendation'][data-filter-value='duo']")).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#games-grid .game-card")).toHaveCount(0);
  await expect(page.locator("#empty-state")).toBeVisible();
});

test("active filter chips remove individual values and update the route", async ({ page }) => {
  await page.goto(`${appUrl}#/browse?duration=quick%2Cstandard&weight=light%2Cheavy`, { waitUntil: "load" });

  await expect(page.locator("[data-remove-filter='duration']")).toHaveCount(2);
  await expect(page.locator("[data-remove-filter='weight']")).toHaveCount(2);
  await page.locator("[data-remove-filter='duration'][data-remove-filter-value='quick']").click();

  await expect(page.locator("[data-remove-filter='duration'][data-remove-filter-value='quick']")).toHaveCount(0);
  await expect(page.locator("[data-remove-filter='duration'][data-remove-filter-value='standard']")).toBeVisible();
  await expect(page).toHaveURL(/#\/browse\?duration=standard&weight=light%2Cheavy&sort=name&dir=asc&view=grid$/);
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
  await expect(page).toHaveURL(/#\/history(?:\?year=\d+)?$/);

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
  await page.reload({ waitUntil: "load" });
  await expect(page.locator("#details-dialog")).not.toBeFocused();
  await expect(page.locator("#details-close")).not.toBeFocused();

  await page.goBack();
  await expect(page.locator("#details-dialog")).not.toBeVisible();
  await expect(page).not.toHaveURL(/game=\d+/);

  await page.goto(detailUrl, { waitUntil: "load" });
  await expect(page).toHaveURL(/game=\d+/);
  await expect(page.locator("#details-content")).toContainText("Munchkin");
});

test("detail modal exposes a share action with the routed URL", async ({ page }) => {
  await page.addInitScript(() => {
    window.__copiedShareUrl = null;
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (value) => {
          window.__copiedShareUrl = value;
        }
      }
    });
  });

  await page.goto(`${appUrl}#/browse?search=munchkin&sort=name&dir=asc&view=grid`, { waitUntil: "load" });
  const baseCard = page.locator(".game-card").filter({ has: page.getByText("Munchkin", { exact: true }) });
  await baseCard.locator(".game-card__button").click();
  await expect(page.locator("[data-detail-share]")).toBeVisible();

  await page.locator("[data-detail-share]").click();

  const copiedShareUrl = await page.evaluate(() => window.__copiedShareUrl);
  expect(copiedShareUrl).toMatch(/#\/browse\?.*game=\d+/);
  await expect(page.locator("[data-detail-share]")).toHaveAttribute("aria-label", /Link copiado|Link copied/);
});

test("detail tags open exact category, mechanic, and recommendation filters", async ({ page }) => {
  await page.goto(`${appUrl}#/browse`, { waitUntil: "load" });
  const fixture = await page.evaluate(() => {
    const games = window.__BGG_LIBRARY_DATA__?.games || [];
    const game = games.find((candidate) =>
      candidate.own &&
      candidate.categories?.length &&
      candidate.mechanics?.length &&
      candidate.tags?.includes("teaching-friendly")
    );
    return game
      ? {
        name: game.name,
        category: game.categories[0],
        mechanic: game.mechanics[0],
        categoryLabel: window.__BGG_LIBRARY_DATA__?.tagTranslations?.[game.categories[0]] || game.categories[0],
        mechanicLabel: window.__BGG_LIBRARY_DATA__?.tagTranslations?.[game.mechanics[0]] || game.mechanics[0]
      }
      : null;
  });
  expect(fixture).not.toBeNull();

  const card = page.locator(".game-card").filter({ has: page.getByText(fixture.name, { exact: true }) }).first();
  await card.locator(".game-card__button").click();
  await page.locator("[data-detail-filter-key='category']").filter({ hasText: fixture.categoryLabel }).first().click();

  await expect(page.locator("#details-dialog")).not.toBeVisible();
  await expect(page.locator("body")).toHaveAttribute("data-page", "browse");
  await expect(page).toHaveURL(/category=/);
  await expect(page.locator(".active-filters")).toContainText(`Categoría: ${fixture.categoryLabel}`);
  await expect(page.locator("#games-grid .game-card")).not.toHaveCount(0);

  await page.goto(`${appUrl}#/browse?mechanic=${encodeURIComponent(fixture.mechanic)}`, { waitUntil: "load" });
  await expect(page.locator(".active-filters")).toContainText(`Mecánica: ${fixture.mechanicLabel}`);
  await expect(page.locator("#games-grid .game-card")).not.toHaveCount(0);

  await page.goto(`${appUrl}#/browse`, { waitUntil: "load" });
  await page.locator(".game-card").filter({ has: page.getByText(fixture.name, { exact: true }) }).first().locator(".game-card__button").click();
  await page.locator("[data-detail-filter-key='recommendation'][data-detail-filter-value='teach']").click();
  await expect(page).toHaveURL(/rec=teach/);
  await expect(page.locator(".active-filters")).toContainText("Recomendaciones: Fáciles de enseñar");
});

test("Spanish detail tags are localized while their filter routes keep BGG values", async ({ page }) => {
  await page.goto(`${appUrl}#/browse?search=the%20mind`, { waitUntil: "load" });
  const card = page.locator(".game-card").filter({ has: page.getByText("The Mind", { exact: true }) });
  await card.locator(".game-card__button").click();

  await expect(page.locator("#details-dialog")).toContainText("Juego de cartas");
  await expect(page.locator("#details-dialog")).toContainText("Comunicación limitada");
  await page.locator("[data-detail-filter-key='mechanic'][data-detail-filter-value='Communication Limits']").click();
  await expect.poll(() => page.evaluate(() => {
    const [, query = ""] = window.location.hash.split("?");
    return new URLSearchParams(query).get("mechanic");
  })).toBe("Communication Limits");
  await expect(page.locator(".active-filters")).toContainText("Mecánica: Comunicación limitada");
});

test("history hash route hydrates scope, mode, year, and month", async ({ page }) => {
  await page.goto(`${appUrl}#/history?mode=line`, { waitUntil: "load" });
  const fixture = {
    year: await page.locator(".history-list-card h3").textContent(),
    month: await page.evaluate(() => {
      const buttons = [...document.querySelectorAll("#history-month-selector [data-history-month]")];
      const target = buttons.find((button) => {
        const label = button.getAttribute("aria-label") || "";
        const match = label.match(/:\s*(\d+)/);
        return match && Number(match[1]) > 0;
      });
      return target ? target.getAttribute("data-history-month") : null;
    })
  };
  expect(fixture.year).toBeTruthy();
  expect(fixture.month).not.toBeNull();

  await page.goto(`${appUrl}#/history?mode=line&year=${fixture.year}&month=${fixture.month}`, { waitUntil: "load" });

  await expect(page.locator("body")).toHaveAttribute("data-page", "history");
  await expect(page.locator("[data-history-scope='all']")).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("[data-history-chart-mode='line']")).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".history-chart")).toHaveAttribute("data-chart-mode", "line");
  await expect(page.locator(".history-month-chart")).toHaveAttribute("data-chart-mode", "line");
  await expect(page.locator(".history-list-card h3")).toContainText(String(fixture.year).trim());
  await expect(page).toHaveURL(new RegExp(`#\\/history\\?mode=line&year=${String(fixture.year).trim()}&month=${fixture.month}$`));
});

test("history interactions update the hash route", async ({ page }) => {
  await page.goto(`${appUrl}#/history`, { waitUntil: "load" });

  await page.locator("[data-history-scope='archive']").click();
  await expect(page).toHaveURL(/#\/history\?scope=archive&year=\d+$/);

  await page.locator("[data-history-chart-mode='line']").click();
  await expect(page).toHaveURL(/#\/history\?scope=archive&mode=line&year=\d+$/);

  const lastYearButton = page.locator("#history-year-selector [data-history-year]").last();
  const selectedYear = await lastYearButton.getAttribute("data-history-year");
  await lastYearButton.click({ force: true });
  await expect(page).toHaveURL(new RegExp(`#\\/history\\?scope=archive&mode=line&year=${selectedYear}$`));

  const monthWithData = await page.evaluate(() => {
    const buttons = [...document.querySelectorAll("#history-month-selector [data-history-month]")];
    const target = buttons.find((button) => {
      const label = button.getAttribute("aria-label") || "";
      const match = label.match(/:\s*(\d+)/);
      return match && Number(match[1]) > 0;
    });
    return target ? target.getAttribute("data-history-month") : null;
  });
  expect(monthWithData).not.toBeNull();

  await page.evaluate((month) => {
    const button = document.querySelector(`#history-month-selector [data-history-month='${month}']`);
    if (!(button instanceof HTMLButtonElement)) throw new Error("Month selector button unavailable");
    button.click();
  }, monthWithData);
  await expect(page).toHaveURL(new RegExp(`#\\/history\\?scope=archive&mode=line&year=${selectedYear}&month=${monthWithData}$`));
});

test("random hash route hydrates shared context", async ({ page }) => {
  await page.goto(
    `${appUrl}#/random?scope=archive&players=2&duration=standard,quick&weight=heavy,light&lang=english&best=2&age=adult&rec=duo&draw=2`,
    { waitUntil: "load" }
  );

  await expect(page.locator("body")).toHaveAttribute("data-page", "random");
  await expect(page.locator("#random-panel")).toBeVisible();
  await expect(page.locator("#random-page-summary")).toContainText("Archivo");
  await expect(page.locator("#random-page-summary")).toContainText("Jugadores: 2");
  await expect(page.locator("#random-page-summary")).toContainText("Tiempo");
  await expect(page.locator("#random-page-summary")).toContainText("Mejor cantidad: 2");
  await expect(page.locator("#random-page-summary")).toContainText("Edad");
  await expect(page.locator("#random-page-summary")).toContainText("Rec: Ideal para 2");
  await expect(page.locator("#random-draw-count")).toHaveValue("2");
  await expect(page).toHaveURL(/#\/random\?scope=archive&players=2&duration=quick%2Cstandard&weight=light%2Cheavy&lang=english&best=2&age=adult&rec=duo&draw=2$/);
});

test("random interactions update hash and preserve workspace context", async ({ page }) => {
  await page.goto(`${appUrl}#/browse?search=munchkin&rec=quick`, { waitUntil: "load" });
  await openPageByNav(page, "Azar");

  await expect(page.locator("body")).toHaveAttribute("data-page", "random");
  await expect(page).toHaveURL(/#\/random\?search=munchkin&rec=quick$/);

  await page.locator("#random-draw-count").selectOption("2");
  await expect(page).toHaveURL(/#\/random\?search=munchkin&rec=quick&draw=2$/);

  await page.locator("#random-browse-action").click();
  await expect(page.locator("body")).toHaveAttribute("data-page", "browse");
  await expect(page.locator("#search-input")).toHaveValue("munchkin");
  await expect(page.locator("[data-filter-key='recommendation'][data-filter-value='quick']")).toHaveAttribute("aria-pressed", "true");
  await expect(page).toHaveURL(/#\/browse\?search=munchkin&sort=name&dir=asc&view=grid&rec=quick$/);
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

  await page.setViewportSize({ width: 1024, height: 768 });
  await page.evaluate(() => {
    document.querySelector(".quick-reference__surface").requestFullscreen = async () => {
      document.querySelector(".quick-reference__surface").dataset.fullscreenRequested = "true";
    };
    Object.defineProperty(navigator, "wakeLock", {
      configurable: true,
      value: {
        request: async (type) => {
          document.documentElement.dataset.wakeLockRequested = type;
          const sentinel = new EventTarget();
          sentinel.released = false;
          sentinel.release = async () => {
            sentinel.released = true;
            document.documentElement.dataset.wakeLockReleased = "true";
            sentinel.dispatchEvent(new Event("release"));
          };
          return sentinel;
        }
      }
    });
  });
  const quickReference = page.locator("[data-quick-reference]");
  const quickReferenceTrigger = page.locator(".rules-game-summary").getByRole("button", { name: "Ayuda rápida" });
  await expect(quickReferenceTrigger).toBeVisible();
  await expect(quickReferenceTrigger).toHaveCSS("position", "absolute");
  const heroBox = await page.locator(".rules-game-summary").boundingBox();
  const quickReferenceTriggerBox = await quickReferenceTrigger.boundingBox();
  expect(heroBox).not.toBeNull();
  expect(quickReferenceTriggerBox).not.toBeNull();
  expect(quickReferenceTriggerBox.x + quickReferenceTriggerBox.width).toBeGreaterThan(heroBox.x + heroBox.width - 80);
  expect(quickReferenceTriggerBox.y).toBeLessThan(heroBox.y + 80);
  await expect(page.locator(".rules-topbar").getByRole("button", { name: "Ayuda rápida" })).toHaveCount(0);
  await expect(quickReference).not.toBeVisible();
  await quickReferenceTrigger.click();
  await expect(quickReference).toBeVisible();
  await expect(quickReference).toHaveJSProperty("open", true);
  await expect(page.locator(".quick-reference__surface")).toHaveAttribute("data-fullscreen-requested", "true");
  await expect(page.locator("html")).not.toHaveAttribute("data-fullscreen-requested", "true");
  await expect(page.locator("html")).toHaveAttribute("data-wake-lock-requested", "screen");
  await expect(page.locator("[data-wake-lock-status]")).toHaveCount(0);
  const quickReferenceBox = await quickReference.boundingBox();
  expect(quickReferenceBox).not.toBeNull();
  expect(quickReferenceBox.width).toBe(1024);
  expect(quickReferenceBox.height).toBe(768);
  await expect(page.locator(".quick-reference__content")).toHaveCSS("grid-template-columns", /.+ .+ .+/);
  await expect(quickReference.getByRole("heading", { name: "Munchkin · Referencia rápida" })).toBeVisible();
  await expect(quickReference.getByText("1 · Patear la puerta", { exact: true })).toBeVisible();
  await expect(quickReference.getByText("2 · Buscar problemas o saquear", { exact: true })).toBeVisible();
  await expect(quickReference.getByText("3 · Caridad", { exact: true })).toBeVisible();
  await expect(quickReference.locator(".quick-turn-flow p")).toHaveCount(0);
  const quickTurnBox = await quickReference.locator(".quick-reference__section--turn").boundingBox();
  const quickActionsBox = await quickReference.locator(".quick-reference__section--actions").boundingBox();
  expect(quickTurnBox).not.toBeNull();
  expect(quickActionsBox).not.toBeNull();
  expect(quickActionsBox.width).toBeGreaterThan(quickTurnBox.width * 2.5);
  const quickBodyFontSizes = await page.evaluate(() => ({
    listItem: parseFloat(getComputedStyle(document.querySelector(".quick-action-grid li")).fontSize),
    sectionTitle: parseFloat(getComputedStyle(document.querySelector(".quick-reference__section-heading h3")).fontSize)
  }));
  expect(quickBodyFontSizes.listItem).toBeGreaterThanOrEqual(16);
  expect(quickBodyFontSizes.sectionTitle).toBeGreaterThanOrEqual(24);
  const quickTextColors = await page.evaluate(() => {
    const referenceColor = getComputedStyle(document.querySelector("[data-quick-reference]")).color;
    const selectors = [
      ".quick-turn-flow strong",
      ".quick-reference__badge",
      ".quick-slots strong",
      ".quick-reference__section--combat li"
    ];
    return {
      referenceColor,
      colors: selectors.map((selector) => getComputedStyle(document.querySelector(selector)).color)
    };
  });
  expect(quickTextColors.colors.every((color) => color === quickTextColors.referenceColor)).toBe(true);
  const quickBadgeStyles = await page.evaluate(() => {
    const styles = getComputedStyle(document.querySelector(".quick-reference__badge"));
    return {
      fontSize: parseFloat(styles.fontSize),
      borderWidth: styles.borderTopWidth,
      borderStyle: styles.borderTopStyle
    };
  });
  expect(quickBadgeStyles.fontSize).toBeGreaterThanOrEqual(14);
  expect(quickBadgeStyles.borderWidth).toBe("1px");
  expect(quickBadgeStyles.borderStyle).toBe("solid");
  const quickSections = {
    turn: quickReference.locator(".quick-reference__section--turn"),
    combat: quickReference.locator(".quick-reference__section--combat"),
    character: quickReference.locator(".quick-reference__section--character"),
    actions: quickReference.locator(".quick-reference__section--actions"),
    general: quickReference.locator(".quick-reference__section--general")
  };
  await expect(quickSections.combat.locator(".quick-reference__number")).toHaveText("2");
  await expect(quickSections.character.locator(".quick-reference__number")).toHaveText("3");
  await expect(quickSections.actions.locator(".quick-reference__number")).toHaveText("4");
  await expect(quickSections.general.locator(".quick-reference__number")).toHaveText("5");
  const quickSectionBoxes = {
    turn: await quickSections.turn.boundingBox(),
    combat: await quickSections.combat.boundingBox(),
    character: await quickSections.character.boundingBox(),
    actions: await quickSections.actions.boundingBox(),
    general: await quickSections.general.boundingBox()
  };
  Object.values(quickSectionBoxes).forEach((box) => expect(box).not.toBeNull());
  expect(Math.abs(quickSectionBoxes.turn.y - quickSectionBoxes.combat.y)).toBeLessThan(2);
  expect(Math.abs(quickSectionBoxes.turn.y - quickSectionBoxes.character.y)).toBeLessThan(2);
  expect(quickSectionBoxes.turn.x).toBeLessThan(quickSectionBoxes.combat.x);
  expect(quickSectionBoxes.combat.x).toBeLessThan(quickSectionBoxes.character.x);
  expect(Math.abs(quickSectionBoxes.actions.y - quickSectionBoxes.general.y)).toBeLessThan(2);
  expect(quickSectionBoxes.actions.y).toBeGreaterThan(quickSectionBoxes.turn.y);
  expect(quickSectionBoxes.actions.x).toBeLessThan(quickSectionBoxes.general.x);
  await expect(quickReference).toContainText("En cualquier momento");
  await expect(quickReference).toContainText("Fuera de combate");
  await expect(quickReference).toContainText("Durante un combate");
  await expect(quickReference).toContainText("1 Yelmo");
  await expect(quickReference).toContainText("2 Manos");
  await expect(quickReference).toContainText("solo 1");
  await expect(quickReference).toContainText("5 cartas");
  await expect(quickReference).toContainText("Los monstruos ganan los empates");
  await expect(page.locator("body")).toHaveClass(/quick-reference-is-open/);
  await page.keyboard.press("Escape");
  await expect(quickReference).not.toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-wake-lock-released", "true");
  await expect(page.locator("body")).not.toHaveClass(/quick-reference-is-open/);
  await expect(quickReferenceTrigger).toBeFocused();

  await page.emulateMedia({ media: "print" });
  await expect(page.locator(".rules-topbar")).toBeHidden();
  await expect(page.locator(".rules-toc")).toBeHidden();
});

test("Cartógrafos exposes a complete rules guide", async ({ page }) => {
  await page.goto(appUrl, { waitUntil: "load" });
  await openPageByNav(page, "Explorar");
  await page.locator("#search-input").fill("Cartógrafos");

  const baseCard = page.locator(".game-card").filter({ has: page.getByText("Cartógrafos", { exact: true }) });
  await baseCard.locator(".game-card__button").click();
  await expect(page.getByRole("link", { name: "Leer resumen de reglas" })).toBeVisible();
  await page.getByRole("link", { name: "Leer resumen de reglas" }).click();

  await expect(page).toHaveTitle(/Cartógrafos · Resumen de reglas/);
  await expect(page.locator(".rules-game-summary h1")).toHaveText("Cartógrafos");
  await expect(page.locator(".rules-game-summary__meta")).toContainText("1–100");
  await expect(page.locator(".rules-game-summary__meta")).toContainText("30–45 min");
  await expect(page.locator(".rules-game-summary__description")).toHaveText("Dibujá el mapa · Cumplí los edictos · Contené a los Dragul");

  await expect(page.locator("#preparacion .rule-card")).toHaveCount(6);
  await expect(page.locator("#turno")).toContainText("rotarla y/o voltearla");
  await expect(page.locator("#turno")).toContainText("1×1");
  await expect(page.locator("#cartas-especiales")).toContainText("Ruina seguida de emboscada");
  await expect(page.locator("#fin-estacion")).toContainText("Primavera:");
  await expect(page.locator("#fin-estacion")).toContainText("Invierno:");
  await expect(page.locator("#misiones .rule-card")).toHaveCount(16);
  await expect(page.locator("#fin-juego")).toContainText("Menor pérdida por monstruos");
  await expect(page.locator("#solitario")).toHaveCount(0);

  const manualsMenu = page.locator(".rules-manuals-menu");
  await manualsMenu.locator("summary").click();
  const officialRulesLink = manualsMenu.getByRole("link", { name: "Juego base" });
  await expect(officialRulesLink).toHaveAttribute("href", /Cartografos_Reglamento_Web\.pdf/);
  await expect(officialRulesLink).toHaveAttribute("target", "_blank");

  await page.getByRole("link", { name: "Reglas clave", exact: true }).click();
  await expect(page.locator("#reglas-clave")).toHaveJSProperty("open", true);
  await page.emulateMedia({ media: "print" });
  await expect(page.locator(".rules-topbar")).toBeHidden();
  await expect(page.locator(".rules-toc")).toBeHidden();
});
