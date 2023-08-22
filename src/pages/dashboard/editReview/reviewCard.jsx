import { Box,VStack,Text,Button,Textarea,MenuItem } from "@chakra-ui/react"
import { SettingsIcon } from "@chakra-ui/icons"
import { Suspense,useState,useRef,lazy } from "react"
const MenuNavigation = lazy(() => import('../../../componentAsset/menu/menu'))
export default function ReviewCard (props) {
  const [disable,setDisable] = useState(true)
  const focusRef = useRef()
  const [review,setReview] = useState(props.data.review)
  const edit = () => {
    setDisable(false)
    focusRef.current.focus()
  }
  const handleReviewChange = (e) => {
    setReview(e.target.value)
  }
  const saveEdit = async () => {
    try {
      return await props.saveEvent({id:props.data.id,review})
    } catch (error) {
      console.log(error)
    } finally {
      setDisable(true)
    }
  }
  const cancelEdit = () => {
    if(confirm('do you want to cancel edit ?') === true){
      setDisable(true)
      setReview(props.data.review)
      return alert('edit cancelled')
    }else{
      return
    }
  }
  const deleteReview = async () => {
    if(confirm('do you want to delete this review ?') === true){
      return await props.deleteEvent(props.data.id)
    }else{
      return
    }
  }
  return(
    <VStack
     className='review-card'
     borderRadius='5px'
     p='2'
     spacing='12px'
     bg='brand.100'>
    <Box p='1' my='1' className='review-header' width='100%'>
      <Text as='h2' p='1' my='1' fontSize='1.6rem'>Review For {props.data.show_title}</Text>
    </Box>
    <Box p='1' my='1' width='100%' className='review-body'>
      <Textarea
        bg='brand.200'
        isReadOnly={disable}
        size='xl'
        fontSize='1.5rem'
        p='4'
        borderRadius='5px'
        ref={focusRef}
        value={review}
        height={['40vh','14vh','15vh','25vh']}
        onChange={handleReviewChange}
        my='1'/>
      <Box className='action-container' p='1' my='3' style={{display:disable ? 'none' : 'block'}}>
        <Button isLoading={props.action} p='1.8rem' fontSize='1.5rem' onClick={saveEdit} mr='3' colorScheme='telegram'>Save</Button>
        <Button p='1.8rem' fontSize='1.5rem' onClick={cancelEdit} colorScheme='telegram'>Cancel</Button>
      </Box>
        <Text as='h3' p='1' my='1' fontSize='1.5rem'>Created:</Text>
        <Text as='span' p='1' fontSize='1.3rem'>{new Date(`${props.data.created_at}`).toUTCString()}</Text>
      </Box>
      <Box alignSelf='end' p='2' className='review-footer'>
        <Suspense>
          <MenuNavigation text={<SettingsIcon />}>
            <Button
            p='2rem'
            loadingText='deleteting'
            width='100%'
            fontSize='1.3rem'
            isLoading={props.action}
            onClick={deleteReview}
            my='1'
            colorScheme='red'>delete</Button>
            <Button
            p='2rem'
            as={MenuItem}
            width='100%'
            my='1'
            fontSize='1.3rem'
            onClick={edit}
            colorScheme='telegram'>Edit</Button>
          </MenuNavigation>
        </Suspense>
      </Box>
    </VStack>
  )
}