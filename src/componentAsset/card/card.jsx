import { Image,Text,LinkBox,LinkOverlay } from "@chakra-ui/react"
import { motion } from "framer-motion"
import config from "../../utils/global/config"
import { Link as ReactLink } from "react-router-dom"
const { posterUrl } = config
export default function MovieCard(props){
  return (
    <motion.div
     className="motion-card-wrapper"
     initial={{
      x:-10,
      opacity:0
     }}
     animate={{
      x:0,
      opacity:1
    }}
     transition={{
      duration:1,
       delay:0.3,
       transition:{
        duration:0.5,
        type:'spring', 
         damping: 17 
      }
     }}
    >
    <LinkBox as='div'
     maxW={['sm','350px']}
     height='510px'
     bg='brand.100'
     _hover={{border:'1px solid lightBlue'}} 
     padding='1rem'
     textAlign='center'
     borderRadius='13px'
     mt={['3rem','3.5rem']}
     mb={['3rem','3.5rem']}>
     <LinkOverlay 
     as={ReactLink} 
     to={`/detail/${props.data.first_air_date || props.data.tv_id ? 'tv' : 'movie'}/${ props.data.movie_id || props.data.tv_id || props.data.id}`} >
     <Image 
     src={`${posterUrl}/t/p/w500/${props.data.poster_path}`} 
     alt={props.data.name || props.data.title} 
     loading='lazy' 
     bg='black' 
     boxSize={props.data.poster_path ? ['sm','360px'] : '300px'}
     objectFit='cover' 
     borderRadius='12px' 
     m='auto'/>
    <Text fontSize={['1.3rem','1.5rem']} mt='4' mb='3' padding='2' height='auto'>{props.data.title || props.data.name}</Text>
     </LinkOverlay>
     </LinkBox>
    </motion.div>
   )
}