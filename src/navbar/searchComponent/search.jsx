import { Input,Button,Box } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { context } from "../navbar"
import { drawerContext } from "../drawer/drawer"
export default function SearchComponent(){
 const {value,handleChange,clearValue} = useContext(context)
  const close = drawerContext ?  useContext(drawerContext) : ''
    const navigate = useNavigate()
    const search = (query) =>{
      if(query){
        return navigate(`/search/${query}`)
      }else{
        return
      }
    }
    return (
        <Box bg='inherit'>
            <Input
            placeholder='search'
            focusBorderColor='rgb(37, 37, 224)'
            size='lg'
            border="none"
            value={value}
            borderRadius='32px'
            bg='#192642' 
            width={['100%','60%']}
            onChange={handleChange}
            />
        <Button colorScheme='telegram' p='1.9rem' m={{base:'2',sm:'1.5',md:'1',lg:'1.5',xl:'1.5'}}  borderRadius='10px' onClick={()=>{
            search(value)
            if(close){
              close()
            }
            clearValue()
        }}>Search</Button>
    </Box>
    )
}