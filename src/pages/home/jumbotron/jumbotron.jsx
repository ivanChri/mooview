import { Box,Text} from "@chakra-ui/react"
export default function Jumbotron(){
    return(
        <Box
         backgroundImage= "linear-gradient(rgba(56, 78, 87, 0.8),rgba(40, 50, 68, 0.8)),url('https://image.tmdb.org/t/p/w500/rqbCbjB19amtOtFQbb3K2lgm2zv.jpg')"
         height='80vh'
         width='100%'
         backgroundPosition='center'
         bgSize='cover'
         position='relative'
         alt='hero-image'
         className='jumbotron'
        >
        <Box className='jumbotron-text' padding='2'  bg='none' margin='auto' position='absolute' top={['150px','250px','300px']}>
          <Text as='h1' fontSize='3.5rem' lineHeight='3.5rem' mb='3'>welcome</Text>
          <Text as='p' fontSize='1.9rem' lineHeight='3rem'>Discover milions TV show and Movies explore now on Mooview</Text>
        </Box>
        </Box>
    )
}
``