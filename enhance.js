/* Prenton Realty — site enhancements: nav fix stylesheet + Featured Listings section. */
(function () {
  // 1) Load the enhancement stylesheet
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/enhance.css';
  document.head.appendChild(link);

  // 2) Inject Featured Listings into the Home page
  function inject() {
    var home = document.getElementById('pg-home') || document.querySelector('[id^="pg-"]');
    if (!home || document.getElementById('featured-listings')) return;

    var sect = document.createElement('section');
    sect.id = 'featured-listings';
    sect.className = 'feat-sect';
    sect.innerHTML =
      '<div class="feat-wrap">' +
      '<div class="feat-kicker">Featured Listings</div>' +
      '<h2 class="feat-h2">Available Now, Through Prenton</h2>' +
      '<p class="feat-sub">A selection of current exclusives across our markets — from Naperville family homes to office suites and Los Cabos estates.</p>' +
      '<div class="feat-grid">' +

      '<a class="feat-card" href="https://1598loisannln.com" target="_blank" rel="noopener">' +
      '<div class="feat-ph" style="background-image:url(/photos/loisann-twilight.jpg)"><span class="tag">Available Now</span></div>' +
      '<div class="feat-body"><h3>1598 Lois Ann Lane</h3><div class="loc">Brookdale · Naperville, IL</div>' +
      '<div class="price">$649,000</div><span class="cta">View the Home</span></div></a>' +

      '<a class="feat-card" href="https://www.downtownnapervilleoffice.com" target="_blank" rel="noopener">' +
      '<div class="feat-ph feat-office"><span>121 N Washington<br>Street</span><span class="tag">For Lease</span></div>' +
      '<div class="feat-body"><h3>Downtown Office Suites</h3><div class="loc">Downtown Naperville, IL</div>' +
      '<div class="price">$19.50/SF Gross</div><span class="cta">Tour the Suites</span></div></a>' +

      '<a class="feat-card" href="#" data-go="contact">' +
      '<div class="feat-ph" style="background-image:url(/photos/golfview-front.jpg)"><span class="tag">Just Listed</span></div>' +
      '<div class="feat-body"><h3>121 Golfview Drive</h3><div class="loc">Glendale Lakes · Glendale Heights, IL</div>' +
      '<div class="price">$303,000</div><span class="cta">Request a Showing</span></div></a>' +

      '<a class="feat-card" href="https://luxurycabos.com" target="_blank" rel="noopener">' +
      '<div class="feat-ph" style="background-image:url(/photos/cabo-villa.jpg)"><span class="tag">International</span></div>' +
      '<div class="feat-body"><h3>Casa Fundadores 128</h3><div class="loc">Puerto Los Cabos, Mexico</div>' +
      '<div class="price">From $6.5M</div><span class="cta">Explore the Collection</span></div></a>' +

      '</div>' +
      '<div class="feat-past"><b>Recently closed through Prenton:</b> Block 59 hospitality lease (~4,000 SF, Naperville) · ' +
      '~25,000 SF industrial facility · Cirrus lakefront luxury condominiums, Chicago · Weston, FL estate sale · ' +
      'multifamily investment portfolio, Chicagoland — <a href="#" data-go="portfolio">see the full portfolio →</a></div>' +
      '</div>';

    // Place it after the first full section on Home (below the hero), else append.
    var sections = home.querySelectorAll('section');
    if (sections.length > 1) sections[1].insertAdjacentElement('beforebegin', sect);
    else home.appendChild(sect);

    // Wire internal navigation buttons to the site's SPA router when available.
    sect.querySelectorAll('[data-go]').forEach(function (el) {
      el.addEventListener('click', function (ev) {
        var page = el.getAttribute('data-go');
        if (typeof window.go === 'function') {
          ev.preventDefault();
          window.go(page);
          window.scrollTo(0, 0);
        }
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject);
  else inject();
})();
