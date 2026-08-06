function MetricCard({ title, value, color }) {
  return (
    <div className="rounded-xl bg-slate-800 p-6 shadow-lg border border-slate-700 hover:border-cyan-400 transition">
      <h3 className="text-gray-400 text-sm uppercase">
        {title}
      </h3>

      <h2 className={`mt-4 text-4xl font-bold ${color}`}>
        {value}
      </h2>
    </div>
  );
}

export default MetricCard;