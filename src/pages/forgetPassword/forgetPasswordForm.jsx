import { lazy,Suspense } from 'react'
import { VStack,Text } from '@chakra-ui/react'
import { forgetPassword } from '../../utils/auth'
const Form = lazy(() => import('../../componentAsset/form/form'))
const AnimationWrapper = lazy(() => import('../../componentAsset/animationWrapper/animationWrapper'))
export default function ForgetPasswordPage () {
  const forgetPasswordUser = async (username,email,password) => {
    try {
       const data = await forgetPassword(username,email,password)
       if(data.statusCode === 200){
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
    <Text as ='h1' fontSize='1.6rem'>Change Password</Text>
    <Suspense>
      <Form 
      name='change password' 
      event={forgetPasswordUser} 
      message='if you want you can also create a new account'
      passwordInfo='enter your new password'
      navigate='/login'
      route='/register'/>
    </Suspense>
    </VStack>
    </AnimationWrapper>
  )
}