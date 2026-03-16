export default function AdminDashboard() {
  return (
    <section className="max-w-5xl mx-auto py-14 px-4">
      <h1 className="text-4xl font-semibold text-slate-900 mb-8 tracking-tight">
        Панель управления мебельным магазином
      </h1>

      <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200">
        <p className="text-slate-700 text-lg leading-relaxed">
          Добро пожаловать в административный раздел. 
          Здесь вы можете управлять каталогом мебели, категориями, заказами 
          и другими элементами магазина. Выберите нужный раздел в меню слева, 
          чтобы приступить к работе.
        </p>
      </div>
    </section>
  );
}
