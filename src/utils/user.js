import config from "./global/config";
const {backend} = config
export async function getUser(id,token) {
  try {
    const user = await fetch(`${backend}/user/${id}`,{
      headers:{
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
      }
    })
    const response = await user.json()
    return response
  } catch (error) {
    throw error
  }
}
export async function deleteHistory(id,token) {
  try {
    const clearHistory = await fetch(`${backend}/user/${id}`,{
      method:'DELETE',
      headers:{
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
      }
    })
    const response = await clearHistory.json()
    return response
  } catch (error) {
    throw error
  }
}
export async function changeCredential(data,token){
  try {
    const editCredential = await fetch(`${backend}/user/${data.id}`,{
     method:'PATCH',
     headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
     },
     body: JSON.stringify({
      username:data.username,
      email:data.email,
      password:data.password,
      newPassword:data.newPassword,
      newEmail:data.newEmail
     })
    })
    const response = await editCredential.json()
    return response
  } catch (error) {
    throw error
  }
}