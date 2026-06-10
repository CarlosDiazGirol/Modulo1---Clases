import apiClient from './axios';

export async function getMovies() {
  // TODO en clase: pedir GET /movies y devolver response.data.data.
  return [];
}

export async function getMovieById(id) {
  // TODO en clase: pedir GET /movies/:id y devolver response.data.data.
  return { id, title: '', director: '', year: '', genre: '', synopsis: '' };
}

export { apiClient };
