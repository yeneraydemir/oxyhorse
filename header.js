// /oxyhorse/header.js
document.addEventListener("DOMContentLoaded", () => {
  // 1) HEADER'ı HTML string olarak ekle
  const headerHTML = `
  <header id="header" class="header d-flex align-items-center sticky-top">
    <div class="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">

      <a href="/" class="logo d-flex align-items-center me-auto me-xl-0">
        <!-- <img src="assets/img/logo.webp" alt=""> -->
        <h1 class="sitename">OXY HORSE</h1>
      </a>

      <nav id="navmenu" class="navmenu">
<ul>
  <li><a href="/">Anasayfa</a></li>
  <li><a href="hakkimizda.html">Hakkımızda</a></li>

  <!-- OxiHorse dropdown -->
  <li class="dropdown">
    <a href="#" class="cursor-default">
      <span>OxiHorse Rehberi</span>
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
          <li><a href="oxy-horse-nedir.html">OxiHorse Nedir?</a></li>
          <li><a href="oxy-horse-faydalari.html">Faydaları</a></li>
          <li><a href="oxy-horse-bilim.html">Bilim & Güvenlik</a></li>
        </ul>
      </li>

      <!-- Kategori 2 -->
      <li class="dropdown">
        <a class="cursor-default">
          <span>Kullanım & Protokoller</span>
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
          <span>Destek</span>
          <i class="bi bi-chevron-right toggle-dropdown"></i>
        </a>
        <ul>
          <li><a href="oxy-horse-egitim.html">Uygulama Eğitimi</a></li>
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

      <a class="btn-getstarted" href="/iletisim">Temin Et</a>

    </div>
  </header>`;

  // Eğer sayfanda <header id="header"> yoksa en başa ekle
  if (!document.querySelector("header#header")) {
    document.body.insertAdjacentHTML("afterbegin", headerHTML);
  }

  // 2) SEÇİCİLER
  const nav = document.querySelector("#navmenu");
  const navLinks = nav.querySelectorAll("ul li a[href]");
  const sections = document.querySelectorAll("section[id]");

  // 3) MOBİL MENÜ AÇ/KAPAT
  const mobileToggle = nav.querySelector(".mobile-nav-toggle");
  mobileToggle?.addEventListener("click", () => {
    nav.classList.toggle("navmenu-open");
    mobileToggle.classList.toggle("bi-x");
    mobileToggle.classList.toggle("bi-list");
  });

  // 4) DROPDOWN (mobil ve desktop click)
  nav.querySelectorAll(".dropdown > a").forEach(trigger => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault(); // sayfayı kaydırmasın
      const li = trigger.parentElement;
      li.classList.toggle("dropdown-active");
    });
  });

  // 5) SCROLLSPY: bölüme göre active
  const HEADER_OFFSET = 100; // header yüksekliğine göre ayarla
  function setActiveOnScroll() {
    let found = false;
    const scrollY = window.pageYOffset;

    sections.forEach(sec => {
      const top = sec.offsetTop - HEADER_OFFSET;
      const bottom = top + sec.offsetHeight;
      if (scrollY >= top && scrollY < bottom) {
        const id = sec.getAttribute("id");
        navLinks.forEach(a => {
          a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
        });
        found = true;
      }
    });

    // Hiç bölüm bulunamazsa varsayılanı "Home" yap
    if (!found) {
      navLinks.forEach(a => a.classList.remove("active"));
      const home = nav.querySelector('a[href="#hero"]');
      home?.classList.add("active");
    }
  }

  // 6) Anchor tıklamasında smooth scroll + active
  navLinks.forEach(a => {
    const href = a.getAttribute("href") || "";
    if (href.startsWith("#")) {
      a.addEventListener("click", (e) => {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          // Mobilde menü açıksa kapat
          if (nav.classList.contains("navmenu-open")) {
            nav.classList.remove("navmenu-open");
            mobileToggle?.classList.remove("bi-x");
            mobileToggle?.classList.add("bi-list");
          }
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          // Kaydırma animasyonu devam ederken aktifliği hemen ver
          navLinks.forEach(l => l.classList.remove("active"));
          a.classList.add("active");
        }
      });
    }
  });

  // 7) Çok sayfa yapısı kullanırsan (about.html vs.), şu bloğu AÇ:
  /*
  const current = location.pathname.split("/").pop() || "index.html";
  navLinks.forEach(a => {
    const p = a.getAttribute("href");
    if (!p || p.startsWith("#")) return;
    a.classList.toggle("active", p === current || (p === "index.html" && current === ""));
  });
  */

  // 8) Olaylar
  setActiveOnScroll();                    // ilk yüklemede
  window.addEventListener("scroll", setActiveOnScroll, { passive: true });
});
