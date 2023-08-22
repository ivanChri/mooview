import { Box } from "@chakra-ui/react"
import { lazy, Suspense, useContext } from "react"
import { context } from "../discover"
import Error from "../../../componentAsset/error/error"
const Fallback = lazy(()=>import('../../../componentAsset/fallback/fallback'))
const CardList = lazy(()=>import('../../../componentAsset/cardList/cardLIst'))
export default function DiscoverContent(){
 const {data,load} = useContext(context)
 return (
    <Box className='discover-content' p='1' mt='8rem' width='100%' height='100%'>
      {load ?
      <Suspense>
        <Fallback />
      </Suspense>
      : data.length ?
      <Suspense>
      <CardList data={data}/>
      </Suspense>
      : <Error message='Oppps Something Went Wrong'/>} 
    </Box>
 )
}