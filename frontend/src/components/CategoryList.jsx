export default function CategoryList({ categories, onSelect }) {
  return (
    <div className="flex gap-3 mb-6 flex-wrap">
      {categories.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelect(c.id)}
          className="btn btn-secondary"
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}
