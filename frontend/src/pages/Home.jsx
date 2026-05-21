export default function Home() {
  return (
    <section className="max-w-6xl mx-auto py-14 px-4 sm:px-6 text-slate-100">
      <div className="grid gap-10 lg:grid-cols-[1.4fr,1fr] items-start">

        {/* Левая часть */}
        <div>
          <h1 className="text-4xl sm:text-5xl font-semibold text-slate-100 tracking-tight">
            TechGear Store
          </h1>

          <p className="mt-5 text-slate-300 text-lg leading-relaxed max-w-2xl">
            Магазин компьютерных девайсов и комплектующих: от игровых мышей и механических
            клавиатур до видеокарт, мониторов и аксессуаров для продуктивной работы и гейминга.
          </p>

          {/* Два блока */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">

            {/* Блок 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-md">
              <h2 className="text-base font-semibold text-slate-100">
                Игровые и рабочие сборки
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Подберите комплектующие под свои задачи: работа, монтаж, стриминг или киберспорт.
              </p>
            </div>

            {/* Блок 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 shadow-md">
              <h2 className="text-base font-semibold text-slate-100">
                Периферия и аксессуары
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Клавиатуры, мыши, наушники, коврики и хабы — всё, чтобы рабочее место было удобным.
              </p>
            </div>

          </div>
        </div>

        {/* Правая колонка */}
        <aside className="bg-slate-950 text-slate-100 rounded-2xl p-6 shadow-md border border-slate-800">
          <h3 className="text-lg font-semibold mb-3">
            Почему выбирают TechGear Store
          </h3>

          <ul className="space-y-3 text-sm text-slate-300">
            <li>• Актуальный ассортимент комплектующих и периферии.</li>
            <li>• Удобный онлайн‑каталог и быстрая корзина.</li>
            <li>• Прозрачное оформление заказов и отслеживание статуса.</li>
            <li>• Поддержка как геймеров, так и профессионалов.</li>
          </ul>
        </aside>

      </div>
    </section>
  );
}
