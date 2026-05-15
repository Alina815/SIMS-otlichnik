import sqlite3
import os
import sys

def get_base_dir():
    if getattr(sys, 'frozen', False):
        return os.path.dirname(sys.executable)
    return os.path.dirname(os.path.abspath(__file__))

BASE_DIR = get_base_dir()
DB_PATH = os.path.join(BASE_DIR, "applicants.db")

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cur = conn.cursor()

    # Справочник специализаций
    cur.execute("""
        CREATE TABLE IF NOT EXISTS specializations (
            code TEXT PRIMARY KEY,
            name TEXT NOT NULL
        )
    """)

    # Таблица абитуриентов
    cur.execute("""
        CREATE TABLE IF NOT EXISTS applicants (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            last_name_ru TEXT,
            first_name_ru TEXT,
            last_name_cn TEXT,
            first_name_cn TEXT,
            email TEXT,
            password TEXT,
            snils TEXT,
            passport_number TEXT,
            passport_expiry TEXT,
            passport_issued_by TEXT,
            education_type TEXT,
            specialization_code TEXT,
            specialization_name TEXT,
            doc1_number TEXT,
            doc2_number TEXT,
            partner TEXT,
            photo_path TEXT,
            FOREIGN KEY (specialization_code) REFERENCES specializations(code)
        )
    """)

    # Таблица документов абитуриента
    cur.execute("""
        CREATE TABLE IF NOT EXISTS documents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            applicant_id INTEGER NOT NULL,
            doc_type TEXT NOT NULL,
            lang TEXT NOT NULL DEFAULT 'ru',
            number TEXT,
            issued_date TEXT,
            issued_by TEXT,
            issue_place TEXT,
            birth_province TEXT,
            institution_name TEXT,
            issue_date TEXT,
            scan_path TEXT,
            FOREIGN KEY (applicant_id) REFERENCES applicants(id) ON DELETE CASCADE
        )
    """)

    # Тестовые данные специализаций
    specializations = [
        ("09.04.01", "Информатика и вычислительная техника"),
        ("09.04.02", "Информационные системы и технологии"),
        ("09.04.03", "Прикладная информатика"),
        ("09.04.04", "Программная инженерия"),
        ("01.04.02", "Прикладная математика и информатика"),
        ("27.04.03", "Системный анализ и управление"),
        ("38.04.05", "Бизнес-информатика"),
    ]
    cur.executemany(
        "INSERT OR IGNORE INTO specializations (code, name) VALUES (?, ?)",
        specializations
    )

    # Тестовые данные абитуриентов
    test_applicants = [
        (1, "Иванов", "Иван", "伊万诺夫", "伊万", "ivan@example.com", "pass123",
         "123-456-789 00", "1234 567890", "2030-01-01", "ОВД г. Москвы",
         "после школы", "09.04.01", "Информатика и вычислительная техника",
         "АТ1234567", None, "ООО Партнёр", None),
        (2, "Петрова", "Мария", "彼得罗娃", "玛利亚", "maria@example.com", "pass456",
         "987-654-321 00", "9876 543210", "2028-06-15", "МФЦ г. СПб",
         "после ВУЗа", "09.04.02", "Информационные системы и технологии",
         None, "ДБ9876543", "ИП Иванов", None),
    ]
    for a in test_applicants:
        cur.execute("""
            INSERT OR IGNORE INTO applicants
            (id, last_name_ru, first_name_ru, last_name_cn, first_name_cn,
             email, password, snils, passport_number, passport_expiry,
             passport_issued_by, education_type, specialization_code,
             specialization_name, doc1_number, doc2_number, partner, photo_path)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        """, a)

    conn.commit()
    conn.close()
