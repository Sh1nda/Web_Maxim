-- database/seed.sql
-- Начальные данные для мебельного магазина

-- ADMIN USER
INSERT INTO "User" (email, password, name, role)
VALUES (
    'admin@furniture-store.local',
    '$2a$10$uQ1mQ8p0xkYpZx7BqXc9Uu0kzQ0wQ9Yg8xJqv8zjYy2mV8u0yXx3e', -- bcrypt hash "admin123"
    'Admin',
    'ADMIN'
);

-- CATEGORIES
INSERT INTO "Category" (name, slug)
VALUES
    ('Диваны', 'sofas'),
    ('Кресла', 'armchairs'),
    ('Столы и столешницы', 'tables'),
    ('Шкафы и хранение', 'storage'),
    ('Освещение', 'lighting');

-- PRODUCTS
INSERT INTO "Product" (name, slug, description, price, stock, "imageUrl", "categoryId")
VALUES
    (
        'Диван угловой Milano',
        'sofa-milano',
        'Комфортный угловой диван с мягкими подушками и прочным каркасом.',
        899.00,
        8,
        '/images/sofa-milano.jpg',
        1
    ),

    (
        'Кресло Relax Comfort',
        'armchair-relax',
        'Удобное кресло с высокой спинкой и эргономичной формой для отдыха.',
        349.00,
        15,
        '/images/armchair-relax.jpg',
        2
    ),

    (
        'Обеденный стол Loft 160 см',
        'table-loft-160',
        'Стильный стол в стиле лофт с деревянной столешницей и металлическими ножками.',
        499.00,
        12,
        '/images/table-loft-160.jpg',
        3
    ),

    (
        'Шкаф-купе Modern 2.0',
        'wardrobe-modern-20',
        'Современный шкаф-купе с зеркальными дверцами и вместительными полками.',
        729.00,
        5,
        '/images/wardrobe-modern-20.jpg',
        4
    ),

    (
        'Настольная лампа Nordic Light',
        'lamp-nordic-light',
        'Минималистичная лампа в скандинавском стиле для рабочего стола или спальни.',
        79.90,
        40,
        '/images/lamp-nordic-light.jpg',
        5
    );
