import { Stack,Link } from "@chakra-ui/react"
import { Link as ReactLink } from "react-router-dom"
import { useContext } from "react"
import { drawerContext } from "../drawer/drawer"
import { context } from "../navbar"
export default function LinkComponent(){
  const close = useContext(drawerContext)
  const { user } = useContext(context)
  const link = [
    {
      route:'/',
      name:'Home'
    },
    {
      route:'/discover/movie',
      name:'Movie'
    },
    {
      route:'/discover/tv',
      name:'TV Show'
    },
    user ? null : {
      route:'/login',
      name:'login'
    } ,
    user ? null : {
      route:'/register',
      name:'register'
    } 
    ]
    return(
        <Stack direction={['column','column','column','column','row']} spacing='34px'text-align='center' bg='inherit'>
          {link.filter((el) => el !== null )
          .map((el,index)=>{
            return <Link
            as={ReactLink}
            padding='.5rem'
            fontSize='1.4rem'
            onClick={()=>{
              if(close){
               return close()
              }
            }}
            color='rgb(230, 230, 230)'
            key={index}
            _hover={{
              color:'lightBlue',
            }}
            to={`${el.route}`}>
            {el.name}</Link>
          })}
        </Stack>
    )
}