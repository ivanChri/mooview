import { useContext,lazy,Suspense } from "react"
import { Button,Box,Accordion,Text } from "@chakra-ui/react"
import { context } from "../discover"
const SliderNavigation = lazy(()=>import('../../../componentAsset/slider/slider'))
const AccordionChild = lazy(()=>import('../../../componentAsset/accordionChild/accordionhild'))
export default function DiscoverNavigation(){
  const {genre,changeGenreStatus,search,clickAble,mediaParam} = useContext(context)
return (
 <Box className='discover-navigation' p='3' width='100%'  mb='3'>
   <Text as='h1' fontSize='1.8rem' mb='3'  mt='1' p='2'>{mediaParam.media.toUpperCase()} Discover</Text>
   <Accordion className='discover-accordion' allowToggle >
    <Suspense>
     <AccordionChild title='Genre'>
     <Box className='genre'>
    {genre.map((el,index)=>{
     return <Button key={index}
     colorScheme='telegram'
     padding='8'
     m='2.5'
     style={{border:el.status ? '2px solid white' : ''}}
     onClick={()=>changeGenreStatus(el.id)}>{el.name}</Button>
    })}
     </Box>
     </AccordionChild>
    <AccordionChild title='User Score'>
     <Box p='5' className='slider-container'>
     <SliderNavigation />
     </Box>
    </AccordionChild>
     <Box className='user-score-navigation' p='1' mt='2' mb='2'>
      <Button p='10' colorScheme='telegram' width='100%' mb='3' onClick={search} isDisabled={clickAble ? false : true} fontSize='1.5rem'>Search</Button>
    </Box>
    </Suspense>
    </Accordion>
 </Box> 
)
}