import { Stack,Link } from "@chakra-ui/react"
import { Link as ReactLink } from "react-router-dom"
export default function DashboardLink(props) {
 const link = [
    {
      name:'Edit Profile',
      route:'/dashboard/edit-profile'
    },
    {
      name:'View Profile',
      route:`/profile/${props.profile.sub}`
    },
    {
      name:'Favorite Movie',
      route:'/dashboard/favorite/movie'
    },
    {
      name:'Favorite TV Show',
      route:'/dashboard/favorite/tv show'
    },
    {
     name:'Review',
     route:'/dashboard/edit-review'
    },
    {
     name:'History',
     route:'/dashboard/history'
    },
    {
     name:'Change Password',
     route:'/dashboard/edit-credential/Password'
    },
    {
     name:'Change Email',
     route:'/dashboard/edit-credential/Email'
    },
    {
     name:'Logout',
     route:'/dashboard/logout'
    }
 ]
 return(
   <Stack direction='column' spacing='38px'text-align='center' justifyContent='center' alignItems='center' p='1'>
    {link.map((el,index) => {
      return <Link
       as={ReactLink}
       padding='1.9rem'
       borderRadius='5px'
       fontSize='1.8rem'
       colorScheme='telegram'
       color='rgb(230, 230, 230)'
       bg='brand.100'
       width={['100%','90%']}
       textAlign='center'
       key={index}
       _hover={{
        color:'lightBlue',
        border:'0.3px solid lightblue'
      }}
       to={`${el.route}`}
      >{el.name}</Link>
    })}
   </Stack>
 )
}