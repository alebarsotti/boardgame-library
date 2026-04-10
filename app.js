const DATA_URL = "./data/games.json";
const INLINE_DATA_KEY = "__BGG_LIBRARY_DATA__";
const STORAGE_KEY = "bgg-library-preferences-v3";
const NAME_OVERRIDES_KEY = "bgg-library-name-overrides-v1";
const RANDOM_HISTORY_LIMIT = 5;
const RANDOM_REVEAL_MIN_MS = 900;
const RANDOM_REVEAL_MAX_MS = 1400;

const PAGE_KEYS = ["home", "browse", "archive", "random", "settings"];

const translations = {
  es: {
    brandEyebrow: "Biblioteca personal",
    navHome: "Inicio",
    navBrowse: "Explorar",
    navArchive: "Archivo",
    navRandom: "Azar",
    navSettings: "Ajustes",
    heroEyebrow: "Colección personal de juegos",
    heroTitle: "Un catálogo más claro para elegir mejor.",
    heroLede:
      "Explora la biblioteca, revisa el archivo y deja que Azar te ayude a decidir sin perder los filtros útiles del flujo original.",
    openRandomAction: "Abrir Azar",
    randomAction: "Sortear ahora",
    exploreAction: "Explorar la colección",
    openArchiveAction: "Ver archivo",
    openSettingsAction: "Abrir ajustes",
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
    filterModeExact: "Exacto",
    filterModeUntil: "Hasta",
    filterModeFrom: "Desde",
    filterModeExplainExact: "Solo juegos dentro de esta banda",
    filterModeExplainUntil: "Incluye esta banda y cualquier opción más corta o más liviana",
    filterModeExplainFrom: "Incluye esta banda y cualquier opción más larga o más pesada",
    activeFiltersTitle: "Filtros activos",
    activeFilterMode: "Modo",
    recommendEyebrow: "Atajos curados",
    recommendTitle: "Recomendaciones",
    openFilters: "Filtros",
    close: "Cerrar",
    resultsEyebrow: "Resultados filtrados",
    resetFilters: "Limpiar filtros",
    emptyTitle: "No hay coincidencias para esta combinación.",
    emptyBody: "Probá aflojar algún filtro o dejar que la suerte elija desde otro conjunto.",
    owned: "En colección",
    prevOwned: "Anteriormente poseído",
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
    content: "Contenido",
    links: "Enlaces",
    openBgg: "Abrir en BGG",
    expansion: "Expansión",
    expansionRequiresBase: "Requiere juego base",
    expansionsTitle: "Expansiones",
    expansionsEmpty: "No hay expansiones vinculadas.",
    notAvailable: "Sin dato",
    randomTitle: "La mesa acaba de decidir",
    randomBody: "Sorteo hecho solo entre los juegos que cumplen tus filtros activos.",
    reroll: "Volver a sortear",
    openDetails: "Abrir detalle",
    randomSummaryTitle: "Scope activo",
    randomSummaryCandidates: "Candidatos elegibles",
    randomSummaryWorkspace: "Workspace fuente",
    randomSummaryCount: "Títulos por sorteo",
    randomSummaryStale: "Los filtros cambiaron desde el último resultado. Hacé un nuevo sorteo para mantener el contexto alineado.",
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
    sortMaxPlayers: "Máx. jugadores",
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
    poweredBy: "Datos e imágenes provistos por",
    homeCollectionEyebrow: "Estado de la biblioteca",
    homeCollectionTitle: "Una vista general para arrancar sin vueltas.",
    homeCollectionBody:
      "Acá ves rápido cómo está la biblioteca y elegís si querés explorar la colección activa, revisar el archivo o dejar que la app te sugiera una opción.",
    homeUtilityEyebrow: "Accesos directos",
    homeUtilityTitle: "Cada tarea tiene su propio espacio",
    homeUtilityBody:
      "Explorar queda para filtrar en serio, Archivo para revisar juegos que ya no están, Azar para desempatar y Ajustes para preferencias duraderas.",
    homeBrowseShortcut: "Ir a explorar",
    homeRandomShortcut: "Ir a azar",
    homeSettingsShortcut: "Ver ajustes",
    workspaceBrowseEyebrow: "Exploración guiada",
    workspaceBrowseTitle: "Explorar la colección actual",
    workspaceBrowseBody: "Este es el espacio para buscar en profundidad dentro de la ludoteca activa, con filtros, orden y vistas compactas.",
    workspaceArchiveEyebrow: "Archivo histórico",
    workspaceArchiveTitle: "Revisar el archivo histórico",
    workspaceArchiveBody: "El archivo ahora tiene su propia pantalla para recorrer juegos que ya no están sin mezclarlos con la colección actual.",
    randomPageEyebrow: "Mesa de decisión",
    randomPageTitle: "Azar ahora es una experiencia completa para destrabar la mesa",
    randomPageBody: "Usa el workspace activo como fuente, revela una opción con un pequeño suspenso y conserva una memoria breve para comparar resultados recientes.",
    randomPageEmptyTitle: "Todavía no hay un sorteo",
    randomPageEmptyBody: "Entrá cuando quieras, revisá el scope actual y dispará un sorteo solo cuando la mesa esté lista para decidir.",
    randomPageRevealEyebrow: "Sorteando",
    randomPageRevealTitle: "Barajando candidatos para esta mesa",
    randomPageRevealBody: "El resultado va a respetar exactamente las restricciones activas del workspace actual.",
    randomPageNoCandidatesTitle: "No hay candidatos con este scope",
    randomPageNoCandidatesBody: "Ajustá filtros en el workspace anterior o volvé a intentar con un conjunto más amplio.",
    randomPageStaleTitle: "El último resultado ya no coincide con este scope",
    randomPageStaleBody: "Los filtros activos cambiaron desde el sorteo anterior. Lanzá uno nuevo para ver una opción válida para la situación actual.",
    randomPageScope: "Tomando filtros desde",
    randomPageOpenWorkspace: "Volver al espacio anterior",
    randomPageScopeFallback: "Todavía no elegiste un workspace con filtros activos.",
    randomPageHistoryCurrent: "Resultado actual",
    randomPageHistoryOpenDetails: "Ver detalle",
    randomPageResultsEyebrow: "Selección actual",
    randomPageResultsTitleSingle: "Título sorteado",
    randomPageResultsTitleMulti: "Títulos sorteados",
    randomScoreLabel: "Puntaje",
    randomHistoryEyebrow: "Historial de sesión",
    randomHistoryTitle: "Resultados recientes",
    randomHistoryBody: "Sirve para comparar opciones sin guardar nada de forma permanente.",
    randomHistoryEmpty: "Los sorteos de esta sesión aparecerán acá.",
    settingsEyebrow: "Preferencias",
    settingsTitle: "Ajustes para una experiencia más cómoda",
    settingsBody: "En esta primera etapa, el idioma pasa a un lugar estable y deja preparado el espacio para futuras preferencias.",
    settingsLanguageEyebrow: "Idioma",
    settingsLanguageTitle: "Elegí el idioma de la interfaz",
    settingsLanguageBody: "El cambio impacta la navegación, los encabezados y el contenido visible de toda la app.",
    settingsRoadmapEyebrow: "Próxima expansión",
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
    openRandomAction: "Open Random",
    randomAction: "Draw now",
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
    randomSummaryTitle: "Current scope",
    randomSummaryCandidates: "Eligible candidates",
    randomSummaryWorkspace: "Source workspace",
    randomSummaryStale: "Filters changed since the last result. Draw again to keep the decision aligned with the current scope.",
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
    randomPageEyebrow: "Decision table",
    randomPageTitle: "Random is now a full decision experience",
    randomPageBody: "It uses the active workspace as its source, adds a short reveal, and keeps a lightweight session memory so the table can compare a few recent draws.",
    randomPageEmptyTitle: "No draw yet",
    randomPageEmptyBody: "Drop in whenever you want, review the current scope, and trigger a draw only when the table is ready to decide.",
    randomPageRevealEyebrow: "Drawing",
    randomPageRevealTitle: "Shuffling candidates for this table",
    randomPageRevealBody: "The result will respect the active filters from the current workspace exactly as they are now.",
    randomPageNoCandidatesTitle: "No candidates match this scope",
    randomPageNoCandidatesBody: "Adjust filters in the previous workspace or broaden the pool before drawing again.",
    randomPageStaleTitle: "The previous result no longer matches this scope",
    randomPageStaleBody: "Active filters changed after the last draw. Start a new one to get a valid option for the current situation.",
    randomPageScope: "Using filters from",
    randomPageOpenWorkspace: "Back to previous view",
    randomPageScopeFallback: "You have not used a filter workspace yet.",
    randomPageHistoryCurrent: "Current result",
    randomPageHistoryOpenDetails: "Open details",
    randomHistoryEyebrow: "Session memory",
    randomHistoryTitle: "Recent draws",
    randomHistoryBody: "Useful for comparing options without saving anything permanently.",
    randomHistoryEmpty: "Draws from this session will appear here.",
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
  randomSelection: [],
  randomHistory: [],
  randomRevealState: "idle",
  randomSelectionContext: null,
  randomLastAttemptContext: null,
  currentRandomEntryIds: [],
  randomDrawCount: 1,
  randomRevealTimer: null
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
  elements.randomPageSummary = document.querySelector("#random-page-summary");
  elements.randomPageContent = document.querySelector("#random-page-content");
  elements.randomPageHistory = document.querySelector("#random-page-history");
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
  document.querySelector("#open-filters").addEventListener("click", () => elements.filtersPanel.classList.add("is-open"));
  document.querySelector("#close-filters").addEventListener("click", () => elements.filtersPanel.classList.remove("is-open"));
  document.querySelector("#home-browse-action").addEventListener("click", () => setActivePage("browse"));
  document.querySelector("#home-random-action").addEventListener("click", () => setActivePage("random"));
  document.querySelector("#home-archive-action").addEventListener("click", () => setActivePage("archive"));
  document.querySelector("#workspace-settings-action").addEventListener("click", () => setActivePage("settings"));
  document.querySelector("#workspace-random-action").addEventListener("click", () => setActivePage("random"));
  document.querySelector("#toolbar-random").addEventListener("click", () => setActivePage("random"));
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
  if (state.randomRevealState !== "revealing" && isRandomResultOutOfSync()) {
    clearCurrentRandomSelection();
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
      container.className = `${baseClass} filter-control--range`;
      container.innerHTML = `
        <div class="segmented-control filter-control__modes">
          ${renderRangeModeButton(key, "exact", copy.filterModeExact, modeValue)}
          ${renderRangeModeButton(key, "until", copy.filterModeUntil, modeValue)}
          ${renderRangeModeButton(key, "from", copy.filterModeFrom, modeValue)}
        </div>
        <p class="filter-control__hint">${escapeHtml(getRangeModeExplanation(modeValue))}</p>
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
  reconcileRandomSelection();
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
  if (state.randomRevealState === "revealing") return;

  const context = buildRandomContext();
  const candidates = getFilteredGames();
  const drawCount = getAllowedRandomDrawCount(candidates.length);
  const selection = pickRandomGames(candidates, context, drawCount);
  const revealDuration = getRandomRevealDuration();

  clearRandomRevealTimer();
  state.randomLastAttemptContext = context;
  state.randomSelection = [];
  state.randomSelectionContext = null;
  state.currentRandomEntryIds = [];
  state.randomRevealState = "revealing";

  if (state.activePage !== "random") {
    setActivePage("random");
  } else {
    render();
  }

  state.randomRevealTimer = window.setTimeout(() => {
    state.randomRevealTimer = null;
    if (selection.length) {
      const historyEntries = pushRandomHistory(selection, context);
      state.randomSelection = selection;
      state.randomSelectionContext = context;
      state.currentRandomEntryIds = historyEntries.map((entry) => entry.id);
      state.randomRevealState = "result";
    } else {
      state.randomSelection = [];
      state.randomSelectionContext = null;
      state.currentRandomEntryIds = [];
      state.randomRevealState = "idle";
    }
    render();
  }, revealDuration);
}

function renderRandomPage() {
  const copy = translations[state.language];
  document.querySelector("#random-page-trigger").disabled = state.randomRevealState === "revealing";
  const currentContext = buildRandomContext();
  const sourceLabel = currentContext.scope === "archive" ? copy.drawnFromArchive : copy.drawnFromBrowse;
  const filtersSummary = getRandomSummary(currentContext.filtersSnapshot) || `<span class="chip">${escapeHtml(copy.anyOption)}</span>`;
  const isStale = state.randomLastAttemptContext && state.randomLastAttemptContext.signature !== currentContext.signature;
  const maxDrawCount = Math.max(1, Math.min(RANDOM_HISTORY_LIMIT, state.filteredGames.length || RANDOM_HISTORY_LIMIT));
  state.randomDrawCount = Math.min(Math.max(1, state.randomDrawCount || 1), maxDrawCount);
  elements.randomPageSummary.innerHTML = `
    <div class="random-summary__meta">
      <div class="random-summary__metric">
        <span>${escapeHtml(copy.randomSummaryWorkspace)}</span>
        <strong>${escapeHtml(sourceLabel || copy.randomPageScopeFallback)}</strong>
      </div>
      <div class="random-summary__metric">
        <span>${escapeHtml(copy.randomSummaryCandidates)}</span>
        <strong>${escapeHtml(String(state.filteredGames.length))}</strong>
      </div>
      <label class="random-summary__metric random-summary__metric--control">
        <span>${escapeHtml(copy.randomSummaryCount)}</span>
        <select id="random-draw-count">
          ${Array.from({ length: maxDrawCount }, (_, index) => index + 1)
            .map((value) => `<option value="${value}" ${value === state.randomDrawCount ? "selected" : ""}>${value}</option>`)
            .join("")}
        </select>
      </label>
    </div>
    <div class="random-summary">${filtersSummary}</div>
    ${isStale ? `<p class="random-summary__note">${escapeHtml(copy.randomSummaryStale)}</p>` : ""}
  `;
  elements.randomPageSummary.querySelector("#random-draw-count").addEventListener("change", (event) => {
    state.randomDrawCount = Math.max(1, Math.min(maxDrawCount, Number(event.target.value) || 1));
  });

  if (state.randomRevealState === "revealing") {
    elements.randomPageContent.innerHTML = `
      <div class="random-stage__surface random-stage__surface--revealing">
        <p class="eyebrow">${escapeHtml(copy.randomPageRevealEyebrow)}</p>
        <h3>${escapeHtml(copy.randomPageRevealTitle)}</h3>
        <p>${escapeHtml(copy.randomPageRevealBody)}</p>
        <div class="random-reveal">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;
    renderRandomHistory();
    return;
  }

  if (!state.randomSelection.length) {
    const showStaleState = Boolean(state.randomLastAttemptContext) && isStale;
    const attemptedCurrentScope = state.randomLastAttemptContext && state.randomLastAttemptContext.signature === currentContext.signature;
    const emptyTitle = showStaleState
      ? copy.randomPageStaleTitle
      : attemptedCurrentScope
        ? copy.randomPageNoCandidatesTitle
        : copy.randomPageEmptyTitle;
    const emptyBody = showStaleState
      ? copy.randomPageStaleBody
      : attemptedCurrentScope
        ? copy.randomPageNoCandidatesBody
        : copy.randomPageEmptyBody;

    elements.randomPageContent.innerHTML = `
      <div class="random-stage__surface random-stage__surface--empty">
        <p class="eyebrow">${escapeHtml(copy.randomTitle)}</p>
        <h3>${escapeHtml(emptyTitle)}</h3>
        <p>${escapeHtml(emptyBody)}</p>
        <div class="random-actions">
          <button class="button button--primary" id="random-page-empty-trigger" type="button">${escapeHtml(copy.randomAction)}</button>
          <button class="button button--ghost" id="random-page-open-workspace" type="button">${escapeHtml(copy.randomPageOpenWorkspace)}</button>
        </div>
      </div>
    `;
    elements.randomPageContent.querySelector("#random-page-empty-trigger").addEventListener("click", drawRandomFromCurrentScope);
    elements.randomPageContent.querySelector("#random-page-open-workspace").addEventListener("click", () => setActivePage(state.lastWorkspacePage));
    renderRandomHistory();
    return;
  }

  const selectionTitle = state.randomSelection.length === 1 ? copy.randomPageResultsTitleSingle : copy.randomPageResultsTitleMulti;
  elements.randomPageContent.innerHTML = `
    <div class="random-stage__surface random-stage__surface--result">
      <p class="eyebrow">${escapeHtml(copy.randomPageResultsEyebrow)}</p>
      <h3>${escapeHtml(selectionTitle)}</h3>
      <p>${escapeHtml(copy.randomBody)}</p>
      <div class="random-result-list">
        ${state.randomSelection
          .map((game, index) => {
            const displayName = getDisplayName(game);
            const description = game.notes || game.summary || game.description || "";
            return `
              <article class="random-result-card">
                <div class="random-result-card__header">
                  <div class="random-result-card__cover" id="random-result-cover-${index}"></div>
                  <div class="random-result-card__heading">
                    <div class="random-result-card__title-row">
                      <h4>${escapeHtml(displayName)}</h4>
                      <span class="random-score">${escapeHtml(copy.randomScoreLabel)}: ${escapeHtml(formatGameScore(game))}</span>
                    </div>
                    <p class="random-result__subtitle">${escapeHtml(buildDetailSubtitle(game))}</p>
                    ${description ? `<p class="random-result-card__description">${escapeHtml(description)}</p>` : ""}
                  </div>
                </div>
                <div class="random-result">
                  <div class="detail-meta">
                    ${metaPill("players", formatPlayers(game))}
                    ${metaPill("time", formatPlayTime(game))}
                    ${metaPill("weight", labelForWeightBand(game.weightBand))}
                    ${metaPill("age", game.ageText || translations[state.language].notAvailable)}
                  </div>
                  <div class="detail-tags">${getDisplayTags(game).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
                </div>
                <div class="random-actions">
                  <button class="button button--primary" data-random-result-details="${index}" type="button">${escapeHtml(copy.openDetails)}</button>
                </div>
              </article>
            `;
          })
          .join("")}
      </div>
      <div class="random-actions">
        <button class="button button--ghost" id="random-page-reroll" type="button">${escapeHtml(copy.reroll)}</button>
      </div>
    </div>
  `;
  state.randomSelection.forEach((game, index) => {
    injectCover(elements.randomPageContent.querySelector(`#random-result-cover-${index}`), game, 240);
  });
  elements.randomPageContent.querySelector("#random-page-reroll").addEventListener("click", drawRandomFromCurrentScope);
  elements.randomPageContent.querySelectorAll("[data-random-result-details]").forEach((button) => {
    button.addEventListener("click", () => {
      const game = state.randomSelection[Number(button.dataset.randomResultDetails)];
      if (game) openDetails(game);
    });
  });
  renderRandomHistory();
}

function renderRandomHistory() {
  const copy = translations[state.language];
  if (!state.randomHistory.length) {
    elements.randomPageHistory.innerHTML = `<p class="random-history-empty">${escapeHtml(copy.randomHistoryEmpty)}</p>`;
    return;
  }

  elements.randomPageHistory.innerHTML = `
    <div class="random-history-list">
      ${state.randomHistory
        .map((entry) => {
          const game = getGameById(entry.gameId);
          if (!game) return "";
          const isCurrent = state.currentRandomEntryIds.includes(entry.id);
          return `
            <article class="random-history-entry ${isCurrent ? "is-current" : ""}">
              <div class="random-history-entry__layout">
                <div class="random-history-entry__cover" id="random-history-cover-${escapeAttribute(entry.id)}"></div>
                <div class="random-history-entry__body">
                  <div class="random-history-entry__header">
                    <div>
                      <h4>${escapeHtml(getDisplayName(game))}</h4>
                      <p class="random-history-entry__subtitle">${escapeHtml(buildDetailSubtitle(game))}</p>
                    </div>
                    <div class="random-history-entry__badges">
                      <span class="random-score">${escapeHtml(copy.randomScoreLabel)}: ${escapeHtml(formatGameScore(game))}</span>
                      ${isCurrent ? `<span class="random-history-entry__badge">${escapeHtml(copy.randomPageHistoryCurrent)}</span>` : ""}
                    </div>
                  </div>
                  <div class="detail-meta">
                    ${metaPill("players", formatPlayers(game))}
                    ${metaPill("time", formatPlayTime(game))}
                    ${metaPill("weight", labelForWeightBand(game.weightBand))}
                  </div>
                  <div class="detail-tags">${getDisplayTags(game, { compact: true }).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
                  <div class="random-history-entry__actions">
                    <button class="button button--ghost button--small" data-random-history-details="${escapeAttribute(entry.id)}" type="button">${escapeHtml(copy.randomPageHistoryOpenDetails)}</button>
                  </div>
                </div>
              </div>
            </article>
          `;
        })
        .join("")}
    </div>
  `;

  elements.randomPageHistory.querySelectorAll("[data-random-history-details]").forEach((button) => {
    button.addEventListener("click", () => {
      const entry = state.randomHistory.find((item) => item.id === button.dataset.randomHistoryDetails);
      const game = entry ? getGameById(entry.gameId) : null;
      if (game) openDetails(game);
    });
  });

  state.randomHistory.forEach((entry) => {
    const game = getGameById(entry.gameId);
    const cover = elements.randomPageHistory.querySelector(`#random-history-cover-${CSS.escape(entry.id)}`);
    if (game && cover) injectCover(cover, game, 112);
  });
}

function getRandomSummary(filtersSnapshot = buildRandomFiltersSnapshot()) {
  const chips = [];
  const copy = translations[state.language];
  if (filtersSnapshot.search) chips.push(`<span class="chip">${escapeHtml(copy.filterSearch)}: ${escapeHtml(filtersSnapshot.search)}</span>`);
  if (filtersSnapshot.players) chips.push(`<span class="chip">${escapeHtml(copy.filterPlayers)}: ${escapeHtml(filtersSnapshot.players === "6" ? "6+" : filtersSnapshot.players)}</span>`);
  if (filtersSnapshot.duration) chips.push(`<span class="chip">${escapeHtml(copy.filterDuration)}: ${escapeHtml(getRangeFilterSummaryFromSnapshot("duration", filtersSnapshot))}</span>`);
  if (filtersSnapshot.weight) chips.push(`<span class="chip">${escapeHtml(copy.filterWeight)}: ${escapeHtml(getRangeFilterSummaryFromSnapshot("weight", filtersSnapshot))}</span>`);
  if (filtersSnapshot.languageKey) chips.push(`<span class="chip">${escapeHtml(copy.filterLanguage)}: ${escapeHtml(labelForLanguageKey(filtersSnapshot.languageKey))}</span>`);
  if (filtersSnapshot.bestPlayers) chips.push(`<span class="chip">${escapeHtml(copy.filterBestPlayers)}: ${escapeHtml(filtersSnapshot.bestPlayers === "6" ? "6+" : filtersSnapshot.bestPlayers)}</span>`);
  if (filtersSnapshot.age) chips.push(`<span class="chip">${escapeHtml(copy.filterAge)}: ${escapeHtml(labelForAgeBand(filtersSnapshot.age))}</span>`);
  if (filtersSnapshot.recommendation) chips.push(`<span class="chip">Rec: ${escapeHtml(getFilterValueLabel("recommendation", filtersSnapshot.recommendation))}</span>`);
  return chips.join("");
}

function buildRandomContext() {
  const scope = state.lastWorkspacePage === "archive" ? "archive" : "browse";
  const filtersSnapshot = buildRandomFiltersSnapshot(scope);
  return {
    scope,
    filtersSnapshot,
    signature: serializeRandomContext(scope, filtersSnapshot)
  };
}

function buildRandomFiltersSnapshot(scope = state.lastWorkspacePage === "archive" ? "archive" : "browse") {
  return {
    section: scope === "archive" ? "archive" : "owned",
    search: state.filters.search || "",
    players: state.filters.players || "",
    duration: state.filters.duration || "",
    durationMode: state.filters.durationMode || "exact",
    weight: state.filters.weight || "",
    weightMode: state.filters.weightMode || "exact",
    languageKey: state.filters.languageKey || "",
    bestPlayers: state.filters.bestPlayers || "",
    age: state.filters.age || "",
    recommendation: state.filters.recommendation || ""
  };
}

function serializeRandomContext(scope, filtersSnapshot) {
  return JSON.stringify({
    scope,
    section: filtersSnapshot.section,
    search: filtersSnapshot.search,
    players: filtersSnapshot.players,
    duration: filtersSnapshot.duration,
    durationMode: filtersSnapshot.durationMode,
    weight: filtersSnapshot.weight,
    weightMode: filtersSnapshot.weightMode,
    languageKey: filtersSnapshot.languageKey,
    bestPlayers: filtersSnapshot.bestPlayers,
    age: filtersSnapshot.age,
    recommendation: filtersSnapshot.recommendation
  });
}

function pickRandomGames(candidates, context, count) {
  if (!candidates.length) return [];
  const recentIds = new Set(state.randomHistory.filter((entry) => entry.contextSignature === context.signature).map((entry) => entry.gameId));
  const freshPool = candidates.filter((game) => !recentIds.has(game.id));
  const basePool = freshPool.length >= count ? freshPool : candidates;
  const shuffled = [...basePool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

function pushRandomHistory(games, context) {
  const entries = games.map((game, index) => ({
    id: `${Date.now()}-${index}-${Math.random().toString(16).slice(2, 8)}`,
    gameId: game.id,
    scope: context.scope,
    filtersSnapshot: { ...context.filtersSnapshot },
    contextSignature: context.signature,
    drawnAt: new Date().toISOString()
  }));
  state.randomHistory = [...entries, ...state.randomHistory].slice(0, RANDOM_HISTORY_LIMIT);
  return entries;
}

function reconcileRandomSelection() {
  if (state.randomRevealState === "revealing") return;
  if (isRandomResultOutOfSync()) {
    clearCurrentRandomSelection();
  }
}

function isRandomResultOutOfSync() {
  return Boolean(state.randomSelectionContext) && state.randomSelectionContext.signature !== buildRandomContext().signature;
}

function clearCurrentRandomSelection() {
  state.randomSelection = [];
  state.randomSelectionContext = null;
  state.currentRandomEntryIds = [];
  if (state.randomRevealState !== "revealing") {
    state.randomRevealState = "idle";
  }
}

function clearRandomRevealTimer() {
  if (state.randomRevealTimer) {
    window.clearTimeout(state.randomRevealTimer);
    state.randomRevealTimer = null;
  }
}

function getRandomRevealDuration() {
  return RANDOM_REVEAL_MIN_MS + Math.floor(Math.random() * (RANDOM_REVEAL_MAX_MS - RANDOM_REVEAL_MIN_MS + 1));
}

function getAllowedRandomDrawCount(candidateCount) {
  const maxDrawCount = Math.max(1, Math.min(RANDOM_HISTORY_LIMIT, candidateCount || RANDOM_HISTORY_LIMIT));
  return Math.min(Math.max(1, state.randomDrawCount || 1), maxDrawCount);
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

function formatGameScore(game) {
  if (typeof game?.averageRating === "number" && Number.isFinite(game.averageRating)) {
    return game.averageRating.toFixed(1);
  }
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
  return getRangeFilterSummaryFromSnapshot(key, state.filters);
}

function getRangeFilterSummaryFromSnapshot(key, snapshot) {
  const copy = translations[state.language];
  const value = snapshot[key];
  if (!value) return "";
  const mode = snapshot[`${key}Mode`] || "exact";
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

function getGameById(gameId) {
  return state.data?.games?.find((game) => game.id === gameId) || null;
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
