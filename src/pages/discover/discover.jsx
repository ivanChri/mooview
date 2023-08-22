import { Stack } from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import { discover, getGenre } from "../../utils/tmdb"
import { useState,createContext,useEffect,lazy,Suspense} from "react"
import AnimationWrapper from "../../componentAsset/animationWrapper/animationWrapper"
export const context = createContext(null)
const DiscoverNavigation = lazy(()=>import('./discoverNavigation/discoverNavigation'))
const DiscoverContent = lazy(()=>import('./discoverContent/discoverContent'))
export function DiscoverPage(){
  const mediaParam = useParams()
  const [data,setData] = useState([])
  const [genre,setGenre] = useState([{id:9648, name:'Mystery',status:true}])
  const [sliderValues,setSliderValue] = useState(0)
  const [startSearch,setStartSearch] = useState(false)
  const [clickAble,setClickAble] = useState(false)
  const [load,setLoad] = useState(true)
  useEffect(()=>{
    const getMovie = async () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      try{
      const movie = await discover(mediaParam.media,sliderValues,genre.filter(el=>el.status == true))
      const genres = await getGenre(mediaParam.media)
      setGenre(genres)
      setData(movie)
      }catch(err){
        throw err
      }finally{
        setLoad(false)
      }
    }
    getMovie()
    return () => {
      setLoad(true)
      setData([])
      setStartSearch(false)
      setSliderValue(0)
      setClickAble(false)
    }
  },[startSearch])
  const changeGenreStatus = (id) => {
     setGenre(genre.map((genreType)=>{
       if(genreType.id === id){
        return {...genreType,status:!genreType.status}
       }else{
        return genreType
       }
     }))
     setClickAble(oldValue=>true)
  }
  const changeSliderValue = (value) => {
    setSliderValue(oldValue=>value)
    setClickAble(oldValue=>true)
 }
  const search = () =>{
    setStartSearch(oldData=>!oldData)
  }
  return (
    <context.Provider value={{
    data
    ,genre
    ,load
    ,changeGenreStatus
    ,changeSliderValue
    ,search
    ,clickAble
    ,sliderValues
    ,mediaParam
    }}>
     <AnimationWrapper>
        <Stack
         className='discover-page'
         height='100%' as='section'
         width='100%' 
         p='1' 
         direction='column'>
          <Suspense>
           <DiscoverNavigation />
           <DiscoverContent />
           </Suspense>
        </Stack>
     </AnimationWrapper>
    </context.Provider>
  )
 }