// backend/prisma/seed.js
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const passwordHash = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@coffee-shop.local' },
    update: {},
    create: {
      email: 'admin@coffee-shop.local',
      password: passwordHash,
      name: 'Admin',
      role: 'ADMIN'
    }
  });

  const categoriesData = [
    { name: 'Кофемолки', slug: 'grinders' },
    { name: 'Турки и гейзеры', slug: 'brewers' },
    { name: 'Фильтры и аксессуары', slug: 'filters-accessories' },
    { name: 'Чашки и кружки', slug: 'cups-mugs' }
  ];

  const categories = [];
  for (const cat of categoriesData) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat
    });
    categories.push(created);
  }

  const [grinders, brewers, filters, cups] = categories;

  await prisma.product.createMany({
    data: [
      {
        name: 'Ручная кофемолка Hario Mini Mill',
        slug: 'hario-mini-mill',
        description: 'Компактная ручная кофемолка для свежемолотого кофе дома и в путешествиях.',
        price: 59.90,
        stock: 20,
        imageUrl: '/images/hario-mini-mill.jpg',
        categoryId: grinders.id
      },
      {
        name: 'Электрическая кофемолка Baratza Encore',
        slug: 'baratza-encore',
        description: 'Надёжная электрическая кофемолка для фильтра и альтернативных методов заваривания.',
        price: 189.00,
        stock: 10,
        imageUrl: '/images/baratza-encore.jpg',
        categoryId: grinders.id
      },
      {
        name: 'Турка медная классическая 300 мл',
        slug: 'copper-cezve-300',
        description: 'Традиционная медная турка для приготовления ароматного кофе по-восточному.',
        price: 29.50,
        stock: 30,
        imageUrl: '/images/copper-cezve-300.jpg',
        categoryId: brewers.id
      },
      {
        name: 'Френч-пресс 600 мл',
        slug: 'french-press-600',
        description: 'Стеклянный френч-пресс для заваривания кофе и чая.',
        price: 24.90,
        stock: 25,
        imageUrl: '/images/french-press-600.jpg',
        categoryId: brewers.id
      },
      {
        name: 'Бумажные фильтры №4 (100 шт.)',
        slug: 'paper-filters-4',
        description: 'Классические бумажные фильтры для капельных кофеварок и воронок.',
        price: 6.90,
        stock: 100,
        imageUrl: '/images/paper-filters-4.jpg',
        categoryId: filters.id
      },
      {
        name: 'Керамическая кружка 300 мл',
        slug: 'ceramic-mug-300',
        description: 'Удобная керамическая кружка для ежедневного использования.',
        price: 9.90,
        stock: 50,
        imageUrl: '/images/ceramic-mug-300.jpg',
        categoryId: cups.id
      }
    ]
  });

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
