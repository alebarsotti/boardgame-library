const DATA_URL = "./data/games.json";
const INLINE_DATA_KEY = "__BGG_LIBRARY_DATA__";
const STORAGE_KEY = "bgg-library-preferences-v3";
const NAME_OVERRIDES_KEY = "bgg-library-name-overrides-v1";

const PAGE_KEYS = ["home", "browse", "archive", "random", "settings"];

const translations = {
  es: {
    brandEyebrow: "Biblioteca personal",
    navHome: "Inicio",
    navBrowse: "Explorar",
    navArchive: "Archivo",
    navRandom: "Azar",
    navSettings: "Ajustes",
    heroEyebrow: "Coleccion personal de juegos",
    heroTitle: "Un catalogo mas claro para elegir mejor.",
    heroLede:
      "Explora la biblioteca, revisa el archivo y deja que Azar te ayude a decidir sin perder los filtros utiles del flujo original.",
    randomAction: "Elegir al azar",
    exploreAction: "Explorar la coleccion",
    openArchiveAction: "Ver archivo",
    openSettingsAction: "Abrir ajustes",
    filterEyebrow: "Busqueda guiada",
    filterTitle: "Encontrar el juego justo",
    searchLabel: "Buscar por nombre, tag o nota",
    playersLabel: "Jugadores",
    durationLabel: "Duracion",
    weightLabel: "Peso",
    languageLabel: "Idioma / texto",
    bestPlayersLabel: "Mejor cantidad",
    ageLabel: "Edad",
    sortLabel: "Ordenar por",
    viewLabel: "Vista",
    filterModeExact: "Exacto",
    filterModeUntil: "Hasta",
    filterModeFrom: "Desde",
    filterModeHintDuration: "Como leer este filtro de duracion",
    filterModeHintWeight: "Como leer este filtro de peso",
    filterModeExplainExact: "Solo juegos dentro de esta banda",
    filterModeExplainUntil: "Incluye esta banda y cualquier opcion mas corta o mas liviana",
    filterModeExplainFrom: "Incluye esta banda y cualquier opcion mas larga o mas pesada",
    activeFiltersTitle: "Filtros activos",
    activeFilterMode: "Modo",
    recommendEyebrow: "Atajos curados",
    recommendTitle: "Recomendaciones",
    openFilters: "Filtros",
    close: "Cerrar",
    resultsEyebrow: "Resultados filtrados",
    resetFilters: "Limpiar filtros",
    emptyTitle: "No hay coincidencias para esta combinacion.",
    emptyBody: "Proba aflojar algun filtro o deja que la suerte elija desde otro conjunto.",
    owned: "En coleccion",
    prevOwned: "Anteriormente poseido",
    currentCollection: "coleccion actual",
    archiveCollection: "archivo",
    heroCount: "juegos cargados",
    heroOwned: "hoy en estanteria",
    heroPrev: "en archivo",
    heroQuick: "partidas rapidas",
    bestAt: "mejor en",
    recommendedAt: "recomendado en",
    ageText: "Edad sugerida",
    ranking: "Ranking BGG",
    averageRating: "Rating promedio",
    languageDependence: "Dependencia del idioma",
    ownership: "Estado",
    content: "Contenido",
    links: "Enlaces",
    openBgg: "Abrir en BGG",
    expansion: "Expansion",
    expansionRequiresBase: "Requiere juego base",
    expansionsTitle: "Expansiones",
    expansionsEmpty: "No hay expansiones vinculadas.",
    notAvailable: "Sin dato",
    randomTitle: "La mesa acaba de decidir",
    randomBody: "Sorteo hecho solo entre los juegos que cumplen tus filtros activos.",
    reroll: "Volver a sortear",
    openDetails: "Abrir detalle",
    randomSummaryTitle: "Restricciones vigentes",
    viewGridLabel: "Galeria",
    viewListLabel: "Lista",
    anyOption: "Cualquiera",
    timeQuick: "Hasta 30 min",
    timeStandard: "31 a 60 min",
    timeExtended: "61 a 120 min",
    timeEpic: "Mas de 120 min",
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
    ageAdult: "16+ o mas",
    sortName: "Nombre",
    sortRating: "Rating BGG",
    sortRank: "Ranking BGG",
    sortWeight: "Peso",
    sortTime: "Duracion",
    sortMaxPlayers: "Max jugadores",
    recDuo: "Ideal para 2",
    recQuick: "Rapidos",
    recHeavy: "Pesados",
    recTeach: "Faciles de ensenar",
    recSolo: "Con modo solo",
    recGroup: "Para grupo grande",
    filterSearch: "Texto",
    filterPlayers: "Jugadores",
    filterDuration: "Tiempo",
    filterWeight: "Peso",
    filterLanguage: "Idioma",
    filterBestPlayers: "Mejor cantidad",
    filterAge: "Edad",
    filterSection: "Seccion",
    sectionOwned: "Coleccion",
    sectionArchive: "Archivo",
    languageSpanish: "ES",
    languageEnglish: "EN",
    poweredBy: "Datos e imagenes provistos por",
    homeCollectionEyebrow: "Estado de la biblioteca",
    homeCollectionTitle: "Una vista general para arrancar sin vueltas.",
    homeCollectionBody:
      "Aca ves rapido como esta la biblioteca y elegis si queres explorar la coleccion activa, revisar el archivo o dejar que la app te sugiera una opcion.",
    homeUtilityEyebrow: "Accesos directos",
    homeUtilityTitle: "Cada tarea tiene su propio espacio",
    homeUtilityBody:
      "Explorar queda para filtrar en serio, Archivo para revisar juegos que ya no estan, Azar para desempatar y Ajustes para preferencias duraderas.",
    homeBrowseShortcut: "Ir a explorar",
    homeRandomShortcut: "Ir a azar",
    homeSettingsShortcut: "Ver ajustes",
    workspaceBrowseEyebrow: "Exploracion guiada",
    workspaceBrowseTitle: "Explorar la coleccion actual",
    workspaceBrowseBody: "Este es el espacio para buscar en profundidad dentro de la ludoteca activa, con filtros, orden y vistas compactas.",
    workspaceArchiveEyebrow: "Archivo historico",
    workspaceArchiveTitle: "Revisar el archivo historico",
    workspaceArchiveBody: "El archivo ahora tiene su propia pantalla para recorrer juegos que ya no estan sin mezclarlos con la coleccion actual.",
    randomPageEyebrow: "Decision rapida",
    randomPageTitle: "Una seccion dedicada para decidir sin vueltas",
    randomPageBody: "Azar toma los filtros activos del ultimo espacio que usaste y te devuelve una opcion concreta para destrabar la mesa.",
    randomPageEmptyTitle: "Todavia no hay un sorteo",
    randomPageEmptyBody: "Usa el boton principal para elegir un juego desde el conjunto activo.",
    randomPageScope: "Tomando filtros desde",
    randomPageOpenWorkspace: "Volver al espacio anterior",
    settingsEyebrow: "Preferencias",
    settingsTitle: "Ajustes para una experiencia mas comoda",
    settingsBody: "En esta primera etapa, el idioma pasa a un lugar estable y deja preparado el espacio para futuras preferencias.",
    settingsLanguageEyebrow: "Idioma",
    settingsLanguageTitle: "Elegi el idioma de la interfaz",
    settingsLanguageBody: "El cambio impacta la navegacion, los encabezados y el contenido visible de toda la app.",
    settingsRoadmapEyebrow: "Proxima expansion",
    settingsRoadmapTitle: "Lo que puede venir",
    settingsRoadmapBody:
      "Este espacio queda preparado para recibir temas, opciones visuales o preferencias adicionales sin volver a cargar el hero principal.",
    drawnFromBrowse: "Explorar",
    drawnFromArchive: "Archivo"
  },
  en: {
    brandEyebrow: "Personal library",
    navHome: "Home",
    navBrowse: "Browse",
    navArchive: "Archive",
    navRandom: "Random",
    navSettings: "Settings",
    heroEyebrow: "Personal board game collection",
    heroTitle: "A clearer catalog for choosing better.",
    heroLede:
      "Browse the library, revisit the archive, and let Random help the table decide without losing the useful filter flow.",
    randomAction: "Pick at random",
    exploreAction: "Browse collection",
    openArchiveAction: "Open archive",
    openSettingsAction: "Open settings",
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
    filterModeExact: "Exact",
    filterModeUntil: "Up to",
    filterModeFrom: "From",
    filterModeHintDuration: "How to read this duration filter",
    filterModeHintWeight: "How to read this weight filter",
    filterModeExplainExact: "Only games inside this band",
    filterModeExplainUntil: "Includes this band and anything shorter or lighter",
    filterModeExplainFrom: "Includes this band and anything longer or heavier",
    activeFiltersTitle: "Active filters",
    activeFilterMode: "Mode",
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
    content: "Content",
    links: "Links",
    openBgg: "Open on BGG",
    expansion: "Expansion",
    expansionRequiresBase: "Requires base game",
    expansionsTitle: "Expansions",
    expansionsEmpty: "No linked expansions.",
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
    sortMaxPlayers: "Max players",
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
    poweredBy: "Data and images provided by",
    homeCollectionEyebrow: "Library status",
    homeCollectionTitle: "A simple landing area for quick orientation.",
    homeCollectionBody:
      "Home summarizes the collection and directs you to the right experience depending on whether you want to explore, revisit the archive, or let the app decide.",
    homeUtilityEyebrow: "Shortcuts",
    homeUtilityTitle: "Clear entry points for each job",
    homeUtilityBody:
      "Browse is for deep filtering, Archive is for previously owned titles, Random is for tie-breakers, and Settings holds durable preferences.",
    homeBrowseShortcut: "Go to browse",
    homeRandomShortcut: "Go to random",
    homeSettingsShortcut: "Open settings",
    workspaceBrowseEyebrow: "Guided exploration",
    workspaceBrowseTitle: "Browse: explore the current collection",
    workspaceBrowseBody: "This is the deep filtering workspace for the active shelf, keeping the controls and views you already had.",
    workspaceArchiveEyebrow: "Historical archive",
    workspaceArchiveTitle: "Archive: revisit games no longer on the shelf",
    workspaceArchiveBody: "Archive is now a dedicated destination for browsing past titles without mixing them into the active collection flow.",
    randomPageEyebrow: "Decision space",
    randomPageTitle: "Random now has its own place",
    randomPageBody: "This page uses the active filters from the last workspace you used and proposes one concrete option for the table.",
    randomPageEmptyTitle: "No draw yet",
    randomPageEmptyBody: "Use the main button to pick a game from the active candidate set.",
    randomPageScope: "Using filters from",
    randomPageOpenWorkspace: "Back to previous view",
    settingsEyebrow: "Preferences",
    settingsTitle: "Settings for a more comfortable experience",
    settingsBody: "In this first step, language moves into a stable place and leaves room for future preferences.",
    settingsLanguageEyebrow: "Language",
    settingsLanguageTitle: "Choose the interface language",
    settingsLanguageBody: "This updates navigation, section headers, and visible content labels across the app.",
    settingsRoadmapEyebrow: "Next layer",
    settingsRoadmapTitle: "What can come next",
    settingsRoadmapBody:
      "This space is now ready for themes, visual settings, or additional preferences without overloading the main hero.",
    drawnFromBrowse: "Browse",
    drawnFromArchive: "Archive"
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
  activePage: "home",
  lastWorkspacePage: "browse",
  filters: {
    search: "",
    players: "",
    duration: "",
    durationMode: "exact",
    weight: "",
    weightMode: "exact",
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
    view: "grid",
    activePage: "home"
  },
  nameOverrides: {},
  data: null,
  filteredGames: [],
  randomSelection: null
};

const elements = {};
const CONTROL_CONTAINER_MAP = {
  players: "playersFilter",
  duration: "timeFilter",
  weight: "weightFilter",
  languageKey: "languageFilter",
  bestPlayers: "bestPlayersFilter",
  age: "ageFilter",
  sort: "sortFilter",
  view: "viewFilter",
  recommendation: "recommendationChips"
};

document.addEventListener("DOMContentLoaded", init);

async function init() {
  cacheElements();
  loadPreferences();
  bindEvents();
  applyTranslations();
  await loadData();
  ensureValidActivePage();
  syncSectionWithPage();
  render();
}

function cacheElements() {
  elements.pageNav = document.querySelector("#page-nav");
  elements.heroStats = document.querySelector("#hero-stats");
  elements.homeOwnedCount = document.querySelector("#home-owned-count");
  elements.homeArchiveCount = document.querySelector("#home-archive-count");
  elements.homeShortcuts = document.querySelector("#home-shortcuts");
  elements.workspaceEyebrow = document.querySelector("#workspace-eyebrow");
  elements.workspaceTitle = document.querySelector("#workspace-title");
  elements.workspaceBody = document.querySelector("#workspace-body");
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
  elements.randomPageSummary = document.querySelector("#random-page-summary");
  elements.randomPageContent = document.querySelector("#random-page-content");
  elements.filtersPanel = document.querySelector("#filters-panel");
  elements.cardTemplate = document.querySelector("#game-card-template");
  elements.languageSegment = document.querySelector("#language-segment");
  elements.homePanel = document.querySelector("#home-panel");
  elements.workspacePanel = document.querySelector("#workspace-panel");
  elements.randomPanel = document.querySelector("#random-panel");
  elements.settingsPanel = document.querySelector("#settings-panel");
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
  state.activePage = state.preferences.activePage || "home";
  state.lastWorkspacePage = state.activePage === "archive" ? "archive" : "browse";

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
  elements.searchInput.addEventListener("input", (event) => setFilter("search", event.target.value.trim().toLowerCase()));
  elements.filtersPanel.addEventListener("click", handleFilterControlClick);
  elements.filtersPanel.addEventListener("change", handleFilterControlChange);
  elements.viewFilter.addEventListener("click", handleFilterControlClick);
  document.querySelector("#reset-filters").addEventListener("click", resetFilters);
  document.querySelector("#details-close").addEventListener("click", () => elements.detailsDialog.close());
  document.querySelector("#random-close").addEventListener("click", () => elements.randomDialog.close());
  document.querySelector("#open-filters").addEventListener("click", () => elements.filtersPanel.classList.add("is-open"));
  document.querySelector("#close-filters").addEventListener("click", () => elements.filtersPanel.classList.remove("is-open"));
  document.querySelector("#home-browse-action").addEventListener("click", () => setActivePage("browse"));
  document.querySelector("#home-random-action").addEventListener("click", drawRandomFromCurrentScope);
  document.querySelector("#home-archive-action").addEventListener("click", () => setActivePage("archive"));
  document.querySelector("#workspace-settings-action").addEventListener("click", () => setActivePage("settings"));
  document.querySelector("#workspace-random-action").addEventListener("click", drawRandomFromCurrentScope);
  document.querySelector("#toolbar-random").addEventListener("click", drawRandomFromCurrentScope);
  document.querySelector("#random-browse-action").addEventListener("click", () => setActivePage(state.lastWorkspacePage));
  document.querySelector("#random-page-trigger").addEventListener("click", drawRandomFromCurrentScope);
}

function ensureValidActivePage() {
  if (!PAGE_KEYS.includes(state.activePage)) {
    state.activePage = "home";
  }
}

function setFilter(key, value) {
  state.filters[key] = value;
  if (key === "view") {
    state.preferences.view = value;
    savePreferences();
  }
  render();
}

function setLanguage(language) {
  state.language = language;
  state.preferences.language = language;
  savePreferences();
  applyTranslations();
  render();
}

function setActivePage(page) {
  if (!PAGE_KEYS.includes(page)) return;
  state.activePage = page;
  if (page === "browse" || page === "archive") {
    state.lastWorkspacePage = page;
    state.filters.section = page === "archive" ? "archive" : "owned";
  }
  state.preferences.activePage = page;
  savePreferences();
  elements.filtersPanel.classList.remove("is-open");
  render();
}

function syncSectionWithPage() {
  if (state.activePage === "archive") {
    state.filters.section = "archive";
    state.lastWorkspacePage = "archive";
    return;
  }
  if (state.activePage === "browse") {
    state.filters.section = "owned";
    state.lastWorkspacePage = "browse";
    return;
  }
  state.filters.section = state.lastWorkspacePage === "archive" ? "archive" : "owned";
}

function resetFilters() {
  state.filters = {
    search: "",
    players: "",
    duration: "",
    durationMode: "exact",
    weight: "",
    weightMode: "exact",
    languageKey: "",
    bestPlayers: "",
    age: "",
    sort: "name",
    view: state.preferences.view || "grid",
    recommendation: "",
    section: getEffectiveSection()
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
  renderPageNav();
  renderLanguageSegment();
  renderFilterControls();
}

function renderPageNav() {
  const copy = translations[state.language];
  const items = [
    ["home", copy.navHome],
    ["browse", copy.navBrowse],
    ["archive", copy.navArchive],
    ["random", copy.navRandom],
    ["settings", copy.navSettings]
  ];
  elements.pageNav.innerHTML = items
    .map(
      ([value, label]) =>
        `<button class="segment-button ${state.activePage === value ? "is-active" : ""}" data-page="${value}" type="button">${escapeHtml(label)}</button>`
    )
    .join("");
  elements.pageNav.querySelectorAll("[data-page]").forEach((button) => {
    button.addEventListener("click", () => setActivePage(button.dataset.page));
  });
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

function getFilterControlDefinitions() {
  const copy = translations[state.language];
  return {
    players: {
      style: "chips",
      toggleable: true,
      options: [["", copy.anyOption], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6+"]]
    },
    duration: {
      style: "range",
      modeKey: "durationMode",
      toggleable: true,
      options: [["quick", "<=30"], ["standard", "31-60"], ["extended", "61-120"], ["epic", "120+"]]
    },
    weight: {
      style: "range",
      modeKey: "weightMode",
      toggleable: true,
      options: [["light", copy.weightLight], ["medium-light", copy.weightMediumLight], ["medium-heavy", copy.weightMediumHeavy], ["heavy", copy.weightHeavy]]
    },
    languageKey: {
      style: "select",
      options: [["", copy.anyOption], ["none", copy.languageNone], ["low", copy.languageLow], ["moderate", copy.languageModerate], ["high", copy.languageHigh], ["extreme", copy.languageExtreme], ["unknown", copy.languageUnknown]]
    },
    bestPlayers: {
      style: "chips",
      toggleable: true,
      options: [["", copy.anyOption], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6+"]]
    },
    age: {
      style: "select",
      options: [["", copy.anyOption], ["kids", copy.ageKids], ["family", copy.ageFamily], ["teen", copy.ageTeen], ["adult", copy.ageAdult]]
    },
    sort: {
      style: "select",
      options: [["name", copy.sortName], ["rating", copy.sortRating], ["rank", copy.sortRank], ["weight", copy.sortWeight], ["time", copy.sortTime], ["maxPlayers", copy.sortMaxPlayers]]
    },
    view: {
      style: "segment",
      toggleable: false,
      options: [["grid", copy.viewGridLabel], ["list", copy.viewListLabel]]
    },
    recommendation: {
      style: "chips",
      toggleable: true,
      options: [["duo", copy.recDuo], ["quick", copy.recQuick], ["heavy", copy.recHeavy], ["teach", copy.recTeach], ["solo", copy.recSolo], ["group", copy.recGroup]]
    }
  };
}

function renderFilterControls() {
  const copy = translations[state.language];
  const definitions = getFilterControlDefinitions();
  Object.entries(CONTROL_CONTAINER_MAP).forEach(([key, elementKey]) => {
    const container = elements[elementKey];
    const definition = definitions[key];
    if (!container || !definition) return;
    const baseClass = key === "view" ? "toolbar__view filter-control" : "filter-control";
    if (definition.style === "range") {
      const modeValue = state.filters[definition.modeKey] || "exact";
      const hintLabel = key === "duration" ? copy.filterModeHintDuration : copy.filterModeHintWeight;
      container.className = `${baseClass} filter-control--range`;
      container.innerHTML = `
        <div class="segmented-control filter-control__modes">
          ${renderRangeModeButton(key, "exact", copy.filterModeExact, modeValue)}
          ${renderRangeModeButton(key, "until", copy.filterModeUntil, modeValue)}
          ${renderRangeModeButton(key, "from", copy.filterModeFrom, modeValue)}
        </div>
        <p class="filter-control__hint"><strong>${escapeHtml(hintLabel)}:</strong> ${escapeHtml(getRangeModeExplanation(modeValue))}</p>
        <div class="chip-list filter-control__values">
          ${definition.options
            .map(([value, label]) => {
              const isActive = state.filters[key] === value;
              return `<button class="chip chip--interactive ${isActive ? "chip--active" : ""}" data-filter-key="${escapeAttribute(key)}" data-filter-value="${escapeAttribute(value)}" type="button" aria-pressed="${isActive ? "true" : "false"}">${escapeHtml(label)}</button>`;
            })
            .join("")}
        </div>
      `;
      return;
    }
    if (definition.style === "select") {
      container.className = `${baseClass} filter-control--select`;
      container.innerHTML = `<select data-filter-select="${escapeAttribute(key)}">${definition.options
        .map(([value, label]) => `<option value="${escapeAttribute(value)}">${escapeHtml(label)}</option>`)
        .join("")}</select>`;
      container.querySelector("select").value = state.filters[key];
      return;
    }
    container.className = definition.style === "segment" ? `${baseClass} segmented-control` : `${baseClass} chip-list`;
    container.innerHTML = definition.options
      .map(([value, label]) => {
        const isActive = state.filters[key] === value;
        const buttonClass = definition.style === "segment" ? "segment-button" : "chip chip--interactive";
        return `<button class="${buttonClass} ${isActive ? "is-active chip--active" : ""}" data-filter-key="${escapeAttribute(key)}" data-filter-value="${escapeAttribute(value)}" type="button" aria-pressed="${isActive ? "true" : "false"}">${escapeHtml(label)}</button>`;
      })
      .join("");
  });
}

function renderRangeModeButton(key, mode, label, currentMode) {
  const isActive = currentMode === mode;
  return `<button class="segment-button ${isActive ? "is-active" : ""}" data-filter-mode-key="${escapeAttribute(key)}" data-filter-mode-value="${escapeAttribute(mode)}" type="button" aria-pressed="${isActive ? "true" : "false"}">${escapeHtml(label)}</button>`;
}

function handleFilterControlClick(event) {
  const modeControl = event.target.closest("[data-filter-mode-key]");
  if (modeControl) {
    const key = modeControl.dataset.filterModeKey;
    setFilter(`${key}Mode`, modeControl.dataset.filterModeValue || "exact");
    return;
  }
  const control = event.target.closest("[data-filter-key]");
  if (!control) return;
  const key = control.dataset.filterKey;
  const value = control.dataset.filterValue || "";
  const definition = getFilterControlDefinitions()[key];
  if (!definition) return;
  const nextValue = definition.toggleable && state.filters[key] === value ? "" : value;
  setFilter(key, nextValue);
}

function handleFilterControlChange(event) {
  const select = event.target.closest("[data-filter-select]");
  if (!select) return;
  setFilter(select.dataset.filterSelect, select.value);
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
    summary: typeof game.summary === "string" ? game.summary : "",
    bggItemType: typeof game.bggItemType === "string" ? game.bggItemType : "",
    dependencyType: typeof game.dependencyType === "string" ? game.dependencyType : "",
    requiresGameId: Number.isFinite(Number(game.requiresGameId)) ? Number(game.requiresGameId) : null,
    requiresGameName: typeof game.requiresGameName === "string" ? game.requiresGameName : "",
    expansionIds: Array.isArray(game.expansionIds)
      ? game.expansionIds.map((item) => Number(item)).filter((item) => Number.isFinite(item))
      : []
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
  syncSectionWithPage();
  syncControls();
  state.filteredGames = getFilteredGames();
  renderPageNav();
  renderLanguageSegment();
  renderPanelVisibility();
  renderHeroStats();
  renderHomePanel();
  renderWorkspaceHeading();
  renderResultsSummary();
  renderActiveFilters();
  renderFilterControls();
  renderGames();
  renderRandomPage();
}

function syncControls() {
  elements.searchInput.value = state.filters.search;
  elements.gamesGrid.classList.toggle("list-view", state.filters.view === "list");
}

function renderPanelVisibility() {
  elements.homePanel.classList.toggle("hidden", state.activePage !== "home");
  elements.workspacePanel.classList.toggle("hidden", !(state.activePage === "browse" || state.activePage === "archive"));
  elements.randomPanel.classList.toggle("hidden", state.activePage !== "random");
  elements.settingsPanel.classList.toggle("hidden", state.activePage !== "settings");
}

function getEffectiveSection() {
  return state.filters.section === "archive" ? "archive" : "owned";
}

const DURATION_ORDER = ["quick", "standard", "extended", "epic"];
const WEIGHT_ORDER = ["light", "medium-light", "medium-heavy", "heavy"];

function getFilteredGames() {
  const section = getEffectiveSection();
  return state.data.games
    .filter((game) => {
      if (shouldHideFromBrowse(game)) return false;
      if (section === "owned" && !game.own) return false;
      if (section === "archive" && !game.prevOwned) return false;
      if (state.filters.search && !game.searchText.includes(state.filters.search)) return false;
      if (state.filters.players) {
        const requested = state.filters.players === "6" ? 6 : Number(state.filters.players);
        if (!(game.minPlayers <= requested && game.maxPlayers >= requested)) return false;
      }
      if (state.filters.duration && !matchesOrderedFilter(game.timeBand, state.filters.duration, state.filters.durationMode, DURATION_ORDER)) return false;
      if (state.filters.weight && !matchesOrderedFilter(game.weightBand, state.filters.weight, state.filters.weightMode, WEIGHT_ORDER)) return false;
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
    case "maxPlayers":
      return (right.maxPlayers ?? -1) - (left.maxPlayers ?? -1) || getDisplayName(left).localeCompare(getDisplayName(right));
    default:
      return getDisplayName(left).localeCompare(getDisplayName(right));
  }
}

function matchesOrderedFilter(actualValue, selectedValue, mode, order) {
  if (!selectedValue) return true;
  const actualIndex = order.indexOf(actualValue);
  const selectedIndex = order.indexOf(selectedValue);
  if (actualIndex === -1 || selectedIndex === -1) return false;
  if (mode === "until") return actualIndex <= selectedIndex;
  if (mode === "from") return actualIndex >= selectedIndex;
  return actualIndex === selectedIndex;
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

function renderHomePanel() {
  elements.homeOwnedCount.textContent = String(state.data.summary.ownCount);
  elements.homeArchiveCount.textContent = String(state.data.summary.prevOwnedCount);

  const copy = translations[state.language];
  const shortcuts = [
    ["browse", copy.homeBrowseShortcut],
    ["random", copy.homeRandomShortcut],
    ["settings", copy.homeSettingsShortcut]
  ];

  elements.homeShortcuts.innerHTML = shortcuts
    .map(([page, label]) => `<button class="chip chip--interactive" data-home-page="${page}" type="button">${escapeHtml(label)}</button>`)
    .join("");

  elements.homeShortcuts.querySelectorAll("[data-home-page]").forEach((button) => {
    button.addEventListener("click", () => setActivePage(button.dataset.homePage));
  });
}

function renderWorkspaceHeading() {
  const copy = translations[state.language];
  const isArchive = getEffectiveSection() === "archive";
  elements.workspaceEyebrow.textContent = isArchive ? copy.workspaceArchiveEyebrow : copy.workspaceBrowseEyebrow;
  elements.workspaceTitle.textContent = isArchive ? copy.workspaceArchiveTitle : copy.workspaceBrowseTitle;
  elements.workspaceBody.textContent = isArchive ? copy.workspaceArchiveBody : copy.workspaceBrowseBody;
}

function renderResultsSummary() {
  const copy = translations[state.language];
  const scope = getEffectiveSection() === "archive" ? copy.archiveCollection : copy.currentCollection;
  elements.resultsCount.textContent = `${state.filteredGames.length} ${scope}`;
}

function renderActiveFilters() {
  const copy = translations[state.language];
  const tags = [[copy.filterSection, getEffectiveSection() === "archive" ? copy.sectionArchive : copy.sectionOwned]];
  if (state.filters.search) tags.push([copy.filterSearch, state.filters.search]);
  if (state.filters.players) tags.push([copy.filterPlayers, getFilterValueLabel("players", state.filters.players)]);
  if (state.filters.duration) tags.push([copy.filterDuration, getRangeFilterSummary("duration")]);
  if (state.filters.weight) tags.push([copy.filterWeight, getRangeFilterSummary("weight")]);
  if (state.filters.languageKey) tags.push([copy.filterLanguage, getFilterValueLabel("languageKey", state.filters.languageKey)]);
  if (state.filters.bestPlayers) tags.push([copy.filterBestPlayers, getFilterValueLabel("bestPlayers", state.filters.bestPlayers)]);
  if (state.filters.age) tags.push([copy.filterAge, getFilterValueLabel("age", state.filters.age)]);
  if (state.filters.recommendation) tags.push(["Rec", getFilterValueLabel("recommendation", state.filters.recommendation)]);
  elements.activeFilters.innerHTML = `
    <p class="active-filters__title">${escapeHtml(copy.activeFiltersTitle)}</p>
    <div class="active-filters__list">
      ${tags.map(([label, value]) => `<span class="chip">${escapeHtml(label)}: ${escapeHtml(String(value))}</span>`).join("")}
    </div>
  `;
}

function renderGames() {
  elements.gamesGrid.innerHTML = "";
  elements.emptyState.classList.toggle("hidden", state.filteredGames.length > 0);
  if (!state.filteredGames.length) return;

  const fragment = document.createDocumentFragment();
  const isListView = state.filters.view === "list";
  state.filteredGames.forEach((game) => {
    const node = elements.cardTemplate.content.firstElementChild.cloneNode(true);
    const button = node.querySelector(".game-card__button");
    const art = node.querySelector(".game-card__art");
    const displayName = getDisplayName(game);
    node.classList.toggle("game-card--list", isListView);
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
    node.querySelector(".game-card__tags").innerHTML = getDisplayTags(game, { compact: isListView }).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
    button.addEventListener("click", () => openDetails(game));
    fragment.append(node);
  });
  elements.gamesGrid.append(fragment);
}

function buildCardSubtitle(game) {
  const bits = [];
  if (game.yearPublished) bits.push(String(game.yearPublished));
  if (isExpansionGame(game)) bits.push(translations[state.language].expansion);
  return bits.join(" - ");
}

function buildDetailSubtitle(game) {
  const bits = [];
  if (isExpansionGame(game)) bits.push(translations[state.language].expansion);
  const requiredBase = getRequiredBaseGame(game);
  if (requiredBase) bits.push(`${translations[state.language].expansionRequiresBase}: ${getDisplayName(requiredBase)}`);
  else if (game.requiresGameName) bits.push(`${translations[state.language].expansionRequiresBase}: ${game.requiresGameName}`);
  return bits.join(" - ");
}

function metaPill(icon, label) {
  return `<span class="meta-pill">${icons[icon]}<span>${escapeHtml(label)}</span></span>`;
}

function getDisplayTags(game, options = {}) {
  const { compact = false } = options;
  const list = [];
  const bestPlayers = toPlayerArray(game.bestPlayers);
  const tags = Array.isArray(game.tags) ? game.tags : [];
  if (isExpansionGame(game)) list.push(translations[state.language].expansion);
  if (bestPlayers.length) list.push(`${translations[state.language].bestAt} ${joinPlayers(bestPlayers)}`);
  if (tags.includes("teaching-friendly")) list.push(translations[state.language].recTeach);
  if (tags.includes("solo")) list.push(translations[state.language].recSolo);
  if (tags.includes("great-at-2")) list.push(translations[state.language].recDuo);
  return list.slice(0, compact ? 2 : 3);
}

function openDetails(game) {
  const copy = translations[state.language];
  const displayName = getDisplayName(game);
  const secondaryName = getSecondaryName(game);
  const tags = getDisplayTags(game).concat(game.categories || [], game.mechanics || []).slice(0, 10);
  const linkedExpansions = getExpansionGames(game);
  const linkedExpansionsMarkup = linkedExpansions.length
    ? `
        <div class="expansion-list">
          ${linkedExpansions
            .map(
              (expansion) => `
                <button class="expansion-card" type="button" data-expansion-id="${escapeAttribute(expansion.id)}">
                  <strong>${escapeHtml(getDisplayName(expansion))}</strong>
                  <span>${escapeHtml(buildExpansionSummary(expansion))}</span>
                </button>
              `
            )
            .join("")}
        </div>
      `
    : `<p>${escapeHtml(copy.expansionsEmpty)}</p>`;

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
          <h3>${escapeHtml(copy.content)}</h3>
          <p>${escapeHtml(game.notes || game.summary || game.description || copy.notAvailable)}</p>
        </div>
        ${
          linkedExpansions.length
            ? `
        <div class="detail-section">
          <h3>${escapeHtml(copy.expansionsTitle)}</h3>
          ${linkedExpansionsMarkup}
        </div>
        `
            : ""
        }
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
  elements.detailsContent.querySelectorAll("[data-expansion-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const expansion = findGameById(Number(button.dataset.expansionId));
      if (expansion) openDetails(expansion);
    });
  });

  if (!elements.detailsDialog.open) elements.detailsDialog.showModal();
}

function detailKv(label, value) {
  return `<div class="detail-kv"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(value)}</span></div>`;
}
function drawRandomFromCurrentScope() {
  state.filteredGames = getFilteredGames();
  state.randomSelection = state.filteredGames.length ? state.filteredGames[Math.floor(Math.random() * state.filteredGames.length)] : null;
  setActivePage("random");
}

function renderRandomPage() {
  const copy = translations[state.language];
  const sourceLabel = state.lastWorkspacePage === "archive" ? copy.drawnFromArchive : copy.drawnFromBrowse;
  const filtersSummary = getRandomSummary() || `<span class="chip">${escapeHtml(copy.anyOption)}</span>`;
  elements.randomPageSummary.innerHTML = `
    <p>${escapeHtml(copy.randomPageScope)} <strong>${escapeHtml(sourceLabel)}</strong></p>
    <div class="random-summary">${filtersSummary}</div>
  `;

  if (!state.randomSelection) {
    elements.randomPageContent.innerHTML = `
      <p class="eyebrow">${escapeHtml(copy.randomTitle)}</p>
      <h3>${escapeHtml(copy.randomPageEmptyTitle)}</h3>
      <p>${escapeHtml(copy.randomPageEmptyBody)}</p>
      <div class="random-actions">
        <button class="button button--primary" id="random-page-empty-trigger" type="button">${escapeHtml(copy.randomAction)}</button>
        <button class="button button--ghost" id="random-page-open-workspace" type="button">${escapeHtml(copy.randomPageOpenWorkspace)}</button>
      </div>
    `;
    elements.randomPageContent.querySelector("#random-page-empty-trigger").addEventListener("click", drawRandomFromCurrentScope);
    elements.randomPageContent.querySelector("#random-page-open-workspace").addEventListener("click", () => setActivePage(state.lastWorkspacePage));
    return;
  }

  const game = state.randomSelection;
  const displayName = getDisplayName(game);
  elements.randomPageContent.innerHTML = `
    <p class="eyebrow">${escapeHtml(copy.randomTitle)}</p>
    <h3>${escapeHtml(displayName)}</h3>
    <p>${escapeHtml(copy.randomBody)}</p>
    <div class="random-result">
      <div class="detail-meta">
        ${metaPill("players", formatPlayers(game))}
        ${metaPill("time", formatPlayTime(game))}
        ${metaPill("weight", labelForWeightBand(game.weightBand))}
      </div>
      <p style="margin-top:14px">${escapeHtml(buildDetailSubtitle(game))}</p>
      <div class="detail-tags" style="margin-top:14px">${getDisplayTags(game).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
    </div>
    <div class="random-actions">
      <button class="button button--ghost" id="random-page-reroll" type="button">${escapeHtml(copy.reroll)}</button>
      <button class="button button--primary" id="random-page-details" type="button">${escapeHtml(copy.openDetails)}</button>
    </div>
  `;
  elements.randomPageContent.querySelector("#random-page-reroll").addEventListener("click", drawRandomFromCurrentScope);
  elements.randomPageContent.querySelector("#random-page-details").addEventListener("click", () => openDetails(game));
}

function getRandomSummary() {
  const chips = [];
  const copy = translations[state.language];
  chips.push(`<span class="chip">${escapeHtml(copy.filterSection)}: ${escapeHtml(getEffectiveSection() === "archive" ? copy.sectionArchive : copy.sectionOwned)}</span>`);
  if (state.filters.players) chips.push(`<span class="chip">${escapeHtml(copy.filterPlayers)}: ${escapeHtml(state.filters.players === "6" ? "6+" : state.filters.players)}</span>`);
  if (state.filters.duration) chips.push(`<span class="chip">${escapeHtml(copy.filterDuration)}: ${escapeHtml(getRangeFilterSummary("duration"))}</span>`);
  if (state.filters.weight) chips.push(`<span class="chip">${escapeHtml(copy.filterWeight)}: ${escapeHtml(getRangeFilterSummary("weight"))}</span>`);
  if (state.filters.languageKey) chips.push(`<span class="chip">${escapeHtml(copy.filterLanguage)}: ${escapeHtml(labelForLanguageKey(state.filters.languageKey))}</span>`);
  if (state.filters.bestPlayers) chips.push(`<span class="chip">${escapeHtml(copy.filterBestPlayers)}: ${escapeHtml(state.filters.bestPlayers === "6" ? "6+" : state.filters.bestPlayers)}</span>`);
  if (state.filters.age) chips.push(`<span class="chip">${escapeHtml(copy.filterAge)}: ${escapeHtml(labelForAgeBand(state.filters.age))}</span>`);
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

function shouldHideFromBrowse(game) {
  return isExpansionGame(game) && hasResolvedBaseGame(game);
}

function isExpansionGame(game) {
  return game?.dependencyType === "expansion" || game?.bggItemType === "boardgameexpansion";
}

function hasResolvedBaseGame(game) {
  return Boolean(getRequiredBaseGame(game));
}

function getRequiredBaseGame(game) {
  if (!game?.requiresGameId) return null;
  return findGameById(game.requiresGameId);
}

function getExpansionGames(game) {
  if (!Array.isArray(game?.expansionIds) || !game.expansionIds.length) return [];
  return game.expansionIds
    .map((id) => findGameById(id))
    .filter(Boolean)
    .sort((left, right) => getDisplayName(left).localeCompare(getDisplayName(right)));
}

function buildExpansionSummary(game) {
  return [formatPlayers(game), formatPlayTime(game), labelForWeightBand(game.weightBand)].filter(Boolean).join(" - ");
}

function findGameById(gameId) {
  if (!gameId || !state.data?.games) return null;
  return state.data.games.find((game) => game.id === gameId) || null;
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

function getFilterValueLabel(key, value) {
  const definition = getFilterControlDefinitions()[key];
  const option = definition?.options.find(([optionValue]) => optionValue === value);
  return option ? option[1] : value;
}

function getRangeFilterSummary(key) {
  const copy = translations[state.language];
  const value = state.filters[key];
  if (!value) return "";
  const mode = state.filters[`${key}Mode`] || "exact";
  const valueLabel = getFilterValueLabel(key, value);
  if (mode === "exact") return valueLabel;
  return `${getModeLabel(mode).toLowerCase()} ${valueLabel}`;
}

function getModeLabel(mode) {
  const copy = translations[state.language];
  return {
    exact: copy.filterModeExact,
    until: copy.filterModeUntil,
    from: copy.filterModeFrom
  }[mode || "exact"] || copy.filterModeExact;
}

function getRangeModeExplanation(mode) {
  const copy = translations[state.language];
  if (mode === "until") return copy.filterModeExplainUntil;
  if (mode === "from") return copy.filterModeExplainFrom;
  return copy.filterModeExplainExact;
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
