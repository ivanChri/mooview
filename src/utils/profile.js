import config from './global/config';
const {backend} = config
export async function getProfile(id){
  try {
   const profile = await fetch(`${backend}/profile/${id}`)
   const response = await profile.json()
   return response
  } catch (error) {
    throw error
  }
}
export async function editProfile(data,token){
 try {
   const edit = await fetch(`${backend}/profile/${data.id}`,{
    method:'PATCH',
    headers: {
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${token}`
    },
    body:JSON.stringify({
      username:data.username,
      avatarId:data.avatarId,
      about:data.about
    })
   })
   const response = await edit.json()
   return response
 } catch (error) {
   throw error
 }
}