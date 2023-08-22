import { motion } from "framer-motion"
import { Box } from "@chakra-ui/react"
export default function AnimationWrapper({children}){
    const variant = {
      visible:{
        opacity:1,
        transition:{
          duration:0.4,
          delay:0.1
        },
        height:'100%',
      },
        hidden:{
          opacity:0,
          height:'180vh'
        },
        exit:{
         opacity:0,
         transition:{
          duration:0.4,
          delay:0.01
         },
        }
    }
  return(
    <Box
     as={motion.div}
     variants={variant}
     animate='visible'
     initial='hidden'
     exit='exit'
     className='animation-wrapper'
    >
    {children}
    </Box>
  )
}