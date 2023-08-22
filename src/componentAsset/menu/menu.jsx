import {Menu,MenuList,MenuButton,Button,Text} from "@chakra-ui/react"
export default function MenuNavigation(props){
    return(
     <Menu isLazy={true}>
       <MenuButton as={Button} size='lg' colorScheme='telegram' textAlign='center' borderRadius='12px' padding='9'>
         <Text fontSize='1.2rem' m='auto'>{props.text}</Text>
       </MenuButton>
       <MenuList bg='brand.100' padding='4'>
          {props.children}
       </MenuList>
     </Menu>
    )
}
