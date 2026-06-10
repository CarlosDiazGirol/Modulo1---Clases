import apiClient from './axios';

export async function loginUser(credentials) {
  const response = await apiClient.post('/login', credentials);
  return response.data;
}

export async function registerUser(formData) {
  // TODO en clase: adaptar al endpoint real cuando exista en backend.
  return Promise.resolve(formData);
}
