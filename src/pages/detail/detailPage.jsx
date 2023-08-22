import { useParams } from "react-router-dom"
import { Box } from "@chakra-ui/react"
import { useState,useEffect,lazy,Suspense,useContext } from "react"
import { userContext } from "../../App"
import { getDetailMovies } from "../../utils/tmdb"
import { getFavoriteMovie,addMovieToFavorite,deleteMovieFromFavorite } from "../../utils/favoriteMovie"
import { getFavoriteTvshow,addTvshowToFavorite,deleteTvshowFromFavorite } from "../../utils/favoriteTvshow"
const DetailTemplate = lazy(()=>import('./detailTemplate/detailTemplate'))
const ErrorComponent = lazy(()=>import('../../componentAsset/error/error'))
const ReviewComponent = lazy(()=> import('./review/review'))
const Fallback = lazy(() => import('../../componentAsset/fallback/fallback'))
export default function DetailPage(){
  const params = useParams()
  const {user,token,profile} = useContext(userContext)
  const [data,setData] = useState({})
  const [load,setLoad] = useState(true)
  const [btnText,setBtnText] = useState('')
  const [btnAction,setBtnAction] = useState(true)
  const [event,setEvent] = useState()
  useEffect(()=>{
    const getData = async () =>{
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      try{
        const movieData = await getDetailMovies(params.id,params.media)
        setData(movieData)
      }catch(error){
        console.log(error)
      }finally{
        setLoad(false)
      }
    }
    getData()
  },[])
  useEffect(() => {
  const setBtnEvent = async () => {
      try {
        if(user && token){
          if(params.media === 'movie'){
            const getMovie = await getFavoriteMovie({id:params.id,userId:user.id},token)
            return await handleBtnEvent({
              data:getMovie.response.movie,
              post:addMovieToFavorite,
              delete:deleteMovieFromFavorite
            })
          }else if(params.media === 'tv'){
            const getTvshow = await getFavoriteTvshow({id:params.id,userId:user.id},token)
            return await handleBtnEvent({
              data:getTvshow.response.tvshow,
              post:addTvshowToFavorite,
              delete:deleteTvshowFromFavorite
            })
          }
        }else{
          setBtnText(`add to favorite`)
          return setEvent(() => () => alert('You are not logged in, please login first'))
        }
    } catch (error) {
      console.log(error)
    } finally {
      setBtnAction(false)
    }
  }
  setBtnEvent()
  },[btnAction])
  const handleBtnEvent = async (params) => {
    if(params.data){
      setBtnText('remove from favorite')
      setEvent(() => async () => {
        await params.delete(params.data.id,token)
        setBtnAction(true)
      })
    }else{
      setBtnText('add to favorite')
      setEvent(() => async (detailData) => {
        await params.post({
         id:detailData.id,
         title:detailData.title || detailData.name,
         poster:detailData.poster_path,
         userId:user.id
        },token)
        setBtnAction(true)
      })
    }
  }
  return(
   <Box 
    className='detail-page' 
    height='100%'
    mt='6.2rem' 
    mb='0' 
    width='100%' 
    padding='2' 
    >
    {load ?  <Fallback /> :
      data ? <Suspense>
       <DetailTemplate data={data} event={event} btnText={btnText} btnAction={btnAction}/>
       <Suspense><ReviewComponent profile={profile} user={user} token={token} data={data}/></Suspense>
      </Suspense> : 
      <Suspense><ErrorComponent message='opps something went wrong'/></Suspense>
    }
    </Box>
  )
}