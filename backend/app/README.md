# Система учёта абитуриентов

Локальное настольное приложение на Python (FastAPI + PyWebview + SQLite3).

## Структура проекта

```
applicants_app/
├── main.py            # Точка входа: запускает FastAPI + PyWebview окно
├── app.py             # FastAPI приложение со всеми эндпоинтами
├── database.py        # Инициализация SQLite3 и вспомогательные функции
├── requirements.txt   # Зависимости Python
├── build.py           # Скрипт сборки exe через PyInstaller
├── templates/
│   ├── index.html     # Общая таблица абитуриентов
│   ├── applicant.html # Страница абитуриента
│   ├── edit.html      # Редактирование персональных данных
│   └── documents.html # Загрузка сканов документов
├── static/
│   ├── css/style.css  # Стили
│   └── js/utils.js    # Вспомогательные JS функции
└── uploads/           # Создаётся автоматически
    ├── photos/
    └── documents/
```

## Запуск для разработки

1. Установить зависимости:
```bash
pip install -r requirements.txt
```

2. Запустить приложение:
```bash
python main.py
```

Приложение откроется в отдельном окне.

## Сборка .exe (Windows)

1. Установить PyInstaller:
```bash
pip install pyinstaller
```

2. Собрать:
```bash
python build.py
```

Готовый файл будет в `dist/applicants_app.exe`.

> **Важно:** База данных `applicants.db` и папка `uploads/` создаются автоматически рядом с исполняемым файлом при первом запуске.

## API эндпоинты

| Метод | URL | Описание |
|-------|-----|----------|
| GET | `/api/applicants` | Список всех абитуриентов |
| POST | `/api/applicants` | Создать нового абитуриента |
| GET | `/api/applicants/{id}` | Данные одного абитуриента |
| PUT | `/api/applicants/{id}` | Обновить данные абитуриента |
| DELETE | `/api/applicants/{id}` | Удалить абитуриента |
| GET | `/api/export/applicants` | Экспорт таблицы в Excel |
| POST | `/api/upload/photo` | Загрузить фото |
| GET | `/api/documents/{id}/{type}` | Получить данные документа |
| PUT | `/api/documents/{id}/{type}` | Обновить данные документа |
| POST | `/api/upload/document` | Загрузить скан документа |
| GET | `/api/specializations` | Список специализаций |

## Типы документов

- `passport` — Паспорт
- `snils` — СНИЛС
- `diploma` — Аттестат (школа) / Диплом (ВУЗ)
- `transcript` — Свидетельство об оценках (школа) / Диплом бакалавра (ВУЗ)
- `grade_table` — Табель успеваемости (ВУЗ)

## Страницы

1. **Общая таблица** (`/`) — просмотр всех абитуриентов, добавление, удаление, экспорт Excel
2. **Страница абитуриента** (`/applicant/{id}`) — просмотр данных, загрузка фото, навигация
3. **Редактирование данных** (`/edit/{id}`) — форма редактирования персональных данных
4. **Загрузка документов** (`/documents/{id}`) — загрузка сканов и ввод реквизитов документов (русский/китайский)
