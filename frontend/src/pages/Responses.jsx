import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getFormResponses, getForm } from '../services/api'
import ResponseTable from '../components/ResponseTable'

export default function Responses() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [responses, setResponses] = useState([])
  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const [{ data: formData }, { data: responseData }] = await Promise.all([
          getForm(id),
          getFormResponses(id),
        ])

        setForm(formData)
        setResponses(responseData.responses || [])
      } catch (err) {
        setError(err?.response?.data?.message || err.message)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [id])

  if (loading) return <p className="text-slate-500">Loading responses…</p>
  if (error) return <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Responses for {form?.title || 'form'}</h1>
          <p className="mt-1 text-sm text-slate-500">Review form responses below.</p>
        </div>

        <button
          className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </header>

      <ResponseTable responses={responses} />
    </div>
  )
}
