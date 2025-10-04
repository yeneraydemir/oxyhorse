(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {

    /** Body'ye .scrolled */
    function toggleScrolled() {
      const selectBody = document.querySelector("body");
      const selectHeader = document.querySelector("#header");
      if (!selectHeader) return;
      if (
        !selectHeader.classList.contains("scroll-up-sticky") &&
        !selectHeader.classList.contains("sticky-top") &&
        !selectHeader.classList.contains("fixed-top")
      ) return;
      window.scrollY > 100
        ? selectBody.classList.add("scrolled")
        : selectBody.classList.remove("scrolled");
    }
    document.addEventListener("scroll", toggleScrolled, { passive: true });
    window.addEventListener("load", toggleScrolled);

    /** Mobile nav toggle */
    const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");
    function mobileNavToggle() {
      document.body.classList.toggle("mobile-nav-active");
      if (mobileNavToggleBtn) {
        mobileNavToggleBtn.classList.toggle("bi-list");
        mobileNavToggleBtn.classList.toggle("bi-x");
      }
    }
    // Doğrudan buton dinleyicisi (buton DOM'daysa)
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.addEventListener("click", (e) => {
        e.preventDefault();
        mobileNavToggle();
      });
    } else {
      // Fallback: buton sonradan gelse de çalışsın
      document.addEventListener("click", (e) => {
        const btn = e.target.closest(".mobile-nav-toggle");
        if (btn) {
          e.preventDefault();
          mobileNavToggle();
        }
      });
    }

    /** Aynı sayfa/# hash linklerinde mobil menüyü kapat + dummy engelle */
    document.querySelectorAll('#navmenu a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href === "#") {
          e.preventDefault(); // dummy
          return;
        }
        if (document.body.classList.contains("mobile-nav-active")) {
          mobileNavToggle();
        }
      });
    });

    /** Dropdown toggle (ok ikonları) */
    document.querySelectorAll(".navmenu .toggle-dropdown").forEach((toggler) => {
      toggler.addEventListener("click", function (e) {
        e.preventDefault();
        const parentA = this.parentNode;              // <a>
        const li = parentA && parentA.parentNode;     // <li class="dropdown">
        if (li) li.classList.toggle("active");
        const submenu = parentA && parentA.nextElementSibling; // <ul>
        if (submenu) submenu.classList.toggle("dropdown-active");
        e.stopImmediatePropagation();
      });
    });

    /** Preloader */
    const preloader = document.querySelector("#preloader");
    if (preloader) {
      window.addEventListener("load", () => preloader.remove());
    }

    /** Scroll-top (guards ile) */
    const scrollTop = document.querySelector(".scroll-top");
    function toggleScrollTop() {
      if (!scrollTop) return;
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
    if (scrollTop) {
      scrollTop.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      window.addEventListener("load", toggleScrollTop);
      document.addEventListener("scroll", toggleScrollTop);
    }

    /** AOS (varsa) */
    function aosInit() {
      if (window.AOS) {
        AOS.init({ duration: 600, easing: "ease-in-out", once: true, mirror: false });
      }
    }
    window.addEventListener("load", aosInit);

    /** PureCounter (varsa) */
    if (window.PureCounter) new PureCounter();

    /** GLightbox (varsa) */
    if (window.GLightbox) GLightbox({ selector: ".glightbox" });

    /** Isotope (guards ile) */
    document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
      const container = isotopeItem.querySelector(".isotope-container");
      if (!container || !window.imagesLoaded || !window.Isotope) return;

      const layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
      const filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
      const sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

      let initIsotope;
      imagesLoaded(container, function () {
        initIsotope = new Isotope(container, {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        });
      });

      isotopeItem.querySelectorAll(".isotope-filters li").forEach(function (f) {
        f.addEventListener(
          "click",
          function () {
            const active = isotopeItem.querySelector(".isotope-filters .filter-active");
            if (active) active.classList.remove("filter-active");
            this.classList.add("filter-active");
            if (initIsotope) initIsotope.arrange({ filter: this.getAttribute("data-filter") });
            if (typeof aosInit === "function") aosInit();
          },
          false
        );
      });
    });

    /** Swiper (guards ile) */
    function initSwiper() {
      if (!window.Swiper) return;
      document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
        const cfgEl = swiperElement.querySelector(".swiper-config");
        if (!cfgEl) return;
        let config = {};
        try { config = JSON.parse(cfgEl.innerHTML.trim()); } catch (e) {}
        if (swiperElement.classList.contains("swiper-tab")) {
          if (window.initSwiperWithCustomPagination) {
            window.initSwiperWithCustomPagination(swiperElement, config);
          }
        } else {
          new Swiper(swiperElement, config);
        }
      });
    }
    window.addEventListener("load", initSwiper);

    /** Hash'li URL ilk pozisyon */
    window.addEventListener("load", function () {
      if (window.location.hash) {
        const section = document.querySelector(window.location.hash);
        if (section) {
          setTimeout(() => {
            const scrollMarginTop = getComputedStyle(section).scrollMarginTop;
            window.scrollTo({
              top: section.offsetTop - parseInt(scrollMarginTop || "0", 10),
              behavior: "smooth",
            });
          }, 100);
        }
      }
    });

    /** Scrollspy */
    const navmenulinks = document.querySelectorAll(".navmenu a");
    function navmenuScrollspy() {
      const position = window.scrollY + 200;
      navmenulinks.forEach((navmenulink) => {
        if (!navmenulink.hash) return;
        const section = document.querySelector(navmenulink.hash);
        if (!section) return;
        if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
          document.querySelectorAll(".navmenu a.active").forEach((l) => l.classList.remove("active"));
          navmenulink.classList.add("active");
        } else {
          navmenulink.classList.remove("active");
        }
      });
    }
    window.addEventListener("load", navmenuScrollspy);
    document.addEventListener("scroll", navmenuScrollspy, { passive: true });

  }); // DOMContentLoaded
})();
