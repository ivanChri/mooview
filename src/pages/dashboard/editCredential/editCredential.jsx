import { useParams } from "react-router-dom"
import { lazy,Suspense,useContext } from 'react'
import { userContext } from "../../../App"
import { VStack,Text } from '@chakra-ui/react'
import { changeCredential } from "../../../utils/user"
const Form = lazy(() => import('../../../componentAsset/form/form'))
const AnimationWrapper = lazy(() => import('../../../componentAsset/animationWrapper/animationWrapper'))
export default function EditCredential(){
  const params = useParams()
  const { user,token } = useContext(userContext)
  console.log(user)
  const edit = async (username,email,password,updateInput) => {
    const data = {
      id:user.id,
      username,
      email,
      password,
    }
    data[`new${params.name}`] = updateInput
    try {
      const change = await changeCredential(data,token)
      if(change.statusCode === 200){
        localStorage.clear()
        return true
      }
      return change.response.message
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <AnimationWrapper>
     {user ? 
     <VStack
     p='5'
     mt='100'
     height={['105vh','110vh']}
     width='100%'
     >
      <Text as ='h1' fontSize='1.9rem'>Change {params.name}</Text>
      <Suspense>
        <Form 
         name={`change ${params.name}`}
         updateText={params.name}
         updateInfo={`enter your new ${params.name}`}
         event={edit}
         navigate='/login'
        />
      </Suspense>
     </VStack>
    :
    <Box p='1' textAlign='center' height={['103vh','102vh']} bg='brand.100' borderRadius='5px' my='30'>
     <Text p='2' mt='18rem' fontSize='1.9rem'>You are not logged in, please login first</Text>
    </Box>
    }
    </AnimationWrapper>
  )
}