import { Box,VStack,Text } from "@chakra-ui/react"
import { useState,useEffect,lazy,Suspense,useContext } from "react"
import { editReview,deleteReview } from "../../../utils/review"
import { userContext } from "../../../App"
import { getUser } from "../../../utils/user"
const Fallback = lazy(() => import('../../../componentAsset/fallback/fallback'))
const AnimationWrapper = lazy(() => import('../../../componentAsset/animationWrapper/animationWrapper'))
const ReviewCard = lazy(() => import('./reviewCard'))
export default function EditReview () {
  const {user,token} = useContext(userContext)
  const [reviewData,setReviewData] = useState([])
  const [load,setLoad] = useState(true)
  const [action,setAction] = useState(false)
  useEffect(() => {
    const getReview = async () => {
      try {
        const review = await getUser(user.id,token)
        return setReviewData(review.response.user.review)
      } catch (error) {
        console.log(error)
      } finally {
        setLoad(false)
        setAction(false)
      }
    }
    getReview()
  },[load])
  const saveEditReview = async (review) => {
    try {
      setAction(true)
      return await editReview(review,token)
    } catch (error) {
      console.log(error)
    } finally {
      setAction(false)
      setLoad(true)
    }
  }
  const deleteReviewData = async (id) => {
    try {
      setAction(true)
      return await deleteReview(id,token)
    } catch (error) {
      console.log(error)
    } finally {
      setAction(false)
      setLoad(true)
    }
  }
  return (
   <AnimationWrapper>
    {user ?
    <Box
    className='edit-review-page'
    p='2'
    mt='100'
    height='100%'
    width='100%'
    >
      {load ? <Fallback /> : 
      reviewData.length ?
      <>
     <Text as='h1' fontSize='2.2rem' p='1.2rem' my='2'>Review</Text>
      <VStack p='2' className='review-container' height='100%' justifyContent='space-between' spacing='24px'>
       {reviewData.map((el,index) => {
         return <Box p='1' bg='brand.100' key={index} className='review-card-container' width='100%'>
            <Suspense>
             <ReviewCard data={el} saveEvent={saveEditReview} deleteEvent={deleteReviewData} action={action}/>
            </Suspense>
         </Box>
       })}
      </VStack>
      </>
      :
      <Box p='1' textAlign='center' height={['100vh','84vh']} bg='brand.100' borderRadius='5px' my='30'>
       <Text p='2' mt='18rem' fontSize='1.9rem'>You haven't added any review yet</Text>
      </Box>
     }  
    </Box>
    : 
    <Box p='1' textAlign='center' height={['103vh','102vh']} bg='brand.100' borderRadius='5px' my='30'>
     <Text p='2' mt='18rem' fontSize='1.9rem'>You are not logged in, please login first</Text>
    </Box>
    }
  </AnimationWrapper>
  )
}