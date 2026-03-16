export default function Home() {
  return (
    <section className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-5xl font-semibold text-slate-900 tracking-tight">
        Мебельный Дом
      </h1>

      <p className="text-slate-600 mt-6 text-xl leading-relaxed max-w-3xl">
        Добро пожаловать в наш магазин мебели! Здесь вы найдёте стильные диваны,
        удобные кресла, современные столы, шкафы и множество других предметов
        интерьера, которые помогут создать уют в вашем доме.
      </p>

      <div className="mt-10 bg-slate-100 p-8 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-medium text-slate-800 mb-3">
          Создайте пространство, в котором приятно жить
        </h2>
        <p className="text-slate-600 text-lg">
          Мы предлагаем мебель, сочетающую комфорт, долговечность и современный
          дизайн. Подберите идеальные решения для гостиной, спальни, кухни или
          рабочего кабинета.
        </p>
      </div>
    </section>
  );
}
