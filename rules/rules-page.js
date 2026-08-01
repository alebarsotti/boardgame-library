(function renderRulesGameSummary() {
  const gameId = Number(document.body.dataset.gameId);
  const games = window.__BGG_LIBRARY_DATA__?.games || [];
  const game = games.find((candidate) => Number(candidate.id) === gameId);
  if (!game) return;

  const localizedValue = (value) => {
    if (typeof value === "string") return value.trim();
    if (!value || typeof value !== "object") return "";
    return String(value.es || value.en || "").trim();
  };

  const formatRange = (minimum, maximum) => {
    if (!minimum && !maximum) return "";
    if (!maximum || minimum === maximum) return String(minimum || maximum);
    return `${minimum}–${maximum}`;
  };

  const title = document.querySelector("[data-rules-game-title]");
  const cover = document.querySelector("[data-rules-game-cover]");
  const players = document.querySelector("[data-rules-game-players]");
  const time = document.querySelector("[data-rules-game-time]");
  const summary = document.querySelector("[data-rules-game-summary]");

  if (title) title.textContent = game.name || game.originalName || "Munchkin";
  if (cover && game.imageUrl) {
    cover.src = game.imageUrl;
    cover.alt = `Portada de ${game.name || game.originalName || "Munchkin"}`;
  }
  if (players) players.textContent = formatRange(game.minPlayers, game.maxPlayers);
  if (time) time.textContent = `${formatRange(game.minPlayTime, game.maxPlayTime || game.playingTime)} min`;
  if (summary && !summary.hasAttribute("data-rules-summary-override")) {
    summary.textContent = localizedValue(game.summary);
  }

  const revealHashTarget = () => {
    const targetId = decodeURIComponent(window.location.hash.slice(1));
    if (!targetId) return;
    const target = document.getElementById(targetId);
    if (target?.matches("details.rules-section--collapsible")) target.open = true;
  };

  revealHashTarget();
  window.addEventListener("hashchange", revealHashTarget);

  const infoButtons = Array.from(document.querySelectorAll(".rule-info-button"));
  const closeInfoTooltip = (button) => {
    const tooltip = document.getElementById(button.getAttribute("aria-controls"));
    button.setAttribute("aria-expanded", "false");
    if (tooltip) tooltip.hidden = true;
  };

  infoButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const shouldOpen = button.getAttribute("aria-expanded") !== "true";
      infoButtons.forEach(closeInfoTooltip);
      if (!shouldOpen) return;
      const tooltip = document.getElementById(button.getAttribute("aria-controls"));
      button.setAttribute("aria-expanded", "true");
      if (tooltip) tooltip.hidden = false;
    });
  });

  document.addEventListener("click", (event) => {
    infoButtons.forEach((button) => {
      const tooltip = document.getElementById(button.getAttribute("aria-controls"));
      if (!button.contains(event.target) && !tooltip?.contains(event.target)) closeInfoTooltip(button);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    infoButtons.forEach(closeInfoTooltip);
  });

  const manualsMenu = document.querySelector(".rules-manuals-menu");
  document.addEventListener("pointerdown", (event) => {
    if (manualsMenu?.open && !manualsMenu.contains(event.target)) manualsMenu.open = false;
  }, { capture: true });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && manualsMenu?.open) manualsMenu.open = false;
  });

  const quickReference = document.querySelector("[data-quick-reference]");
  const quickReferenceSurface = quickReference?.querySelector(".quick-reference__surface");
  const quickReferenceOpen = document.querySelector("[data-quick-reference-open]");
  const quickReferenceClose = document.querySelector("[data-quick-reference-close]");

  if (quickReference && quickReferenceSurface && quickReferenceOpen && quickReferenceClose) {
    let ownsFullscreen = false;
    let wakeLock = null;

    const requestWakeLock = async () => {
      if (!("wakeLock" in navigator)) return;
      if (document.visibilityState !== "visible" || !quickReference.open || wakeLock) return;

      try {
        const sentinel = await navigator.wakeLock.request("screen");
        if (!quickReference.open) {
          await sentinel.release();
          return;
        }
        wakeLock = sentinel;
        sentinel.addEventListener("release", () => {
          if (wakeLock === sentinel) wakeLock = null;
        });
      } catch (_) {
        wakeLock = null;
      }
    };

    const releaseWakeLock = async () => {
      const sentinel = wakeLock;
      wakeLock = null;
      if (sentinel && !sentinel.released) {
        try {
          await sentinel.release();
        } catch (_) {}
      }
    };

    const exitOwnedFullscreen = async () => {
      if (!ownsFullscreen || !document.fullscreenElement) return;
      ownsFullscreen = false;
      try {
        await document.exitFullscreen();
      } catch (_) {}
    };

    const closeQuickReference = async () => {
      await exitOwnedFullscreen();
      await releaseWakeLock();
      if (quickReference.open) quickReference.close();
    };

    quickReferenceOpen.addEventListener("click", async () => {
      quickReference.showModal();
      document.body.classList.add("quick-reference-is-open");
      quickReferenceClose.focus();
      requestWakeLock();
      if (!document.fullscreenElement && quickReferenceSurface.requestFullscreen) {
        try {
          await quickReferenceSurface.requestFullscreen({ navigationUI: "hide" });
          ownsFullscreen = document.fullscreenElement === quickReferenceSurface;
        } catch (_) {
          ownsFullscreen = false;
        }
      }
    });

    quickReferenceClose.addEventListener("click", closeQuickReference);
    quickReference.addEventListener("close", () => {
      document.body.classList.remove("quick-reference-is-open");
      exitOwnedFullscreen();
      releaseWakeLock();
    });
    quickReference.addEventListener("click", (event) => {
      if (event.target === quickReference) closeQuickReference();
    });
    document.addEventListener("fullscreenchange", () => {
      if (ownsFullscreen && !document.fullscreenElement && quickReference.open) {
        ownsFullscreen = false;
        quickReference.close();
      }
    });
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && quickReference.open && !wakeLock) {
        requestWakeLock();
      }
    });
  }
})();
