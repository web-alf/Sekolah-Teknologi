function initJenjangTabs() {
  const tabs = document.querySelectorAll<HTMLButtonElement>(".jenjang-tab");
  const panels = document.querySelectorAll<HTMLElement>(".jenjang-panel");

  function getCurrentLevel() {
    const pathname = window.location.pathname.replace(/\/+$/, "").toLowerCase();
    const level = pathname.split("/").pop();

    if (level === "smp" || level === "sma") {
      return level;
    }

    return "sd";
  }

  function activateTab(level: string, updateUrl = false) {
    const selectedLevel =
      level === "sd" || level === "smp" || level === "sma" ? level : "sd";

    tabs.forEach((tab) => {
      const active = tab.dataset.target === selectedLevel;

      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    panels.forEach((panel) => {
      const active = panel.dataset.panel === selectedLevel;

      panel.classList.toggle("active", active);
      panel.hidden = !active;
    });

    if (updateUrl) {
      window.history.pushState(
        { level: selectedLevel },
        "",
        `/jenjang/${selectedLevel}`
      );
    }
  }

  activateTab(getCurrentLevel());

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      activateTab(tab.dataset.target || "sd", true);
    });

    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;

      if (event.key === "ArrowRight") {
        nextIndex = (index + 1) % tabs.length;
      } else if (event.key === "ArrowLeft") {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = tabs.length - 1;
      } else {
        return;
      }

      event.preventDefault();

      const nextTab = tabs.item(nextIndex);
      activateTab(nextTab.dataset.target || "sd", true);
      nextTab.focus();
    });
  });

  window.addEventListener("popstate", () => {
    activateTab(getCurrentLevel());
  });
}

initJenjangTabs();
