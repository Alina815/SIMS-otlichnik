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
    educationType: 'Высшее',
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
    educationType: 'Высшее',
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
    educationType: 'Среднее профессиональное',
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
