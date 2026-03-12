import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPublicForm, submitResponse } from '../services/api'
import FormField from '../components/FormField'

export default function FillForm() {
  const { id } = useParams()
  const [form, setForm] = useState(null)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    const loadForm = async () => {
      setLoading(true)
      setError(null)

      try {
        const { data } = await getPublicForm(id)
        setForm(data)
      } catch (err) {
        setError(err?.response?.data?.message || err.message)
      } finally {
        setLoading(false)
      }
    }

    loadForm()
  }, [id])

  const handleChange = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)
    setSuccess(null)

    setSubmitting(true)
    try {
      await submitResponse(id, answers)
      setSuccess('Response submitted successfully!')
      setAnswers({})
    } catch (err) {
      setError(err?.response?.data?.message || err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <p className="text-slate-500">Loading form…</p>
  if (error) return <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>
  if (!form) return <p className="text-slate-500">Form not found.</p>

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">{form.title}</h1>
        {form.description && (
          <p className="mt-1 text-sm text-slate-500">{form.description}</p>
        )}
      </header>

      <form className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
        {form.fields.map((field) => (
          <FormField
            key={field._id || field.label}
            field={field}
            value={answers[field.label]}
            onChange={handleChange}
          />
        ))}

        {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}
        {success && <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{success}</p>}

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-full bg-brand-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
            disabled={submitting}
          >
            {submitting ? 'Submitting…' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}
