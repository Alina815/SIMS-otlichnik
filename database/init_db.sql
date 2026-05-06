-- 1. Удаляем таблицы, если они уже были (чтобы не было ошибок при повторном запуске)
DROP TABLE IF EXISTS document_scans CASCADE;
DROP TABLE IF EXISTS applicants CASCADE;
DROP TABLE IF EXISTS specializations CASCADE;

-- 2. Справочник специализаций (нужен для выпадающих списков в Общей таблице)
CREATE TABLE specializations (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL, -- Код специализации
    name VARCHAR(255) NOT NULL        -- Название специализации
);

-- 3. Основная таблица абитуриентов (Общая таблица)
CREATE TABLE applicants (
    id SERIAL PRIMARY KEY,
    -- ФИО на двух языках
    last_name_ru VARCHAR(100) NOT NULL,
    first_name_ru VARCHAR(100) NOT NULL,
    last_name_cn VARCHAR(100),
    first_name_cn VARCHAR(100),
    
    -- Технические данные для входа и связи
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    snils VARCHAR(20),
    
    -- Связь со специальностью (Код и Название подтянутся через ID)
    spec_id INTEGER REFERENCES specializations(id),
    
    -- Данные паспорта (как в ТЗ)
    passport_number VARCHAR(50),
    passport_expiry DATE,             -- Срок действия
    passport_issued_date DATE,        -- Дата выдачи
    passport_issued_place TEXT,       -- Место выдачи
    passport_issuer TEXT,             -- Кем выдан
    
    -- Место рождения
    birth_province_ru VARCHAR(150),
    birth_province_cn VARCHAR(150),
    
    -- Образование (Тип, номера документов и учреждение)
    education_type VARCHAR(50),       -- "после школы" или "после ВУЗа"
    doc1_number VARCHAR(100),         -- Аттестат / Диплом
    doc2_number VARCHAR(100),         -- Свидетельство / Диплом бакалавра
    edu_institution_name TEXT,        -- Название заведения
    edu_graduation_date DATE,         -- Дата окончания
    
    -- Дополнительно
    partner VARCHAR(255)              -- Партнёр
);

-- 4. Таблица для сканов (Загрузка документов)
CREATE TABLE document_scans (
    id SERIAL PRIMARY KEY,
    applicant_id INTEGER REFERENCES applicants(id) ON DELETE CASCADE,
    scan_type VARCHAR(100),           -- "Паспорт", "Фото", "Аттестат" и т.д.
    file_path TEXT NOT NULL           -- Путь к файлу на сервере
);

-- 5. Заполняем справочник специальностей для тестов
INSERT INTO specializations (code, name) VALUES 
('09.03.01', 'Информатика и вычислительная техника'),
('38.03.01', 'Экономика');


-- 1. Очистка всех данных и сброс счетчиков ID до единицы
TRUNCATE TABLE document_scans, applicants RESTART IDENTITY CASCADE;

-- 2. Добавление 4-х полностью заполненных абитуриентов (ID будут 1, 2, 3, 4)
INSERT INTO applicants (
    last_name_ru, first_name_ru, last_name_cn, first_name_cn,
    spec_id, email, password, snils, passport_number, 
    passport_expiry, passport_issued_date, passport_issued_place, passport_issuer,
    education_type, doc1_number, doc2_number, partner,
    birth_province_ru, birth_province_cn, 
    edu_institution_name, edu_graduation_date
) VALUES 
-- Запись 1: После школы
(
    'Петров', 'Алексей', '阿列克谢', '彼得罗夫',
    1, 'petrov@mail.ru', 'Pass123', '111-222-333 01', '4511 111222',
    '2031-10-10', '2021-10-10', 'г. Омск', 'УФМС Омской обл.',
    'после школы', '77 АБ 001', 'ОЦ-100', 'Лицей №1',
    'Омская область', '鄂木斯克州', 'Гимназия Омска', '2024-06-20'
),
-- Запись 2: После ВУЗа
(
    'Сергеева', 'Анна', '安娜', '谢尔盖耶娃',
    2, 'sergeeva@mail.ru', 'Admin777', '222-333-444 02', '4615 222333',
    '2032-05-15', '2022-05-15', 'г. Москва', 'МВД г. Москвы',
    'после ВУЗа', 'ДИП-200', 'БАКАЛАВР-300', 'ООО Вектор',
    'Московская область', '莫斯科州', 'МГУ', '2022-07-01'
),
-- Запись 3: После школы (Китайский партнер)
(
    'Смирнов', 'Дмитрий', '德米特里', '斯米尔诺夫',
    2, 'smirnov@edu.cn', 'Dima2026', '333-444-555 03', '4012 333444',
    '2033-01-20', '2023-01-20', 'г. Владивосток', 'УМВД Приморья',
    'после школы', '7701-ВВ', 'ВЕД-999', 'China Ed',
    'Приморский край', '滨海边疆区', 'Школа №5', '2023-06-15'
),
-- Запись 4: После ВУЗа (Магистр)
(
    'Козлова', 'Елена', '叶莲娜', '科兹洛娃',
    1, 'kozlova@yandex.ru', 'ElenPass', '444-555-666 04', '4618 444555',
    '2035-08-14', '2025-08-14', 'г. Новосибирск', 'ПВС Новосибирска',
    'после ВУЗа', 'ДИП-МАГ', 'ПРИЛ-МАГ', 'Сибирь-Тур',
    'Новосибирская обл.', '新西伯利亚州', 'НГУ', '2025-07-10'
);

-- 3. Добавление сканов (Теперь ключи 1, 2, 3, 4 существуют точно!)
INSERT INTO document_scans (applicant_id, scan_type, file_path) VALUES 
(1, 'Личное фото', 'uploads/id1/photo.jpg'),
(1, 'Паспорт', 'uploads/id1/pass.pdf'),
(2, 'Диплом', 'uploads/id2/diploma.pdf'),
(3, 'Аттестат', 'uploads/id3/school.png'),
(4, 'СНИЛС', 'uploads/id4/snils.jpg');


SELECT 
    last_name_ru AS "Фамилия RU", 
    first_name_ru AS "Имя RU", 
    last_name_cn AS "Фамилия CN", 
    first_name_cn AS "Имя CN",
    (SELECT code FROM specializations WHERE id = spec_id) AS "Код",
    (SELECT name FROM specializations WHERE id = spec_id) AS "Название",
    email AS "Почта",
    password AS "Пароль",
    snils AS "СНИЛС",
    passport_number AS "№ Паспорта",
    passport_expiry AS "Срок действия пасп.",
    passport_issuer AS "Кем выдан пасп.",
    education_type AS "Тип образования",
    doc1_number AS "Номер док. 1",
    doc2_number AS "Номер док. 2",
    partner AS "Партнёр"
FROM applicants;


