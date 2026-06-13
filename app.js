const DATA_URL = "./data/games.json";
const INLINE_DATA_KEY = "__BGG_LIBRARY_DATA__";
const STORAGE_KEY = "bgg-library-preferences-v4";
const NAME_OVERRIDES_KEY = "bgg-library-name-overrides-v1";
const RANDOM_HISTORY_LIMIT = 5;
const RANDOM_REVEAL_MIN_MS = 900;
const RANDOM_REVEAL_MAX_MS = 1400;
const RECENT_HIGHLIGHT_WINDOW_MONTHS = 6;
const RECENT_HIGHLIGHT_MIN_ITEMS = 7;
const RECENT_HIGHLIGHT_FILL_LIMIT_MONTHS = 18;
const THEME_KEYS = ["light", "dark"];

const PAGE_KEYS = ["home", "browse", "archive", "random", "settings"];
let masonryLayoutFrame = 0;
let gameCardResizeObserver = null;
let bodyScrollLockY = 0;

const translations = {
  es: {
    brandTitle: "Ludoteca de Ale",
    brandEyebrow: "Biblioteca personal",
    navHome: "Inicio",
    navBrowse: "Explorar",
    navArchive: "Archivo",
    navRandom: "Azar",
    navSettings: "Ajustes",
    themeLabel: "Tema",
    themeLight: "Claro",
    themeDark: "Oscuro",
    heroEyebrow: "Colección personal de juegos",
    heroTitle: "Elegir mejor, más rápido.",
    heroLede:
      "Explorá la biblioteca, revisá el archivo y dejá que el azar resuelva cuando la mesa no se decide.",
    openRandomAction: "Dejarlo al azar",
    randomAction: "Sortear ahora",
    exploreAction: "Explorar la colección",
    openArchiveAction: "Ver archivo",
    openSettingsAction: "Abrir ajustes",
    filterEyebrow: "Búsqueda guiada",
    filterTitle: "Encontrar el juego justo",
    searchLabel: "Buscar",
    searchPlaceholder: "Por nombre, tag o nota",
    playersLabel: "Jugadores",
    durationLabel: "Duración",
    weightLabel: "Peso",
    editionLanguageLabel: "Idioma",
    editionLanguageShort: "Copia",
    bestPlayersLabel: "Mejor cantidad",
    ageLabel: "Edad",
    sortLabel: "Ordenar por",
    sortDirectionLabel: "Dirección",
    viewLabel: "Vista",
    filterModeExact: "Exacto",
    filterModeUntil: "Hasta",
    filterModeFrom: "Desde",
    filterModeExplainExact: "Solo juegos dentro de esta banda",
    filterModeExplainUntil: "Incluye esta banda y cualquier opción más corta o más liviana",
    filterModeExplainFrom: "Incluye esta banda y cualquier opción más larga o más pesada",
    activeFiltersTitle: "Filtros activos",
    activeFiltersEmpty: "Sin filtros activos.",
    activeFilterMode: "Modo",
    recommendEyebrow: "Atajos curados",
    recommendTitle: "Recomendaciones",
    openFilters: "Filtros",
    close: "Cerrar",
    anyCompact: "Cualq.",
    resultsEyebrow: "Resultados filtrados",
    resultsSingle: "resultado",
    resultsPlural: "resultados",
    resetFilters: "Limpiar filtros",
    emptyTitle: "No hay coincidencias para esta combinación.",
    emptyBody: "Probá relajar algún filtro o dejar que la suerte elija desde otro conjunto.",
    owned: "En colección",
    prevOwned: "Anteriormente poseído",
    currentCollection: "colección actual",
    archiveCollection: "archivo",
    heroCount: "juegos en la biblioteca",
    heroOwned: "hoy en estantería",
    heroPrev: "en archivo",
    heroQuick: "juegos cortos",
    bestAt: "Ideal para",
    recommendedAt: "Recomendado para",
    ageText: "Edad sugerida",
    ranking: "Ranking BGG",
    averageRating: "Rating promedio",
    languageDependence: "Dependencia del idioma",
    ownership: "Estado",
    content: "Resumen",
    links: "Enlaces",
    openBgg: "Abrir en BGG",
    expansion: "Expansión",
    expansionRequiresBase: "Requiere juego base",
    expansionsTitle: "Expansiones",
    expansionsEmpty: "No hay expansiones vinculadas.",
    notAvailable: "Sin dato",
    randomTitle: "La mesa acaba de decidir",
    randomBody: "Acá solo entran juegos que cumplen tus filtros activos.",
    reroll: "Volver a sortear",
    openDetails: "Abrir detalle",
    randomSummaryTitle: "Contexto actual",
    randomSummaryCandidates: "Opciones posibles",
    randomSummaryWorkspace: "Tomado desde",
    randomSummaryCount: "Juegos por sorteo",
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
    physicalLanguageUnknown: "No informado",
    ageKids: "8-",
    ageFamily: "9-12",
    ageTeen: "13-15",
    ageAdult: "16+",
    sortName: "Nombre",
    sortRating: "Rating BGG",
    sortRank: "Ranking BGG",
    sortWeight: "Peso",
    sortTime: "Duración",
    sortMaxPlayers: "Máx. jugadores",
    sortAscending: "Ascendente",
    sortDescending: "Descendente",
    recDuo: "Ideal para 2",
    recQuick: "Rápidos",
    recHeavy: "Pesados",
    recTeach: "Fáciles de enseñar",
    recSolo: "Modo solitario",
    recGroup: "Para grupo grande",
    filterSearch: "Texto",
    filterPlayers: "Jugadores",
    filterDuration: "Tiempo",
    filterWeight: "Peso",
    filterLanguage: "Idioma",
    filterPhysicalLanguage: "Idioma de la copia",
    filterBestPlayers: "Mejor cantidad",
    filterAge: "Edad",
    filterSection: "Sección",
    sectionOwned: "Colección",
    sectionArchive: "Archivo",
    languageSpanish: "ES",
    languageEnglish: "EN",
    poweredBy: "Powered by",
    homeCollectionEyebrow: "Panorama rápido",
    homeCollectionTitle: "Lo que quedó en archivo",
    homeCollectionBody:
      "Entrá si querés revisar juegos que ya no están en estantería sin mezclarlos con la colección activa.",
    homeUtilityEyebrow: "Accesos directos",
    homeUtilityTitle: "Ir directo a cada tarea",
    homeUtilityBody:
      "Explorar para filtrar, Azar para resolver y Ajustes para ordenar preferencias.",
    homeBrowseShortcut: "Explorar",
    homeRandomShortcut: "Azar",
    homeSettingsShortcut: "Ajustes",
    homeRecentEyebrow: "Incorporaciones recientes",
    homeRecentTitle: "Últimos ingresos",
    homeRecentBody: "Lo último que se sumó a la biblioteca.",
    homeRecentAddedOn: "Sumado el",
    homeRecentEmpty: "No hay incorporaciones recientes con fecha registrada.",
    newTag: "Nuevo",
    workspaceBrowseEyebrow: "Exploración guiada",
    workspaceBrowseTitle: "Explorar la colección",
    workspaceBrowseBody: "Buscá dentro de la ludoteca activa con filtros, orden y vistas compactas.",
    workspaceArchiveEyebrow: "Archivo histórico",
    workspaceArchiveTitle: "Revisar el archivo",
    workspaceArchiveBody: "Recorré juegos que ya no están sin mezclarlos con la colección actual.",
    randomPageEyebrow: "Mesa de decisión",
    randomPageTitle: "Cuando la mesa no se decide",
    randomPageBody: "Usa el contexto actual como punto de partida, revela opciones y guarda una memoria breve de la sesión.",
    randomPageEmptyTitle: "Todavía no hay un sorteo",
    randomPageEmptyBody: "Entrá cuando quieras, revisá el contexto actual y dispará un sorteo solo cuando la mesa esté lista para decidir.",
    randomPageRevealEyebrow: "Sorteando",
    randomPageRevealTitle: "Barajando candidatos para esta mesa",
    randomPageRevealBody: "El resultado va a respetar exactamente las restricciones activas del contexto actual.",
    randomPageNoCandidatesTitle: "No hay opciones con este contexto",
    randomPageNoCandidatesBody: "Ajustá filtros en el espacio anterior o volvé a intentar con un conjunto más amplio.",
    randomPageStaleTitle: "El último resultado ya no coincide con este contexto",
    randomPageStaleBody: "Los filtros activos cambiaron desde el sorteo anterior. Lanzá uno nuevo para ver una opción válida para la situación actual.",
    randomPageScope: "Tomando filtros desde",
    randomPageOpenWorkspace: "Volver al espacio anterior",
    randomPageScopeFallback: "Todavía no elegiste un espacio con filtros activos.",
    randomPageHistoryCurrent: "Resultado actual",
    randomPageHistoryOpenDetails: "Ver detalle",
    randomPageResultsEyebrow: "Selección actual",
    randomPageResultsTitleSingle: "Título sorteado",
    randomPageResultsTitleMulti: "Títulos sorteados",
    randomScoreLabel: "Puntaje",
    randomHistoryEyebrow: "Historial de sesión",
    randomHistoryTitle: "Resultados recientes",
    randomHistoryBody: "Sirve para comparar opciones sin guardar nada de forma permanente.",
    randomHistoryEmpty: "Los resultados de esta sesión aparecerán acá.",
    detailQuickFacts: "Datos clave",
    settingsEyebrow: "Preferencias",
    settingsTitle: "Ajustes de uso",
    settingsBody: "Acá definís tema e idioma para que el resto de la biblioteca quede libre para elegir juegos.",
    settingsThemeEyebrow: "Tema",
    settingsThemeTitle: "Tema de la biblioteca",
    settingsThemeBody: "Elegí entre modo claro y oscuro para toda la biblioteca.",
    settingsLanguageEyebrow: "Idioma",
    settingsLanguageTitle: "Idioma de interfaz",
    settingsLanguageBody: "Cambia navegación, encabezados y contenido visible.",
    settingsRoadmapEyebrow: "Próxima expansión",
    settingsRoadmapTitle: "Lo que puede venir",
    settingsRoadmapBody:
      "Queda espacio para preferencias futuras sin volver a cargar el inicio.",
    drawnFromBrowse: "Explorar",
    drawnFromArchive: "Archivo"
  },
  en: {
    brandTitle: "Ale's Board Game Library",
    brandEyebrow: "Personal library",
    navHome: "Home",
    navBrowse: "Browse",
    navArchive: "Archive",
    navRandom: "Random",
    navSettings: "Settings",
    themeLabel: "Theme",
    themeLight: "Light",
    themeDark: "Dark",
    heroEyebrow: "Personal board game collection",
    heroTitle: "Choose better, faster.",
    heroLede:
      "Browse the library, revisit the archive, and let Random break the tie when the table stalls.",
    openRandomAction: "Leave it to Random",
    randomAction: "Draw now",
    exploreAction: "Browse collection",
    openArchiveAction: "Open archive",
    openSettingsAction: "Open settings",
    filterEyebrow: "Guided search",
    filterTitle: "Find the right game",
    searchLabel: "Search",
    searchPlaceholder: "By name, tag, or note",
    playersLabel: "Players",
    durationLabel: "Duration",
    weightLabel: "Weight",
    editionLanguageLabel: "Language",
    editionLanguageShort: "Edition",
    bestPlayersLabel: "Best count",
    ageLabel: "Age",
    sortLabel: "Sort by",
    sortDirectionLabel: "Direction",
    viewLabel: "View",
    filterModeExact: "Exact",
    filterModeUntil: "Up to",
    filterModeFrom: "From",
    filterModeExplainExact: "Only games inside this band",
    filterModeExplainUntil: "Includes this band and anything shorter or lighter",
    filterModeExplainFrom: "Includes this band and anything longer or heavier",
    activeFiltersTitle: "Active filters",
    activeFiltersEmpty: "No active filters.",
    activeFilterMode: "Mode",
    recommendEyebrow: "Curated shortcuts",
    recommendTitle: "Recommendations",
    openFilters: "Filters",
    close: "Close",
    anyCompact: "Any",
    resultsEyebrow: "Filtered results",
    resultsSingle: "result",
    resultsPlural: "results",
    resetFilters: "Reset filters",
    emptyTitle: "No games match this combination.",
    emptyBody: "Try relaxing a filter or let chance choose from a broader set.",
    owned: "Currently owned",
    prevOwned: "Previously owned",
    currentCollection: "current collection",
    archiveCollection: "archive",
    heroCount: "games cataloged",
    heroOwned: "currently owned",
    heroPrev: "archived",
    heroQuick: "short games",
    bestAt: "Ideal for",
    recommendedAt: "Recommended with",
    ageText: "Recommended age",
    ranking: "BGG rank",
    averageRating: "Average rating",
    languageDependence: "Language dependence",
    ownership: "Ownership",
    content: "Summary",
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
    physicalLanguageUnknown: "Unknown",
    ageKids: "8-",
    ageFamily: "9-12",
    ageTeen: "13-15",
    ageAdult: "16+ or more",
    sortName: "Name",
    sortRating: "BGG rating",
    sortRank: "BGG rank",
    sortWeight: "Weight",
    sortTime: "Duration",
    sortMaxPlayers: "Max players",
    sortAscending: "Ascending",
    sortDescending: "Descending",
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
    filterPhysicalLanguage: "Copy language",
    filterBestPlayers: "Best count",
    filterAge: "Age",
    filterSection: "Section",
    sectionOwned: "Collection",
    sectionArchive: "Archive",
    languageSpanish: "ES",
    languageEnglish: "EN",
    poweredBy: "Powered by",
    homeCollectionEyebrow: "Quick view",
    homeCollectionTitle: "What moved to the archive",
    homeCollectionBody:
      "Open it when you want to revisit games that are no longer on the active shelf.",
    homeUtilityEyebrow: "Shortcuts",
    homeUtilityTitle: "Jump straight to the task",
    homeUtilityBody:
      "Browse for filtering, Random for tie-breaks, and Settings for preferences.",
    homeBrowseShortcut: "Browse",
    homeRandomShortcut: "Random",
    homeSettingsShortcut: "Settings",
    homeRecentEyebrow: "Recent additions",
    homeRecentTitle: "Recent arrivals",
    homeRecentBody: "Games that joined the library recently.",
    homeRecentAddedOn: "Added on",
    homeRecentEmpty: "No recent additions with a recorded acquisition date yet.",
    newTag: "New",
    workspaceBrowseEyebrow: "Guided exploration",
    workspaceBrowseTitle: "Browse the collection",
    workspaceBrowseBody: "Search the active shelf with focused filters, sorting, and compact views.",
    workspaceArchiveEyebrow: "Historical archive",
    workspaceArchiveTitle: "Review the archive",
    workspaceArchiveBody: "Browse past titles without mixing them into the active collection flow.",
    randomPageEyebrow: "Decision table",
    randomPageTitle: "Random helps the table decide",
    randomPageBody: "It uses the active workspace, reveals options, and keeps a lightweight session memory.",
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
    detailQuickFacts: "Quick facts",
    settingsEyebrow: "Preferences",
    settingsTitle: "Usage settings",
    settingsBody: "Theme and language live here so the rest of the library can stay focused on choosing games.",
    settingsThemeEyebrow: "Theme",
    settingsThemeTitle: "Library theme",
    settingsThemeBody: "Choose between light and dark mode for the whole library.",
    settingsLanguageEyebrow: "Language",
    settingsLanguageTitle: "Interface language",
    settingsLanguageBody: "Updates navigation, headings, and visible content.",
    settingsRoadmapEyebrow: "Next layer",
    settingsRoadmapTitle: "What can come next",
    settingsRoadmapBody:
      "There is room for future preferences without overloading Home.",
    drawnFromBrowse: "Browse",
    drawnFromArchive: "Archive"
  }
};

const icons = {
  home:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m3 11 9-7 9 7"/><path d="M5 10.5V20h14v-9.5"/><path d="M9 20v-6h6v6"/></svg>',
  browse:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>',
  archive:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="4" rx="1.4"/><path d="M5 9.5h14V19a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z"/><path d="M10 13h4"/></svg>',
  random:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r="1.2" fill="currentColor" stroke="none"/><circle cx="15" cy="15" r="1.2" fill="currentColor" stroke="none"/><circle cx="9" cy="15" r="1.2" fill="currentColor" stroke="none"/><circle cx="15" cy="9" r="1.2" fill="currentColor" stroke="none"/></svg>',
  settings:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Z"/><path d="M4.8 13.2a1 1 0 0 1-.2-1.1l.8-1.9a1 1 0 0 0-.2-1.1l-1.2-1.3 1.8-3.1 1.7.5a1 1 0 0 0 1-.3l1.4-1.2h3.6l1.4 1.2a1 1 0 0 0 1 .3l1.7-.5 1.8 3.1-1.2 1.3a1 1 0 0 0-.2 1.1l.8 1.9a1 1 0 0 1-.2 1.1l-1.4 1.4a1 1 0 0 0-.3 1l.3 1.9-3.1 1.8-1.3-1.2a1 1 0 0 0-1.1-.2l-1.9.8a1 1 0 0 1-1.1 0l-1.9-.8a1 1 0 0 0-1.1.2l-1.3 1.2-3.1-1.8.3-1.9a1 1 0 0 0-.3-1Z"/></svg>',
  search:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>',
  players:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9.5" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  time: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
  weight:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 20h12l-1.5-8h-9z"/><path d="M9 8a3 3 0 1 1 6 0"/></svg>',
  age: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l8 4v5c0 5-3.5 8.74-8 9-4.5-.26-8-4-8-9V7z"/><path d="M9.5 12.5l1.8 1.8 3.7-4"/></svg>',
  language:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 5h9"/><path d="M8.5 5c0 6-2.5 10-5.5 12"/><path d="M6 11c1.2 1.8 3 3.4 5.5 4.8"/><path d="M14 19l4-10 4 10"/><path d="M15.4 15.5h5.2"/></svg>',
  calendar:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>',
  rating:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m12 3 2.9 5.9 6.5 1-4.7 4.6 1.1 6.5L12 18l-5.8 3 1.1-6.5L2.6 9.9l6.5-1z"/></svg>',
  close:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"><path d="M6 6 18 18M18 6 6 18"/></svg>',
  filter:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16"/><path d="M7 12h10"/><path d="M10 17h4"/></svg>',
  back:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m14.5 6.5-5 5 5 5"/><path d="M19.5 11.5h-10"/></svg>',
  external:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 5h5v5"/><path d="M10 14 19 5"/><path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>',
  duo:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="8.5" cy="9" r="2.6"/><circle cx="15.5" cy="9" r="2.6"/><path d="M4.5 18a4 4 0 0 1 4-4h0"/><path d="M19.5 18a4 4 0 0 0-4-4h0"/></svg>',
  quick:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M13 2 6 13h5l-1 9 8-12h-5z"/></svg>',
  heavy:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 10v4"/><path d="M7 8v8"/><path d="M10 7.5v9"/><path d="M14 7.5v9"/><path d="M17 8v8"/><path d="M20 10v4"/><path d="M10 12h4"/></svg>',
  teach:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="m3 8.5 9-4 9 4-9 4z"/><path d="M7 10.3v4.2c0 1.5 2.2 3 5 3s5-1.5 5-3v-4.2"/><path d="M21 9v5"/></svg>',
  solo:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="3.5"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/></svg>',
  group:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="3.2"/><circle cx="5.8" cy="10" r="2.4"/><circle cx="18.2" cy="10" r="2.4"/><path d="M7 19a5 5 0 0 1 10 0"/><path d="M1.8 19a4 4 0 0 1 4-4"/><path d="M22.2 19a4 4 0 0 0-4-4"/></svg>',
  broom:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>'
};

const state = {
  language: "es",
  activePage: "home",
  lastWorkspacePage: "browse",
  filters: {
    search: "",
    players: "",
    duration: [],
    weight: [],
    languageKey: "",
    physicalLanguage: "",
    bestPlayers: "",
    age: "",
    sort: "name",
    sortDirection: "asc",
    view: "grid",
    recommendation: "",
    section: "owned"
  },
  preferences: {
    language: "es",
    view: "grid",
    activePage: "home",
    theme: "auto"
  },
  nameOverrides: {},
  data: null,
  libraryRatingRange: null,
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
  physicalLanguage: "physicalLanguageFilter",
  bestPlayers: "bestPlayersFilter",
  age: "ageFilter",
  sort: "sortFilter",
  sortDirection: "sortDirectionFilter",
  view: "viewFilter",
  recommendation: "recommendationChips"
};

document.addEventListener("DOMContentLoaded", init);

async function init() {
  cacheElements();
  loadPreferences();
  applyThemePreference();
  bindEvents();
  applyTranslations();
  await loadData();
  ensureValidActivePage();
  syncSectionWithPage();
  render();
}

function cacheElements() {
  elements.topbarShell = document.querySelector(".topbar-shell");
  elements.pageNav = document.querySelector("#page-nav");
  elements.heroStats = document.querySelector("#hero-stats");
  elements.homeRecentList = document.querySelector("#home-recent-list");
  elements.searchInput = document.querySelector("#search-input");
  elements.playersFilter = document.querySelector("#players-filter");
  elements.timeFilter = document.querySelector("#time-filter");
  elements.weightFilter = document.querySelector("#weight-filter");
  elements.languageFilter = document.querySelector("#language-filter");
  elements.physicalLanguageFilter = document.querySelector("#physical-language-filter");
  elements.bestPlayersFilter = document.querySelector("#best-players-filter");
  elements.ageFilter = document.querySelector("#age-filter");
  elements.sortFilter = document.querySelector("#sort-filter");
  elements.sortDirectionFilter = document.querySelector("#sort-direction-filter");
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
  elements.themeSegmentHeader = document.querySelector("#theme-segment-header");
  elements.themeSegmentSettings = document.querySelector("#theme-segment-settings");
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
  state.preferences.theme = THEME_KEYS.includes(state.preferences.theme) ? state.preferences.theme : "dark";
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

function lockBodyScroll() {
  if (document.body.classList.contains("modal-open")) return;
  bodyScrollLockY = window.scrollY || window.pageYOffset || 0;
  document.body.style.top = `-${bodyScrollLockY}px`;
  document.body.classList.add("modal-open");
}

function unlockBodyScroll() {
  if (!document.body.classList.contains("modal-open")) return;
  document.body.classList.remove("modal-open");
  document.body.style.top = "";
  window.scrollTo(0, bodyScrollLockY);
}

function bindEvents() {
  elements.searchInput.addEventListener("input", (event) => setFilter("search", event.target.value.trim().toLowerCase()));
  elements.filtersPanel.addEventListener("click", handleFilterControlClick);
  elements.filtersPanel.addEventListener("change", handleFilterControlChange);
  elements.viewFilter.addEventListener("click", handleFilterControlClick);
  elements.sortFilter?.addEventListener("change", handleFilterControlChange);
  elements.sortDirectionFilter?.addEventListener("click", handleFilterControlClick);
  elements.activeFilters.addEventListener("click", (event) => {
    const resetButton = event.target.closest("[data-reset-filters]");
    if (resetButton && !resetButton.disabled) resetFilters();
  });
  document.querySelector("#details-close").addEventListener("click", () => elements.detailsDialog.close());
  elements.detailsDialog?.addEventListener("close", unlockBodyScroll);
  document.querySelector("#open-filters").addEventListener("click", () => elements.filtersPanel.classList.add("is-open"));
  document.querySelector("#close-filters").addEventListener("click", () => elements.filtersPanel.classList.remove("is-open"));
  document.querySelector("#home-browse-action").addEventListener("click", () => setActivePage("browse"));
  document.querySelector("#home-random-action").addEventListener("click", () => setActivePage("random"));
  document.querySelector("#toolbar-random").addEventListener("click", () => setActivePage("random"));
  document.querySelector("#random-browse-action").addEventListener("click", () => setActivePage(state.lastWorkspacePage));
  document.querySelector("#random-page-trigger").addEventListener("click", drawRandomFromCurrentScope);
  window.addEventListener("resize", () => {
    syncStickyOffsets();
    renderFilterControls();
    scheduleMasonryLayout();
  });
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

function setTheme(theme) {
  if (!THEME_KEYS.includes(theme)) return;
  state.preferences.theme = theme;
  savePreferences();
  applyThemePreference();
  syncScoreBadges();
  renderThemeSegments();
}

function getEffectiveTheme() {
  return state.preferences.theme === "light" ? "light" : "dark";
}

function applyThemePreference() {
  const effectiveTheme = getEffectiveTheme();
  document.body.dataset.theme = effectiveTheme;
  document.body.dataset.themePreference = effectiveTheme;
  document.documentElement.style.colorScheme = effectiveTheme;
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
    duration: [],
    weight: [],
    languageKey: "",
    physicalLanguage: "",
    bestPlayers: "",
    age: "",
    sort: "name",
    sortDirection: "asc",
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
  document.title = copy.brandTitle;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    node.textContent = copy[key] || key;
  });
  elements.searchInput.placeholder = copy.searchPlaceholder || copy.searchLabel;
  elements.themeSegmentHeader?.setAttribute("aria-label", copy.themeLabel);
  elements.themeSegmentSettings?.setAttribute("aria-label", copy.themeLabel);
  elements.languageSegment?.setAttribute("aria-label", copy.languageLabel);
  elements.viewFilter?.setAttribute("aria-label", copy.viewLabel);
  renderPageNav();
  renderThemeSegments();
  renderLanguageSegment();
  renderFilterControls();
  renderStaticIconLabels();
}

function renderPageNav() {
  const copy = translations[state.language];
  const items = [
    ["home", copy.navHome, "home"],
    ["browse", copy.navBrowse, "browse"],
    ["archive", copy.navArchive, "archive"],
    ["random", copy.navRandom, "random"],
    ["settings", copy.navSettings, "settings"]
  ];
  elements.pageNav.innerHTML = items
    .map(
      ([value, label, icon]) =>
        `<button class="segment-button ${state.activePage === value ? "is-active" : ""}" data-page="${value}" type="button">${renderIconLabel(label, icon)}</button>`
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
  const activeIndex = Math.max(0, options.findIndex(([value]) => value === state.language));
  if (!elements.languageSegment.querySelector(".language-toggle__track")) {
    elements.languageSegment.innerHTML = `
      <div class="language-toggle__track" data-language-active="${escapeAttribute(String(activeIndex))}">
        <span class="language-toggle__thumb" aria-hidden="true"></span>
        ${options
          .map(([value, label]) => {
            const isActive = state.language === value;
            return `
              <button
                class="language-toggle__button ${isActive ? "is-active" : ""}"
                data-language="${escapeAttribute(value)}"
                type="button"
                aria-pressed="${isActive ? "true" : "false"}"
                aria-label="${escapeAttribute(label)}"
                title="${escapeAttribute(label)}"
              >
                ${escapeHtml(label)}
              </button>
            `;
          })
          .join("")}
      </div>
    `;
    elements.languageSegment.querySelectorAll("[data-language]").forEach((button) => {
      button.addEventListener("click", () => setLanguage(button.dataset.language));
    });
  }
  const track = elements.languageSegment.querySelector(".language-toggle__track");
  if (track) {
    track.dataset.languageActive = String(activeIndex);
  }
  elements.languageSegment.querySelectorAll("[data-language]").forEach((button) => {
    const value = button.dataset.language;
    const label = options.find(([option]) => option === value)?.[1] || value;
    const isActive = state.language === value;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
    button.setAttribute("aria-label", label);
    button.setAttribute("title", label);
  });
}

function renderThemeSegments() {
  const copy = translations[state.language];
  const options = [
    ["light", copy.themeLight],
    ["dark", copy.themeDark]
  ];
  [elements.themeSegmentHeader, elements.themeSegmentSettings].forEach((container) => {
    if (!container) return;
    const activeIndex = Math.max(0, options.findIndex(([value]) => value === state.preferences.theme));
    if (!container.querySelector(".theme-toggle__track")) {
      container.innerHTML = `
        <div class="theme-toggle__track" data-theme-active="${escapeAttribute(String(activeIndex))}">
          <span class="theme-toggle__thumb" aria-hidden="true"></span>
          ${options
            .map(([value, label]) => {
              const icon = value === "light" ? themeIconSun() : themeIconMoon();
              const isActive = state.preferences.theme === value;
              return `
                <button
                  class="theme-toggle__button ${isActive ? "is-active" : ""}"
                  data-theme="${escapeAttribute(value)}"
                  type="button"
                  aria-pressed="${isActive ? "true" : "false"}"
                  aria-label="${escapeAttribute(label)}"
                  title="${escapeAttribute(label)}"
                >
                  ${icon}
                </button>
              `;
            })
            .join("")}
        </div>
      `;
      container.querySelectorAll("[data-theme]").forEach((button) => {
        button.addEventListener("click", () => setTheme(button.dataset.theme));
      });
    }
    const track = container.querySelector(".theme-toggle__track");
    if (track) {
      track.dataset.themeActive = String(activeIndex);
    }
    container.querySelectorAll("[data-theme]").forEach((button) => {
      const value = button.dataset.theme;
      const label = options.find(([option]) => option === value)?.[1] || value;
      const isActive = state.preferences.theme === value;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
      button.setAttribute("aria-label", label);
      button.setAttribute("title", label);
    });
  });
}

function themeIconSun() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.4M12 19.1v2.4M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.9 19.1l1.7-1.7M17.4 6.6l1.7-1.7"/></svg>';
}

function themeIconMoon() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><path d="M20 14.2A8 8 0 1 1 9.8 4a6.6 6.6 0 0 0 10.2 10.2Z"/></svg>';
}

function viewIconGrid() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><rect x="4" y="4" width="6.5" height="6.5" rx="1.4"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.4"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.4"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.4"/></svg>';
}

function viewIconList() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><path d="M8 6h12"/><path d="M8 12h12"/><path d="M8 18h12"/><circle cx="4.5" cy="6" r="1.1" fill="currentColor" stroke="none"/><circle cx="4.5" cy="12" r="1.1" fill="currentColor" stroke="none"/><circle cx="4.5" cy="18" r="1.1" fill="currentColor" stroke="none"/></svg>';
}

function sortDirectionIcon(direction) {
  return direction === "asc"
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 18V6"/><path d="m7.5 10.5 4.5-4.5 4.5 4.5"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 6v12"/><path d="m7.5 13.5 4.5 4.5 4.5-4.5"/></svg>';
}

function iconMarkup(iconKey, className = "inline-icon-label__icon") {
  const icon = icons[iconKey];
  if (!icon) return "";
  return icon.replace("<svg ", `<svg class="${escapeAttribute(className)}" aria-hidden="true" `);
}

function renderIconLabel(label, iconKey, className = "inline-icon-label") {
  return iconKey
    ? `<span class="${escapeAttribute(className)}">${iconMarkup(iconKey, `${className}__icon`)}<span>${escapeHtml(label)}</span></span>`
    : escapeHtml(label);
}

function renderStaticIconLabels() {
  const copy = translations[state.language];
  const actionButtons = [
    ["#home-browse-action", copy.exploreAction, "browse"],
    ["#home-random-action", copy.openRandomAction, "random"],
    ["#open-filters", copy.openFilters, "filter"],
    ["#close-filters", copy.close, "close"],
    ["#toolbar-random", copy.openRandomAction, "random"],
    ["#random-browse-action", copy.randomPageOpenWorkspace, "back"],
    ["#random-page-trigger", copy.randomAction, "random"]
  ];
  actionButtons.forEach(([selector, label, icon]) => {
    const element = document.querySelector(selector);
    if (element) element.innerHTML = renderIconLabel(label, icon);
  });

  const filterLabels = [
    [elements.searchInput?.closest(".field")?.querySelector("[data-i18n='searchLabel']"), copy.searchLabel, "search"],
    [elements.playersFilter?.closest(".field")?.querySelector("[data-i18n='playersLabel']"), copy.playersLabel, "players"],
    [elements.timeFilter?.closest(".field")?.querySelector("[data-i18n='durationLabel']"), copy.durationLabel, "time"],
    [elements.weightFilter?.closest(".field")?.querySelector("[data-i18n='weightLabel']"), copy.weightLabel, "weight"],
    [elements.physicalLanguageFilter?.closest(".field")?.querySelector("[data-i18n='editionLanguageLabel']"), copy.editionLanguageLabel, "language"],
    [elements.bestPlayersFilter?.closest(".field")?.querySelector("[data-i18n='bestPlayersLabel']"), copy.bestPlayersLabel, "players"],
    [elements.ageFilter?.closest(".field")?.querySelector("[data-i18n='ageLabel']"), copy.ageLabel, "age"]
  ];
  filterLabels.forEach(([node, label, icon]) => {
    if (node) node.innerHTML = renderIconLabel(label, icon, "field__label");
  });
}

function getFilterControlDefinitions() {
  const copy = translations[state.language];
  return {
    players: {
      style: "choice",
      toggleable: true,
      options: [["", copy.anyCompact], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5+"]]
    },
    duration: {
      style: "multi",
      options: [["quick", "30-"], ["standard", "31-60"], ["extended", "61-120"], ["epic", "120+"]]
    },
    weight: {
      style: "multi",
      options: [["light", copy.weightLight], ["medium-light", copy.weightMediumLight], ["medium-heavy", copy.weightMediumHeavy], ["heavy", copy.weightHeavy]]
    },
    physicalLanguage: {
      style: "choice",
      options: getPhysicalLanguageFilterOptions()
    },
    bestPlayers: {
      style: "choice",
      toggleable: true,
      options: [["", copy.anyCompact], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5+"]]
    },
    age: {
      style: "choice",
      options: [["", copy.anyCompact], ["kids", copy.ageKids], ["family", copy.ageFamily], ["teen", copy.ageTeen], ["adult", copy.ageAdult]]
    },
    sort: {
      style: "select",
      options: [["name", copy.sortName], ["rating", copy.sortRating], ["rank", copy.sortRank], ["weight", copy.sortWeight], ["time", copy.sortTime], ["maxPlayers", copy.sortMaxPlayers]]
    },
    sortDirection: {
      style: "choice",
      options: [["asc", copy.sortAscending], ["desc", copy.sortDescending]]
    },
    view: {
      style: "segment",
      toggleable: false,
      options: [["grid", copy.viewGridLabel], ["list", copy.viewListLabel]]
    },
    recommendation: {
      style: "chips",
      toggleable: true,
      options: [["duo", copy.recDuo, "duo"], ["quick", copy.recQuick, "quick"], ["heavy", copy.recHeavy, "heavy"], ["teach", copy.recTeach, "teach"], ["solo", copy.recSolo, "solo"], ["group", copy.recGroup, "group"]]
    }
  };
}

function renderFilterControls() {
  const definitions = getFilterControlDefinitions();
  Object.entries(CONTROL_CONTAINER_MAP).forEach(([key, elementKey]) => {
    const container = elements[elementKey];
    const definition = definitions[key];
    if (!container || !definition) return;
    const baseClass = key === "view"
      ? "toolbar__view filter-control"
      : key === "sort"
        ? "toolbar__sort filter-control"
        : key === "sortDirection"
          ? "toolbar__sort-direction filter-control"
        : "filter-control";
    if (definition.style === "multi") {
      container.className = `${baseClass} chip-list filter-control--multi`;
      const selectedValues = Array.isArray(state.filters[key]) ? state.filters[key] : [];
      container.innerHTML = definition.options
        .map(([value, label]) => {
          const isActive = selectedValues.includes(value);
          return `<button class="chip chip--interactive ${isActive ? "chip--active" : ""}" data-filter-key="${escapeAttribute(key)}" data-filter-value="${escapeAttribute(value)}" type="button" aria-pressed="${isActive ? "true" : "false"}">${escapeHtml(label)}</button>`;
        })
        .join("");
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
    if (key === "view") {
      renderViewToggle(container, definition.options);
      return;
    }
    if (key === "sortDirection") {
      renderSortDirectionToggle(container, definition.options);
      return;
    }
    if (definition.style === "choice") {
      renderChoiceToggle(container, key, definition.options, baseClass);
      return;
    }
    container.className = definition.style === "segment" ? `${baseClass} segmented-control` : `${baseClass} chip-list`;
    container.innerHTML = definition.options
      .map(([value, label, icon]) => {
        const isActive = state.filters[key] === value;
        const buttonClass = definition.style === "segment" ? "segment-button" : "chip chip--interactive";
        return `<button class="${buttonClass} ${isActive ? "is-active chip--active" : ""}" data-filter-key="${escapeAttribute(key)}" data-filter-value="${escapeAttribute(value)}" type="button" aria-pressed="${isActive ? "true" : "false"}">${renderIconLabel(label, icon, "chip__label")}</button>`;
      })
      .join("");
  });
}

function renderChoiceToggle(container, key, options, baseClass = "filter-control") {
  const activeIndex = Math.max(0, options.findIndex(([value]) => value === state.filters[key]));
  container.className = `${baseClass} choice-toggle`;
  const optionsSignature = options.map(([value, label]) => `${value}:${label}`).join("|");
  const currentTrack = container.querySelector(".choice-toggle__track");
  if (!currentTrack || currentTrack.dataset.choiceOptions !== optionsSignature) {
    container.innerHTML = `
      <div
        class="choice-toggle__track"
        data-choice-active="${escapeAttribute(String(activeIndex))}"
        data-choice-options="${escapeAttribute(optionsSignature)}"
      >
        <span class="choice-toggle__thumb" aria-hidden="true"></span>
        ${options
          .map(([value, label]) => {
            const isActive = state.filters[key] === value;
            return `
              <button
                class="choice-toggle__button ${isActive ? "is-active" : ""}"
                data-filter-key="${escapeAttribute(key)}"
                data-filter-value="${escapeAttribute(value)}"
                type="button"
                aria-pressed="${isActive ? "true" : "false"}"
              >
                ${escapeHtml(label)}
              </button>
            `;
          })
          .join("")}
      </div>
    `;
  }
  const track = container.querySelector(".choice-toggle__track");
  const buttons = [...container.querySelectorAll("[data-filter-key]")];
  const activeButton = buttons.find((button) => (button.dataset.filterValue || "") === (state.filters[key] || "")) || buttons[0];
  buttons.forEach((button) => {
    const value = button.dataset.filterValue || "";
    const label = options.find(([optionValue]) => optionValue === value)?.[1] || value;
    const isActive = button === activeButton;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
    button.setAttribute("aria-label", label);
    button.setAttribute("title", label);
  });
  if (track && activeButton) {
    track.dataset.choiceActive = String(Math.max(0, buttons.indexOf(activeButton)));
    track.style.setProperty("--choice-toggle-x", `${activeButton.offsetLeft - 3}px`);
    track.style.setProperty("--choice-toggle-width", `${activeButton.offsetWidth}px`);
  }
}

function renderViewToggle(container, options) {
  const activeIndex = Math.max(0, options.findIndex(([value]) => value === state.filters.view));
  container.className = "toolbar__view filter-control";
  if (!container.querySelector(".view-toggle__track")) {
    container.innerHTML = `
      <div class="view-toggle__track" data-view-active="${escapeAttribute(String(activeIndex))}">
        <span class="view-toggle__thumb" aria-hidden="true"></span>
        ${options
          .map(([value, label]) => {
            const icon = value === "grid" ? viewIconGrid() : viewIconList();
            const isActive = state.filters.view === value;
            return `
              <button
                class="view-toggle__button ${isActive ? "is-active" : ""}"
                data-filter-key="view"
                data-filter-value="${escapeAttribute(value)}"
                type="button"
                aria-pressed="${isActive ? "true" : "false"}"
                aria-label="${escapeAttribute(label)}"
                title="${escapeAttribute(label)}"
              >
                ${icon}
              </button>
            `;
          })
          .join("")}
      </div>
    `;
  }
  const track = container.querySelector(".view-toggle__track");
  if (track) {
    track.dataset.viewActive = String(activeIndex);
  }
  container.querySelectorAll("[data-filter-key='view']").forEach((button) => {
    const value = button.dataset.filterValue || "grid";
    const label = options.find(([option]) => option === value)?.[1] || value;
    const isActive = state.filters.view === value;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
    button.setAttribute("aria-label", label);
    button.setAttribute("title", label);
  });
}

function renderSortDirectionToggle(container, options) {
  const activeIndex = Math.max(0, options.findIndex(([value]) => value === state.filters.sortDirection));
  container.className = "toolbar__sort-direction filter-control";
  if (!container.querySelector(".sort-direction-toggle__track")) {
    container.innerHTML = `
      <div class="sort-direction-toggle__track" data-sort-direction-active="${escapeAttribute(String(activeIndex))}">
        <span class="sort-direction-toggle__thumb" aria-hidden="true"></span>
        ${options
          .map(([value, label]) => {
            const isActive = state.filters.sortDirection === value;
            return `
              <button
                class="sort-direction-toggle__button ${isActive ? "is-active" : ""}"
                data-filter-key="sortDirection"
                data-filter-value="${escapeAttribute(value)}"
                type="button"
                aria-pressed="${isActive ? "true" : "false"}"
                aria-label="${escapeAttribute(label)}"
                title="${escapeAttribute(label)}"
              >
                ${sortDirectionIcon(value)}
              </button>
            `;
          })
          .join("")}
      </div>
    `;
  }
  const track = container.querySelector(".sort-direction-toggle__track");
  if (track) {
    track.dataset.sortDirectionActive = String(activeIndex);
  }
  container.querySelectorAll("[data-filter-key='sortDirection']").forEach((button) => {
    const value = button.dataset.filterValue || "asc";
    const label = options.find(([option]) => option === value)?.[1] || value;
    const isActive = state.filters.sortDirection === value;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
    button.setAttribute("aria-label", label);
    button.setAttribute("title", label);
  });
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
  if (definition.style === "multi") {
    const currentValues = Array.isArray(state.filters[key]) ? state.filters[key] : [];
    const nextValue = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : definition.options
        .map(([optionValue]) => optionValue)
        .filter((optionValue) => optionValue === value || currentValues.includes(optionValue));
    setFilter(key, nextValue);
    return;
  }
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
    state.libraryRatingRange = getLibraryRatingRange(state.data?.games || []);
    return;
  }

  const response = await fetch(DATA_URL);
  state.data = normalizeDataset(await response.json());
  state.libraryRatingRange = getLibraryRatingRange(state.data?.games || []);
}

function normalizeDataset(data) {
  if (!data || !Array.isArray(data.games)) return data;
  const games = data.games.map(normalizeGame);
  const recentIds = new Set(selectRecentHighlightGames(games).map((game) => game.id));
  return {
    ...data,
    games: games.map((game) => ({
      ...game,
      isNew: recentIds.has(game.id)
    }))
  };
}

function normalizeGame(game) {
  const acquisitionDate = typeof game.acquisitionDate === "string" ? game.acquisitionDate.trim() : "";
  const physicalLanguages = parseLanguageList(game.versionLanguages);
  return {
    ...game,
    recommendedPlayers: toPlayerArray(game.recommendedPlayers),
    bestPlayers: toPlayerArray(game.bestPlayers),
    categories: Array.isArray(game.categories) ? game.categories : [],
    mechanics: Array.isArray(game.mechanics) ? game.mechanics : [],
    tags: Array.isArray(game.tags) ? game.tags : [],
    summary: normalizeLocalizedContent(game.summary),
    description: normalizeLocalizedContent(game.description),
    bggItemType: typeof game.bggItemType === "string" ? game.bggItemType : "",
    dependencyType: typeof game.dependencyType === "string" ? game.dependencyType : "",
    requiresGameId: Number.isFinite(Number(game.requiresGameId)) ? Number(game.requiresGameId) : null,
    requiresGameName: typeof game.requiresGameName === "string" ? game.requiresGameName : "",
    acquisitionDate,
    acquisitionTimestamp: parseAcquisitionTimestamp(acquisitionDate),
    versionLanguages: typeof game.versionLanguages === "string" ? game.versionLanguages : "",
    physicalLanguages,
    isNew: false,
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

function parseLanguageList(value) {
  return String(value || "")
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseAcquisitionTimestamp(value) {
  const text = String(value || "").trim();
  if (!text) return null;
  const parsed = new Date(`${text}T00:00:00`);
  return Number.isFinite(parsed.getTime()) ? parsed.getTime() : null;
}

function normalizeLocalizedContent(value) {
  if (typeof value === "string") return { en: value, es: "" };
  if (value && typeof value === "object") {
    return {
      en: typeof value.en === "string" ? value.en : "",
      es: typeof value.es === "string" ? value.es : ""
    };
  }
  return { en: "", es: "" };
}

function render() {
  if (!state.data) return;
  syncSectionWithPage();
  applyThemePreference();
  syncVisualContext();
  syncStickyOffsets();
  syncControls();
  state.filteredGames = getFilteredGames();
  reconcileRandomSelection();
  renderPageNav();
  renderLanguageSegment();
  renderPanelVisibility();
  renderHeroStats();
  renderHomePanel();
  renderResultsSummary();
  renderActiveFilters();
  renderFilterControls();
  renderGames();
  renderRandomPage();
}

function syncVisualContext() {
  document.body.dataset.page = state.activePage;
}

function syncStickyOffsets() {
  const shellHeight = elements.topbarShell?.offsetHeight || 0;
  document.documentElement.style.setProperty("--topbar-sticky-offset", `${shellHeight}px`);
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

function getFilteredGames() {
  const section = getEffectiveSection();
  return state.data.games
    .filter((game) => {
      if (shouldHideFromBrowse(game)) return false;
      if (section === "owned" && !game.own) return false;
      if (section === "archive" && !game.prevOwned) return false;
      if (state.filters.search && !game.searchText.includes(state.filters.search)) return false;
      if (state.filters.players) {
        const requested = Number(state.filters.players);
        if (!(game.minPlayers <= requested && game.maxPlayers >= requested)) return false;
      }
      if (Array.isArray(state.filters.duration) && state.filters.duration.length && !state.filters.duration.includes(game.timeBand)) return false;
      if (Array.isArray(state.filters.weight) && state.filters.weight.length && !state.filters.weight.includes(game.weightBand)) return false;
      if (state.filters.physicalLanguage) {
        if (state.filters.physicalLanguage === "unknown") {
          if (Array.isArray(game.physicalLanguages) && game.physicalLanguages.length) return false;
        } else if (!Array.isArray(game.physicalLanguages) || !game.physicalLanguages.includes(state.filters.physicalLanguage)) {
          return false;
        }
      }
      if (state.filters.bestPlayers) {
        const requested = Number(state.filters.bestPlayers);
        const bestValues = Array.isArray(game.bestPlayers) ? game.bestPlayers : [];
        if (!bestValues.some((value) => (requested === 5 ? value >= 5 : value === requested))) return false;
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
  let comparison = 0;
  switch (state.filters.sort) {
    case "rating":
      comparison = (right.averageRating ?? -1) - (left.averageRating ?? -1) || getDisplayName(left).localeCompare(getDisplayName(right));
      break;
    case "rank":
      comparison = (left.rank ?? Number.MAX_SAFE_INTEGER) - (right.rank ?? Number.MAX_SAFE_INTEGER) || getDisplayName(left).localeCompare(getDisplayName(right));
      break;
    case "weight":
      comparison = (right.avgWeight ?? -1) - (left.avgWeight ?? -1) || getDisplayName(left).localeCompare(getDisplayName(right));
      break;
    case "time":
      comparison = (left.playingTime ?? Number.MAX_SAFE_INTEGER) - (right.playingTime ?? Number.MAX_SAFE_INTEGER) || getDisplayName(left).localeCompare(getDisplayName(right));
      break;
    case "maxPlayers":
      comparison = (right.maxPlayers ?? -1) - (left.maxPlayers ?? -1) || getDisplayName(left).localeCompare(getDisplayName(right));
      break;
    default:
      comparison = getDisplayName(left).localeCompare(getDisplayName(right));
      break;
  }
  return state.filters.sortDirection === "desc" ? comparison * -1 : comparison;
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
  const catalogCount = (state.data?.games || []).filter((game) => game.own || game.prevOwned).length;
  const stats = [
    [catalogCount, copy.heroCount],
    [state.data.summary.ownCount, copy.heroOwned],
    [state.data.summary.prevOwnedCount, copy.heroPrev],
    [state.data.summary.recommendations.quick, copy.heroQuick]
  ];
  elements.heroStats.innerHTML = stats
    .map(([value, label]) => `<div class="stat-card"><strong>${escapeHtml(String(value))}</strong><span>${escapeHtml(label)}</span></div>`)
    .join("");
}

function renderHomePanel() {
  const copy = translations[state.language];
  const recentGames = getRecentAcquisitions();
  elements.homeRecentList.innerHTML = recentGames.length
    ? recentGames
      .map(
        (game) => `
          <button class="home-recent-item" data-recent-game-id="${escapeAttribute(game.id)}" type="button">
            <div class="game-card__art home-recent-item__cover" id="home-recent-cover-${escapeAttribute(game.id)}"></div>
            <div class="home-recent-item__body">
              <div class="home-recent-item__header">
                <div class="home-recent-item__copy">
                  <span class="home-recent-item__title">${escapeHtml(getDisplayName(game))}</span>
                  <span class="home-recent-item__year">${escapeHtml(game.yearPublished ? String(game.yearPublished) : copy.notAvailable)}</span>
                </div>
                <span class="game-card__badge home-recent-item__badge" data-rating="${typeof game.averageRating === "number" && Number.isFinite(game.averageRating) ? escapeAttribute(String(game.averageRating)) : ""}">
                  ${escapeHtml(formatGameScore(game))}
                </span>
              </div>
              <span class="home-recent-item__facts">
                ${buildHomeRecentFacts(game).map(({ icon, label }) => metaPill(icon, label).replace('class="meta-pill"', 'class="meta-pill home-recent-item__fact"')).join("")}
              </span>
              ${buildHomeRecentAcquisitionLine(game, copy)}
            </div>
          </button>
        `
      )
      .join("")
    : `<p class="home-recent-empty">${escapeHtml(copy.homeRecentEmpty)}</p>`;

  elements.homeRecentList.querySelectorAll("[data-recent-game-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const game = getGameById(Number(button.dataset.recentGameId));
      if (game) openDetails(game);
    });
  });

  recentGames.forEach((game) => {
    const cover = elements.homeRecentList.querySelector(`#home-recent-cover-${CSS.escape(String(game.id))}`);
    if (cover) injectCover(cover, game, 180);
    const badge = elements.homeRecentList.querySelector(`[data-recent-game-id="${CSS.escape(String(game.id))}"] .home-recent-item__badge`);
    if (badge) applyScoreBadgeStyle(badge, game.averageRating);
  });
}

function renderResultsSummary() {
  const copy = translations[state.language];
  const count = state.filteredGames.length;
  const label = count === 1 ? copy.resultsSingle : copy.resultsPlural;
  elements.resultsCount.textContent = `${count} ${label}`;
}

function renderActiveFilters() {
  const copy = translations[state.language];
  const tags = [];
  if (state.filters.search) tags.push({ icon: "search", label: copy.filterSearch, value: state.filters.search });
  if (state.filters.players) tags.push({ icon: "players", label: copy.filterPlayers, value: state.filters.players === "5" ? "5+" : getFilterValueLabel("players", state.filters.players) });
  if (Array.isArray(state.filters.duration) && state.filters.duration.length) tags.push({ icon: "time", label: copy.filterDuration, value: getMultiFilterSummary("duration", state.filters.duration) });
  if (Array.isArray(state.filters.weight) && state.filters.weight.length) tags.push({ icon: "weight", label: copy.filterWeight, value: getMultiFilterSummary("weight", state.filters.weight) });
  if (state.filters.physicalLanguage) tags.push({ icon: "language", label: copy.filterPhysicalLanguage, value: labelForPhysicalLanguage(state.filters.physicalLanguage) });
  if (state.filters.bestPlayers) tags.push({ icon: "players", label: copy.filterBestPlayers, value: state.filters.bestPlayers === "5" ? "5+" : getFilterValueLabel("bestPlayers", state.filters.bestPlayers) });
  if (state.filters.age) tags.push({ icon: "age", label: copy.filterAge, value: getFilterValueLabel("age", state.filters.age) });
  if (state.filters.recommendation) tags.push({ icon: getRecommendationIconKey(state.filters.recommendation), label: copy.recommendTitle, value: getFilterValueLabel("recommendation", state.filters.recommendation) });
  const hasFilters = tags.length > 0;
  elements.activeFilters.innerHTML = `
    <div class="active-filters__content">
      <p class="active-filters__title">${escapeHtml(copy.activeFiltersTitle)}</p>
      <div class="active-filters__list">
        ${hasFilters
          ? tags.map(({ icon, label, value }) => `<span class="chip chip--with-icon">${iconMarkup(icon, "chip__icon")}<span>${escapeHtml(label)}: ${escapeHtml(String(value))}</span></span>`).join("")
          : `<span class="active-filters__empty">${escapeHtml(copy.activeFiltersEmpty)}</span>`}
      </div>
    </div>
    <button
      class="button button--ghost button--small active-filters__reset"
      type="button"
      data-reset-filters
      title="${escapeAttribute(copy.resetFilters)}"
      aria-label="${escapeAttribute(copy.resetFilters)}"
      ${hasFilters ? "" : "disabled"}
    >
      ${icons.broom}
    </button>
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
    const badge = node.querySelector(".game-card__badge");
    const flag = node.querySelector(".game-card__flag");
    const displayName = getDisplayName(game);
    node.classList.toggle("game-card--list", isListView);
    node.classList.toggle("game-card--new", game.isNew);
    node.querySelector(".game-card__title").textContent = displayName;
    node.querySelector(".game-card__subtitle").textContent = buildCardSubtitle(game);
    flag.textContent = translations[state.language].newTag;
    flag.classList.toggle("hidden", !game.isNew);
    badge.textContent = game.averageRating ? game.averageRating.toFixed(1) : "n/a";
    badge.dataset.rating = typeof game.averageRating === "number" && Number.isFinite(game.averageRating)
      ? String(game.averageRating)
      : "";
    applyScoreBadgeStyle(badge, game.averageRating);
    art.dataset.initials = getInitials(displayName);
    injectCover(art, game, 220);
    node.querySelector(".game-card__meta").innerHTML = [
      metaPill("players", formatPlayers(game)),
      metaPill("time", formatPlayTime(game)),
      metaPill("weight", labelForWeightBand(game.weightBand)),
      metaPill("age", game.ageText || translations[state.language].notAvailable)
    ].join("");
    button.addEventListener("click", () => openDetails(game));
    fragment.append(node);
  });
  elements.gamesGrid.append(fragment);
  observeGameCards();
  scheduleMasonryLayout();
}

function scheduleMasonryLayout() {
  if (masonryLayoutFrame) {
    window.cancelAnimationFrame(masonryLayoutFrame);
  }
  masonryLayoutFrame = window.requestAnimationFrame(() => {
    masonryLayoutFrame = 0;
    applyMasonryLayout();
  });
}

function observeGameCards() {
  if (typeof ResizeObserver !== "function") return;
  if (!gameCardResizeObserver) {
    gameCardResizeObserver = new ResizeObserver(() => {
      scheduleMasonryLayout();
    });
  }
  gameCardResizeObserver.disconnect();
  if (state.filters.view === "list") return;
  elements.gamesGrid.querySelectorAll(".game-card__button").forEach((card) => {
    gameCardResizeObserver.observe(card);
  });
}

function applyMasonryLayout() {
  if (!elements.gamesGrid) return;
  const cards = elements.gamesGrid.querySelectorAll(".game-card");
  if (state.filters.view === "list") {
    cards.forEach((card) => {
      card.style.gridRowEnd = "";
    });
    return;
  }

  const gridStyles = window.getComputedStyle(elements.gamesGrid);
  const rowHeight = parseFloat(gridStyles.getPropertyValue("grid-auto-rows"));
  const gap = parseFloat(gridStyles.getPropertyValue("gap"));
  if (!rowHeight) return;

  cards.forEach((card) => {
    const content = card.querySelector(".game-card__button");
    if (!content) return;
    const span = Math.max(1, Math.ceil((content.getBoundingClientRect().height + gap) / (rowHeight + gap)));
    card.style.gridRowEnd = `span ${span}`;
  });
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
  if (game.isNew) list.push(translations[state.language].newTag);
  if (bestPlayers.length) list.push(formatBestPlayersTag(bestPlayers));
  if (tags.includes("teaching-friendly")) list.push(translations[state.language].recTeach);
  if (tags.includes("solo")) list.push(translations[state.language].recSolo);
  return list.slice(0, compact ? 2 : 3);
}

function getLocalizedContentValue(node, language = state.language) {
  if (typeof node === "string") {
    return language === "en" ? node : "";
  }
  if (!node || typeof node !== "object") return "";
  const preferred = typeof node[language] === "string" ? node[language].trim() : "";
  if (preferred) return preferred;
  const english = typeof node.en === "string" ? node.en.trim() : "";
  if (english) return english;
  return typeof node.es === "string" ? node.es.trim() : "";
}

function getGameContent(game, preferredField = "summary") {
  if (game.notes) return game.notes;
  const primary = getLocalizedContentValue(game[preferredField]);
  if (primary) return primary;
  const alternateField = preferredField === "summary" ? "description" : "summary";
  return getLocalizedContentValue(game[alternateField]);
}

function renderDetailParagraphs(text, fallback) {
  const source = typeof text === "string" ? text.trim() : "";
  const paragraphs = (source || fallback)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  return paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
}

function openDetails(game) {
  const copy = translations[state.language];
  const displayName = getDisplayName(game);
  const secondaryName = getSecondaryName(game);
  const detailSubtitle = [secondaryName, buildDetailSubtitle(game)].filter(Boolean).join(" - ");
  const heroBadges = [game.own ? copy.owned : copy.prevOwned].concat(getDisplayTags(game, { compact: true })).slice(0, 3);
  const tags = getDisplayTags(game).concat(game.categories || [], game.mechanics || []).slice(0, 10);
  const linkedExpansions = getExpansionGames(game);
  const content = getGameContent(game, "summary");
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
        <div class="detail-hero" id="detail-hero">
          <div class="detail-hero-copy">
            <div class="detail-heading">
              <p class="eyebrow detail-eyebrow">${escapeHtml(game.yearPublished ? String(game.yearPublished) : copy.notAvailable)}</p>
              <h2 id="detail-title">${escapeHtml(displayName)}</h2>
              ${detailSubtitle ? `<p class="detail-subtitle">${escapeHtml(detailSubtitle)}</p>` : ""}
            </div>
            <div class="detail-hero-badges">
              ${heroBadges.map((label) => `<span class="detail-badge">${escapeHtml(label)}</span>`).join("")}
            </div>
          </div>
          <div class="detail-summary-row detail-meta" id="detail-summary-row">
            ${metaPill("players", formatPlayers(game))}
            ${metaPill("time", formatPlayTime(game))}
            ${metaPill("weight", `${copy.weightLabel}: ${game.avgWeight ? game.avgWeight.toFixed(2) : copy.notAvailable}`)}
            ${metaPill("age", `${copy.ageText}: ${game.ageText || copy.notAvailable}`)}
            ${metaPill("language", formatPhysicalLanguages(game))}
          </div>
        </div>
        <div class="detail-section detail-section--facts">
          <h3>${escapeHtml(copy.detailQuickFacts)}</h3>
          <div class="detail-grid detail-grid--facts" id="detail-quick-facts">
            ${detailKv(copy.ownership, game.own ? copy.owned : copy.prevOwned)}
            ${detailKv(copy.ranking, game.rank ? `#${game.rank}` : copy.notAvailable)}
            ${detailKv(copy.averageRating, game.averageRating ? game.averageRating.toFixed(2) : copy.notAvailable)}
            ${detailKv(copy.languageDependence, labelForLanguageKey(game.languageKey || "unknown"))}
            ${detailKv(copy.recommendedAt, game.recommendedPlayers.length ? joinPlayers(game.recommendedPlayers) : copy.notAvailable)}
            ${detailKv(copy.bestAt, game.bestPlayers.length ? joinPlayers(game.bestPlayers) : copy.notAvailable)}
          </div>
        </div>
        <div class="detail-section detail-section--content">
          <h3>${escapeHtml(copy.content)}</h3>
          <div class="detail-prose">
            ${renderDetailParagraphs(content, copy.notAvailable)}
          </div>
        </div>
        ${
          linkedExpansions.length
            ? `
        <div class="detail-section detail-section--expansions">
          <h3>${escapeHtml(copy.expansionsTitle)}</h3>
          ${linkedExpansionsMarkup}
        </div>
        `
            : ""
        }
        <div class="detail-section detail-section--links">
          <h3>${escapeHtml(copy.links)}</h3>
          <div class="detail-actions">
            <a class="button button--ghost" href="${escapeAttribute(game.bggUrl)}" target="_blank" rel="noreferrer">${renderIconLabel(copy.openBgg, "external")}</a>
          </div>
        </div>
        <div class="detail-tags detail-tags--soft">${tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
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

  if (!elements.detailsDialog.open) {
    lockBodyScroll();
    elements.detailsDialog.showModal();
  }
}

function detailKv(label, value) {
  return `<div class="detail-kv"><strong>${escapeHtml(label)}</strong><span class="detail-kv__value">${escapeHtml(value)}</span></div>`;
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
            const description = getGameContent(game, "summary");
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
  if (filtersSnapshot.players) chips.push(`<span class="chip">${escapeHtml(copy.filterPlayers)}: ${escapeHtml(filtersSnapshot.players === "5" ? "5+" : filtersSnapshot.players)}</span>`);
  if (Array.isArray(filtersSnapshot.duration) && filtersSnapshot.duration.length) chips.push(`<span class="chip">${escapeHtml(copy.filterDuration)}: ${escapeHtml(getMultiFilterSummary("duration", filtersSnapshot.duration))}</span>`);
  if (Array.isArray(filtersSnapshot.weight) && filtersSnapshot.weight.length) chips.push(`<span class="chip">${escapeHtml(copy.filterWeight)}: ${escapeHtml(getMultiFilterSummary("weight", filtersSnapshot.weight))}</span>`);
  if (filtersSnapshot.physicalLanguage) chips.push(`<span class="chip">${escapeHtml(copy.filterPhysicalLanguage)}: ${escapeHtml(labelForPhysicalLanguage(filtersSnapshot.physicalLanguage))}</span>`);
  if (filtersSnapshot.bestPlayers) chips.push(`<span class="chip">${escapeHtml(copy.filterBestPlayers)}: ${escapeHtml(filtersSnapshot.bestPlayers === "5" ? "5+" : filtersSnapshot.bestPlayers)}</span>`);
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
    duration: Array.isArray(state.filters.duration) ? [...state.filters.duration] : [],
    weight: Array.isArray(state.filters.weight) ? [...state.filters.weight] : [],
    physicalLanguage: state.filters.physicalLanguage || "",
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
    weight: filtersSnapshot.weight,
    physicalLanguage: filtersSnapshot.physicalLanguage,
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
  container.style.removeProperty("--card-art-ratio");
  if (game.imageUrl) {
    container.classList.add("has-image");
    container.innerHTML = `<img src="${escapeAttribute(game.imageUrl)}" alt="${escapeAttribute(displayName)}" loading="lazy" width="${width}" />`;
    const image = container.querySelector("img");
    if (image) {
      const syncCoverRatio = () => {
        if (!image.naturalWidth || !image.naturalHeight) return;
        const aspect = image.naturalWidth / image.naturalHeight;
        if (aspect >= 1.24) {
          container.style.setProperty("--card-art-ratio", "11 / 8");
        } else if (aspect <= 0.68) {
          container.style.setProperty("--card-art-ratio", "2 / 3");
        } else if (aspect <= 0.84) {
          container.style.setProperty("--card-art-ratio", "4 / 5");
        } else {
          container.style.setProperty("--card-art-ratio", "1 / 1");
        }
      };

      if (image.complete) {
        syncCoverRatio();
        scheduleMasonryLayout();
      } else {
        image.addEventListener("load", () => {
          syncCoverRatio();
          scheduleMasonryLayout();
        }, { once: true });
      }
    }
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

function formatAcquisitionDate(value) {
  const timestamp = parseAcquisitionTimestamp(value);
  if (!Number.isFinite(timestamp)) return "";
  return new Intl.DateTimeFormat(state.language === "es" ? "es-AR" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(timestamp));
}

function buildHomeRecentFacts(game) {
  const facts = [];
  const players = formatPlayers(game);
  if (players && players !== translations[state.language].notAvailable) {
    facts.push({ icon: "players", label: state.language === "es" ? `${players} jug.` : `${players} players` });
  }
  const time = formatPlayTime(game);
  if (time && time !== translations[state.language].notAvailable) facts.push({ icon: "time", label: time });
  return facts.slice(0, 3);
}

function buildHomeRecentAcquisitionLine(game, copy) {
  const acquired = formatAcquisitionDate(game.acquisitionDate);
  if (!acquired) return "";
  return `<span class="home-recent-item__date">${escapeHtml(copy.homeRecentAddedOn)} ${escapeHtml(acquired)}</span>`;
}

function getRecentAcquisitions() {
  return selectRecentHighlightGames(state.data?.games || []);
}

function selectRecentHighlightGames(games) {
  const ownedWithDate = (games || [])
    .filter((game) => game.own && Number.isFinite(game.acquisitionTimestamp))
    .sort((left, right) => (right.acquisitionTimestamp || 0) - (left.acquisitionTimestamp || 0) || getDisplayName(left).localeCompare(getDisplayName(right)));

  if (!ownedWithDate.length) return [];

  const cutoff = new Date();
  cutoff.setHours(0, 0, 0, 0);
  cutoff.setMonth(cutoff.getMonth() - RECENT_HIGHLIGHT_WINDOW_MONTHS);
  const cutoffTimestamp = cutoff.getTime();
  const fillLimit = new Date();
  fillLimit.setHours(0, 0, 0, 0);
  fillLimit.setMonth(fillLimit.getMonth() - RECENT_HIGHLIGHT_FILL_LIMIT_MONTHS);
  const fillLimitTimestamp = fillLimit.getTime();

  const withinWindow = ownedWithDate.filter((game) => (game.acquisitionTimestamp || 0) >= cutoffTimestamp);
  if (withinWindow.length >= RECENT_HIGHLIGHT_MIN_ITEMS) return withinWindow;

  const eligibleFill = ownedWithDate.filter((game) => (game.acquisitionTimestamp || 0) >= fillLimitTimestamp);
  return eligibleFill.slice(0, Math.min(RECENT_HIGHLIGHT_MIN_ITEMS, eligibleFill.length));
}

function formatBestPlayersTag(values) {
  if (!values.length) return translations[state.language].notAvailable;
  return `${translations[state.language].bestAt} ${joinPlayers(values)}`;
}

function syncScoreBadges() {
  document.querySelectorAll(".game-card__badge").forEach((badge) => {
    const rating = Number(badge.dataset.rating);
    applyScoreBadgeStyle(badge, Number.isFinite(rating) ? rating : null);
  });
}

function getLibraryRatingRange(games) {
  const ratings = games
    .map((game) => game?.averageRating)
    .filter((rating) => typeof rating === "number" && Number.isFinite(rating));

  if (!ratings.length) return null;

  const min = Math.min(...ratings);
  const max = Math.max(...ratings);
  return { min, max };
}

function applyScoreBadgeStyle(node, rating) {
  if (!node) return;
  if (typeof rating !== "number" || !Number.isFinite(rating)) {
    node.style.setProperty("--rating-text", "var(--accent)");
    node.style.setProperty("--rating-bg", "color-mix(in srgb, var(--surface-raised) 78%, var(--accent) 22%)");
    node.style.setProperty("--rating-border", "color-mix(in srgb, var(--line) 74%, var(--accent) 26%)");
    node.style.setProperty("--rating-shadow", "none");
    return;
  }

  const range = state.libraryRatingRange;
  const span = range && Number.isFinite(range.max - range.min) ? range.max - range.min : 0;
  const normalized = span > 0
    ? Math.max(0, Math.min(1, (rating - range.min) / span))
    : 0.5;
  const hue = 18 + normalized * 16;
  const saturation = 52 + normalized * 18;
  const textLightness = document.body.dataset.theme === "dark"
    ? 58 + normalized * 18
    : 36 + normalized * 10;
  const bgLightness = document.body.dataset.theme === "dark"
    ? 18 + normalized * 10
    : 92 - normalized * 8;
  const borderAlpha = 0.24 + normalized * 0.2;
  const glowAlpha = 0.08 + normalized * 0.16;

  node.style.setProperty("--rating-text", `hsl(${hue} ${saturation}% ${textLightness}%)`);
  node.style.setProperty("--rating-bg", `hsla(${hue} ${Math.max(38, saturation - 10)}% ${bgLightness}% / 0.88)`);
  node.style.setProperty("--rating-border", `hsla(${hue} ${Math.max(34, saturation - 14)}% ${textLightness}% / ${borderAlpha.toFixed(2)})`);
  node.style.setProperty("--rating-shadow", `0 10px 22px hsla(${hue} ${saturation}% 20% / ${glowAlpha.toFixed(2)})`);
}

function joinPlayers(values) {
  return values.map((value) => (value >= 6 ? "6+" : value)).join(", ");
}

function getFilterValueLabel(key, value) {
  const definition = getFilterControlDefinitions()[key];
  const option = definition?.options.find(([optionValue]) => optionValue === value);
  return option ? option[1] : value;
}

function getRecommendationIconKey(value) {
  return {
    duo: "duo",
    quick: "quick",
    heavy: "heavy",
    teach: "teach",
    solo: "solo",
    group: "group"
  }[value] || "random";
}

function getMultiFilterSummary(key, values) {
  if (!Array.isArray(values) || !values.length) return "";
  return values.map((value) => getFilterValueLabel(key, value)).join(", ");
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

function labelForPhysicalLanguage(value) {
  const copy = translations[state.language];
  if (value === "unknown") return copy.physicalLanguageUnknown;
  const normalized = String(value || "").trim().toLowerCase();
  const map = state.language === "es"
    ? {
        english: "Inglés",
        spanish: "Español",
        portuguese: "Portugués",
        catalan: "Catalán",
        french: "Francés",
        german: "Alemán",
        italian: "Italiano"
      }
    : {
        english: "English",
        spanish: "Spanish",
        portuguese: "Portuguese",
        catalan: "Catalan",
        french: "French",
        german: "German",
        italian: "Italian"
      };
  return map[normalized] || value;
}

function formatPhysicalLanguages(game) {
  const values = Array.isArray(game?.physicalLanguages) ? game.physicalLanguages : [];
  if (!values.length) return translations[state.language].physicalLanguageUnknown;
  return values.map((value) => labelForPhysicalLanguage(value)).join(", ");
}

function getPhysicalLanguageOptions() {
  const copy = translations[state.language];
  const values = new Set();
  let hasUnknown = false;

  (state.data?.games || []).forEach((game) => {
    if (Array.isArray(game.physicalLanguages) && game.physicalLanguages.length) {
      game.physicalLanguages.forEach((value) => values.add(value));
    } else {
      hasUnknown = true;
    }
  });

  const options = [["", copy.anyOption]];
  [...values]
    .sort((left, right) => labelForPhysicalLanguage(left).localeCompare(labelForPhysicalLanguage(right), state.language))
    .forEach((value) => {
      options.push([value, labelForPhysicalLanguage(value)]);
    });

  if (hasUnknown) options.push(["unknown", copy.physicalLanguageUnknown]);
  return options;
}

function getPhysicalLanguageFilterOptions() {
  const copy = translations[state.language];
  const values = new Set();
  let hasUnknown = false;

  (state.data?.games || []).forEach((game) => {
    if (Array.isArray(game.physicalLanguages) && game.physicalLanguages.length) {
      game.physicalLanguages.forEach((value) => values.add(value));
    } else {
      hasUnknown = true;
    }
  });

  const shortLabel = (value) => {
    if (value === "unknown") return state.language === "es" ? "Sin dato" : "Unknown";
    const normalized = String(value || "").trim().toLowerCase();
    return {
      english: state.language === "es" ? "Inglés" : "English",
      spanish: state.language === "es" ? "Español" : "Spanish",
      portuguese: state.language === "es" ? "Portugués" : "Portuguese",
      catalan: state.language === "es" ? "Catalán" : "Catalan",
      french: state.language === "es" ? "Francés" : "French",
      german: state.language === "es" ? "Alemán" : "German",
      italian: state.language === "es" ? "Italiano" : "Italian"
    }[normalized] || labelForPhysicalLanguage(value);
  };

  const options = [["", copy.anyCompact]];
  [...values]
    .sort((left, right) => labelForPhysicalLanguage(left).localeCompare(labelForPhysicalLanguage(right), state.language))
    .forEach((value) => {
      options.push([value, shortLabel(value)]);
    });

  if (hasUnknown) options.push(["unknown", shortLabel("unknown")]);
  return options;
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
