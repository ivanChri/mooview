import config from "./global/config";
const { backend } = config
export async function addReview (data,token) {
  try {
    const review = await fetch(`${backend}/review`,{
     method:'POST',
     headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
     },
     body:JSON.stringify({
      showId:data.id,
      showTitle:data.title,
      userId:data.userId,
      review:data.review
     })
    })
    const response = await review.json()
    return response
  } catch (error) {
     throw error
  }
}
export async function getReview(id) {
  try {
    const review = await fetch(`${backend}/review/${id}`)
    const response = await review.json()
    return response
  } catch (error) {
    throw error
  }
}
export async function editReview(data,token) {
 try {
   const editReview = await fetch(`${backend}/review/${data.id}`,{
    method:'PATCH',
    headers: {
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${token}`
    },
   body:JSON.stringify({
    review:data.review
   })
   })
   const response = await editReview.json()
   return response
 } catch (error) {
   throw error
 }
}
export async function deleteReview(id,token) {
  try {
    const review = await fetch(`${backend}/review/${id}`,{
     method:'DELETE',
     headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
     },
    })
    const response = await review.json()
    return response
  } catch (error) {
    throw error
  }
} 