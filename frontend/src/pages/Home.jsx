import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getForms, deleteForm, duplicateForm } from '../services/api'
import FormList from '../components/FormList'

export default function Home() {
  const [forms, setForms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadForms = async () => {
    setLoading(true)
    setError(null)

    try {
      const { data } = await getForms()
      setForms(data)
    } catch (err) {
      setError(err?.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadForms()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this form?')) return

    try {
      await deleteForm(id)
      setForms((prev) => prev.filter((f) => f._id !== id))
    } catch (err) {
      setError(err?.response?.data?.message || err.message)
    }
  }

  const handleDuplicate = async (id) => {
    try {
      const { data } = await duplicateForm(id)
      setForms((prev) => [data, ...prev])
    } catch (err) {
      setError(err?.response?.data?.message || err.message)
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Forms</h1>
          <p className="text-sm text-slate-500">Manage your form templates and view submissions.</p>
        </div>

        <Link
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
          to="/create"
        >
          Create New Form
        </Link>
      </header>

      {loading && <p className="text-slate-500">Loading forms…</p>}
      {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}

      {!loading && <FormList forms={forms} onDelete={handleDelete} onDuplicate={handleDuplicate} />}
    </div>
  )
}
