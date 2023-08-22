import { lazy,useEffect,Suspense,useState,useRef } from 'react';
import { addReview,getReview } from '../../../utils/review';
import { useNavigate } from 'react-router-dom';
import { Box,Textarea,Stack,Text,Button } from "@chakra-ui/react";
const Loading = lazy(() => import('../../../componentAsset/spiner/spiner'))
const Avatar = lazy(() => import('../../../componentAsset/avatar/avatar'))
export default function ReviewComponent (props) {
 const [send,setSend] = useState(false)
 const [review,setReview] = useState('')
 const [action,setAction] = useState(false)
 const [reviewData,setReviewData] = useState([])
 const [load,setLoad] = useState(true)
 const errorRef = useRef('')
 const navigate = useNavigate()
 const handleReviewChange = (e) => {
   setReview(e.target.value)
 }
 const clearReview = () => {
   setReview('')
 }
 useEffect(() => {
   const get = async () => {
     try {
       const data = await getReview(props.data.id)
       if(data.statusCode === 200) {
         return setReviewData(data.response.reviews)
       }
       return setReviewData([])
     } catch (error) {
        console.log(error)
     } finally {
        setLoad(false)
        setAction(false)
        clearReview()
     }
   }
   get()
   return () => {
     setLoad(true)
     setReviewData([])
   }
 },[action])
 const sendReview = async () => {
   try {
    setSend(true)
    const send = await addReview({
      id:props.data.id.toString(),
      title:props.data.title || props.data.name,
      review,
      userId:props.user.id
    },props.token)
    if(send.statusCode === 201){
      return setAction(true)
    }
    return errorRef.current.innerHTML = `<h3>${send.response.message}</h3>`
   }catch (error) {
    console.log(error)
   }finally{
    setSend(false)
   }
 }
  return (
   <Box p='1' my='3'>
    {props.user &&
    <Box 
     className='review-input'
     bg='brand.100' 
     borderRadius='5px' 
     p='3' 
     my='1'>
    <Text as='h2' fontSize='1.8rem' p='2' textAlign={['center','start']}>Share your opinion</Text>
    <Stack direction={['column','row']} p='1' alignItems='center' width='100%' spacing='18px' my='3'>
    <Suspense>
     <Box p='1' 
      _hover={{
       cursor:'pointer'
      }}
     onClick={() => navigate(`/profile/${props.user.profile.sub}`)}
     >
     <Avatar name={props.profile.username} size='xl' img={props.profile.avatar.url}/>
     </Box>
    </Suspense>
    <Textarea 
     placeholder='write your review here' 
     p='3'
     height={['40vh','14vh','15vh','25vh']}
     background='facebook.600'
     size='xl'
     borderRadius='5px'
     width='100%'
     value={review}
     fontSize='1.2rem'
     onChange={handleReviewChange}
     />
    </Stack>
    <Button
     colorScheme='telegram' 
     p='1.9rem' 
     my='4'
     mx={['0','120px']}
     isLoading = {send}
     onClick={() =>sendReview()}
     loadingText='Submitting'
     width={['100%','40%']}>
     <Text fontSize='1.3rem'>Send</Text>
    </Button>
    <Box 
     p='3' 
     bg='brand.200' 
     ref={errorRef} 
     my='5' 
     color='red'
     borderRadius='5px'
     fontSize='1.4rem' 
     textAlign='center'></Box>
    </Box>
    }
    <Stack 
      spacing='25px'
      direction='column'
      p='1'
      my='10'
      height='100%'
      >
     <Text as='h2' fontSize='1.9rem' p='1.2' textAlign='center'>Review</Text>
       {load ? 
      <Box fontSize='1.8rem' borderRadius='5px' p='2' height='600px' textAlign='center'>
        <Suspense>
          <Loading />
        </Suspense>
      </Box>
        :reviewData.length ? 
         reviewData.map((el,index) => {
           return <Box p='5' bg='brand.100' key={index} borderRadius='5px'>
            <Stack className='header' direction='row' alignItems='center' p='2' spacing='8px'>
             <Suspense>
              <Box
               _hover={{
                 cursor:'pointer'
               }} 
               onClick={() => navigate(`/profile/${el.author.profile.sub}`)} p='1'
              >
               <Avatar size='lg' img={el.author.profile.avatar.url} name={el.author.profile.username}/>
              </Box>
             </Suspense>
             <Box p='1.2'>
              <Text fontSize='1.45rem' p='1' as='h4'>Review by {el.author.profile.username}</Text>
             </Box>
            </Stack>
           <Box className='content' p='2' my='2'>
             <Text as='p' lineHeight='2rem' fontSize='1.4rem'>{el.review}</Text>
           </Box>
           <Box className='content-footer' mt='3' p='1'>
            <Text as ='h4' fontSize='1.2rem'>Created:</Text>
            <Text as='span' fontSize='1.1rem'>{new Date(`${el.created_at}`).toUTCString()}</Text>
           </Box>
           </Box>  
         })
        :
      <Box fontSize='2rem' borderRadius='5px' p='0.9' bg='brand.100' height='600px' textAlign='center'>
        <Text as='h2' mt='250'>No Review Found</Text>
      </Box>
      }
    </Stack>
   </Box>
  )
}