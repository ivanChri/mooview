import { Box } from '@chakra-ui/react';
import { useContext,lazy,Suspense } from "react";
import { context } from '../navbar';
import { drawerContext } from '../drawer/drawer';
import { Link as ReactLink } from "react-router-dom"
const Avatar = lazy(() => import('../../componentAsset/avatar/avatar'))
export default function UserComponent () {
 const close = useContext(drawerContext)
 const { profile } = useContext(context)
  return (
    <Box
     p='1'
     as={ReactLink}
     to='/dashboard'
     onClick={()=>{
      if(close){
       return close()
      }
    }}
    >
    <Suspense>
      <Avatar size={['xl','xl','xl','lg']} name={profile.username} img={profile.avatar.url}/>
    </Suspense>
    </Box>
  )
}