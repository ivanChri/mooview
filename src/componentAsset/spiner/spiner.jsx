import { Container,Spinner,Center } from "@chakra-ui/react"
import AnimationWrapper from "../animationWrapper/animationWrapper"
export default function LoadingSpiner(){    
    return(
     <Container height='100%'>
        <Center m='auto' height='100%' lineHeight='80' p='2'>
        <Spinner
         thickness='4px'
         speed='0.65s'
         emptyColor='gray.200'
         color='blue.500'
         size='xl'
        />
        </Center>
        </Container>
    )
}