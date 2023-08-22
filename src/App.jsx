import { Box } from '@chakra-ui/react'
import AnimatedRoute from './animatedRoute'
import { Navbar } from './navbar/navbar'
import { createContext,useEffect,useState } from 'react'
export const userContext = createContext({})
function App() {
  const [user,setUser] = useState({})
  const [token,setToken] = useState('')
  const [profile,setProfile] = useState({})
  useEffect(() => {
    const getUser = () => {
      const data = localStorage.getItem('user')
      const token = localStorage.getItem('token')
      const profile = localStorage.getItem('profile')
      setUser(JSON.parse(data))
      setToken(JSON.parse(token))
      setProfile(JSON.parse(profile))
    }
    getUser()
  },[])
  return (
  <userContext.Provider value={{user,token,profile}}>
  <Box className='app' mt='6rem' height='100%'>
    <Navbar />
    <Box className='app-content' height='100%' width='100%'>
      <AnimatedRoute />
    </Box>
  </Box>
  </userContext.Provider>
  )
}

export default App
