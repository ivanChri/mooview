import { Box,Text } from "@chakra-ui/react";
import { useContext,useEffect,useState,lazy } from "react";
import { logout } from "../../../utils/auth";
import { userContext } from "../../../App";
import { useNavigate } from "react-router-dom";
const AnimationWrapper = lazy(() => import('../../../componentAsset/animationWrapper/animationWrapper'))
const Fallback = lazy(() => import('../../../componentAsset/fallback/fallback'))
export default function Logout () {
  const {user,token} = useContext(userContext)
  const [load,setLoad] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
   const logoutUser = async () => {
     try {
       const isUserExsist = await logout(user.id,token)
       if(isUserExsist.statusCode === 200){
        localStorage.clear()
        navigate('/')
        window.location.reload()
       }
     } catch (error) {
       console.log(error)
     } finally {
       setLoad(false)
     }
    }
    logoutUser()
  },[])
  return (
    <AnimationWrapper>
     {user ? 
     <Box
     className='logout-page'
     p='2'
     mt='100'
     height='100vh'
     width='100%'
     >
      {load && <Fallback />}
     </Box>
     : 
    <Box p='1' textAlign='center' height={['115vh','120vh']} bg='brand.100' borderRadius='5px' my='30'>
     <Text p='2' mt='18rem' fontSize='1.9rem'>You are not logged in, please login first</Text>
    </Box>
    }
    </AnimationWrapper>
  )
}