function toggleMenu() {
  Event.preventDefault();
  document.getElementById("toplinks").classList.toggle("active");
}


/* ---- Lookbook ---- */
    function initLookbook() {
        const grid = $('#gallery');
        if (!grid) return;
        const items = $$('.look', grid);
        const box = $('#lightbox');
        const img = $('#lightbox-img');
        const caption = $('#lightbox-caption');
        let index = 0;

        const visible = () => items.filter(i => !i.hidden);
        function show(i) {
            const list = visible();
            index = (i + list.length) % list.length;
            const el = list[index];
            img.src = el.dataset.src;
            img.alt = el.dataset.alt;
            caption.textContent = el.dataset.caption;
        }

        grid.addEventListener('click', e => {
            const b = e.target.closest('.look');
            if (!b) return;
            lastFocus = b;
            show(visible().indexOf(b));
            box.showModal();
            syncScrollLock();
        });
        $('#lightbox-prev').addEventListener('click', () => show(index - 1));
        $('#lightbox-next').addEventListener('click', () => show(index + 1));
        box.addEventListener('click', e => { if (e.target === box || e.target.closest('[data-close]')) box.close(); });
        box.addEventListener('close', () => { syncScrollLock(); if (lastFocus) lastFocus.focus(); });
        box.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft') show(index - 1);
            if (e.key === 'ArrowRight') show(index + 1);
        });

        $$('[data-look-filter]').forEach(btn => btn.addEventListener('click', () => {
            const tone = btn.dataset.lookFilter;
            items.forEach(i => { i.hidden = !(tone === 'all' || i.dataset.tone === tone); });
            $$('[data-look-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
            $('#look-count').textContent = `${visible().length} looks`;
        }));
    }

    const box = document.getElementById('lightbox');
const boxImg = document.getElementById('lightbox-img');
const boxCap = document.getElementById('lightbox-caption');

document.querySelectorAll('.look').forEach(btn => {
  btn.addEventListener('click', () => {
    boxImg.src = btn.dataset.src;
    boxImg.alt = btn.dataset.alt || '';
    boxCap.textContent = btn.dataset.caption;
    box.showModal();
  });
});

/* ---- Navigation ---- */
function toggleMenu() {
  document.getElementById("toplinks").classList.toggle("open");
}

/* ---- Search Function ---- */
const input = document.getElementById('q');
const cards = document.querySelectorAll('.product-card');
const params = new URLSearchParams(window.location.search);

function filterProducts(term) {
  term = term.trim().toLowerCase();
  let shown = 0;
  cards.forEach(card => {
    const match = card.textContent.toLowerCase().includes(term);
    card.hidden = !match;
    if (match) shown++;
  });
  const msg = document.getElementById('no-results');
  if (msg) msg.hidden = shown > 0;
}

if (cards.length) {
  if (params.get('q')) {
    input.value = params.get('q');
    filterProducts(params.get('q'));
  }
  input.addEventListener('input', () => filterProducts(input.value));
}

/* ---- Product search (works on shop.html, safely ignored elsewhere) ---- */
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const rawQuery = (params.get('q') || '').trim();

  /* ---- Keep the searched term visible in the search box ---- */
  const searchInput = document.getElementById('q');
  if (searchInput && rawQuery) searchInput.value = rawQuery;

  const cards = document.querySelectorAll('.product-card');
  if (!rawQuery || cards.length === 0) return; // no search, or not the shop page

  const clean = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const words = rawQuery.split(/\s+/)
    .map(w => clean(w).replace(/s$/, '')) // "hoodies" -> "hoodie"
    .filter(Boolean);

  let matches = 0;
  cards.forEach(card => {
    const text = clean(card.querySelector('h2').textContent);
    const isMatch = words.every(w => text.includes(w));
    card.style.display = isMatch ? '' : 'none';
    if (isMatch) matches++;
  });

  const noResults = document.getElementById('no-results');
  if (noResults) {
    noResults.innerHTML = `No products found for "${rawQuery.replace(/</g, '&lt;')}". <a href="shop.html">Show all products</a>`;
    noResults.hidden = matches > 0;
  }
});

if (box) {
  document.querySelectorAll('.look').forEach(btn => {
    btn.addEventListener('click', () => {
      boxImg.src = btn.dataset.src;
      boxImg.alt = btn.dataset.alt || '';
      boxCap.textContent = btn.dataset.caption;
      box.showModal();
    });
  });

  document.getElementById('lightbox-close').addEventListener('click', () => box.close());
  box.addEventListener('click', e => { if (e.target === box) box.close(); });
}

/* ---- Join the Icons sign up form ---- */
  const form = document.getElementById("joinForm");
  const thankYou = document.getElementById("thankYou");

  form.addEventListener("submit", function (event) {
    event.preventDefault();      // stops the page from reloading
    form.hidden = true;          // hides the form
    thankYou.hidden = false;     // shows the message
  });

/* ---- Contact form ---- */
  document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const contactThanks = document.getElementById("contactThanks");

    if (!contactForm || !contactThanks) {
      console.error("Form or message element not found. Check the ids.");
      return;
    }

    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      contactForm.hidden = true;
      contactThanks.hidden = false;
    });
  });