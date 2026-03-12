export default function ResponseTable({ responses = [] }) {
  if (!responses.length) {
    return <p className="text-sm text-slate-500">No responses yet.</p>;
  }

  return (
    <div className="space-y-4">
      {responses.map((item) => (
        <div
          key={item._id}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
            <span>{new Date(item.submittedAt).toLocaleString()}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-700">
              {Object.keys(item.answers || {}).length} answers
            </span>
          </div>
          <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-800">
            {JSON.stringify(item.answers, null, 2)}
          </pre>
        </div>
      ))}
    </div>
  );
}
