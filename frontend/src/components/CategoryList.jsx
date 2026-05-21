export default function CategoryList({ categories, onSelect }) {
  return (
    <div className="flex flex-col gap-3">
      {categories.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelect(c.id)}
          className="w-full px-4 py-3 rounded-lg bg-slate-900 text-slate-100 
                     hover:bg-slate-800 transition font-medium text-left"
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}
