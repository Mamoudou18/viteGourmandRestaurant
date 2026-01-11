/* global noUiSlider */

const itemsPerPage = 2; // Nombre de menus par page
let currentPage = 1;
let slider = null;
let filteredCards = []; // Cartes visibles après application des filtres

// Initialisation principale
function initApp() {
  initSlider();
  setupFilters();
  setupPagination();
  resetFilters(); // Initialise filteredCards et pagination
}

// -----------------------
// Slider
// -----------------------
function initSlider() {
  slider = document.getElementById('price-slider');
  if (!slider) return console.error('#price-slider non trouvé');
  if (typeof noUiSlider === 'undefined') return console.error('noUiSlider non chargé');

  const priceMin = document.getElementById('price-min');
  const priceMax = document.getElementById('price-max');

  noUiSlider.create(slider, {
    start: [0, 100],
    connect: true,
    range: { min: 0, max: 100 }
  });

  slider.noUiSlider.on('update', function (values) {
    const min = Math.round(values[0]);
    const max = Math.round(values[1]);
    if (priceMin) priceMin.textContent = min + ' €';
    if (priceMax) priceMax.textContent = max + ' €';
  });
}

// -----------------------
// Filtres
// -----------------------
function setupFilters() {
  const themeRadios = document.querySelectorAll('#theme1, #theme2, #theme3, #theme4');
  themeRadios.forEach(r => r.name = 'theme');

  const regimeRadios = document.querySelectorAll('#regime1, #regime2, #regime3, #regime4');
  regimeRadios.forEach(r => r.name = 'regime');

  const submitButtons = Array.from(document.querySelectorAll('button[type="submit"]'));
  const applyBtn = submitButtons.find(b => b.textContent.includes('Appliquer'));
  const resetBtn = submitButtons.find(b => b.textContent.includes('Réinitialiser'));

  if (applyBtn) applyBtn.addEventListener('click', e => { e.preventDefault(); applyFilters(); });
  if (resetBtn) resetBtn.addEventListener('click', e => { e.preventDefault(); resetFilters(); });
}

function applyFilters() {
  if (!slider) return;

  const [minPrice, maxPrice] = slider.noUiSlider.get().map(v => Math.round(v));
  const selectedTheme = document.querySelector('input[name="theme"]:checked')?.value || '';
  const selectedRegime = document.querySelector('input[name="regime"]:checked')?.value || '';
  const minPersons = parseInt(document.getElementById('nbPersonnes')?.value) || 0;

  const allCards = Array.from(document.querySelectorAll('.menu-card'));

  // Filtrer les cartes
  filteredCards = allCards.filter(card => {
    const price = parseInt(card.dataset.price) || 0;
    const theme = card.dataset.theme || '';
    const regime = card.dataset.regime || '';
    const persons = parseInt(card.dataset.persons) || 0;

    return price >= minPrice && price <= maxPrice &&
           (!selectedTheme || theme === selectedTheme) &&
           (!selectedRegime || regime === selectedRegime) &&
           persons >= minPersons;
  });

  // Affichage du message ou compteur
  const menuCountEl = document.getElementById('menu-count');
  const noResultsEl = document.getElementById('no-results');

  if (filteredCards.length === 0) {
    if (menuCountEl) menuCountEl.textContent = '';
    if (noResultsEl) noResultsEl.style.display = 'inline';
  } else {
    if (menuCountEl) menuCountEl.textContent = 'Résultat de la recherche: ' + filteredCards.length + ' menu(s) trouvé(s)';
    if (noResultsEl) noResultsEl.style.display = 'none';
  }

  currentPage = 1;
  updatePagination();
}

function resetFilters() {
  document.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
  const nbPersonsInput = document.getElementById('nbPersonnes');
  if (nbPersonsInput) nbPersonsInput.value = '';

  if (slider && slider.noUiSlider) slider.noUiSlider.set([0, 100]);

  filteredCards = Array.from(document.querySelectorAll('.menu-card'));
  filteredCards.forEach(c => c.style.display = 'block');

  const menuCountEl = document.getElementById('menu-count');
  const noResultsEl = document.getElementById('no-results');
  if (menuCountEl) menuCountEl.textContent = '';
  if (noResultsEl) noResultsEl.style.display = 'none';

  currentPage = 1;
  updatePagination();
}

// -----------------------
// Pagination
// -----------------------
function setupPagination() {
  const prev = document.getElementById('prev-page');
  const next = document.getElementById('next-page');

  if (prev) prev.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      updatePagination();
    }
  });

  if (next) next.addEventListener('click', () => {
    const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      updatePagination();
    }
  });
}

function updatePagination() {
  const allCards = Array.from(document.querySelectorAll('.menu-card'));

  if (filteredCards.length === 0) {
    allCards.forEach(c => c.style.display = 'none');
    const pagination = document.getElementById('pagination');
    if (pagination) pagination.style.display = 'none';
    return;
  }

  const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  // Masquer toutes les cartes
  allCards.forEach(c => c.style.display = 'none');

  // Afficher uniquement les cartes de la page actuelle
  filteredCards.slice(start, end).forEach(c => c.style.display = 'block');

  const pagination = document.getElementById('pagination');
  const pageInfo = document.getElementById('page-info');
  const prev = document.getElementById('prev-page');
  const next = document.getElementById('next-page');

  if (pagination) pagination.style.display = filteredCards.length <= itemsPerPage ? 'none' : 'block';
  if (pageInfo) pageInfo.textContent = `Page ${currentPage} sur ${totalPages}`;
  if (prev) prev.disabled = currentPage === 1;
  if (next) next.disabled = currentPage >= totalPages;
}

// -----------------------
// Lancer l’app
// -----------------------
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
