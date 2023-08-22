import { Box } from "@chakra-ui/react"
import { lazy,Suspense } from "react"
const AnimationWrapper = lazy(()=>import("../../componentAsset/animationWrapper/animationWrapper"))
const Jumbotron = lazy(()=>import("./jumbotron/jumbotron"))
const TrendingSection = lazy(()=>import("./template/template").then(module=>{
  return {default:module.TrendingSection}
}))
const NewMovieSection = lazy(()=>import("./template/template").then(module=>{
  return {default:module.NewMovieSection}
}))
const RecomendMovieSection = lazy(()=>import("./template/template").then(module=>{
  return {default:module.RecomendMovieSection}
}))
export default function Home(){
 return(
  <AnimationWrapper>
    <Box as='section' className="home">
      <Suspense>
      <Jumbotron />
      <TrendingSection />
      <NewMovieSection />
      <RecomendMovieSection />
      </Suspense>
   </Box>
  </AnimationWrapper>
 )
}