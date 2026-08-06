function SectionCard({ title, children }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 p-6 shadow">
      <h2 className="mb-6 text-xl font-bold">
        {title}
      </h2>

      {children}
    </div>
  );
}

export default SectionCard;