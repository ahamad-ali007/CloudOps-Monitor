import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function MetricChart({ title, data, color }) {
  return (
    <div className="rounded-xl bg-slate-800 p-6 border border-slate-700">
      <h3 className="mb-4 text-lg font-semibold text-white">
        {title}
      </h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#334155" />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MetricChart;