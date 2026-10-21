function toggleMenu() {
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

document.getElementById('lightbox-close').addEventListener('click', () => box.close());
box.addEventListener('click', e => { if (e.target === box) box.close(); });

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