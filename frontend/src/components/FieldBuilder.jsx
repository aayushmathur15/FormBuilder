import { useMemo } from 'react';

export default function FieldBuilder({ fields = [], onChange }) {
  const defaultField = () => ({
    id: `${Date.now()}-${Math.random()}`,
    label: '',
    type: 'text',
    required: false,
    options: [],
    rawOptions: '',
  });

  const addField = () => {
    onChange([...fields, defaultField()]);
  };

  const updateField = (index, changes) => {
    const next = [...fields];
    next[index] = { ...next[index], ...changes };
    onChange(next);
  };

  const removeField = (index) => {
    const next = [...fields];
    next.splice(index, 1);
    onChange(next);
  };

  const optionsPlaceholder = useMemo(() => 'comma-separated (e.g. a,b,c)', []);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-900">Fields</h3>
        <button
          type="button"
          className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
          onClick={addField}
        >
          + Add field
        </button>
      </div>

      {fields.length === 0 && (
        <p className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-500">
          Add fields to build your form structure.
        </p>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-3 md:grid-cols-[1.6fr_1fr_1fr]">
            <input
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-none"
              placeholder="Label"
              value={field.label}
              onChange={(e) => updateField(index, { label: e.target.value })}
            />

            <select
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-none"
              value={field.type}
              onChange={(e) => {
                const nextType = e.target.value
                updateField(index, {
                  type: nextType,
                  ...(nextType !== 'dropdown' && nextType !== 'radio'
                    ? { options: [], rawOptions: '' }
                    : {}),
                })
              }}
            >
              <option value="text">Text</option>
              <option value="dropdown">Dropdown</option>
              <option value="radio">Radio</option>
              <option value="checkbox">Checkbox</option>
            </select>

            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input
                className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                type="checkbox"
                checked={field.required}
                onChange={(e) => updateField(index, { required: e.target.checked })}
              />
              Required
            </label>
          </div>

          {(field.type === 'dropdown' || field.type === 'radio') && (
            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-slate-700">Options (comma-separated)</label>
              <input
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-none"
                placeholder={optionsPlaceholder}
                value={field.rawOptions ?? field.options.join(',')}
                onChange={(e) =>
                  updateField(index, {
                    rawOptions: e.target.value,
                  })
                }
              />
            </div>
          )}

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700"
              onClick={() => removeField(index)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
