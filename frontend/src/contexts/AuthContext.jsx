import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { login as apiLogin, setToken, getToken, clearToken } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const stored = getToken()
    if (stored) {
      setTokenState(stored)
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    setError(null)
    try {
      const { data } = await apiLogin(username, password)
      setToken(data.token)
      setTokenState(data.token)
      return data
    } catch (err) {
      const msg = err?.response?.data?.message || err.message
      setError(msg)
      throw new Error(msg)
    }
  }

  const logout = () => {
    clearToken()
    setTokenState(null)
  }

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      loading,
      error,
      login,
      logout,
    }),
    [token, loading, error],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}
