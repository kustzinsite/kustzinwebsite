/* Kleine, optionele interacties. Zonder JavaScript blijft alle inhoud beschikbaar. */
(() => {
  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-navigation");

  const setMenuOpen = (isOpen) => {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Menu sluiten" : "Menu openen");
    navigation.classList.toggle("is-open", isOpen);
    header?.classList.toggle("menu-open", isOpen);
    document.body.classList.toggle("menu-is-open", isOpen);
  };

  menuButton?.addEventListener("click", () => {
    setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
  });

  navigation?.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenuOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton?.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      menuButton.focus();
    }
  });

  const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 24);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  document.querySelectorAll("[data-current-year]").forEach((year) => {
    year.textContent = String(new Date().getFullYear());
  });

  const lightbox = document.querySelector(".lightbox");
  const lightboxImage = lightbox?.querySelector("img");
  document.querySelectorAll("[data-lightbox]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!lightbox || !lightboxImage) return;
      lightboxImage.src = button.dataset.lightbox;
      lightboxImage.alt = button.dataset.lightboxAlt || "Vergrote vakantiefoto";
      lightbox.showModal();
    });
  });
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox?.addEventListener("close", () => {
    if (lightboxImage) lightboxImage.src = "";
  });

  document.querySelectorAll("[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const feedback = form.querySelector("[data-form-feedback]");
      if (feedback) feedback.textContent = "Dit is een voorbeeldformulier en er is geen bericht verstuurd. Neem contact op via [EMAILADRES].";
    });
  });
})();
