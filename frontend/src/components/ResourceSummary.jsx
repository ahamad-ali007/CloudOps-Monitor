function ResourceSummary({ resources }) {

  if (!resources) {
    return (
      <div className="rounded-xl bg-slate-800 p-6 border border-slate-700">
        Loading Resources...
      </div>
    );
  }

  const resourceCards = [
    {
      title: "Running EC2",
      value: resources.running_ec2,
      color: "text-green-400",
    },
    {
      title: "Stopped EC2",
      value: resources.stopped_ec2,
      color: "text-red-400",
    },
    {
      title: "S3 Buckets",
      value: resources.s3,
      color: "text-cyan-400",
    },
    {
      title: "Lambda",
      value: resources.lambda,
      color: "text-violet-400",
    },
  ];

  return (
    <div className="rounded-xl bg-slate-800 border border-slate-700 p-6">

      <h2 className="text-xl font-semibold mb-6">
        AWS Resources
      </h2>

      <div className="grid grid-cols-2 gap-4">

        {resourceCards.map((resource) => (

          <div
            key={resource.title}
            className="rounded-lg bg-slate-900 p-4"
          >

            <p className="text-gray-400">
              {resource.title}
            </p>

            <h3 className={`mt-2 text-3xl font-bold ${resource.color}`}>
              {resource.value}
            </h3>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ResourceSummary;