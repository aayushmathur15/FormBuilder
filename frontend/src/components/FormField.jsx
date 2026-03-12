export default function FormField({ field, value, onChange }) {
  const { label, type, required, options = [] } = field
  const name = label

  const handleChange = (event) => {
    const { value: val, checked } = event.target
    if (type === 'checkbox') {
      onChange(name, checked)
      return
    }

    onChange(name, val)
  }

  if (type === 'checkbox') {
    return (
      <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
        <input
          className="h-5 w-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
          type="checkbox"
          checked={Boolean(value)}
          onChange={handleChange}
        />
        <span className="text-sm font-medium text-slate-900">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </span>
      </label>
    )
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-800">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {type === 'text' && (
        <input
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-none"
          type="text"
          value={value ?? ''}
          onChange={handleChange}
          required={required}
        />
      )}

      {type === 'dropdown' && (
        <select
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-none"
          value={value ?? ''}
          onChange={handleChange}
          required={required}
        >
          <option value="">Select...</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}

      {type === 'radio' && (
        <div className="space-y-2">
          {options.map((opt) => (
            <label key={opt} className="inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
              <input
                className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                type="radio"
                name={name}
                value={opt}
                checked={value === opt}
                onChange={handleChange}
              />
              <span className="text-sm text-slate-900">{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}
