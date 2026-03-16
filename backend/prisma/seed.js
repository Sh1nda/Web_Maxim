// backend/prisma/seed.js
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // ADMIN
  const passwordHash = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@furniture-store.local' },
    update: {},
    create: {
      email: 'admin@furniture-store.local',
      password: passwordHash,
      name: 'Admin',
      role: 'ADMIN'
    }
  });

  // CATEGORIES
  const categoriesData = [
    { name: 'Диваны', slug: 'sofas' },
    { name: 'Кресла', slug: 'armchairs' },
    { name: 'Столы и столешницы', slug: 'tables' },
    { name: 'Шкафы и хранение', slug: 'storage' },
    { name: 'Освещение', slug: 'lighting' }
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

  const [sofas, armchairs, tables, storage, lighting] = categories;

  // PRODUCTS
  await prisma.product.createMany({
    data: [
      {
        name: 'Диван угловой Milano',
        slug: 'sofa-milano',
        description: 'Комфортный угловой диван с мягкими подушками и прочным каркасом.',
        price: 899.00,
        stock: 8,
        imageUrl: '/images/sofa-milano.jpg',
        categoryId: sofas.id
      },
      {
        name: 'Кресло Relax Comfort',
        slug: 'armchair-relax',
        description: 'Удобное кресло с высокой спинкой и эргономичной формой для отдыха.',
        price: 349.00,
        stock: 15,
        imageUrl: '/images/armchair-relax.jpg',
        categoryId: armchairs.id
      },
      {
        name: 'Обеденный стол Loft 160 см',
        slug: 'table-loft-160',
        description: 'Стильный стол в стиле лофт с деревянной столешницей и металлическими ножками.',
        price: 499.00,
        stock: 12,
        imageUrl: '/images/table-loft-160.jpg',
        categoryId: tables.id
      },
      {
        name: 'Шкаф-купе Modern 2.0',
        slug: 'wardrobe-modern-20',
        description: 'Современный шкаф-купе с зеркальными дверцами и вместительными полками.',
        price: 729.00,
        stock: 5,
        imageUrl: '/images/wardrobe-modern-20.jpg',
        categoryId: storage.id
      },
      {
        name: 'Настольная лампа Nordic Light',
        slug: 'lamp-nordic-light',
        description: 'Минималистичная лампа в скандинавском стиле для рабочего стола или спальни.',
        price: 79.90,
        stock: 40,
        imageUrl: '/images/lamp-nordic-light.jpg',
        categoryId: lighting.id
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
