const API_URL = ''

const MOCK_APPLICANTS = [{
   id: 1,
   lastNameRussian: 'Иванов',
   firstNameRussian: 'Иван',
   lastNameChiniese: '伊万诺夫',
   firstNameChiniese: '伊万',
   specializationCode: '09.03.01',
   specializationName: 'Информатика и вычислительная техника',
   email: 'ivan@example.com',
   password: '******',
   SNILS: '123-456-789 00',
   passportNumber: '4510 123456',
   passportTime: '31.12.2030',
   passportPlace: 'УФМС России по г. Москва',
   educationType: 'Злокачественное',
   doc1Number: 'АБ 1234567',
   doc2Number: '107824 0123456789',
   partner: 'ООО "Рога и копыта"'
   },
   {
   id: 2,
   lastNameRussian: 'Петрова',
   firstNameRussian: 'Мария',
   lastNameChiniese: '彼得罗娃',
   firstNameChiniese: '玛丽亚',
   specializationCode: '38.03.02',
   specializationName: 'Менеджмент',
   email: 'maria@example.com',
   password: '******',
   SNILS: '987-654-321 00',
   passportNumber: '4510 654321',
   passportTime: '31.12.2028',
   passportPlace: 'УФМС России по г. Санкт-Петербург',
   educationType: 'Доброкачественное',
   doc1Number: 'ВГ 7654321',
   doc2Number: '107824 9876543210',
   partner: 'ООО "Ромашка"'
   },
   {
   id: 3,
   lastNameRussian: 'Сидоров',
   firstNameRussian: 'Алексей',
   lastNameChiniese: '西多罗夫',
   firstNameChiniese: '阿列克谢',
   specializationCode: '09.03.01',
   specializationName: 'Информатика и вычислительная техника',
   email: 'alexey@example.com',
   password: '******',
   SNILS: '456-789-123 00',
   passportNumber: '4510 789123',
   passportTime: '31.12.2032',
   passportPlace: 'УФМС России по г. Екатеринбург',
   educationType: 'Отсутствующее',
   doc1Number: 'ДЕ 4567890',
   doc2Number: '107824 4567890123',
   partner: 'ИП Сидоров'
  }]

let USE_MOCK = true

async function getApplicants() {
   if (USE_MOCK) {
       return MOCK_APPLICANTS
   }

   const response = await fetch(`${API_URL}/applicants`)
   return response.json()
}

function exportToExcel() {
   if (USE_MOCK) {
       alert('Экспорт в Excel (mock-test)')
       return
   }
   window.open(`${API_URL}/export/applicants`)
}

async function getApplicantById(id) {
   if (USE_MOCK) {
       return MOCK_APPLICANTS.find(a => a.id == parseInt(id));
   }
   const response = await fetch(`${API_URL}/applicants/${id}`);
   return response.json();
}

async function updateApplicant(id, formData) {
   const response = await fetch(`/api/applicants/${id}`, {
       method: 'PUT',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(formData)
   });
   return response.json();
}

async function createApplicant(formData) {
   const response = await fetch('/api/applicants', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(formData)
   });
   return response.json();
}

async function deleteApplicant(id) {
   if (USE_MOCK) {
        const index = MOCK_APPLICANTS.findIndex(a => a.id === parseInt(id));
       if (index !== -1) {
           MOCK_APPLICANTS.splice(index, 1);
           return { success: true };
       }
       return { success: false, message: 'Абитуриент не найден' };
   }
  
    const response = await fetch(`${API_URL}/applicants/${id}`, {
       method: 'DELETE'
    });
   return response.json();
}

async function uploadPhoto(applicantId, file) {
    if (USE_MOCK) {
        console.log(`[MOCK] Загрузка фото для абитуриента ${applicantId}: ${file.name}`);
        return { success: true, file_path: `/mock/photos/${applicantId}_${file.name}` };
    }
    
    const formData = new FormData();
    formData.append('applicant_id', applicantId);
    formData.append('photo', file);
    
    const response = await fetch(`${API_URL}/upload/photo`, {
        method: 'POST',
        body: formData
    });
    
    return response.json();
}

async function getSpecializations() {
   const response = await fetch('/api/specializations');
   return response.json();
}
