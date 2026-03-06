-- database/seed.sql
-- Начальные данные

-- ADMIN USER
INSERT INTO "User" (email, password, name, role)
VALUES (
    'admin@coffee-shop.local',
    '$2a$10$uQ1mQ8p0xkYpZx7BqXc9Uu0kzQ0wQ9Yg8xJqv8zjYy2mV8u0yXx3e', -- bcrypt hash "admin123"
    'Admin',
    'ADMIN'
);

-- CATEGORIES
INSERT INTO "Category" (name, slug)
VALUES
    ('Кофемолки', 'grinders'),
    ('Турки и гейзеры', 'brewers'),
    ('Фильтры и аксессуары', 'filters-accessories'),
    ('Чашки и кружки', 'cups-mugs');

-- PRODUCTS
INSERT INTO "Product" (name, slug, description, price, stock, "imageUrl", "categoryId")
VALUES
    ('Ручная кофемолка Hario Mini Mill', 'hario-mini-mill',
     'Компактная ручная кофемолка для свежемолотого кофе дома и в путешествиях.',
     59.90, 20, '/images/hario-mini-mill.jpg', 1),

    ('Электрическая кофемолка Baratza Encore', 'baratza-encore',
     'Надёжная электрическая кофемолка для фильтра и альтернативных методов заваривания.',
     189.00, 10, '/images/baratza-encore.jpg', 1),

    ('Турка медная классическая 300 мл', 'copper-cezve-300',
     'Традиционная медная турка для приготовления ароматного кофе по-восточному.',
     29.50, 30, '/images/copper-cezve-300.jpg', 2),

    ('Френч-пресс 600 мл', 'french-press-600',
     'Стеклянный френч-пресс для заваривания кофе и чая.',
     24.90, 25, '/images/french-press-600.jpg', 2),

    ('Бумажные фильтры №4 (100 шт.)', 'paper-filters-4',
     'Классические бумажные фильтры для капельных кофеварок и воронок.',
     6.90, 100, '/images/paper-filters-4.jpg', 3),

    ('Керамическая кружка 300 мл', 'ceramic-mug-300',
     'Удобная керамическая кружка для ежедневного использования.',
     9.90, 50, '/images/ceramic-mug-300.jpg', 4);
