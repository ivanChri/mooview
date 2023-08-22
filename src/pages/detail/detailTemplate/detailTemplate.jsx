import { Box,Text,Stack,Image,Button } from "@chakra-ui/react"
export default function DetailTemplate(props){
    return(
    <Stack 
     className="content-container" 
     mb='2rem'  
     padding='1' 
     width='100%' 
     direction={['column','row']} 
     spacing='12px'>
     <Box className='image-container' p='2' maxW='lg' width={['100%','450px','400px']} m={['auto','3']}>
        <Image 
         src={`https://image.tmdb.org/t/p/w500/${props.data.poster_path}`} 
         alt={props.data.name || props.data.title} 
         bg='black'
         objectFit='cover' 
         borderRadius='12px' 
         m='auto' />
        <Button 
         colorScheme='telegram' 
         width='100%'
         p='2rem' 
         mt='5'
         onClick={() => props.event(props.data)} 
         isLoading={props.btnAction}
         loadingText='checking'
         >
          <Text fontSize='1.2rem'>{props.btnText}</Text>
        </Button>
     </Box>
     <Box 
       className='content-info' 
       width={['100%','100%','80%']}
       m='auto'
       padding='2'>
       <Box className='info-header'>
       <Text
        as='h1'
        className='title'
        fontSize={['1.8rem','2.4rem']}
        mb='3'
        mt='2'>{props.data.title || props.data.name}</Text>
        <Box  p='4' className="genre" mt='2' mb='2' bg='brand.100' borderRadius='12px'>
         <Text p='1' fontSize='1.2rem'>Genre</Text>
        {props.data.genres &&
        <>
          {props.data.genres.map((el, index) => {
             return <Text 
              as='span'
              mr='1'
              padding='1'
              fontSize='1.1rem'
              display='inline-block'
              key={index}>{el.name}</Text>
          })}
        </>
        }
      </Box>
      </Box>
      <Box  p='4' className="release-year" mt='2' mb='2' bg='brand.100' borderRadius='12px'>
        <Text p='1' fontSize='1.2rem'>Release</Text>
        <Text 
         as='span'
         mr='4'
         padding='1'
         fontSize='1.1rem' 
         display='inline-block'>
         {props.data.first_air_date || props.data.release_date || '-'}
        </Text>
       </Box>
       <Box  p='4' className="score" mt='2' mb='2' bg='brand.100' borderRadius='12px'>
        <Text p='1' fontSize='1.2rem'>user score</Text>
        <Text
         as='span'
         mr='4'
         padding='1'
         fontSize='1.1rem'
         display='inline-block'>
         {props.data.vote_average}
        </Text>
       </Box>
       <Box  p='4' className="score" mt='2' mb='2' bg='brand.100' borderRadius='12px'>
        <Text p='1' fontSize='1.2rem'>Status</Text>
        <Text
         as='span' 
         mr='4' 
         padding='1' 
         fontSize='1.1rem' 
         display='inline-block'>
         {props.data.status}
        </Text>
       </Box>
       <Box className='info-body' mt='2' p='4'>
        <Text as='h3' fontSize={['1.6rem','2rem']} mt='1' mb='2'>Overview</Text>
         <Text
          as='p'
          fontSize={['1.5rem','1.2rem','1.3rem']}
          lineHeight={['3rem','auto']}>
          {props.data.overview}
         </Text>
       </Box>
       </Box>
     </Stack>
    )
}