// ─── Toast notifications ──────────────────────────────────────────────────────
function showToast(message, type = 'info', duration = 3000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; setTimeout(() => toast.remove(), 300); }, duration);
}

// ─── API helpers ──────────────────────────────────────────────────────────────
async function apiGet(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function apiPost(url, data) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function apiPut(url, data) {
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function apiDelete(url) {
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function uploadFile(url, formData) {
  const res = await fetch(url, { method: 'POST', body: formData });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// ─── Navigate ─────────────────────────────────────────────────────────────────
function navigate(path) {
  window.location.href = path;
}

// ─── Specialization helpers ───────────────────────────────────────────────────
let _specs = null;

async function loadSpecializations() {
  if (_specs) return _specs;
  _specs = await apiGet('/api/specializations');
  return _specs;
}

async function populateSpecSelects(codeSelect, nameSelect) {
  const specs = await loadSpecializations();
  const addOptions = (sel) => {
    sel.innerHTML = '<option value="">— выбрать —</option>';
    specs.forEach(s => {
      const o = document.createElement('option');
      o.value = s.code;
      o.textContent = sel === codeSelect ? s.code : s.name;
      o.dataset.code = s.code;
      o.dataset.name = s.name;
      sel.appendChild(o);
    });
  };
  addOptions(codeSelect);
  // For name select, use name as value too
  nameSelect.innerHTML = '<option value="">— выбрать —</option>';
  specs.forEach(s => {
    const o = document.createElement('option');
    o.value = s.name;
    o.textContent = s.name;
    o.dataset.code = s.code;
    o.dataset.name = s.name;
    nameSelect.appendChild(o);
  });

  // Sync: picking code sets name, picking name sets code
  codeSelect.addEventListener('change', () => {
    const opt = [...codeSelect.options].find(o => o.value === codeSelect.value);
    if (opt) nameSelect.value = opt.dataset.name || '';
  });
  nameSelect.addEventListener('change', () => {
    const opt = [...nameSelect.options].find(o => o.value === nameSelect.value);
    if (opt) codeSelect.value = opt.dataset.code || '';
  });
}
