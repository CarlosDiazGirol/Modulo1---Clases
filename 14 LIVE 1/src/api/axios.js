import axios from 'axios';

const apiClient = axios.create({
  // TODO en clase: configurar la baseURL del backend local.
});

export default apiClient;
