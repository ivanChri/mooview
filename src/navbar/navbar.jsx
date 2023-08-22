import { useState,lazy,Suspense,useEffect,createContext,useContext } from "react"
import { userContext } from "../App"
import { Link } from "react-router-dom"
import { Flex,Text,Box } from "@chakra-ui/react"
import LinkComponent from "./link/link"
import SearchComponent from "./searchComponent/search"
const UserComponent = lazy(() => import("./user/user"))
const Drawer = lazy(()=>import("./drawer/drawer").then(module=>{
  return {default:module.Drawers}
}))
export const context = createContext(null)
export  function Navbar(){
  const breakpoint = {base:'none',lg:'none',md:'none',sm:'none',xl:'inline-block'}
  const { user,profile } = useContext(userContext)
  const [value, setValue] = useState('')
  const handleChange = (event) => {
    setValue(event.target.value)
  }
  const clearValue = () =>{
    setValue('')
  }
  const [width,setWidth] = useState(window.innerWidth)
  window.addEventListener('resize',()=>{
    setWidth(window.innerWidth)
  })
  const [visible,setVisible] = useState(false)
  useEffect(()=>{
    const updateWindowSize = () =>{
      if(width < 1200){
        setVisible(true)
      }else{
        setVisible(false)
      }
    }
    updateWindowSize()
    return () => {
      setVisible(false)
    }
  },[width])
  return(
    <context.Provider value={{value,handleChange,clearValue,user,profile}}>
    <Box as='header' p='6' className='header'  width={window.innerWidth} bg='brand.100' position='fixed' top='0' zIndex='999' boxShadow='dark-lg'>
    <Flex as='nav'  justify='space-between' align='center' w='100%'>
       <Text as='h1' fontSize='1.8rem'><Link to={'/'}>Mooview</Link></Text>
       {visible ? <Suspense><Drawer /></Suspense> : 
       <>
       <Box className='link-container' display={breakpoint}>
         <LinkComponent />
        </Box>
        { user && <Box className='user-component-container' display={breakpoint}>
          <Suspense><UserComponent /></Suspense>
        </Box>
        }
        <Box className='search-container' display={breakpoint}>
          <SearchComponent />
        </Box>
        </>
      }
    </Flex>
    </Box>
    </context.Provider>
  )
}