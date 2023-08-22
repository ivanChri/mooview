import { useParams } from "react-router-dom"
import {  searchMovie } from "../../../utils/tmdb"
import { Box } from "@chakra-ui/react"
import { useState,useEffect,lazy,Suspense} from "react"
import Fallback from "../../../componentAsset/fallback/fallback"
const AnimationWrapper = lazy(()=>import("../../../componentAsset/animationWrapper/animationWrapper"))
const SearchNavigation = lazy(()=>import("./searchNavigation/searchNavigation"))
const ContentCard = lazy(()=>import("../../../componentAsset/cardList/cardLIst"))
const ErrorComponent = lazy(()=>import("../../../componentAsset/error/error"))
export default function SearchResultPage(){
 const param = useParams()
 let searchQuery=param.query.replaceAll(' ','+')
 const [data,setData] = useState([])
const [show,setShow] = useState([])
const [type,setType] = useState('movie')
 const [load,setLoad] = useState(true)
 useEffect(()=>{
   const getData = async (query) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    try{
    const datas = await searchMovie(query)
    setData(datas)
    changeData(type,datas)
   }catch(err){
    console.log(err)
   }finally{
    setLoad(false)
   }
   }
   getData(searchQuery)
   return () =>{
    setLoad(true)
   }
 },[type])
 const changeData = (mediaType,data) =>{
  const filter = data.filter((el)=>{
    return el.media_type === type
 })
  setType(mediaType)
  setShow(filter)
}
 return(
  <AnimationWrapper>
     <Box as='section' height='auto' width='100%' padding={['1','1rem']} className="seacrh-result-page">
      <Suspense><SearchNavigation query={param.query} event={changeData} data={data}/></Suspense>
     {load ? <Fallback /> :
         data.length ?
         <Suspense><ContentCard data={show} message='no result found for this media type'/></Suspense>
        :<Suspense><ErrorComponent message={`cannot find ${param.query}`}/></Suspense>
      }
      </Box>
  </AnimationWrapper>
 )
}