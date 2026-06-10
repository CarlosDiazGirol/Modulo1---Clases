import apiClient from './axios';

export async function checkoutOrder() {
  const response = await apiClient.post('/orders');
  return response.data.data;
}
