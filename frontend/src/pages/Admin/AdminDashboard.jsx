export default function AdminDashboard() {
  return (
    <section className="max-w-6xl mx-auto py-14 px-4">
      <h1 className="text-4xl font-bold text-slate-900 mb-8 tracking-tight">
        Панель управления TechGear Store
      </h1>

      <div className="bg-slate-950 text-slate-100 p-10 rounded-2xl shadow-xl border border-slate-800">
        <p className="text-lg leading-relaxed text-slate-300">
          Добро пожаловать в административный раздел TechGear Store.
          Здесь вы можете управлять каталогом компьютерных комплектующих,
          категориями, заказами и пользователями.  
          Используйте меню слева, чтобы перейти к нужному разделу.
        </p>
      </div>
    </section>
  );
}
