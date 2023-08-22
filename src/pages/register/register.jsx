import { lazy,Suspense } from 'react'
import { VStack,Text } from '@chakra-ui/react'
import { register } from '../../utils/auth'
const Form = lazy(() => import('../../componentAsset/form/form'))
const AnimationWrapper = lazy(() => import('../../componentAsset/animationWrapper/animationWrapper'))
export default function RegisterPage () {
  const registerUser = async (username,email,password) => {
    try {
      const data = await register(username,email,password)
      if(data.statusCode === 201){
        return true
      }
      return data.response.message
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <AnimationWrapper>
    <VStack
     p='5'
     mt='100'
     height={['99vh','110vh']}
     width='100%'
    >
    <Text as ='h1' fontSize='1.8rem'>Register</Text>
    <Suspense>
      <Form 
      name='register' 
      event={registerUser}
      navigate='/login' 
      message='already have an account login' 
      route='/login'
      passwordInfo='please use a strong password with a combination of numbers and letters'
      />
    </Suspense>
    </VStack>
    </AnimationWrapper>
  )
}