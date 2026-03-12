import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

export default function FormList({ forms = [], onDelete, onDuplicate }) {
  const [copiedId, setCopiedId] = useState(null)

  const origin = useMemo(() => window.location.origin, [])

  const copyLink = async (id) => {
    const url = `${origin}/form/${id}`
    try {
      await navigator.clipboard.writeText(url)
      setCopiedId(id)
      window.setTimeout(() => setCopiedId(null), 2000)
    } catch {
      // ignore clipboard failures
    }
  }

  if (!forms.length) {
    return <p className="text-sm text-slate-500">No forms found. Create one to get started.</p>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {forms.map((form) => (
        <div
          key={form._id}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{form.title}</h3>
              {form.description && (
                <p className="mt-1 text-sm text-slate-500">{form.description}</p>
              )}
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              {form.fields?.length ?? 0} field{form.fields?.length === 1 ? '' : 's'}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              className="inline-flex items-center justify-center rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
              to={`/form/${form._id}`}
            >
              Fill Form
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
              onClick={() => copyLink(form._id)}
            >
              {copiedId === form._id ? 'Link copied!' : 'Copy Link'}
            </button>
            <Link
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
              to={`/forms/${form._id}/responses`}
            >
              View Responses
            </Link>
            {onDuplicate && (
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-200"
                onClick={() => onDuplicate(form._id)}
              >
                Duplicate
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700"
                onClick={() => onDelete(form._id)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
