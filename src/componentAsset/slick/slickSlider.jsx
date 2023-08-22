import Slider from "react-slick"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { lazy,useState,Suspense } from "react"
import { Box } from '@chakra-ui/react'
const Card = lazy(() => import('../card/card'))
const Navigation = lazy(() => import("../../pages/home/homeContent/contentNavigation/contentNavigation"))
export default function slickSlider (props) {
 const [sliderRef, setSliderRef] = useState(null)
 const sliderSetting = {
    infinite: false,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    lazy:true,
    responsive: [
      {
       breakpoint:1280,
       settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: false,
        dots: false
      }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint : 820,
        settings:{
            slidesToShow:2.5,
            slidesToScroll:2
        }
      },
      {
        breakpoint : 800,
        settings:{
           slidesToShow: 2.3,
            slidesToScroll:2
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint:500,
        settings:{
            slidesToShow:1,
            slidesToScroll:1
        }
      }
    ]
}
 return (
    <>
   <Box as={Slider}
   {...sliderSetting}
   ref={setSliderRef}
   padding='1'
   width='100%'
   height={['600px','580px','590px']}
   overflow='hidden'
   mb='2'
   mt='2'
   >
    {
     props.data.map((el,index) => {
      return <Box key={index} p='1'>
        <Card data={el}></Card>
        </Box>
     })
    }
   </Box>
   <Suspense>
   <Navigation prev={sliderRef?.slickPrev} next={sliderRef?.slickNext}></Navigation>
   </Suspense>
   </>
 )
}