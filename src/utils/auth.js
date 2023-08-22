import config from "./global/config";
const { backend } = config
export async function register (username,email,password) {
  try {
    const register = await fetch(`${backend}/auth/register`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password
        }),
    })
    const response = await register.json()
    return response
  } catch (error) {
     console.log(error)
  }
}
export async function login(username,email,password) {
  try {
    const login = await fetch(`${backend}/auth/login`,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
       username,
       email,
       password
      }),
    })
    const response = await login.json()
    return response
  } catch (error) {
     throw error
  }
}
export async function forgetPassword(username,email,password) {
  try {
    const changePassword = await fetch(`${backend}/auth/password`,{
      method:'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password
      }),
    })
    const response = await changePassword.json()
    return response
  } catch (error) {
     console.log(error)
  }
}
export async function logout(id,token){
  try {
    const user = await fetch(`${backend}/auth/logout/${id}`,{
     method:'DELETE',
     headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
     },
    })
    const response = await user.json()
    return response
  } catch (error) {
    throw error
  }
 }
