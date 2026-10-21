function initProgramFilters() {
  document.querySelectorAll<HTMLElement>(".program-page").forEach((page) => {
    if (page.dataset.filtersReady === "true") return;
    page.dataset.filtersReady = "true";

    const buttons = page.querySelectorAll<HTMLButtonElement>(".program-filter");
    const cards = page.querySelectorAll<HTMLElement>(".program-card");
    const emptyMessage = page.querySelector<HTMLElement>("#program-empty");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const selected = button.dataset.filter ?? "all";

        buttons.forEach((item) => {
          const active = item.dataset.filter === selected;

          item.classList.toggle("active", active);
          item.setAttribute("aria-pressed", String(active));
        });

        let visibleCount = 0;

        cards.forEach((card) => {
          const levels = (card.dataset.levels ?? "").split(" ");
          const visible = selected === "all" || levels.includes(selected);

          card.hidden = !visible;

          if (visible) visibleCount++;
        });

        if (emptyMessage) {
          emptyMessage.hidden = visibleCount > 0;
        }
      });
    });
  });
}

initProgramFilters();
document.addEventListener("astro:page-load", initProgramFilters);
