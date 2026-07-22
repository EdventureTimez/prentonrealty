/* Prenton Realty — site enhancements: nav fix stylesheet + Featured Listings section. */
(function () {
  // 1) Load the enhancement stylesheet
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/enhance.css';
  document.head.appendChild(link);

  // 1b) Add the game to the nav so it's discoverable
  function addNavLink() {
    var nav = document.getElementById('navLinks');
    if (!nav || nav.querySelector('a[href="/game/"]')) return;
    var a = document.createElement('a');
    a.href = '/game/';
    a.textContent = 'How Much?!';
    a.title = 'Play our Chicagoland price-guessing game';
    var contact = nav.querySelector('a.nav-cta, a[class*="contact" i]');
    nav.insertBefore(a, contact || null);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addNavLink);
  else addNavLink();

  // 2) Inject Featured Listings into the Home page
  function inject() {
    var home = document.getElementById('page-home') || document.querySelector('.page.active');
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

    // --- White Glove service section ---
    var wg = document.createElement('section');
    wg.className = 'wg-sect';
    wg.innerHTML =
      '<div class="feat-wrap">' +
      '<div class="feat-kicker">The Prenton Standard</div>' +
      '<h2 class="feat-h2">White\u2011Glove, Calibrated to You</h2>' +
      '<p class="feat-sub">No two clients search the same way \u2014 so we don\u2019t serve them the same way. At the start of every engagement we ask one question: how do you want to work? Then we build the service around your answer.</p>' +
      '<div class="wg-grid">' +
      '<div class="wg-card"><div class="wg-icon">\u2315</div><h3>You lead, we advise</h3>' +
      '<p>You enjoy the hunt \u2014 browsing every listing, touring on weekends, forming your own shortlist. We stay at your side as counsel: pricing context, negotiation strategy, and an honest second opinion whenever you ask, with no pressure to move faster than you want to.</p></div>' +
      '<div class="wg-card"><div class="wg-icon">\u2696</div><h3>We search together</h3>' +
      '<p>A true partnership. We refine the brief, surface options you\u2019d never find on the portals, and vet everything before it reaches you \u2014 while you keep full visibility into the market and the final say at every step.</p></div>' +
      '<div class="wg-card"><div class="wg-icon">\u2726</div><h3>We procure, you decide</h3>' +
      '<p>For clients who value their time above all: tell us what the property needs to do for you, and we do the rest \u2014 sourcing, inspecting, and shortlisting to a single considered recommendation, presented with the case for and against. You simply choose.</p></div>' +
      '</div>' +
      '<div class="wg-foot">However you prefer to work, the standard is the same \u2014 discretion, preparation, and advice we\u2019d give our own family. <a href="#" data-go="contact">Tell us how you\u2019d like to begin \u2192</a></div>' +
      '</div>';
    wg.querySelectorAll('[data-go]').forEach(function (el) {
      el.addEventListener('click', function (ev) {
        var page = el.getAttribute('data-go');
        if (typeof window.go === 'function') { ev.preventDefault(); window.go(page); window.scrollTo(0, 0); }
      });
    });

    // Place it after the first full section on Home (below the hero), else append.
    var sections = home.querySelectorAll('section');
    if (sections.length > 1) sections[1].insertAdjacentElement('beforebegin', sect);
    else home.appendChild(sect);
    sect.insertAdjacentElement('afterend', wg);

    // --- Add J.P. Morgan advisor card next to the Morgan Stanley partner card ---
    var msEl = Array.prototype.slice.call(home.querySelectorAll('h3,h4,b,strong,div')).filter(function (n) {
      return n.children.length === 0 && /Morgan Stanley One Point Wealth Management/.test(n.textContent);
    })[0];
    if (msEl) {
      var msCard = msEl.closest('div');
      var hops = 0;
      while (msCard && msCard.parentElement && msCard.parentElement.querySelectorAll(':scope > *').length === 1 && hops < 3) { msCard = msCard.parentElement; hops++; }
      if (msCard && !document.getElementById('jpm-card')) {
        var jpm = msCard.cloneNode(true);
        jpm.id = 'jpm-card';
        jpm.style.marginTop = '14px';
        var walker = document.createTreeWalker(jpm, NodeFilter.SHOW_TEXT);
        var tn;
        while ((tn = walker.nextNode())) {
          if (/Morgan Stanley One Point Wealth Management/.test(tn.textContent)) tn.textContent = 'J.P. Morgan Private Wealth Advisor';
          else if (/Strategic Advisory Partner/.test(tn.textContent)) tn.textContent = 'Chicago, IL \u2014 Strategic Advisory Partner';
        }
        msCard.insertAdjacentElement('afterend', jpm);
      }
    }


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
