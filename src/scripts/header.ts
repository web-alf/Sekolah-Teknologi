
function initMobileMenu() {
  const header = document.querySelector<HTMLElement>(".site-header");

  if (!header || header.dataset.menuInitialized === "true") {
    return;
  }

  const toggle =
    header.querySelector<HTMLButtonElement>(".menu-toggle");

  const nav =
    header.querySelector<HTMLElement>(".main-nav");

  const dropdown =
    header.querySelector<HTMLElement>(".nav-dropdown");

  const dropdownToggle =
    header.querySelector<HTMLButtonElement>(".dropdown-toggle");

  if (!toggle || !nav || !dropdown || !dropdownToggle) {
    return;
  }

  header.dataset.menuInitialized = "true";

  const mobileQuery = window.matchMedia("(max-width: 1000px)");

  /* =========================================
     TUTUP DROPDOWN JENJANG
  ========================================= */

  function closeDropdown() {
    dropdown!.classList.remove("is-open");

    dropdownToggle!.setAttribute(
      "aria-expanded",
      "false"
    );

    dropdownToggle!.setAttribute(
      "aria-label",
      "Tampilkan pilihan jenjang"
    );
  }

  /* =========================================
     TUTUP MENU MOBILE
  ========================================= */

  function closeMobileMenu() {
    nav!.classList.remove("is-open");

    toggle!.setAttribute(
      "aria-expanded",
      "false"
    );

    toggle!.setAttribute(
      "aria-label",
      "Buka menu"
    );

    closeDropdown();
  }

  /* =========================================
     HAMBURGER
  ========================================= */

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");

    toggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    toggle.setAttribute(
      "aria-label",
      isOpen ? "Tutup menu" : "Buka menu"
    );

    if (!isOpen) {
      closeDropdown();
    }
  });

  /* =========================================
     TOMBOL V JENJANG
  ========================================= */

  dropdownToggle.addEventListener("click", () => {
    const isOpen = dropdown.classList.toggle("is-open");

    dropdownToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    dropdownToggle.setAttribute(
      "aria-label",
      isOpen
        ? "Sembunyikan pilihan jenjang"
        : "Tampilkan pilihan jenjang"
    );
  });

  /* =========================================
     KLIK LINK NAVIGASI
  ========================================= */

  nav.querySelectorAll<HTMLAnchorElement>("a").forEach(
    (link) => {
      link.addEventListener("click", () => {
        closeMobileMenu();
      });
    }
  );

  /* =========================================
     KLIK DI LUAR HEADER
  ========================================= */

  document.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Node)) {
      return;
    }

    if (!header.contains(target)) {
      closeMobileMenu();
    }
  });

  /* =========================================
     TOMBOL ESCAPE
  ========================================= */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
      dropdownToggle.blur();
      toggle.blur();
    }
  });

  /* =========================================
     PERUBAHAN UKURAN LAYAR
  ========================================= */

  mobileQuery.addEventListener("change", () => {
    closeMobileMenu();
  });
}

initMobileMenu();

document.addEventListener(
  "astro:page-load",
  initMobileMenu
);
