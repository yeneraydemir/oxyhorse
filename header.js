// /oxyhorse/header.js
document.addEventListener("DOMContentLoaded", () => {
  /* ----------------- 1) HEADER'ı ekle ----------------- */
  const headerHTML = `
  <header id="header" class="header d-flex align-items-center sticky-top">
    <div class="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">

      <a href="/" class="logo d-flex align-items-center me-auto me-xl-0">
        <img class="img-fluid" src="./assets/logo/oxy-horse-logo.png" alt="Oxy Horse Logo">
      </a>

      <nav id="navmenu" class="navmenu">
<ul>
  <li><a href="/">Anasayfa</a></li>
  <li><a href="hakkimizda.html">Hakkımızda</a></li>

  <!-- OxyHorse dropdown -->
  <li class="dropdown">
    <a href="#" class="cursor-default">
      <span>Oxy Horse Rehberi</span>
      <i class="bi bi-chevron-down toggle-dropdown"></i>
    </a>

    <ul>
      <!-- Kategori 1 -->
      <li class="dropdown">
        <a class="cursor-default">
          <span>Ürün Bilgisi</span>
          <i class="bi bi-chevron-right toggle-dropdown"></i>
        </a>
        <ul>
          <li><a href="oxy-horse-nedir.html">Oxy Horse Nedir?</a></li>
          <li><a href="oxy-horse-faydalari.html">Faydaları</a></li>
          <li><a href="oxy-horse-bilim.html">Bilim &amp; Güvenlik</a></li>
        </ul>
      </li>

      <!-- Kategori 2 -->
      <li class="dropdown">
        <a class="cursor-default">
          <span>Kullanım &amp; Protokoller</span>
          <i class="bi bi-chevron-right toggle-dropdown"></i>
        </a>
        <ul>
          <li><a href="oxy-horse-nasil-kullanilir.html">Nasıl Kullanılır?</a></li>
          <li><a href="oxy-horse-senaryolar.html">Senaryolar</a></li>
          <li><a href="oxy-horse-ddsp.html">DDSP Tedavi Desteği</a></li>
        </ul>
      </li>
      <!-- Kategori 3 -->
      <li class="dropdown">
        <a class="cursor-default">
          <span>Klinik Rehber</span>
          <i class="bi bi-chevron-right toggle-dropdown"></i>
        </a>
        <ul>
          <li><a href="oxy-horse-asim-donemi.html">Aşım Dönemi</a></li>
          <li><a href="oxy-horse-solunum.html">Solunum</a></li>
          <li><a href="oxy-horse-rhodococcus.html">Rhodococcus</a></li>
          <li><a href="oxy-horse-gurm.html">Gurm</a></li>          
        </ul>
      </li>

      <!-- Kategori 4 -->
      <li class="dropdown">
        <a class="cursor-default">
          <span>Destek</span>
          <i class="bi bi-chevron-right toggle-dropdown"></i>
        </a>
        <ul>
          <li><a href="oxy-horse-sss.html">SSS</a></li>
          <li><a href="oxy-horse-temin.html">Nasıl Temin Ederim?</a></li>
        </ul>
      </li>
    </ul>
  </li>

  <li><a href="iletisim.html">İletişim</a></li>
</ul>
        <i class="mobile-nav-toggle d-xl-none bi bi-list" aria-label="Menüyü Aç/Kapat"></i>
      </nav>

      <a class="btn-getstarted" href="/oxy-horse-rehber.html">Rehber</a>

    </div>
  </header>`;

  if (!document.querySelector("header#header")) {
    document.body.insertAdjacentHTML("afterbegin", headerHTML);
  }

  /* ----------------- 2) SEÇİCİLER ----------------- */
  const nav = document.querySelector("#navmenu");
  if (!nav) return;

  const navLinks = nav.querySelectorAll("ul li a[href]");
  const sections = document.querySelectorAll("section[id]");

  // Mobil menüyü açıp kapatan tüm olası buton/ikon seçicileri:
  // - mevcut buton (.mobile-nav-toggle)
  // - overlay/kapama butonları (.mobile-nav-close, .navmenu-close, .menu-close, .close)
  // - özel işaretlenmiş öğeler ([data-mobile-toggle])
  const TOGGLE_SELECTOR = [
    ".mobile-nav-toggle",
    ".mobile-nav-close",
    ".navmenu-close",
    ".menu-close",
    ".navmenu .close",
    "[data-mobile-toggle]"
  ].join(",");

  const getAllToggles = () =>
    Array.from(document.querySelectorAll(TOGGLE_SELECTOR));

  /* ----------------- 3) MOBİL MENÜ ----------------- */
  const setMobileIcon = (open) => {
    getAllToggles().forEach((btn) => {
      // İkon <i> etiketi içinde olabilir; yoksa doğrudan btn üzerinde olabilir
      const iconEl = btn.matches("i.bi")
        ? btn
        : btn.querySelector("i.bi, i[class*='bi-']") || btn;

      iconEl.classList.remove("bi-list", "bi-x", "bi-x-lg");
      iconEl.classList.add(open ? "bi-x" : "bi-list");

      // Erişilebilirlik
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Menüyü Kapat" : "Menüyü Aç");
      btn.setAttribute("role", "button");
      if (!btn.hasAttribute("tabindex")) btn.setAttribute("tabindex", "0");
    });
  };

  const toggleMenu = (willOpen) => {
    nav.classList.toggle("navmenu-open", willOpen);
    setMobileIcon(willOpen);
  };

  // Event delegation: sonradan DOM'a eklenen butonları da yakalar
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(TOGGLE_SELECTOR);
    if (!btn) return;
    e.preventDefault();
    const willOpen = !nav.classList.contains("navmenu-open");
    toggleMenu(willOpen);
  });

  document.addEventListener("keydown", (e) => {
    const btn = e.target.closest(TOGGLE_SELECTOR);
    if (!btn) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const willOpen = !nav.classList.contains("navmenu-open");
      toggleMenu(willOpen);
    }
  });

  // Sonradan eklenen ikonları otomatik senkronla
  const mo = new MutationObserver(() => {
    setMobileIcon(nav.classList.contains("navmenu-open"));
  });
  mo.observe(document.body, { childList: true, subtree: true });

  // İlk yüklemede senkronla
  setMobileIcon(nav.classList.contains("navmenu-open"));

  /* ----------------- 4) DROPDOWN ----------------- */
  nav.querySelectorAll(".dropdown > a.cursor-default").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      trigger.parentElement?.classList.toggle("dropdown-active");
    });
  });

  /* ----------------- 5) YARDIMCI: path/slug normalize ----------------- */
  const toSlug = (pathOrHref) => {
    try {
      const u = new URL(pathOrHref, location.href);
      let seg = u.pathname.split("/").filter(Boolean).pop() || "index";
      seg = seg.replace(/\.html?$/i, "");
      return seg || "index";
    } catch {
      const raw = String(pathOrHref).split("#")[0].split("?")[0];
      let seg = raw.split("/").filter(Boolean).pop() || "index";
      seg = seg.replace(/\.html?$/i, "");
      return seg || "index";
    }
  };

  const CURRENT_SLUG = toSlug(location.pathname);
  const isHome = CURRENT_SLUG === "index";

  /* ----------------- 6) ÇOK SAYFA: aktif link ----------------- */
  function setActiveByPath() {
    navLinks.forEach((a) => {
      const href = a.getAttribute("href") || "";
      if (href.startsWith("#")) return;

      const linkSlug = href === "/" ? "index" : toSlug(href);
      const isActive = (linkSlug === "index" && isHome) || linkSlug === CURRENT_SLUG;

      a.classList.toggle("active", !!isActive);
      if (isActive) {
        const parentDrop = a.closest("li.dropdown");
        parentDrop?.classList.add("dropdown-active");
        parentDrop?.closest("li.dropdown")?.classList.add("dropdown-active");
      }
    });
  }

  /* ----------------- 7) #anchor scrollspy ----------------- */
  const HEADER_OFFSET = 100;
  function setActiveByScroll() {
    const anchorLinks = Array.from(navLinks).filter((a) =>
      (a.getAttribute("href") || "").startsWith("#")
    );
    if (anchorLinks.length === 0) return;

    let found = false;
    const y = window.pageYOffset;

    sections.forEach((sec) => {
      const top = sec.offsetTop - HEADER_OFFSET;
      const bottom = top + sec.offsetHeight;
      if (y >= top && y < bottom) {
        const id = sec.id;
        anchorLinks.forEach((a) => {
          a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
        });
        found = true;
      }
    });

    if (!found) {
      anchorLinks.forEach((a) => a.classList.remove("active"));
      const home = nav.querySelector('a[href="#hero"]');
      home?.classList.add("active");
    }
  }

  /* ----------------- 8) Anchor tıklaması ----------------- */
  navLinks.forEach((a) => {
    const href = a.getAttribute("href") || "";
    if (!href.startsWith("#")) return;

    a.addEventListener("click", (e) => {
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();

      if (nav.classList.contains("navmenu-open")) {
        toggleMenu(false); // kapat ve ikonları hamburger yap
      }

      target.scrollIntoView({ behavior: "smooth", block: "start" });
      navLinks.forEach((l) => l.classList.remove("active"));
      a.classList.add("active");
    });
  });

  /* ----------------- 9) İlk yükleme + olaylar ----------------- */
  setActiveByPath();
  setActiveByScroll();

  window.addEventListener("scroll", setActiveByScroll, { passive: true });
  window.addEventListener("popstate", () => {
    setActiveByPath();
    setActiveByScroll();
    if (nav.classList.contains("navmenu-open")) toggleMenu(false);
  });
});
