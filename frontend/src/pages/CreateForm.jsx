import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createForm } from '../services/api'
import FieldBuilder from '../components/FieldBuilder'

export default function CreateForm() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [fields, setFields] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)

    if (!title.trim()) {
      setError('Form title is required.')
      return
    }

    if (!fields.length) {
      setError('Add at least one field.')
      return
    }

    setLoading(true)
    try {
      const normalized = fields.map((field) => {
        const base = {
          id: field.id,
          label: field.label,
          type: field.type,
          required: field.required,
        }

        if (field.type === 'dropdown' || field.type === 'radio') {
          const raw = field.rawOptions ?? field.options?.join(',') ?? ''
          const options = raw
            .split(',')
            .map((v) => v.trim())
            .filter(Boolean)

          return { ...base, options }
        }

        return base
      })

      await createForm({ title, description, fields: normalized })
      navigate('/')
    } catch (err) {
      setError(err?.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">Create Form</h1>
        <p className="mt-1 text-sm text-slate-500">Define your form structure and fields here.</p>
      </header>

      <form
        className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Title
            <input
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Form title"
            />
          </label>

          <label className="space-y-2 text-sm font-medium text-slate-700">
            Description
            <input
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description"
            />
          </label>
        </div>

        <FieldBuilder fields={fields} onChange={setFields} />

        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>
        )}

        <div className="flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
            disabled={loading}
          >
            {loading ? 'Saving…' : 'Create Form'}
          </button>
        </div>
      </form>
    </div>
  )
}
