/**
 * T.I.B.Y.A.N. UI - Admin Logic
 * Reads admissions from localStorage and renders the Kanban board
 */

document.addEventListener('DOMContentLoaded', () => {
  renderBoard();
});

function getAdmissions() {
  return JSON.parse(localStorage.getItem('buana_admissions') || '[]');
}

function saveAdmissions(data) {
  localStorage.setItem('buana_admissions', JSON.stringify(data));
  renderBoard();
}

function updateStatus(id, newStatus) {
  const data = getAdmissions();
  const index = data.findIndex(app => app.id === id);
  if (index !== -1) {
    data[index].status = newStatus;
    saveAdmissions(data);
  }
}

function clearData() {
  if(confirm("Are you sure you want to clear all test admissions data?")) {
    localStorage.removeItem('buana_admissions');
    renderBoard();
  }
}

function getProgramName(programId) {
  if (!window.BUANA_DATA) return programId;
  const act = window.BUANA_DATA.activities.find(a => a.id === programId);
  return act ? act.nameEn : programId;
}

function renderBoard() {
  const data = getAdmissions();
  
  const cols = {
    new: document.getElementById('col-new'),
    contacted: document.getElementById('col-contacted'),
    enrolled: document.getElementById('col-enrolled')
  };
  
  // Clear columns
  Object.values(cols).forEach(col => { if(col) col.innerHTML = ''; });
  
  let counts = { new: 0, contacted: 0, enrolled: 0 };

  data.forEach(app => {
    const status = app.status || 'new';
    counts[status]++;
    
    if (cols[status]) {
      const date = new Date(app.date).toLocaleDateString();
      const programName = getProgramName(app.program);
      
      let actionButtons = '';
      if (status === 'new') {
        actionButtons = `<button onclick="updateStatus(${app.id}, 'contacted')" class="mt-3 w-full py-2 bg-brand-50 hover:bg-brand-100 text-brand-600 text-xs font-bold rounded transition-colors border border-brand-200">Mark Contacted →</button>`;
      } else if (status === 'contacted') {
        actionButtons = `<button onclick="updateStatus(${app.id}, 'enrolled')" class="mt-3 w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 text-xs font-bold rounded transition-colors border border-emerald-200">Enroll Student ✓</button>`;
      }

      cols[status].innerHTML += `
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="flex justify-between items-start mb-2">
            <h4 class="font-bold text-slate-800 text-sm leading-tight">${app.youthName} <span class="text-gray-400 font-normal">(${app.youthAge})</span></h4>
            <span class="text-[10px] text-gray-400">${date}</span>
          </div>
          <div class="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase tracking-wide mb-3">
            ${programName}
          </div>
          <div class="text-xs text-gray-500 space-y-1">
            <p><strong>Parent:</strong> ${app.parentName}</p>
            <p><strong>Phone:</strong> <a href="https://wa.me/${app.parentPhone.replace(/\D/g,'')}" target="_blank" class="text-brand-500 hover:underline">${app.parentPhone}</a></p>
            <p><strong>Baseline:</strong> <span class="capitalize text-slate-700">${app.confidence}</span></p>
          </div>
          ${actionButtons}
        </div>
      `;
    }
  });

  // Update counters
  document.getElementById('count-new').textContent = counts.new;
  document.getElementById('count-contacted').textContent = counts.contacted;
  document.getElementById('count-enrolled').textContent = counts.enrolled;
}
