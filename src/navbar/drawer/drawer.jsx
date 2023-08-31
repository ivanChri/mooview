import { useContext } from 'react'
import { context } from '../navbar.jsx'
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    IconButton,
    Text,
    Stack,
  } from '@chakra-ui/react'
  import { HamburgerIcon } from '@chakra-ui/icons'
  import { useRef,createContext} from 'react'
  import UserComponent from '../user/user.jsx'
  import LinkComponent from '../link/link.jsx'
  import SearchComponent from '../searchComponent/search.jsx'
  export const drawerContext = createContext(null)
  export  function Drawers(){
     const { user } = useContext(context)
     const {isOpen,onClose,onOpen} = useDisclosure()
     const btnRef = useRef()
       return (
        <drawerContext.Provider value={onClose}>
           <IconButton 
           ref={btnRef} 
           aria-label='navigation-button'
           colorScheme='inherit'
           size='lg'
           onClick={onOpen}
           icon={<HamburgerIcon />}
           fontSize='2.1rem'
           p='1.8'
           display={['block','block','block','block','none','none']}
           />
           <Drawer
            isOpen={isOpen}
            placement='top'
            onClose={onClose}
            finalFocusRef={btnRef}
            >
            <DrawerOverlay />
              <DrawerContent bg='#233458'>
                <DrawerCloseButton fontSize='1.5rem'/>
                  <DrawerHeader><Text fontSize='1.8rem'>Mooview</Text></DrawerHeader>
                    <DrawerBody mb='4'>
                        <Stack direction='column' p='1' spacing='24px' text-align='center' mb='4' mt='2' bg='inherit'>
                          {user && <UserComponent />}
                          <LinkComponent />
                          <SearchComponent />
                         </Stack>
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
          </drawerContext.Provider>
            )
  }
