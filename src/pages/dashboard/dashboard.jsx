import { Box,Text,VStack } from "@chakra-ui/react"
import { Suspense,lazy,useContext } from "react"
import { userContext } from "../../App"
const AnimationWrapper = lazy(() => import('../../componentAsset/animationWrapper/animationWrapper'))
const DashboardLink = lazy(() => import('./dashboardLink/dashboardLink'))
const Avatar = lazy(() => import('../../componentAsset/avatar/avatar'))
export default function Dashboard () {
  const { user,profile } = useContext(userContext)
  return(
   <AnimationWrapper>
   <Box className='dashboard' p='3' mt='100' bg='brand.200' height='100%'>
    { user ?
     <>
     <VStack className='dashboard-header' my='2' spacing='23px' p='2'>
     <Text as='h1' fontSize='2.8rem' p='1'>Dashboard</Text>
      <Suspense>
        <Avatar size='2xl' name={profile.username} img={profile.avatar.url}/>
      </Suspense>
      <Text as='h2' fontSize='2.4rem' p='1'>{profile.username}</Text>
      </VStack>
      <Box className='dashboard-body' my='2'>
       <Suspense>
         <DashboardLink profile={profile}/>
       </Suspense>
      </Box>
      </>
      :
      <Box p='1' textAlign='center' height={['100vh','84vh']} bg='brand.100' borderRadius='5px' my='30'>
        <Text p='2' mt='18rem' fontSize='1.9rem'>You are not logged in, please login first</Text>
      </Box>
    }
   </Box>
   </AnimationWrapper>
  )
}