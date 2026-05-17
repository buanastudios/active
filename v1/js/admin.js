const REPO = 'buanastudios/buanastudios.github.io';
const PATH = 'data.json';
const BRANCH = 'main'; // Adjust if testing on 'developing'

let ghToken = '';
let fileSha = '';
let siteData = null;

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const dashboard = document.getElementById('dashboard');
const saveBar = document.getElementById('save-bar');
const tokenInput = document.getElementById('gh-token');
const btnLogin = document.getElementById('btn-login');
const btnLogout = document.getElementById('btn-logout');
const btnSave = document.getElementById('btn-save');
const btnPreview = document.getElementById('btn-preview');
const loginError = document.getElementById('login-error');
const saveStatus = document.getElementById('save-status');

// Init
document.addEventListener('DOMContentLoaded', () => {
  const savedToken = localStorage.getItem('bs-admin-token');
  if (savedToken) {
    ghToken = savedToken;
    tokenInput.value = savedToken;
    fetchData();
  }
});

// Login
btnLogin.addEventListener('click', () => {
  ghToken = tokenInput.value.trim();
  if (!ghToken) return;
  btnLogin.innerText = 'Connecting...';
  fetchData();
});

// Logout
btnLogout.addEventListener('click', () => {
  localStorage.removeItem('bs-admin-token');
  location.reload();
});

// Fetch Data
async function fetchData() {
  loginError.style.display = 'none';
  
  // LOCAL DEV MODE (Bypass PAT)
  if (!ghToken || ghToken.toLowerCase() === 'local') {
    try {
      const res = await fetch('data.json');
      if (!res.ok) throw new Error('Local data.json not found');
      
      siteData = await res.json();
      
      // Success Local Mode
      if (!siteData.journal) siteData.journal = [];
      loginScreen.style.display = 'none';
      dashboard.style.display = 'block';
      saveBar.style.display = 'flex';
      
      renderDashboard();
      return;
    } catch (err) {
      console.error(err);
      loginError.innerText = 'Failed to load local data.json';
      loginError.style.display = 'block';
      btnLogin.innerText = 'Connect';
      return;
    }
  }

  // GITHUB API MODE
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${PATH}?ref=${BRANCH}`, {
      headers: {
        'Authorization': `token ${ghToken}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!res.ok) throw new Error('Auth failed or file not found');

    const data = await res.json();
    fileSha = data.sha;
    
    // Decode Base64 (handle utf-8 properly)
    const jsonStr = decodeURIComponent(escape(atob(data.content)));
    siteData = JSON.parse(jsonStr);
    if (!siteData.journal) siteData.journal = [];

    // Success
    localStorage.setItem('bs-admin-token', ghToken);
    loginScreen.style.display = 'none';
    dashboard.style.display = 'block';
    saveBar.style.display = 'flex';
    
    renderDashboard();

  } catch (err) {
    console.error(err);
    loginError.innerText = 'Invalid token OR data.json not found on GitHub repository yet.';
    loginError.style.display = 'block';
    btnLogin.innerText = 'Connect';
    localStorage.removeItem('bs-admin-token');
  }
}

// Render Dashboard
function renderDashboard() {
  renderGlobal();
  renderProductsList();
  renderJournalList();
}

// Render Global Settings
function renderGlobal() {
  const container = document.getElementById('global-editor');
  container.innerHTML = '';
  
  if(!siteData.global) siteData.global = {};
  
  Object.keys(siteData.global).forEach(key => {
    const div = document.createElement('div');
    div.className = 'form-group';
    div.innerHTML = `
      <label>${key}</label>
      <input type="text" data-type="global" data-key="${key}" value="${siteData.global[key]}">
    `;
    container.appendChild(div);
  });
  
  // Attach listeners
  container.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', (e) => {
      const k = e.target.getAttribute('data-key');
      siteData.global[k] = e.target.value;
      saveStatus.innerText = 'Unsaved changes';
      saveStatus.style.color = '#e05555';
    });
  });
}

// Render Products List
function renderProductsList() {
  const container = document.getElementById('products-list');
  container.innerHTML = '';
  
  siteData.products.forEach((p, index) => {
    const div = document.createElement('div');
    div.className = 'product-row';
    div.innerHTML = `
      <div>
        <span style="color:var(--accent); margin-right:0.5rem; font-size:0.8rem;">${p.tagLabel}</span>
        <strong>${p.nameEn}</strong>
      </div>
      <button class="btn btn-ghost" style="padding:0.3rem 0.8rem; font-size:0.6rem;">Edit</button>
    `;
    div.addEventListener('click', () => editProduct(index));
    container.appendChild(div);
  });
}

// Edit Product
let currentEditingProduct = null;
const productEditor = document.getElementById('product-editor');
const productFormFields = document.getElementById('product-form-fields');
const btnCloseProduct = document.getElementById('btn-close-product');

btnCloseProduct.addEventListener('click', () => {
  productEditor.style.display = 'none';
  currentEditingProduct = null;
});

function editProduct(index) {
  currentEditingProduct = index;
  const p = siteData.products[index];
  document.getElementById('editing-product-title').innerText = `Editing: ${p.nameEn}`;
  
  // Create fields
  const fields = ['nameEn', 'nameId', 'descEn', 'descId', 'audienceEn', 'audienceId', 'featuresEn', 'featuresId', 'previews'];
  
  let html = '';
  fields.forEach(f => {
    const val = p[f] || '';
    if (f === 'previews') {
      // Handle array of strings (urls)
      const urls = Array.isArray(val) ? val.join('\\n') : '';
      html += `
        <div class="form-group">
          <label>${f} (One URL per line)</label>
          <textarea data-field="${f}">${urls}</textarea>
        </div>
      `;
    } else if (f.startsWith('desc') || f.startsWith('features') || f.startsWith('audience')) {
      html += `
        <div class="form-group">
          <label>${f}</label>
          <textarea data-field="${f}">${val}</textarea>
        </div>
      `;
    } else {
      html += `
        <div class="form-group">
          <label>${f}</label>
          <input type="text" data-field="${f}" value="${val}">
        </div>
      `;
    }
  });
  
  productFormFields.innerHTML = html;
  productEditor.style.display = 'block';
  productEditor.scrollIntoView({ behavior: 'smooth' });
  
  // Listeners
  productFormFields.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', (e) => {
      const field = e.target.getAttribute('data-field');
      if (field === 'previews') {
        siteData.products[currentEditingProduct][field] = e.target.value.split('\n').map(s=>s.trim()).filter(s=>s);
      } else {
        siteData.products[currentEditingProduct][field] = e.target.value;
      }
      saveStatus.innerText = 'Unsaved changes';
      saveStatus.style.color = '#e05555';
    });
  });
}

// Render Journal List
function renderJournalList() {
  const container = document.getElementById('journal-list');
  container.innerHTML = '';
  
  if (!siteData.journal) siteData.journal = [];
  
  siteData.journal.forEach((j, index) => {
    const div = document.createElement('div');
    div.className = 'product-row';
    div.innerHTML = `
      <div>
        <span style="color:var(--text-muted); margin-right:0.5rem; font-size:0.8rem;">${j.date || ''}</span>
        <strong>${j.titleEn || 'Untitled'}</strong>
      </div>
      <button class="btn btn-ghost" style="padding:0.3rem 0.8rem; font-size:0.6rem;">Edit</button>
    `;
    div.addEventListener('click', () => editJournal(index));
    container.appendChild(div);
  });
}

// Edit Journal
let currentEditingJournal = null;
const journalEditor = document.getElementById('journal-editor');
const journalFormFields = document.getElementById('journal-form-fields');
const btnCloseJournal = document.getElementById('btn-close-journal');
const btnAddJournal = document.getElementById('btn-add-journal');
const btnDeleteJournal = document.getElementById('btn-delete-journal');

btnCloseJournal.addEventListener('click', () => {
  journalEditor.style.display = 'none';
  currentEditingJournal = null;
});

btnAddJournal.addEventListener('click', () => {
  siteData.journal.unshift({
    id: 'new-note-' + Date.now(),
    catEn: 'General', catId: 'Umum',
    date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    titleEn: 'New Note', titleId: 'Catatan Baru',
    descEn: '', descId: '',
    link: '#'
  });
  renderJournalList();
  editJournal(0);
  saveStatus.innerText = 'Unsaved changes';
  saveStatus.style.color = '#e05555';
});

btnDeleteJournal.addEventListener('click', () => {
  if (currentEditingJournal !== null && confirm('Are you sure you want to delete this note?')) {
    siteData.journal.splice(currentEditingJournal, 1);
    journalEditor.style.display = 'none';
    currentEditingJournal = null;
    renderJournalList();
    saveStatus.innerText = 'Unsaved changes';
    saveStatus.style.color = '#e05555';
  }
});

function editJournal(index) {
  currentEditingJournal = index;
  const j = siteData.journal[index];
  document.getElementById('editing-journal-title').innerText = `Editing: ${j.titleEn || 'Untitled'}`;
  
  const fields = ['id', 'catEn', 'catId', 'date', 'titleEn', 'titleId', 'descEn', 'descId', 'link'];
  
  let html = '';
  fields.forEach(f => {
    const val = j[f] || '';
    if (f.startsWith('desc')) {
      html += `
        <div class="form-group">
          <label>${f}</label>
          <textarea data-field="${f}">${val}</textarea>
        </div>
      `;
    } else {
      html += `
        <div class="form-group">
          <label>${f}</label>
          <input type="text" data-field="${f}" value="${val}">
        </div>
      `;
    }
  });
  
  journalFormFields.innerHTML = html;
  journalEditor.style.display = 'block';
  journalEditor.scrollIntoView({ behavior: 'smooth' });
  
  journalFormFields.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', (e) => {
      const field = e.target.getAttribute('data-field');
      siteData.journal[currentEditingJournal][field] = e.target.value;
      saveStatus.innerText = 'Unsaved changes';
      saveStatus.style.color = '#e05555';
    });
  });
}

// Preview Locally (Save to localStorage)
btnPreview.addEventListener('click', () => {
  const updatedJsonStr = JSON.stringify(siteData);
  localStorage.setItem('bs-local-data', updatedJsonStr);
  
  saveStatus.innerText = '✓ Saved to LocalStorage (Preview Mode)';
  saveStatus.style.color = '#4ade80';
  renderProductsList();
  renderJournalList();
});

// Save back to GitHub or Download Locally
btnSave.addEventListener('click', async () => {
  btnSave.innerText = 'Saving...';
  btnSave.disabled = true;
  
  try {
    const updatedJsonStr = JSON.stringify(siteData, null, 2);
    
    // LOCAL DEV MODE SAVE (Download File)
    if (!ghToken || ghToken.toLowerCase() === 'local') {
      const blob = new Blob([updatedJsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      saveStatus.innerText = '✓ Downloaded locally';
      saveStatus.style.color = '#4ade80';
      renderProductsList();
      renderJournalList();
      return;
    }

    // GITHUB API SAVE
    // Encode to base64 safely with utf-8
    const base64Content = btoa(unescape(encodeURIComponent(updatedJsonStr)));
    
    const body = {
      message: 'Admin CMS: Content update',
      content: base64Content,
      sha: fileSha,
      branch: BRANCH
    };

    const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${PATH}`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${ghToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) throw new Error('Commit failed');

    const data = await res.json();
    fileSha = data.content.sha; // Update SHA for subsequent saves
    
    saveStatus.innerText = '✓ Saved and committed';
    saveStatus.style.color = '#4ade80';
    renderProductsList(); // Refresh list names if they changed
    renderJournalList();
    
  } catch (err) {
    console.error(err);
    alert('Failed to save. Check console.');
  } finally {
    btnSave.innerText = ghToken ? 'Commit to GitHub' : 'Download data.json';
    btnSave.disabled = false;
  }
});
