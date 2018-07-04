import fetch from 'node-fetch'
import qs from 'querystring'

const API_URL = 'https://yts.am/api/v2/list_movies.json'

export const getMovies = (limit, rating) => {
  const query = {}
  if (limit > 0) query.limit = limit
  if (rating > 0) query.minimum_rating = rating

  return fetch(`${API_URL}?${qs.stringify(query)}`)
    .then(res => res.json())
    .then(json => json.data.movies)
}
