/**
 * Buana Studio v2 Ecosystem - App Logic
 */

let currentLang = localStorage.getItem('buana-lang') || 'en';

function initLanguage() {
  applyLanguage(currentLang);
  const switchBtn = document.getElementById('lang-switch');
  if (switchBtn) {
    switchBtn.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'id' : 'en';
      applyLanguage(currentLang);
      renderDynamicData();
    });
  }
}

function applyLanguage(lang) {
  document.body.setAttribute('data-lang', lang);
  localStorage.setItem('buana-lang', lang);
  const btnEn = document.getElementById('btn-en');
  const btnId = document.getElementById('btn-id');
  if(btnEn && btnId) {
    if(lang === 'en') { btnEn.classList.add('active'); btnId.classList.remove('active'); } 
    else { btnId.classList.add('active'); btnEn.classList.remove('active'); }
  }
}

function renderDynamicData() {
  if (!window.BUANA_DATA) return;
  renderActivities();
  renderPrinciples();
  renderPillars();
  renderSystems();
}

function renderActivities() {
  const container = document.getElementById('activities-container');
  if (!container) return;
  container.innerHTML = window.BUANA_DATA.activities.map(a => `
    <div class="editorial-block reveal">
      <span class="editorial-meta">${currentLang === 'en' ? a.focusEn : a.focusId}</span>
      <h3 style="margin-bottom: 1rem;">${currentLang === 'en' ? a.nameEn : a.nameId}</h3>
      <p style="margin-bottom: 2rem;">${currentLang === 'en' ? a.descEn : a.descId}</p>
    </div>
  `).join('');
}

function renderPrinciples() {
  const container = document.getElementById('principles-container');
  if (!container) return;
  container.innerHTML = window.BUANA_DATA.principles.map(p => `
    <div class="editorial-block reveal" style="border-top-color: var(--accent-camel);">
      <h3 style="margin-bottom: 0.5rem;">${p.title}</h3>
      <span class="editorial-meta" style="color: var(--text-secondary);">${currentLang === 'en' ? p.meaningEn : p.meaningId}</span>
      <p>${currentLang === 'en' ? p.descEn : p.descId}</p>
    </div>
  `).join('');
}

function renderPillars() {
  const container = document.getElementById('pillars-container');
  if (!container) return;
  container.innerHTML = window.BUANA_DATA.pillars.map(p => `
    <div class="editorial-block reveal">
      <span class="editorial-meta">${currentLang === 'en' ? p.statusEn : p.statusId}</span>
      <h3 style="margin-bottom: 1rem;">${currentLang === 'en' ? p.nameEn : p.nameId}</h3>
      <p>${currentLang === 'en' ? p.descEn : p.descId}</p>
    </div>
  `).join('');
}

function renderSystems() {
  const container = document.getElementById('systems-container');
  if (!container) return;
  container.innerHTML = window.BUANA_DATA.systems.map(s => `
    <div class="editorial-block reveal">
      <h3 style="margin-bottom: 1rem;">${currentLang === 'en' ? s.nameEn : s.nameId}</h3>
      <p>${currentLang === 'en' ? s.descEn : s.descId}</p>
    </div>
  `).join('');
}

function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => { observer.observe(el); });
}

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  renderDynamicData();
  setTimeout(initReveal, 100);
});
