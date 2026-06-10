const demoMovies = [
  { id: 1, title: 'Arrival', director: 'Denis Villeneuve', year: 2016, genre: 'Sci-Fi' },
  { id: 2, title: 'Spotlight', director: 'Tom McCarthy', year: 2015, genre: 'Drama' },
  { id: 3, title: 'Dune', director: 'Denis Villeneuve', year: 2021, genre: 'Sci-Fi' },
];

export async function getMovies() {
  return Promise.resolve(demoMovies);
}
