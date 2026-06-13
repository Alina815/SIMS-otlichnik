const USE_MOCK = false;
const API_URL = '';

const MOCK_APPLICANTS = [
{
    id: 1,
    last_name_ru: 'Иванов',
    first_name_ru: 'Иван',
    last_name_cn: '伊万诺夫',
    first_name_cn: '伊万',
    gender: 'Мужчина',
    education: 'Магистр',
    email: 'ivan@example.com',
    password: 'pass123',
    snils: '123-456-789 00',
    passport_number: '4510 123456',
    passport_expiry: '2030-12-31',
    passport_issued_by: 'УФМС России по г. Москва',
    specialization_code: '09.04.01',
    specialization_name: 'Информатика и вычислительная техника',
    partner: 'ООО "Рога и копыта"',
    doc1_number: 'АБ 1234567',
    doc2_number: '107824 0123456789',
    photo_path: 'photos/3.jpg'
  },
  {
    id: 2,
    last_name_ru: 'Петрова',
    first_name_ru: 'Мария',
    last_name_cn: '彼得罗娃',
    first_name_cn: '玛丽亚',
    gender: 'Женщина',
    education: 'Бакалавр',
    email: 'maria@example.com',
    password: 'pass456',
    snils: '987-654-321 00',
    passport_number: '4510 654321',
    passport_expiry: '2028-06-15',
    passport_issued_by: 'УФМС России по г. Санкт-Петербург',
    specialization_code: '38.04.05',
    specialization_name: 'Бизнес-информатика',
    partner: 'ООО "Ромашка"',
    doc1_number: 'ВГ 7654321',
    doc2_number: '107824 9876543210',
    photo_path: null
  },
  {
    id: 3,
    last_name_ru: 'Сидоров',
    first_name_ru: 'Алексей',
    last_name_cn: '西多罗夫',
    first_name_cn: '阿列克谢',
    gender: 'Мужчина',
    education: 'Бакалавр',
    email: 'alexey@example.com',
    password: 'pass789',
    snils: '456-789-123 00',
    passport_number: '4510 789123',
    passport_expiry: '2032-01-20',
    passport_issued_by: 'УФМС России по г. Екатеринбург',
    specialization_code: '09.04.01',
    specialization_name: 'Информатика и вычислительная техника',
    partner: 'ИП Сидоров',
    doc1_number: 'ДЕ 4567890',
    doc2_number: '107824 4567890123',
    photo_path: null
  }
];

const MOCK_SPECIALIZATIONS = [
    { code: '09.04.01', name: 'Информатика и вычислительная техника' },
    { code: '09.04.02', name: 'Информационные системы и технологии' },
    { code: '09.04.03', name: 'Прикладная информатика' },
    { code: '09.04.04', name: 'Программная инженерия' },
    { code: '01.04.02', name: 'Прикладная математика и информатика' },
    { code: '27.04.03', name: 'Системный анализ и управление' },
    { code: '38.04.05', name: 'Бизнес-информатика' }
];

const MOCK_DOCUMENTS = {
    '1-passport-ru': { number: '4510 123456', issued_date: '2010-05-15', issued_by: 'УФМС Москвы', issue_place: 'г. Москва', birth_province: 'Московская область' },
    '1-snils-ru': { number: '123-456-789 00' },
    '2-passport-ru': { number: '4510 654321', issued_date: '2015-06-20', issued_by: 'УФМС СПб', issue_place: 'г. Санкт-Петербург', birth_province: 'Ленинградская область' }
};

function getMockResponse(url, options = {}) {
    console.log(`[MOCK] ${options.method || 'GET'} ${url}`);
    
    // GET /api/applicants
    if (url === '/api/applicants' && (!options.method || options.method === 'GET')) {
        return Promise.resolve([...MOCK_APPLICANTS]);
    }
    
    // GET /api/applicants/{id}
    const getApplicantMatch = url.match(/^\/api\/applicants\/(\d+)$/);
    if (getApplicantMatch && (!options.method || options.method === 'GET')) {
        const id = parseInt(getApplicantMatch[1]);
        const applicant = MOCK_APPLICANTS.find(a => a.id === id);
        return Promise.resolve(applicant ? { ...applicant } : null);
    }

    // GET /api/specializations
    if (url === '/api/specializations' && (!options.method || options.method === 'GET')) {
        return Promise.resolve([...MOCK_SPECIALIZATIONS]);
    }

    // GET /api/documents/{id}/{type}
    const getDocMatch = url.match(/^\/api\/documents\/(\d+)\/(\w+)$/);
    if (getDocMatch && (!options.method || options.method === 'GET')) {
        const applicantId = getDocMatch[1];
        const docType = getDocMatch[2];
        const key = `${applicantId}-${docType}-ru`;
        const data = MOCK_DOCUMENTS[key] || {};
        return Promise.resolve([{ lang: 'ru', ...data }]);
    }

     // POST /api/applicants (создание)
    if (url === '/api/applicants' && options.method === 'POST') {
        const newId = MOCK_APPLICANTS.length + 1;
        return Promise.resolve({ id: newId, success: true });
    }
    
    // PUT /api/applicants/{id}
    const putApplicantMatch = url.match(/^\/api\/applicants\/(\d+)$/);
    if (putApplicantMatch && options.method === 'PUT') {
        return Promise.resolve({ success: true });
    }
    
    // DELETE /api/applicants/{id}
    const deleteApplicantMatch = url.match(/^\/api\/applicants\/(\d+)$/);
    if (deleteApplicantMatch && options.method === 'DELETE') {
        return Promise.resolve({ success: true });
    }

    // POST /api/upload/photo
    if (url === '/api/upload/photo' && options.method === 'POST') {
        return Promise.resolve({ url: '/uploads/mock_photo.jpg', path: 'photos/mock.jpg' });
    }
    
    // POST /api/upload/document
    if (url === '/api/upload/document' && options.method === 'POST') {
        return Promise.resolve({ url: '/uploads/mock_document.pdf', path: 'documents/mock.pdf' });
    }
    
    // GET /api/export/applicants
    if (url === '/api/export/applicants') {
        alert('[MOCK] Экспорт в Excel (мок-режим)');
        return Promise.reject(new Error('Мок-экспорт'));
    }
    
    console.warn(`[MOCK] Неизвестный запрос: ${options.method || 'GET'} ${url}`);
    return Promise.resolve({});
}

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
  if (USE_MOCK) {
    return getMockResponse(url);
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function apiPost(url, data) {
  if (USE_MOCK) {
    return getMockResponse(url, { method: 'POST', body: data });
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function apiPut(url, data) {
  if (USE_MOCK) {
    return getMockResponse(url, { method: 'PUT', body: data });
  }
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function apiDelete(url) {
  if (USE_MOCK) {
    return getMockResponse(url, { method: 'DELETE' });
  }
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function uploadFile(url, formData) {
  if (USE_MOCK) {
    return getMockResponse(url, { method: 'POST', body: formData });
  }
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