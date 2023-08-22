import { lazy,Suspense } from 'react'
import { VStack,Text } from '@chakra-ui/react'
import { login } from '../../utils/auth'
const Form = lazy(() => import('../../componentAsset/form/form'))
const AnimationWrapper = lazy(() => import('../../componentAsset/animationWrapper/animationWrapper'))
export default function loginPage () {
  const loginUser = async (username,email,password) => {
    try {
      const data = await login(username,email,password)
      if(data.statusCode === 201){
       localStorage.setItem('user',JSON.stringify(data.response.user))
       localStorage.setItem('token',JSON.stringify(data.response.token))
       localStorage.setItem('profile',JSON.stringify(data.response.user.profile))
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
    <Text as ='h1' fontSize='1.9rem'>Login</Text>
    <Suspense>
      <Form 
      name='login' 
      event={loginUser} 
      message='forget password, change your password'
      passwordInfo=''
      navigate='/'
      route='/forget-password'/>
    </Suspense>
    </VStack>
    </AnimationWrapper>
  )
}