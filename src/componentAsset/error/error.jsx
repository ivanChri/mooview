import { Container,Text,Center } from "@chakra-ui/react";
export default function Error(props){
  return(
    <Container className='error-message' height={['800px','100vh']} width='100%' p='1'>
         <Center height='100%' p='2'>
            <Text m='auto' p='1' as='h2' fontSize={['1.3rem','2rem','2.5rem']}>{props.message}</Text>
         </Center>
    </Container>
  )
}