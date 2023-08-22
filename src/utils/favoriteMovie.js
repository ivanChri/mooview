import config from "./global/config";
const { backend } = config
export async function getFavoriteMovie(movie,token) {
  try {
    const getFavorite = await fetch(`${backend}/movie?movieId=${movie.id}&userId=${movie.userId}`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const response = await getFavorite.json()
    return response
  } catch (error) {
    throw error
  }
}
export async function addMovieToFavorite (movie,token) {
  try {
    const addToFavorite = await fetch(`${backend}/movie`,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        movieId:movie.id,
        movieTitle:movie.title,
        posterId:movie.poster,
        userId:movie.userId
      })
    })
    const response = await addToFavorite.json()
    return response
  } catch (error) {
    throw error
  }
}
export async function deleteMovieFromFavorite(id,token) {
  try {
    const removeMovieFromFavorite = await fetch(`${backend}/movie/${id}`,{
      method:'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    const response = await removeMovieFromFavorite.json()
    return response
  } catch (error) {
    throw error
  }
}