import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// TODO en clase: anadir interceptor para enviar Authorization con el token.

export default apiClient;
