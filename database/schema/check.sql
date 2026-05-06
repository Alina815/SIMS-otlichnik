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