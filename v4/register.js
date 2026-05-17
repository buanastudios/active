/**
 * Buana Active - Admissions Portal Logic
 * Handles multi-step form state and dynamic program rendering
 */

document.addEventListener('DOMContentLoaded', () => {
  renderPrograms();
});

function nextStep(step) {
  // Simple validation for Step 1
  if (step === 2) {
    const name = document.getElementById('parentName').value;
    const phone = document.getElementById('parentPhone').value;
    if (!name || !phone) {
      alert("Please fill in your name and phone number so we can contact you.");
      return;
    }
  }

  // Validation for Step 2
  if (step === 3) {
    const youthName = document.getElementById('youthName').value;
    if (!youthName) {
      alert("Please tell us the name of the youth joining us.");
      return;
    }
  }

  // Hide all steps
  document.querySelectorAll('.step-container').forEach(el => {
    el.classList.remove('active');
  });

  // Show target step
  document.getElementById(`step-${step}`).classList.add('active');

  // Update Progress Bar
  const progressBar = document.getElementById('progress-bar');
  const indicators = document.querySelectorAll('.step-indicator');
  
  if (step === 1) progressBar.style.width = '33.33%';
  if (step === 2) progressBar.style.width = '66.66%';
  if (step === 3) progressBar.style.width = '100%';

  // Update Indicator Colors
  indicators.forEach(ind => {
    const indStep = parseInt(ind.getAttribute('data-step'));
    if (indStep <= step) {
      ind.classList.remove('bg-sunny-100', 'text-sunny-500');
      ind.classList.add('bg-emerald-500', 'text-white');
    } else {
      ind.classList.remove('bg-emerald-500', 'text-white');
      ind.classList.add('bg-sunny-100', 'text-sunny-500');
    }
  });
}

function renderPrograms() {
  const container = document.getElementById('programs-container');
  if (!window.BUANA_DATA || !container) return;

  const currentLang = localStorage.getItem('buana-lang') || 'en';

  container.innerHTML = window.BUANA_DATA.activities.map((act, i) => `
    <label class="block cursor-pointer">
      <input type="radio" name="program" value="${act.id}" class="peer hidden" ${i === 0 ? 'checked' : ''}>
      <div class="px-6 py-4 rounded-2xl border-2 border-sunny-100 bg-white shadow-sm peer-checked:border-emerald-500 peer-checked:bg-emerald-50 transition-all flex items-center gap-4">
        <div class="w-12 h-12 rounded-full ${act.color} flex items-center justify-center text-xl shrink-0">
          ${act.icon}
        </div>
        <div>
          <h4 class="font-display font-bold text-lg text-charcoal-900 leading-tight">
            ${currentLang === 'en' ? act.nameEn : act.nameId}
          </h4>
          <span class="text-xs font-bold uppercase tracking-wider text-charcoal-500">
            ${currentLang === 'en' ? act.instructorEn : act.instructorId}
          </span>
        </div>
      </div>
    </label>
  `).join('');
}

function submitRegistration() {
  // Capture Form Data
  const parentName = document.getElementById('parentName').value;
  const parentPhone = document.getElementById('parentPhone').value;
  const parentEmail = document.getElementById('parentEmail').value;
  const youthName = document.getElementById('youthName').value;
  const youthAge = document.getElementById('youthAge').value;
  const confidence = document.querySelector('input[name="confidence"]:checked').value;
  const program = document.querySelector('input[name="program"]:checked').value;
  
  // Construct Application Object
  const application = {
    id: Date.now(),
    date: new Date().toISOString(),
    parentName, parentPhone, parentEmail,
    youthName, youthAge, confidence, program,
    status: 'new' // Kanban starting column
  };

  // Save to LocalStorage Database
  const existing = JSON.parse(localStorage.getItem('buana_admissions') || '[]');
  existing.push(application);
  localStorage.setItem('buana_admissions', JSON.stringify(existing));

  // Hide all standard steps and the progress indicator
  document.querySelectorAll('.step-container').forEach(el => el.classList.remove('active'));
  document.querySelector('.flex.items-center.justify-between.mb-12').style.display = 'none'; // hide progress bar
  
  // Show success state
  document.getElementById('step-success').classList.add('active');
}
