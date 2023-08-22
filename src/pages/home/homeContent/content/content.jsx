import { Box } from "@chakra-ui/react"
import { lazy,Suspense } from "react"
import ContentHeader from "../contentHeader/contentHeader"
const LoadingSpiner = lazy(()=>import("../../../../componentAsset/spiner/spiner"))
const ErrorComponent = lazy(()=>import('../../../../componentAsset/error/error'))
const SlickSlider = lazy(()=>import('../../../../componentAsset/slick/slickSlider'))
export default function ContentSection(props){
  return(
   <>
   <ContentHeader title={props.title} keyword={props.keyword} setParam={props.event}/>
   <Box className="content-section" height={['650px','660px','720px']} p='1' width='100%' bg='brand.200'>
    {props.isLoading ?
      <Suspense>
      <LoadingSpiner />
      </Suspense>:
      props.movie.length ?
      <>
      <Suspense>
      <SlickSlider data={props.movie}/>
      </Suspense>
      </>
      :<Suspense><ErrorComponent message='Opps Something Went Wrong'/></Suspense>
   }
   </Box>
   </>
  )
 }