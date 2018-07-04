let movies = [
  {
    id: 0,
    name: 'Star Wars - The new one',
    score: 1,
  },
  {
    id: 1,
    name: 'Avengers - The new one',
    score: 8,
  },
  {
    id: 2,
    name: 'The Godfather 1',
    score: 99,
  },
  {
    id: 3,
    name: 'Logan',
    score: 2,
  },
]

export const getMovies = () => movies

export const getById = id => movies.find(movie => movie.id === id)

export const addMovie = (name, score) => {
  const newMovie = { id: movies.length, name, score }
  movies.push(newMovie)
  return newMovie
}

export const deleteMovie = id => {
  const cleanedMovies = movies.filter(movie => movie.id !== id)
  if (movies.length > cleanedMovies.length) {
    movies = cleanedMovies
    return true
  } else {
    return false
  }
}
