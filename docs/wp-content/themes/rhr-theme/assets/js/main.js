/**
 * Vanilla-JS port of the React behavior in components/header.tsx,
 * components/hero-section.tsx, components/footer.tsx, components/location-section.tsx
 * and components/contact-modal.tsx: smooth-scroll nav links, mobile menu
 * toggle, and the contact modal open/close.
 */
(function () {
  "use strict";

  function scrollToSection(id) {
    var el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  document.addEventListener("click", function (event) {
    var scrollLink = event.target.closest(".js-scroll-link");
    if (scrollLink) {
      var target = scrollLink.getAttribute("data-target");
      if (target && document.getElementById(target)) {
        event.preventDefault();
        scrollToSection(target);
        var nav = document.querySelector(".site-header__nav");
        if (nav) {
          nav.classList.remove("is-open");
        }
      }
      return;
    }

    var menuToggle = event.target.closest(".js-mobile-menu-toggle");
    if (menuToggle) {
      var navMenu = document.querySelector(".site-header__nav");
      if (navMenu) {
        var isOpen = navMenu.classList.toggle("is-open");
        menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      }
      return;
    }

    if (event.target.closest(".js-open-contact-modal")) {
      var modal = document.getElementById("contact-modal");
      if (modal) {
        modal.hidden = false;
      }
      return;
    }

    if (event.target.closest(".js-close-contact-modal")) {
      var openModal = document.getElementById("contact-modal");
      if (openModal) {
        openModal.hidden = true;
      }
      return;
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      var modal = document.getElementById("contact-modal");
      if (modal && !modal.hidden) {
        modal.hidden = true;
      }
    }
  });
})();
