/* AMD shared navigation and WhatsApp enquiry behaviour */
(() => {
  "use strict";

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".site-header .nav");

  if (menuButton && navigation) {
    const closeMenu = () => {
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
    };

    const toggleMenu = () => {
      const isOpen = navigation.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    };

    menuButton.addEventListener("click", toggleMenu);
    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
    document.addEventListener("click", (event) => {
      if (!event.target.closest(".site-header")) closeMenu();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 850) closeMenu();
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const form = document.getElementById("enquiry-form");
  if (form) {
    const note = document.getElementById("form-note");
    const projectType = document.getElementById("project-type");
    const requestedService = new URLSearchParams(window.location.search).get("service");

    if (requestedService && projectType) {
      const matchingOption = Array.from(projectType.options).find(
        (option) => option.value.toLowerCase() === requestedService.toLowerCase()
      );
      if (matchingOption) projectType.value = matchingOption.value;
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const customerName = String(data.get("name") || "").trim();
      const customerPhone = String(data.get("phone") || "").trim();
      const type = String(data.get("type") || "").trim();
      const message = String(data.get("message") || "").trim();
      const digits = customerPhone.replace(/\D/g, "");

      if (digits.length < 8) {
        if (note) note.textContent = "Please enter a valid contact number before continuing.";
        const phoneInput = document.getElementById("customer-phone");
        if (phoneInput) phoneInput.focus();
        return;
      }

      const whatsappMessage = [
        "Hello AMD Constructions and Paint Services,",
        "I would like to enquire about a project.",
        "",
        `Name: ${customerName}`,
        `Contact number: ${customerPhone}`,
        `Project type: ${type}`,
        `Project details: ${message}`
      ].join("\n");

      const whatsappUrl = `https://wa.me/918109423456?text=${encodeURIComponent(whatsappMessage)}`;
      if (note) note.textContent = "WhatsApp is opening. Please review your message and send it there.";
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
  }
})();
