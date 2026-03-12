import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getForms = () => api.get('/forms');
export const getForm = (id) => api.get(`/forms/${id}`);
export const createForm = (payload) => api.post('/forms', payload);
export const updateForm = (id, payload) => api.put(`/forms/${id}`, payload);
export const deleteForm = (id) => api.delete(`/forms/${id}`);
export const duplicateForm = (id) => api.post(`/forms/${id}/duplicate`);
export const getFormResponses = (formId) => api.get(`/forms/${formId}/responses`);

export const getPublicForm = (id) => api.get(`/public/forms/${id}`);
export const submitResponse = (formId, answers) => api.post(`/public/forms/${formId}/submit`, { answers });
