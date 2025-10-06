document.addEventListener('DOMContentLoaded', () => {
  const year = new Date().getFullYear();

  const footerHTML = `
  <footer id="footer" class="footer position-relative dark-background" role="contentinfo">
    <div class="container footer-top">
      <div class="row gy-4">

        <!-- Brand & Contact -->
        <div class="col-lg-4 col-md-6 footer-about">
          <a href="index.html" class="logo d-flex align-items-center" aria-label="Oxy Horse Anasayfa">
            <span class="sitename">Oxy Horse</span>
          </a>
          <div class="footer-contact pt-3">
            <p>Türkiye</p>
            <p class="mt-3"><strong>Telefon:</strong> <span>0850 XXX XX XX</span></p>
            <p><strong>E-posta:</strong> <span>info@oxyhorse.com</span></p>
          </div>

          <div class="social-links d-flex mt-4">
            <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><i class="bi bi-instagram"></i></a>
            <a href="#" aria-label="Facebook"  target="_blank" rel="noopener noreferrer"><i class="bi bi-facebook"></i></a>
            <a href="#" aria-label="LinkedIn"  target="_blank" rel="noopener noreferrer"><i class="bi bi-linkedin"></i></a>
            <a href="#" aria-label="YouTube"   target="_blank" rel="noopener noreferrer"><i class="bi bi-youtube"></i></a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="col-lg-3 col-md-3 footer-links">
          <h4>Hızlı Bağlantılar</h4>
          <ul>
            <li><a href="index.html">Anasayfa</a></li>
            <li><a href="hakkimizda.html">Hakkımızda</a></li>
            <li><a href="oxy-horse-sss.html">Sık Sorulanlar</a></li>
            <li><a href="oxy-horse-temin.html">Nasıl Temin Ederim?</a></li>
            <li><a href="iletisim.html">İletişim</a></li>
          </ul>
        </div>

        <!-- Product Links -->
        <div class="col-lg-3 col-md-3 footer-links">
          <h4>Oxy Horse</h4>
          <ul>
            <li><a href="oxy-horse-nedir.html">Nedir?</a></li>
            <li><a href="oxy-horse-faydalari.html">Faydaları</a></li>
            <li><a href="oxy-horse-nasil-kullanilir.html">Nasıl Kullanılır?</a></li>
            <li><a href="oxy-horse-senaryolar.html">Senaryolar</a></li>
            <li><a href="oxy-horse-bilim.html">Bilimsel Arkaplan</a></li>
            <li><a href="oxy-horse-ddsp.html">DDSP &amp; Operasyon</a></li>
          </ul>
        </div>

        <!-- Support -->
        <div class="col-lg-2 col-md-3 footer-links">
          <h4>Destek</h4>
          <ul>
            <li><a href="oxy-horse-sss.html">SSS</a></li>
            <li><a href="oxy-horse-temin.html">Sipariş &amp; Satın Alma</a></li>
            <li><a href="iletisim.html">Bize Ulaşın</a></li>
          </ul>
        </div>

      </div>
    </div>

    <div class="container copyright text-center mt-4">
      <p>© <span>${year}</span> <strong class="px-1 sitename">Oxy Horse</strong> <span>Tüm Hakları Saklıdır</span></p>
      <div class="credits">
        Tasarım: <a href="https://artegama.com/" target="_blank" rel="noopener noreferrer">Artegama</a>
      </div>
    </div>
  </footer>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Oxy Horse",
    "url": "${location.origin}",
    "logo": "${location.origin}/assets/img/logo.png",
    "contactPoint": [{
      "@type": "ContactPoint",
      "telephone": "+90-850-XXX-XX-XX",
      "contactType": "customer support",
      "areaServed": "TR"
    }],
    "sameAs": []
  }
  </script>`;

  const existing = document.querySelector('#footer');
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend', footerHTML);
});
