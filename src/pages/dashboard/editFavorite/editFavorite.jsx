import { useParams } from "react-router-dom"
import { Box,Flex,Text } from "@chakra-ui/react"
import { getUser } from "../../../utils/user"
import { userContext } from "../../../App"
import { useEffect,useState,lazy,useContext,Suspense } from "react"
import { deleteMovieFromFavorite } from "../../../utils/favoriteMovie"
import { deleteTvshowFromFavorite } from "../../../utils/favoriteTvshow"
const Fallback  = lazy(() => import('../../../componentAsset/fallback/fallback'))
const FavoriteCard = lazy(() => import('./favoriteCard'))
const AnimationWrapper = lazy(() => import('../../../componentAsset/animationWrapper/animationWrapper'))
export default function EditFavorite () {
  const { user,token } = useContext(userContext)
  const params = useParams()
  const [data,setData] = useState([])
  const [action,setAction] = useState(false)
  const [load,setLoad] = useState(true)
  const [event,setEvent] = useState()
  useEffect(() => {
   const get = async () => {
    try {
      const getFavorite = await getUser(user.id,token)
      if(params.media === 'movie'){
        return setData(getFavorite.response.user.favoriteMovie)
      }else{
        return setData(getFavorite.response.user.favoriteTvShow)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoad(false)
      setAction(false)
    }
   }
   get()
  },[action])
  useEffect(() => {
    const handleEvent = async () => {
      if(params.media === 'movie'){
        setEvent(() => async (id,token) => {
         return await deleteMovieFromFavorite(id,token)
        })
      }else{
        setEvent(() => async (id,token) => {
         return await deleteTvshowFromFavorite(id,token)
        })
      }
    }
    handleEvent()
  },[])
  const deleteFavorite = async (title,id) => {
    if(confirm(`do you want to delete ${title} ?`)){
      setAction(true)
      return await event(id,token)
    }else{
      return
    }
  }
  return (
    <AnimationWrapper>
     {user ?
    <Box className='favorite-page' p='1' width='100%' height='100%'>
      {load ? <Fallback /> : 
       data.length ?
      <>
      <Text as='h1' fontSize='2.2rem' p='1.2rem' my='2'>Favorite {params.media}</Text>
      <Flex wrap='wrap' p='2' justifyContent='space-evenly' className='favorite-card-container'>
        {data.map((el,index) => {
          return <Box p='2' key={index} className='favorite-card'>
            <Suspense>
               <FavoriteCard data={el} deleteFavorite={deleteFavorite} action={action}/>
            </Suspense>
          </Box>
        })}
      </Flex>
      </>
       : 
     <Box p='1' textAlign='center' height={['100vh','84vh']} bg='brand.100' borderRadius='5px' my='30'>
       <Text p='2' mt='18rem' fontSize='1.9rem'>You haven't added any {params.media} yet</Text>
     </Box>
      }
    </Box>
     : 
    <Box p='1' textAlign='center' height={['103vh','102vh']} bg='brand.100' borderRadius='5px' my='30'>
     <Text p='2' mt='18rem' fontSize='1.9rem'>You are not logged in, please login first</Text>
    </Box>
    }
    </AnimationWrapper>
  )
}