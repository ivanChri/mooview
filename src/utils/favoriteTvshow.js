import config from "./global/config";
const { backend } = config
export async function getFavoriteTvshow (tvshow,token) {
  try {
    const getFavorite = await fetch(`${backend}/tvshow?tvshowId=${tvshow.id}&userId=${tvshow.userId}`,{
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
export async function addTvshowToFavorite (tvshow,token) {
  try {
    const addToFavorite = await fetch(`${backend}/tvshow`,{
      method:'POST',
      headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
     },
     body:JSON.stringify({
       tvShowId:tvshow.id,
       tvShowTitle:tvshow.title,
       posterId:tvshow.poster,
       userId:tvshow.userId
     })
    })
    const response = await addToFavorite.json()
    return response
  } catch (error) {
     throw error
  }
}
export async function deleteTvshowFromFavorite (id,token) {
  try {
    const removeTvshowFromFavorite = await fetch(`${backend}/tvshow/${id}`,{
      method:'DELETE',
      headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
      },
    })
    const response = await removeTvshowFromFavorite.json()
    return response
  } catch (error) {
     throw error
  }
}