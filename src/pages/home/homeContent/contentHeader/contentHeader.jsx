import {Button,Text,Flex,MenuItem} from "@chakra-ui/react"
import { useState,lazy,Suspense} from "react"
const MenuNavigation = lazy(()=>import("../../../../componentAsset/menu/menu"))
export default function ContentHeader(props){
  const [btnText,setBtnText] = useState(props.keyword[0].name)
    return(
      <Flex className='content-header' bg='brand.100' my='5' p='6' justifyContent='space-between' alignItems='center'>
        <Text as='h1' fontSize='1.5rem'>{props.title}</Text>
        <Suspense>
        <MenuNavigation text={btnText}>
        {props.keyword.map((el,index)=>{
          return <Button
            key={index}
            as={MenuItem}
            textAlign='center'
            width='100%'
            p='7'
            my='2'
            colorScheme='telegram'
            onClick={()=>{
            setBtnText(el.name)
            props.setParam(el.param)
           }}>
          <Text fontSize='1.1rem'>{el.name}</Text>
          </Button>
         })}
        </MenuNavigation>
        </Suspense>
      </Flex>
    )
}