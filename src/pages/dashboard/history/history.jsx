import { Box,VStack,Text, MenuItem,Button,Link } from "@chakra-ui/react"
import { useState,useEffect,lazy,Suspense,useContext } from "react"
import { userContext } from "../../../App"
import { getUser,deleteHistory } from "../../../utils/user"
import { TriangleUpIcon } from "@chakra-ui/icons"
const AnimationWrapper = lazy(() => import('../../../componentAsset/animationWrapper/animationWrapper'))
const Fallback = lazy(() => import('../../../componentAsset/fallback/fallback'))
const HistoryCard = lazy(() => import('./historyCard'))
const MenuNavigation = lazy(() => import('../../../componentAsset/menu/menu'))
export default function History () {
  const {user,token} = useContext(userContext)
  const [historyData,setHistoryData] = useState([])
  const [load,setLoad] = useState(true)
  const [action,setAction] = useState(false)
  useEffect(() => {
    const getHistory = async () => {
      try {
        const getHistory = await getUser(user.id,token)
        return setHistoryData(getHistory.response.user.historyRecord)
      } catch (error) {
        console.log(error)
      } finally {
        setLoad(false)
        setAction(false)
      }
    }
    getHistory()
  },[load])
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }
  const clearHistory = async () => {
    try {
      setAction(true)
      return await deleteHistory(user.id,token)
    } catch (error) {
      alert(error)
    } finally {
      setAction(false)
      setLoad(true)
    }
  }
  const confirmDelete = async () => {
    if(confirm('Clear History ?') === true){
      return await clearHistory()
    }else{
      return
    }
  }
  return (
   <AnimationWrapper>
    {user ?
    <Box
    className='history-page'
    p='2'
    mt='100'
    height='100%'
    width='100%'
    position='relative'
    >
     {load ? <Fallback /> :
      historyData.length ?
     <>
     <Text as='h1' fontSize='2.2rem' p='1.2rem' my='2'>History</Text>
     <Box className='menu-container' p='2' position='fixed' bottom='5' right='6.5'>
       <Suspense>
        <MenuNavigation text={<TriangleUpIcon />}>
          <Button 
           as={MenuItem}
           p='2rem'
           width='100%'
           fontSize='1.5rem'
           colorScheme='telegram'
           onClick={scrollToTop}>back top</Button>
          <Button
           p='2rem'
           width='100%'
           loadingText='deleteting'
           fontSize='1.5rem'
           isLoading={action}
           onClick={confirmDelete}
           my='1.5'
           colorScheme='red'>clear history</Button>
        </MenuNavigation>
       </Suspense>
     </Box>
     <VStack p='2' className='history-container' height='100%' justifyContent='space-between' spacing='24px'>
       {historyData.map((el,index) => {
         return <Box className='history-card-container' p='2' bg='brand.100' key={index} width='100%'>
           <Suspense>
             <HistoryCard data={el}/>
           </Suspense>
         </Box>
       })}
     </VStack>
     </>
     : 
     <Box p='1' textAlign='center' height={['100vh','84vh']} bg='brand.100' borderRadius='5px' my='30'>
       <Text p='2' mt='18rem' fontSize='1.9rem'>History not found</Text>
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