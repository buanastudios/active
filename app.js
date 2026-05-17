/**
 * Buana Studios (v3) - App Logic
 * Vibrant, Bouncy UI Rendering with Network Grid
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
    if(lang === 'en') {
      btnEn.classList.add('text-emerald-600');
      btnId.classList.remove('text-emerald-600');
    } else {
      btnId.classList.add('text-emerald-600');
      btnEn.classList.remove('text-emerald-600');
    }
  }
}

function renderDynamicData() {
  if (!window.BUANA_DATA) return;
  renderActivities();
  renderMilestones();
  renderReasons();
  renderUpcoming();
  renderNetwork();
}

function renderActivities() {
  const container = document.getElementById('activities-container');
  if (!container) return;
  container.innerHTML = window.BUANA_DATA.activities.map((a, i) => {
    const instructorLabel = currentLang === 'en' ? a.instructorEn : a.instructorId;
    const isPartner = a.instructorEn === 'Partner Session';
    const badgeColor = isPartner ? 'bg-charcoal-800 text-white border-charcoal-700' : 'bg-sunny-100 text-sunny-600 border-sunny-300';
    
    return `
    <div class="bg-white p-8 rounded-[2rem] shadow-soft-xl border border-sunny-50 hover:-translate-y-2 transition-transform duration-300 bounce-up relative overflow-hidden" style="transition-delay: ${i * 100}ms">
      
      <!-- Immersion & Instructor Badges -->
      <div class="absolute top-6 right-6 flex flex-col gap-2 items-end">
        <div class="bg-sunny-100 text-sunny-600 font-bold text-[10px] uppercase tracking-wider py-1.5 px-3 rounded-full border border-sunny-400/20 shadow-sm flex items-center gap-1">
          🗣️ <span class="en">EN/AR</span><span class="id">EN/AR</span>
        </div>
        <div class="${badgeColor} font-bold text-[10px] uppercase tracking-wider py-1.5 px-3 rounded-full border shadow-sm flex items-center gap-1">
          ${isPartner ? '🤝' : '🎯'} <span>${instructorLabel}</span>
        </div>
      </div>

      <div class="w-16 h-16 rounded-2xl ${a.color} flex items-center justify-center text-3xl mb-6 shadow-sm">
        ${a.icon}
      </div>
      <h3 class="font-display font-bold text-2xl text-charcoal-900 mb-3 leading-tight tracking-tight">${currentLang === 'en' ? a.nameEn : a.nameId}</h3>
      <p class="text-charcoal-800 font-medium">${currentLang === 'en' ? a.descEn : a.descId}</p>
    </div>
  `}).join('');
}

function renderMilestones() {
  const container = document.getElementById('milestones-container');
  if (!container) return;
  container.innerHTML = window.BUANA_DATA.milestones.map((m, i) => `
    <div class="flex items-start gap-4 p-4 rounded-xl hover:bg-sunny-50 transition-colors" style="transition-delay: ${i * 100}ms">
      <div class="w-10 h-10 shrink-0 rounded-full bg-white shadow-sm flex items-center justify-center text-xl text-emerald-500 border border-emerald-100">
        ✓
      </div>
      <div>
        <h4 class="font-display font-bold text-lg text-charcoal-900">${currentLang === 'en' ? m.titleEn : m.titleId}</h4>
        <p class="text-sm text-charcoal-800 font-medium">${currentLang === 'en' ? m.descEn : m.descId}</p>
      </div>
    </div>
  `).join('');
}

function renderReasons() {
  const container = document.getElementById('reasons-container');
  if (!container) return;
  container.innerHTML = window.BUANA_DATA.reasons.map((r, i) => `
    <div class="bg-white p-8 rounded-[2rem] shadow-soft-xl border border-sunny-50 flex flex-col sm:flex-row gap-6 items-start bounce-up" style="transition-delay: ${i * 100}ms">
      <div class="w-16 h-16 shrink-0 rounded-full bg-sunny-100 flex items-center justify-center text-3xl shadow-inner">
        ${r.icon}
      </div>
      <div>
        <h4 class="font-display font-bold text-2xl text-charcoal-900 mb-2 tracking-tight">${currentLang === 'en' ? r.problemEn : r.problemId}</h4>
        <p class="text-charcoal-800 font-medium text-lg leading-relaxed">${currentLang === 'en' ? r.solutionEn : r.solutionId}</p>
      </div>
    </div>
  `).join('');
}

function renderUpcoming() {
  const container = document.getElementById('upcoming-container');
  if (!container) return;
  container.innerHTML = window.BUANA_DATA.upcoming.map((u, i) => `
    <div class="bg-white/10 backdrop-blur-lg p-8 rounded-[2rem] border border-white/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bounce-up" style="transition-delay: ${i * 100}ms">
      <div>
        <div class="flex gap-3 mb-3">
          <span class="py-1 px-3 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">${currentLang === 'en' ? u.ageEn : u.ageId}</span>
          <span class="py-1 px-3 rounded-full ${u.color} text-white text-xs font-bold uppercase tracking-wider">${currentLang === 'en' ? u.scheduleEn : u.scheduleId}</span>
        </div>
        <h3 class="font-display font-bold text-3xl text-white tracking-tight">${currentLang === 'en' ? u.titleEn : u.titleId}</h3>
      </div>
      <a href="#" class="px-8 py-4 rounded-full bg-white text-charcoal-900 font-display font-bold text-lg hover:bg-sunny-400 transition-colors shrink-0 w-full md:w-auto text-center">
        ${currentLang === 'en' ? 'Register Now' : 'Daftar Sekarang'}
      </a>
    </div>
  `).join('');
}

function renderNetwork() {
  const container = document.getElementById('network-container');
  if (!container) return;
  container.innerHTML = window.BUANA_DATA.network.map((n, i) => `
    <div class="p-6 border border-white/20 rounded-[2rem] hover:bg-white/10 transition-colors bounce-up" style="transition-delay: ${i * 100}ms">
      <div class="w-12 h-12 rounded-full ${n.color} flex items-center justify-center text-xl mb-4 shadow-sm">
        ${n.icon}
      </div>
      <h3 class="font-display font-bold text-xl text-white mb-2 tracking-tight">${n.name}</h3>
      <p class="text-sm text-white/70 font-medium leading-relaxed">${currentLang === 'en' ? n.descEn : n.descId}</p>
    </div>
  `).join('');
}

function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  document.querySelectorAll('.bounce-up').forEach(el => { observer.observe(el); });
}

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  renderDynamicData();
  setTimeout(initReveal, 150);
});
