import { VStack,Box,Text } from "@chakra-ui/react"
export default function HistoryCard (props) {
  return (
    <>
     <VStack
      className='history-card'
      borderRadius='5px'
      p='2'
      spacing='12px'
      bg='brand.100'>
        <Box p='1' className='history-card-header' width='100%'>
          <Text as='h2' p='1' my='0.5' fontSize='1.6rem'>Activity: {props.data.activity.name}</Text>
          <Text as='h3' p='1' fontSize='1.4rem'>History-ID: {props.data.id}</Text>
        </Box>
     </VStack>
     <Box p='2' borderRadius='5px' width='100%' className='history-card-body' bg='brand.200'>
        <Text as='h3' p='1' fontSize='1.6rem'>Details</Text>
        <Box className='history-detail' p='2'>
           {props.data.detail.review ? 
             <>
              <Text p='1' my='1' fontSize='1.5rem'>Review For: {props.data.detail.showsTitle}</Text>
              <Text p='1' my='1' fontSize='1.5rem'>Show-ID: {props.data.detail.showsId}</Text>
              <Text p='1' my='1' fontSize='1.5rem'>Review:</Text>
              <Text as='p' p='3' borderRadius='5px' bg='brand.100' fontSize='1.48rem'>{props.data.detail.review}</Text>
             </>
             : 
             <>
              <Text p='1' my='1' fontSize='1.5rem'>Show-ID: {props.data.detail.id}</Text>
              <Text p='1' my='1' fontSize='1.5rem'>Title: {props.data.detail.title}</Text>
             </> 
            }
        </Box>
     </Box>
     <Box className='history-card-footer' p='2'>
       <Text as='h3' p='1' my='1' fontSize='1.4rem'>Commit: {new Date(`${props.data.commit}`).toUTCString()}</Text>
     </Box>
    </> 
  )
}