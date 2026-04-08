const DATA_URL = "./data/games.json";
const INLINE_DATA_KEY = "__BGG_LIBRARY_DATA__";
const STORAGE_KEY = "bgg-library-preferences-v2";
const NAME_OVERRIDES_KEY = "bgg-library-name-overrides-v1";

const translations = {
  es: {
    heroEyebrow: "Colección personal de juegos",
    heroTitle: "Un catálogo pensado para elegir mejor que nunca.",
    heroLede:
      "Explora la biblioteca de Ale con filtros útiles, notas personales, recomendaciones rápidas y un selector aleatorio que respeta exactamente las condiciones de la mesa.",
    randomAction: "Elegir al azar",
    exploreAction: "Explorar la colección",
    filterEyebrow: "Búsqueda guiada",
    filterTitle: "Encontrar el juego justo",
    searchLabel: "Buscar por nombre, tag o nota",
    playersLabel: "Jugadores",
    durationLabel: "Duración",
    weightLabel: "Peso",
    languageLabel: "Idioma / texto",
    bestPlayersLabel: "Mejor cantidad",
    ageLabel: "Edad",
    sortLabel: "Ordenar por",
    viewLabel: "Vista",
    recommendEyebrow: "Atajos curados",
    recommendTitle: "Recomendaciones",
    openFilters: "Filtros",
    close: "Cerrar",
    resultsEyebrow: "Resultados filtrados",
    resetFilters: "Limpiar filtros",
    emptyTitle: "No hay coincidencias para esta combinación.",
    emptyBody: "Probá aflojar algún filtro o dejá que la suerte elija desde otro conjunto.",
    owned: "En colección",
    prevOwned: "Anteriormente poseído",
    allGames: "todos los juegos",
    currentCollection: "colección actual",
    archiveCollection: "archivo",
    heroCount: "juegos cargados",
    heroOwned: "hoy en estantería",
    heroPrev: "en archivo",
    heroQuick: "partidas rápidas",
    bestAt: "mejor en",
    recommendedAt: "recomendado en",
    ageText: "Edad sugerida",
    ranking: "Ranking BGG",
    averageRating: "Rating promedio",
    languageDependence: "Dependencia del idioma",
    ownership: "Estado",
    quantity: "Cantidad",
    notes: "Notas",
    links: "Enlaces",
    openBgg: "Abrir en BGG",
    notAvailable: "Sin dato",
    randomTitle: "La mesa acaba de decidir",
    randomBody: "Sorteo hecho solo entre los juegos que cumplen tus filtros actuales.",
    reroll: "Volver a sortear",
    openDetails: "Abrir detalle",
    randomSummaryTitle: "Restricciones vigentes",
    viewGridLabel: "Galería",
    viewListLabel: "Lista",
    anyOption: "Cualquiera",
    timeQuick: "Hasta 30 min",
    timeStandard: "31 a 60 min",
    timeExtended: "61 a 120 min",
    timeEpic: "Más de 120 min",
    weightLight: "Liviano",
    weightMediumLight: "Medio liviano",
    weightMediumHeavy: "Medio pesado",
    weightHeavy: "Pesado",
    languageNone: "Sin texto importante",
    languageLow: "Poco texto",
    languageModerate: "Texto moderado",
    languageHigh: "Mucho texto",
    languageExtreme: "Muy dependiente del idioma",
    languageUnknown: "No informado",
    ageKids: "Hasta 8+",
    ageFamily: "9+ a 12+",
    ageTeen: "13+ a 15+",
    ageAdult: "16+ o más",
    sortName: "Nombre",
    sortRating: "Rating BGG",
    sortRank: "Ranking BGG",
    sortWeight: "Peso",
    sortTime: "Duración",
    recDuo: "Ideal para 2",
    recQuick: "Rápidos",
    recHeavy: "Pesados",
    recTeach: "Fáciles de enseñar",
    recSolo: "Con modo solo",
    recGroup: "Para grupo grande",
    filterSearch: "Texto",
    filterPlayers: "Jugadores",
    filterDuration: "Tiempo",
    filterWeight: "Peso",
    filterLanguage: "Idioma",
    filterBestPlayers: "Mejor cantidad",
    filterAge: "Edad",
    filterSection: "Sección",
    sectionOwned: "Colección",
    sectionArchive: "Archivo",
    languageSpanish: "ES",
    languageEnglish: "EN",
    poweredBy: "Datos e imágenes provistos por"
  },
  en: {
    heroEyebrow: "Personal board game collection",
    heroTitle: "A catalog designed to help pick the right game faster.",
    heroLede:
      "Browse Ale's library with practical filters, personal notes, quick recommendations, and a random picker that respects the exact conditions at the table.",
    randomAction: "Pick at random",
    exploreAction: "Browse collection",
    filterEyebrow: "Guided search",
    filterTitle: "Find the right game",
    searchLabel: "Search by name, tag, or note",
    playersLabel: "Players",
    durationLabel: "Duration",
    weightLabel: "Weight",
    languageLabel: "Language / text",
    bestPlayersLabel: "Best count",
    ageLabel: "Age",
    sortLabel: "Sort by",
    viewLabel: "View",
    recommendEyebrow: "Curated shortcuts",
    recommendTitle: "Recommendations",
    openFilters: "Filters",
    close: "Close",
    resultsEyebrow: "Filtered results",
    resetFilters: "Reset filters",
    emptyTitle: "No games match this combination.",
    emptyBody: "Try relaxing a filter or let chance choose from a broader set.",
    owned: "Currently owned",
    prevOwned: "Previously owned",
    allGames: "all games",
    currentCollection: "current collection",
    archiveCollection: "archive",
    heroCount: "games loaded",
    heroOwned: "currently owned",
    heroPrev: "archived",
    heroQuick: "quick plays",
    bestAt: "best at",
    recommendedAt: "recommended at",
    ageText: "Recommended age",
    ranking: "BGG rank",
    averageRating: "Average rating",
    languageDependence: "Language dependence",
    ownership: "Ownership",
    quantity: "Quantity",
    notes: "Notes",
    links: "Links",
    openBgg: "Open on BGG",
    notAvailable: "Not available",
    randomTitle: "The table has made a choice",
    randomBody: "Randomized only from games matching your active filters.",
    reroll: "Reroll",
    openDetails: "Open details",
    randomSummaryTitle: "Current restrictions",
    viewGridLabel: "Gallery",
    viewListLabel: "List",
    anyOption: "Any",
    timeQuick: "Up to 30 min",
    timeStandard: "31 to 60 min",
    timeExtended: "61 to 120 min",
    timeEpic: "More than 120 min",
    weightLight: "Light",
    weightMediumLight: "Medium-light",
    weightMediumHeavy: "Medium-heavy",
    weightHeavy: "Heavy",
    languageNone: "No important text",
    languageLow: "Low text",
    languageModerate: "Moderate text",
    languageHigh: "Heavy text",
    languageExtreme: "Language dependent",
    languageUnknown: "Unknown",
    ageKids: "Up to 8+",
    ageFamily: "9+ to 12+",
    ageTeen: "13+ to 15+",
    ageAdult: "16+ or more",
    sortName: "Name",
    sortRating: "BGG rating",
    sortRank: "BGG rank",
    sortWeight: "Weight",
    sortTime: "Duration",
    recDuo: "Great at 2",
    recQuick: "Quick games",
    recHeavy: "Heavy games",
    recTeach: "Easy to teach",
    recSolo: "Solo-ready",
    recGroup: "Big group",
    filterSearch: "Text",
    filterPlayers: "Players",
    filterDuration: "Duration",
    filterWeight: "Weight",
    filterLanguage: "Language",
    filterBestPlayers: "Best count",
    filterAge: "Age",
    filterSection: "Section",
    sectionOwned: "Collection",
    sectionArchive: "Archive",
    languageSpanish: "ES",
    languageEnglish: "EN",
    poweredBy: "Data and images provided by"
  }
};

const icons = {
  players:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9.5" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  time: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
  weight:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 20h12l-1.5-8h-9z"/><path d="M9 8a3 3 0 1 1 6 0"/></svg>',
  age: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l8 4v5c0 5-3.5 8.74-8 9-4.5-.26-8-4-8-9V7z"/><path d="M9.5 12.5l1.8 1.8 3.7-4"/></svg>'
};

const state = {
  language: "es",
  filters: {
    search: "",
    players: "",
    duration: "",
    weight: "",
    languageKey: "",
    bestPlayers: "",
    age: "",
    sort: "name",
    view: "grid",
    recommendation: "",
    section: "owned"
  },
  preferences: {
    language: "es",
    view: "grid"
  },
  nameOverrides: {},
  data: null,
  filteredGames: []
};

const elements = {};

document.addEventListener("DOMContentLoaded", init);

async function init() {
  cacheElements();
  loadPreferences();
  bindEvents();
  applyTranslations();
  await loadData();
  render();
}

function cacheElements() {
  elements.heroStats = document.querySelector("#hero-stats");
  elements.searchInput = document.querySelector("#search-input");
  elements.playersFilter = document.querySelector("#players-filter");
  elements.timeFilter = document.querySelector("#time-filter");
  elements.weightFilter = document.querySelector("#weight-filter");
  elements.languageFilter = document.querySelector("#language-filter");
  elements.bestPlayersFilter = document.querySelector("#best-players-filter");
  elements.ageFilter = document.querySelector("#age-filter");
  elements.sortFilter = document.querySelector("#sort-filter");
  elements.viewFilter = document.querySelector("#view-filter");
  elements.resultsCount = document.querySelector("#results-count");
  elements.gamesGrid = document.querySelector("#games-grid");
  elements.emptyState = document.querySelector("#empty-state");
  elements.activeFilters = document.querySelector("#active-filters");
  elements.recommendationChips = document.querySelector("#recommendation-chips");
  elements.detailsDialog = document.querySelector("#details-dialog");
  elements.detailsContent = document.querySelector("#details-content");
  elements.randomDialog = document.querySelector("#random-dialog");
  elements.randomContent = document.querySelector("#random-content");
  elements.filtersPanel = document.querySelector("#filters-panel");
  elements.cardTemplate = document.querySelector("#game-card-template");
  elements.languageSegment = document.querySelector("#language-segment");
  elements.collectionTabs = document.querySelector("#collection-tabs");
}

function loadPreferences() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    state.preferences = { ...state.preferences, ...saved };
  } catch (error) {
    console.warn("Preferences could not be parsed.", error);
  }

  state.language = state.preferences.language || "es";
  state.filters.view = state.preferences.view || "grid";

  try {
    state.nameOverrides = JSON.parse(localStorage.getItem(NAME_OVERRIDES_KEY) || "{}");
  } catch (error) {
    state.nameOverrides = {};
  }
}

function savePreferences() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.preferences));
}

function bindEvents() {
  const bindings = [
    [elements.searchInput, "input", (event) => setFilter("search", event.target.value.trim().toLowerCase())],
    [elements.playersFilter, "change", (event) => setFilter("players", event.target.value)],
    [elements.timeFilter, "change", (event) => setFilter("duration", event.target.value)],
    [elements.weightFilter, "change", (event) => setFilter("weight", event.target.value)],
    [elements.languageFilter, "change", (event) => setFilter("languageKey", event.target.value)],
    [elements.bestPlayersFilter, "change", (event) => setFilter("bestPlayers", event.target.value)],
    [elements.ageFilter, "change", (event) => setFilter("age", event.target.value)],
    [elements.sortFilter, "change", (event) => setFilter("sort", event.target.value)],
    [elements.viewFilter, "change", (event) => {
      setFilter("view", event.target.value);
      state.preferences.view = event.target.value;
      savePreferences();
    }]
  ];

  bindings.forEach(([node, eventName, handler]) => node.addEventListener(eventName, handler));
  document.querySelector("#reset-filters").addEventListener("click", resetFilters);
  document.querySelector("#random-trigger").addEventListener("click", openRandomDialog);
  document.querySelector("#toolbar-random").addEventListener("click", openRandomDialog);
  document.querySelector("#details-close").addEventListener("click", () => elements.detailsDialog.close());
  document.querySelector("#random-close").addEventListener("click", () => elements.randomDialog.close());
  document.querySelector("#open-filters").addEventListener("click", () => elements.filtersPanel.classList.add("is-open"));
  document.querySelector("#close-filters").addEventListener("click", () => elements.filtersPanel.classList.remove("is-open"));
}

function setFilter(key, value) {
  state.filters[key] = value;
  render();
}

function setLanguage(language) {
  state.language = language;
  state.preferences.language = language;
  savePreferences();
  applyTranslations();
  render();
}

function setSection(section) {
  state.filters.section = section;
  render();
}

function resetFilters() {
  state.filters = {
    search: "",
    players: "",
    duration: "",
    weight: "",
    languageKey: "",
    bestPlayers: "",
    age: "",
    sort: "name",
    view: state.preferences.view || "grid",
    recommendation: "",
    section: state.filters.section
  };
  syncControls();
  render();
}

function applyTranslations() {
  const copy = translations[state.language];
  document.documentElement.lang = state.language;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    node.textContent = copy[key] || key;
  });
  elements.searchInput.placeholder = copy.searchLabel;
  buildFilterOptions();
  renderLanguageSegment();
  renderCollectionTabs();
}

function renderLanguageSegment() {
  const copy = translations[state.language];
  const options = [
    ["es", copy.languageSpanish],
    ["en", copy.languageEnglish]
  ];
  elements.languageSegment.innerHTML = options
    .map(
      ([value, label]) =>
        `<button class="segment-button ${state.language === value ? "is-active" : ""}" data-language="${value}" type="button">${escapeHtml(label)}</button>`
    )
    .join("");
  elements.languageSegment.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.language));
  });
}

function renderCollectionTabs() {
  const copy = translations[state.language];
  const tabs = [
    ["owned", copy.sectionOwned],
    ["archive", copy.sectionArchive]
  ];
  elements.collectionTabs.innerHTML = tabs
    .map(
      ([value, label]) =>
        `<button class="segment-button ${state.filters.section === value ? "is-active" : ""}" data-section="${value}" type="button">${escapeHtml(label)}</button>`
    )
    .join("");
  elements.collectionTabs.querySelectorAll("[data-section]").forEach((button) => {
    button.addEventListener("click", () => setSection(button.dataset.section));
  });
}

function buildFilterOptions() {
  const copy = translations[state.language];
  setSelectOptions(elements.playersFilter, [["", copy.anyOption], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6+"]], state.filters.players);
  setSelectOptions(elements.timeFilter, [["", copy.anyOption], ["quick", copy.timeQuick], ["standard", copy.timeStandard], ["extended", copy.timeExtended], ["epic", copy.timeEpic]], state.filters.duration);
  setSelectOptions(elements.weightFilter, [["", copy.anyOption], ["light", copy.weightLight], ["medium-light", copy.weightMediumLight], ["medium-heavy", copy.weightMediumHeavy], ["heavy", copy.weightHeavy]], state.filters.weight);
  setSelectOptions(elements.languageFilter, [["", copy.anyOption], ["none", copy.languageNone], ["low", copy.languageLow], ["moderate", copy.languageModerate], ["high", copy.languageHigh], ["extreme", copy.languageExtreme], ["unknown", copy.languageUnknown]], state.filters.languageKey);
  setSelectOptions(elements.bestPlayersFilter, [["", copy.anyOption], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6+"]], state.filters.bestPlayers);
  setSelectOptions(elements.ageFilter, [["", copy.anyOption], ["kids", copy.ageKids], ["family", copy.ageFamily], ["teen", copy.ageTeen], ["adult", copy.ageAdult]], state.filters.age);
  setSelectOptions(elements.sortFilter, [["name", copy.sortName], ["rating", copy.sortRating], ["rank", copy.sortRank], ["weight", copy.sortWeight], ["time", copy.sortTime]], state.filters.sort);
  setSelectOptions(elements.viewFilter, [["grid", copy.viewGridLabel], ["list", copy.viewListLabel]], state.filters.view);
  renderRecommendationChips();
}

function setSelectOptions(select, options, selectedValue) {
  select.innerHTML = options.map(([value, label]) => `<option value="${escapeAttribute(value)}">${escapeHtml(label)}</option>`).join("");
  select.value = selectedValue;
}

async function loadData() {
  if (window[INLINE_DATA_KEY]) {
    state.data = normalizeDataset(window[INLINE_DATA_KEY]);
    return;
  }

  const response = await fetch(DATA_URL);
  state.data = normalizeDataset(await response.json());
}

function normalizeDataset(data) {
  if (!data || !Array.isArray(data.games)) return data;
  return {
    ...data,
    games: data.games.map(normalizeGame)
  };
}

function normalizeGame(game) {
  return {
    ...game,
    recommendedPlayers: toPlayerArray(game.recommendedPlayers),
    bestPlayers: toPlayerArray(game.bestPlayers),
    categories: Array.isArray(game.categories) ? game.categories : [],
    mechanics: Array.isArray(game.mechanics) ? game.mechanics : [],
    tags: Array.isArray(game.tags) ? game.tags : [],
    summary: typeof game.summary === "string" ? game.summary : ""
  };
}

function toPlayerArray(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => Number(item))
      .filter((item) => Number.isFinite(item));
  }
  const normalized = Number(value);
  if (Number.isFinite(normalized)) return [normalized];
  return [];
}

function render() {
  if (!state.data) return;
  syncControls();
  state.filteredGames = getFilteredGames();
  renderLanguageSegment();
  renderCollectionTabs();
  renderHeroStats();
  renderResultsSummary();
  renderActiveFilters();
  renderRecommendationChips();
  renderGames();
}

function syncControls() {
  elements.searchInput.value = state.filters.search;
  elements.playersFilter.value = state.filters.players;
  elements.timeFilter.value = state.filters.duration;
  elements.weightFilter.value = state.filters.weight;
  elements.languageFilter.value = state.filters.languageKey;
  elements.bestPlayersFilter.value = state.filters.bestPlayers;
  elements.ageFilter.value = state.filters.age;
  elements.sortFilter.value = state.filters.sort;
  elements.viewFilter.value = state.filters.view;
  elements.gamesGrid.classList.toggle("list-view", state.filters.view === "list");
}

function getFilteredGames() {
  return state.data.games
    .filter((game) => {
      if (state.filters.section === "owned" && !game.own) return false;
      if (state.filters.section === "archive" && !game.prevOwned) return false;
      if (state.filters.search && !game.searchText.includes(state.filters.search)) return false;
      if (state.filters.players) {
        const requested = state.filters.players === "6" ? 6 : Number(state.filters.players);
        if (!(game.minPlayers <= requested && game.maxPlayers >= requested)) return false;
      }
      if (state.filters.duration && game.timeBand !== state.filters.duration) return false;
      if (state.filters.weight && game.weightBand !== state.filters.weight) return false;
      if (state.filters.languageKey && game.languageKey !== state.filters.languageKey) return false;
      if (state.filters.bestPlayers) {
        const requested = state.filters.bestPlayers === "6" ? 6 : Number(state.filters.bestPlayers);
        const bestValues = Array.isArray(game.bestPlayers) ? game.bestPlayers : [];
        if (!bestValues.some((value) => (requested === 6 ? value >= 6 : value === requested))) return false;
      }
      if (state.filters.age) {
        const age = game.age ?? 0;
        const accepted = {
          kids: age > 0 && age <= 8,
          family: age >= 9 && age <= 12,
          teen: age >= 13 && age <= 15,
          adult: age >= 16
        };
        if (!accepted[state.filters.age]) return false;
      }
      if (state.filters.recommendation && !matchesRecommendation(game, state.filters.recommendation)) return false;
      return true;
    })
    .sort(sortGames);
}

function sortGames(left, right) {
  switch (state.filters.sort) {
    case "rating":
      return (right.averageRating ?? -1) - (left.averageRating ?? -1) || getDisplayName(left).localeCompare(getDisplayName(right));
    case "rank":
      return (left.rank ?? Number.MAX_SAFE_INTEGER) - (right.rank ?? Number.MAX_SAFE_INTEGER) || getDisplayName(left).localeCompare(getDisplayName(right));
    case "weight":
      return (right.avgWeight ?? -1) - (left.avgWeight ?? -1) || getDisplayName(left).localeCompare(getDisplayName(right));
    case "time":
      return (left.playingTime ?? Number.MAX_SAFE_INTEGER) - (right.playingTime ?? Number.MAX_SAFE_INTEGER) || getDisplayName(left).localeCompare(getDisplayName(right));
    default:
      return getDisplayName(left).localeCompare(getDisplayName(right));
  }
}

function matchesRecommendation(game, recommendation) {
  const bestPlayers = toPlayerArray(game.bestPlayers);
  const recommendedPlayers = toPlayerArray(game.recommendedPlayers);
  const map = {
    duo: bestPlayers.includes(2) || recommendedPlayers.includes(2),
    quick: game.timeBand === "quick",
    heavy: game.weightBand === "heavy",
    teach: (game.tags || []).includes("teaching-friendly"),
    solo: (game.tags || []).includes("solo"),
    group: game.maxPlayers >= 6
  };
  return Boolean(map[recommendation]);
}

function renderHeroStats() {
  const copy = translations[state.language];
  const stats = [
    [state.data.summary.count, copy.heroCount],
    [state.data.summary.ownCount, copy.heroOwned],
    [state.data.summary.prevOwnedCount, copy.heroPrev],
    [state.data.summary.recommendations.quick, copy.heroQuick]
  ];
  elements.heroStats.innerHTML = stats
    .map(([value, label]) => `<div class="stat-card"><strong>${escapeHtml(String(value))}</strong><span>${escapeHtml(label)}</span></div>`)
    .join("");
}

function renderResultsSummary() {
  const copy = translations[state.language];
  const scope = state.filters.section === "archive" ? copy.archiveCollection : copy.currentCollection;
  elements.resultsCount.textContent = `${state.filteredGames.length} ${scope}`;
}

function renderRecommendationChips() {
  const copy = translations[state.language];
  const recommendations = [
    ["duo", copy.recDuo],
    ["quick", copy.recQuick],
    ["heavy", copy.recHeavy],
    ["teach", copy.recTeach],
    ["solo", copy.recSolo],
    ["group", copy.recGroup]
  ];
  elements.recommendationChips.innerHTML = recommendations
    .map(
      ([value, label]) =>
        `<button class="chip chip--interactive ${state.filters.recommendation === value ? "chip--active" : ""}" data-recommendation="${value}" type="button">${escapeHtml(label)}</button>`
    )
    .join("");
  elements.recommendationChips.querySelectorAll("[data-recommendation]").forEach((button) => {
    button.addEventListener("click", () => {
      state.filters.recommendation = state.filters.recommendation === button.dataset.recommendation ? "" : button.dataset.recommendation;
      render();
    });
  });
}

function renderActiveFilters() {
  const copy = translations[state.language];
  const tags = [[copy.filterSection, state.filters.section === "archive" ? copy.sectionArchive : copy.sectionOwned]];
  if (state.filters.search) tags.push([copy.filterSearch, state.filters.search]);
  if (state.filters.players) tags.push([copy.filterPlayers, state.filters.players === "6" ? "6+" : state.filters.players]);
  if (state.filters.duration) tags.push([copy.filterDuration, labelForTimeBand(state.filters.duration)]);
  if (state.filters.weight) tags.push([copy.filterWeight, labelForWeightBand(state.filters.weight)]);
  if (state.filters.languageKey) tags.push([copy.filterLanguage, labelForLanguageKey(state.filters.languageKey)]);
  if (state.filters.bestPlayers) tags.push([copy.filterBestPlayers, state.filters.bestPlayers === "6" ? "6+" : state.filters.bestPlayers]);
  if (state.filters.age) tags.push([copy.filterAge, labelForAgeBand(state.filters.age)]);
  if (state.filters.recommendation) tags.push(["Rec", labelForRecommendation(state.filters.recommendation)]);
  elements.activeFilters.innerHTML = tags.map(([label, value]) => `<span class="chip">${escapeHtml(label)}: ${escapeHtml(String(value))}</span>`).join("");
}

function renderGames() {
  elements.gamesGrid.innerHTML = "";
  elements.emptyState.classList.toggle("hidden", state.filteredGames.length > 0);
  if (!state.filteredGames.length) return;

  const fragment = document.createDocumentFragment();
  state.filteredGames.forEach((game) => {
    const node = elements.cardTemplate.content.firstElementChild.cloneNode(true);
    const button = node.querySelector(".game-card__button");
    const art = node.querySelector(".game-card__art");
    const displayName = getDisplayName(game);
    node.querySelector(".game-card__title").textContent = displayName;
    node.querySelector(".game-card__subtitle").textContent = buildCardSubtitle(game);
    node.querySelector(".game-card__badge").textContent = game.averageRating ? game.averageRating.toFixed(1) : "n/a";
    art.dataset.initials = getInitials(displayName);
    injectCover(art, game, 220);
    node.querySelector(".game-card__meta").innerHTML = [
      metaPill("players", formatPlayers(game)),
      metaPill("time", formatPlayTime(game)),
      metaPill("weight", labelForWeightBand(game.weightBand)),
      metaPill("age", game.ageText || translations[state.language].notAvailable)
    ].join("");
    node.querySelector(".game-card__tags").innerHTML = getDisplayTags(game).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
    button.addEventListener("click", () => openDetails(game));
    fragment.append(node);
  });
  elements.gamesGrid.append(fragment);
}

function buildCardSubtitle(game) {
  const bits = [];
  if (game.yearPublished) bits.push(String(game.yearPublished));
  return bits.join(" - ");
}

function buildDetailSubtitle(game) {
  const bits = [];
  return bits.join(" - ");
}

function metaPill(icon, label) {
  return `<span class="meta-pill">${icons[icon]}<span>${escapeHtml(label)}</span></span>`;
}

function getDisplayTags(game) {
  const list = [];
  const bestPlayers = toPlayerArray(game.bestPlayers);
  const tags = Array.isArray(game.tags) ? game.tags : [];
  if (bestPlayers.length) list.push(`${translations[state.language].bestAt} ${joinPlayers(bestPlayers)}`);
  if (tags.includes("teaching-friendly")) list.push(translations[state.language].recTeach);
  if (tags.includes("solo")) list.push(translations[state.language].recSolo);
  if (tags.includes("great-at-2")) list.push(translations[state.language].recDuo);
  return list.slice(0, 3);
}

function openDetails(game) {
  const copy = translations[state.language];
  const displayName = getDisplayName(game);
  const secondaryName = getSecondaryName(game);
  const tags = getDisplayTags(game).concat(game.categories || [], game.mechanics || []).slice(0, 10);

  elements.detailsContent.innerHTML = `
    <div class="detail-layout">
      <div class="detail-cover" id="detail-cover"></div>
      <div class="detail-copy">
        <div>
          <p class="eyebrow">${escapeHtml(game.yearPublished ? String(game.yearPublished) : copy.notAvailable)}</p>
          <h2>${escapeHtml(displayName)}</h2>
          <p>${escapeHtml([secondaryName, buildDetailSubtitle(game)].filter(Boolean).join(" - "))}</p>
        </div>
        <div class="detail-meta">
          ${metaPill("players", formatPlayers(game))}
          ${metaPill("time", formatPlayTime(game))}
          ${metaPill("weight", `${copy.weightLabel}: ${game.avgWeight ? game.avgWeight.toFixed(2) : copy.notAvailable}`)}
          ${metaPill("age", `${copy.ageText}: ${game.ageText || copy.notAvailable}`)}
        </div>
        <div class="detail-section">
          <h3>${escapeHtml(copy.ownership)}</h3>
          <div class="detail-grid">
            ${detailKv(copy.ownership, game.own ? copy.owned : copy.prevOwned)}
            ${detailKv(copy.ranking, game.rank ? `#${game.rank}` : copy.notAvailable)}
            ${detailKv(copy.averageRating, game.averageRating ? game.averageRating.toFixed(2) : copy.notAvailable)}
            ${detailKv(copy.languageDependence, game.languageDependence || copy.notAvailable)}
            ${detailKv(copy.recommendedAt, game.recommendedPlayers.length ? joinPlayers(game.recommendedPlayers) : copy.notAvailable)}
            ${detailKv(copy.bestAt, game.bestPlayers.length ? joinPlayers(game.bestPlayers) : copy.notAvailable)}
          </div>
        </div>
        <div class="detail-section">
          <h3>${escapeHtml(copy.notes)}</h3>
          <p>${escapeHtml(game.notes || game.summary || game.description || copy.notAvailable)}</p>
        </div>
        <div class="detail-section">
          <h3>${escapeHtml(copy.links)}</h3>
          <div class="random-actions">
            <a class="button button--primary" href="${escapeAttribute(game.bggUrl)}" target="_blank" rel="noreferrer">${escapeHtml(copy.openBgg)}</a>
          </div>
        </div>
        <div class="detail-tags">${tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
      </div>
    </div>
  `;

  injectCover(document.querySelector("#detail-cover"), game, 420);

  if (!elements.detailsDialog.open) elements.detailsDialog.showModal();
}

function detailKv(label, value) {
  return `<div class="detail-kv"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(value)}</span></div>`;
}

function openRandomDialog() {
  const copy = translations[state.language];
  if (!state.filteredGames.length) {
    elements.randomContent.innerHTML = `<div class="random-card"><p class="eyebrow">${escapeHtml(copy.randomTitle)}</p><h2>${escapeHtml(copy.emptyTitle)}</h2><p>${escapeHtml(copy.emptyBody)}</p></div>`;
    if (!elements.randomDialog.open) elements.randomDialog.showModal();
    return;
  }

  const game = state.filteredGames[Math.floor(Math.random() * state.filteredGames.length)];
  const displayName = getDisplayName(game);
  const filtersSummary = getRandomSummary();
  elements.randomContent.innerHTML = `
    <div class="random-card">
      <div>
        <p class="eyebrow">${escapeHtml(copy.randomTitle)}</p>
        <h2>${escapeHtml(displayName)}</h2>
        <p>${escapeHtml(copy.randomBody)}</p>
      </div>
      <div class="random-result">
        <div class="detail-meta">
          ${metaPill("players", formatPlayers(game))}
          ${metaPill("time", formatPlayTime(game))}
          ${metaPill("weight", labelForWeightBand(game.weightBand))}
        </div>
        <p style="margin-top:14px">${escapeHtml(buildDetailSubtitle(game))}</p>
        <div class="detail-tags" style="margin-top:14px">${getDisplayTags(game).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
      </div>
      <div>
        <p class="eyebrow">${escapeHtml(copy.randomSummaryTitle)}</p>
        <div class="random-summary">${filtersSummary || `<span class="chip">${escapeHtml(copy.anyOption)}</span>`}</div>
      </div>
      <div class="random-actions">
        <button class="button button--ghost" id="reroll-random" type="button">${escapeHtml(copy.reroll)}</button>
        <button class="button button--primary" id="open-random-details" type="button">${escapeHtml(copy.openDetails)}</button>
      </div>
    </div>
  `;
  elements.randomContent.querySelector("#reroll-random").addEventListener("click", openRandomDialog);
  elements.randomContent.querySelector("#open-random-details").addEventListener("click", () => {
    elements.randomDialog.close();
    openDetails(game);
  });
  if (!elements.randomDialog.open) elements.randomDialog.showModal();
}

function getRandomSummary() {
  const chips = [];
  const copy = translations[state.language];
  chips.push(`<span class="chip">${escapeHtml(copy.filterSection)}: ${escapeHtml(state.filters.section === "archive" ? copy.sectionArchive : copy.sectionOwned)}</span>`);
  if (state.filters.players) chips.push(`<span class="chip">${escapeHtml(copy.filterPlayers)}: ${escapeHtml(state.filters.players === "6" ? "6+" : state.filters.players)}</span>`);
  if (state.filters.duration) chips.push(`<span class="chip">${escapeHtml(copy.filterDuration)}: ${escapeHtml(labelForTimeBand(state.filters.duration))}</span>`);
  if (state.filters.weight) chips.push(`<span class="chip">${escapeHtml(copy.filterWeight)}: ${escapeHtml(labelForWeightBand(state.filters.weight))}</span>`);
  if (state.filters.languageKey) chips.push(`<span class="chip">${escapeHtml(copy.filterLanguage)}: ${escapeHtml(labelForLanguageKey(state.filters.languageKey))}</span>`);
  if (state.filters.bestPlayers) chips.push(`<span class="chip">${escapeHtml(copy.filterBestPlayers)}: ${escapeHtml(state.filters.bestPlayers === "6" ? "6+" : state.filters.bestPlayers)}</span>`);
  return chips.join("");
}

function injectCover(container, game, width) {
  const displayName = getDisplayName(game);
  container.innerHTML = "";
  if (game.imageUrl) {
    container.classList.add("has-image");
    container.innerHTML = `<img src="${escapeAttribute(game.imageUrl)}" alt="${escapeAttribute(displayName)}" loading="lazy" width="${width}" />`;
  } else {
    container.classList.remove("has-image");
    container.dataset.initials = getInitials(displayName);
    applyPlaceholderPalette(container, game, displayName);
  }
}

function applyPlaceholderPalette(container, game, displayName) {
  const seed = `${game.id || game.collId || displayName}`;
  const hue = hashString(seed) % 360;
  const hueShift = 18 + (hashString(`${seed}-accent`) % 42);
  const saturation = 58 + (hashString(`${seed}-sat`) % 18);
  const lightA = 78 - (hashString(`${seed}-light-a`) % 8);
  const lightB = 60 - (hashString(`${seed}-light-b`) % 10);
  const lightC = 88 - (hashString(`${seed}-light-c`) % 7);

  container.style.setProperty("--cover-a", `hsl(${hue} ${saturation}% ${lightA}%)`);
  container.style.setProperty("--cover-b", `hsl(${(hue + hueShift) % 360} ${Math.max(42, saturation - 12)}% ${lightB}%)`);
  container.style.setProperty("--cover-c", `hsl(${(hue + 220) % 360} ${Math.max(30, saturation - 22)}% ${lightC}%)`);
  container.style.setProperty("--cover-ink", `hsl(${(hue + 170) % 360} 35% 16%)`);
}

function hashString(value) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function getDisplayName(game) {
  const override = getNameOverride(game.id);
  if (override) return override;
  if (state.language === "en") {
    return game.originalName || game.name;
  }
  return game.name || game.originalName;
}

function getSecondaryName(game) {
  const primary = getDisplayName(game);
  const secondary = state.language === "en" ? game.name || "" : game.originalName || "";
  if (!secondary || secondary === primary) return "";
  return secondary;
}

function getNameOverride(gameId) {
  const localOverride = state.nameOverrides?.[gameId]?.[state.language] || "";
  if (localOverride) return localOverride;
  return gameId && state.data?.games ? state.data.games.find((game) => game.id === gameId)?.nameOverrides?.[state.language] || "" : "";
}

function getInitials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function formatPlayers(game) {
  if (!game.minPlayers || !game.maxPlayers) return translations[state.language].notAvailable;
  return game.minPlayers === game.maxPlayers ? `${game.minPlayers}` : `${game.minPlayers}-${game.maxPlayers}`;
}

function formatPlayTime(game) {
  if (game.minPlayTime && game.maxPlayTime && game.minPlayTime !== game.maxPlayTime) return `${game.minPlayTime}-${game.maxPlayTime} min`;
  if (game.playingTime) return `${game.playingTime} min`;
  return translations[state.language].notAvailable;
}

function joinPlayers(values) {
  return values.map((value) => (value >= 6 ? "6+" : value)).join(", ");
}

function labelForTimeBand(value) {
  const copy = translations[state.language];
  return { quick: copy.timeQuick, standard: copy.timeStandard, extended: copy.timeExtended, epic: copy.timeEpic }[value] || value;
}

function labelForWeightBand(value) {
  const copy = translations[state.language];
  return {
    light: copy.weightLight,
    "medium-light": copy.weightMediumLight,
    "medium-heavy": copy.weightMediumHeavy,
    heavy: copy.weightHeavy,
    unknown: copy.notAvailable
  }[value] || value;
}

function labelForLanguageKey(value) {
  const copy = translations[state.language];
  return {
    none: copy.languageNone,
    low: copy.languageLow,
    moderate: copy.languageModerate,
    high: copy.languageHigh,
    extreme: copy.languageExtreme,
    unknown: copy.languageUnknown
  }[value] || value;
}

function labelForAgeBand(value) {
  const copy = translations[state.language];
  return { kids: copy.ageKids, family: copy.ageFamily, teen: copy.ageTeen, adult: copy.ageAdult }[value] || value;
}

function labelForRecommendation(value) {
  const copy = translations[state.language];
  return {
    duo: copy.recDuo,
    quick: copy.recQuick,
    heavy: copy.recHeavy,
    teach: copy.recTeach,
    solo: copy.recSolo,
    group: copy.recGroup
  }[value] || value;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}
