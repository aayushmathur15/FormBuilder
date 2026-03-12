import axios from 'axios';

const defaultApi = (typeof window !== 'undefined' ? `${window.location.origin}/api` : '/api');

const raw = import.meta.env.VITE_API_URL;
const BASE_URL = raw
  ? raw.replace(/\/$/, '').replace(/\/api$/, '') + '/api'
  : defaultApi;

const TOKEN_KEY = 'formbuilder_token';

export const getToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token) => {
  if (typeof window === 'undefined') return;
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const clearToken = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (username, password) => api.post('/auth/login', { username, password });

export const getForms = () => api.get('/forms');
export const getForm = (id) => api.get(`/forms/${id}`);
export const createForm = (payload) => api.post('/forms', payload);
export const updateForm = (id, payload) => api.put(`/forms/${id}`, payload);
export const deleteForm = (id) => api.delete(`/forms/${id}`);
export const duplicateForm = (id) => api.post(`/forms/${id}/duplicate`);
export const getFormResponses = (formId) => api.get(`/forms/${formId}/responses`);

export const getPublicForm = (id) => api.get(`/public/forms/${id}`);
export const submitResponse = (formId, answers) => api.post(`/public/forms/${formId}/submit`, { answers });
