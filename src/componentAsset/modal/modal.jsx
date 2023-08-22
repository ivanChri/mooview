import {
 Modal,
 ModalOverlay,
 ModalContent,
 ModalHeader,
 ModalFooter,
 ModalBody,
 Button,
 ModalCloseButton,
 Stack,
 Box
} from '@chakra-ui/react'
import AvatarComponent from '../avatar/avatar'
export default function ModalComponent(props){
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size='xl'>
      <ModalOverlay />
      <ModalContent bg='brand.200' p='2'>
        <ModalHeader fontSize='1.5rem'>Change Avatar</ModalHeader>
        <ModalCloseButton p='2'/>
        <ModalBody p='2' mx='3' my='3'>
          <Stack direction='row' p='6' spacing={['16px','30px']} alignItems='center' justifyContent='center'>
          {props.data.map((el,index) => {
            return <Box p='1'
              onClick={() => props.change(el.id)}
              style={{border:el.status ? '2px solid green' : ''}} 
              borderRadius='50%'
              key={index}>
              <AvatarComponent 
               key={index}
               img={el.url}
               size={['xl','2xl']}
              />
            </Box>
          })}
          </Stack>
        </ModalBody>
        <ModalFooter p='2' my='3'>
          <Button colorScheme='blue' p='2rem' fontSize='1.2rem' mr={3} onClick={props.onClose}>
            Close
          </Button>
          <Button colorScheme='blue' p='2rem' fontSize='1.2rem' mr={3} onClick={() => {
            props.save()
            props.onClose()
          }}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}