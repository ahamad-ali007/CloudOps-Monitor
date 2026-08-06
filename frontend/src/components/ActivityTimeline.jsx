import SectionCard from "./SectionCard";

function ActivityTimeline({ timeline }) {
  return (
    <SectionCard title="Activity Timeline">
      <div className="space-y-4">
        {timeline?.map((item, index) => (
          <div
            key={index}
            className="flex justify-between border-l-2 border-cyan-400 pl-4"
          >
            <span>{item.event}</span>

            <span className="text-gray-400">
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export default ActivityTimeline;