import SectionCard from "./SectionCard";

function RecentAlerts({ alerts }) {
  return (
    <SectionCard title="Recent Alerts">
      <div className="space-y-4">
        {alerts?.map((alert, index) => (
          <div
            key={index}
            className="rounded-lg bg-slate-900 p-4"
          >
            <p className="font-semibold text-cyan-400">
              {alert.level}
            </p>

            <p>{alert.message}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export default RecentAlerts;