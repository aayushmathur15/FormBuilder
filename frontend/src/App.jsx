import { useMemo } from 'react'
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import CreateForm from './pages/CreateForm'
import FillForm from './pages/FillForm'
import Responses from './pages/Responses'
import Login from './pages/Login'
import { useAuth } from './contexts/AuthContext'

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <p className="text-sm text-slate-500">Checking session…</p>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

function App() {
  const { isAuthenticated, logout } = useAuth()

  const navLinks = useMemo(
    () => [
      { to: '/', label: 'Home' },
      { to: '/create', label: 'Create', protected: true },
    ],
    [],
  )

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900">Form Builder</h1>
            <p className="text-sm text-slate-500">Create forms and collect responses in minutes.</p>
          </div>

          <nav className="flex flex-wrap items-center gap-2">
            {navLinks.map(
              (link) =>
                (!link.protected || isAuthenticated) && (
                  <Link
                    key={link.to}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                    to={link.to}
                  >
                    {link.label}
                  </Link>
                ),
            )}
            {isAuthenticated ? (
              <button
                type="button"
                onClick={logout}
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Logout
              </button>
            ) : (
              <Link
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                to="/login"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateForm />
              </ProtectedRoute>
            }
          />
          <Route path="/form/:id" element={<FillForm />} />
          <Route
            path="/forms/:id/responses"
            element={
              <ProtectedRoute>
                <Responses />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="border-t border-slate-200 bg-white/80 py-4 text-center text-sm text-slate-500">
        Built with React + Vite + Express
      </footer>
    </div>
  )
}

export default App
