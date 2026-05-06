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