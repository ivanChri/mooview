import { Box,Text,Stack,Tabs,TabList,Tab,TabPanels,TabPanel } from '@chakra-ui/react';
import { useEffect,useState,lazy,Suspense } from 'react';
import { getProfile } from '../../utils/profile';
import { useParams } from 'react-router-dom';
const Fallback = lazy(() => import('../../componentAsset/fallback/fallback'))
const Avatar = lazy(() => import('../../componentAsset/avatar/avatar'))
const CardList = lazy(() => import('../../componentAsset/cardList/cardLIst'))
const AnimationWrapper = lazy(() => import('../../componentAsset/animationWrapper/animationWrapper'))
const Error = lazy(() => import('../../componentAsset/error/error'))
export default function Profile () {
 const params = useParams()
 const [profileData,setProfileData] = useState({})
 const [load,setLoad] = useState(true)
 useEffect(() => {
  const get = async () => {
    try {
      const profile = await getProfile(params.sub)
      setProfileData(profile.response.profile)     
    }catch(error){
      console.log(error) 
    }finally{
      setLoad(false)
    }
  }
  get()
 },[])
 return (
  <AnimationWrapper>
  <Box
   p='2'
   mt={['99','100']}
  >
   {load ? <Fallback /> :
    profileData ? 
   <>
   <Stack
    p='4'
    alignItems='center'
    spacing='24px'
    className='header'
    direction='column'
    my='3'
   >
   <Suspense>
     <Avatar name={profileData.username} img={profileData.avatar.url} size='2xl'/>
   </Suspense>
    <Text as='h2' p='2' textAlign='center' fontSize='1.8rem'>{profileData.username}</Text>
   </Stack>
   {profileData.about && <Box p='4' bg='brand.100' borderRadius='5px'>
    <Text as='h3' p='1' fontSize='1.7rem'>About Me</Text>
    <Text as='p' p='2' fontSize='1.4rem' lineHeight='3rem'>{profileData.about}</Text>
    </Box>}
  <Tabs isFitted isLazy={true} size='lg' colorScheme='telegram' variant='enclosed' my='4'>
   <Text 
   as='h2'
   p='5'
   textAlign='center'
   fontSize='1.8rem'
   my='4'
   bg='brand.100'
   borderRadius='5px'>{profileData.username} Favorite</Text>
    <TabList my='4'>
      {['MOVIE','TV'].map((el,index) => {
        return <Tab _selected={{ color: 'white', bg: 'blue.500' }} key={index} padding='3' fontSize='1.4rem'>{el}</Tab>
      })}
    </TabList>
  <TabPanels>
    <TabPanel p='2' height='100%'>
   <Box className='favoriteMovie'>
     <Text 
     as='h4'
     textAlign='center'
     bg='brand.100'
     p='6'
     borderRadius='5px'
     fontSize='1.6rem'>
     Favorite Movie
    </Text>
    {profileData.user.favoriteMovie.length ? 
     <Suspense>
      <CardList data={profileData.user.favoriteMovie}/>
     </Suspense> :
     <Box p='1' textAlign='center' height={['100vh','80vh']} bg='brand.100' borderRadius='5px' my='30'>
       <Text p='1' mt='15rem' fontSize='1.6rem'>{profileData.username} hasn't added any favorite movies yet</Text>
     </Box>
    }
   </Box>
   </TabPanel>
   <TabPanel p='2' height='100%'>
   <Box className='favoriteTvShow'>
     <Text 
     as='h4'
     textAlign='center'
     bg='brand.100'
     p='6'
     borderRadius='5px'
     fontSize='1.6rem'>
     Favorite TV Show
    </Text>
    {profileData.user.favoriteTvShow.length ? 
     <Suspense>
      <CardList data={profileData.user.favoriteTvShow}/>
     </Suspense> :
     <Box p='1' textAlign='center' height={['100vh','80vh']} bg='brand.100' borderRadius='5px' my='30'>
       <Text p='1' mt='15rem' fontSize='1.6rem'>{profileData.username} hasn't added any favorite tv show yet</Text>
     </Box>
    }
   </Box>
   </TabPanel>
  </TabPanels>
  </Tabs>
   </>
   :
   <Suspense>
     <Error message='profile is not found'/>
   </Suspense>
  }
  </Box>
  </AnimationWrapper>
 )
}