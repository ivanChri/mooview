import { Box,Flex,Text,Button } from "@chakra-ui/react"
import { SettingsIcon } from "@chakra-ui/icons"
import { lazy,Suspense } from "react"
const Card = lazy(() => import('../../../componentAsset/card/card'))
const MenuNavigation = lazy(() => import('../../../componentAsset/menu/menu'))
export default function FavoriteCard (props) {
  return (
    <>
      <Flex
       direction='row'
       wrap='wrap'
       className='favorite-card-header'
       justifyContent='space-between'
       alignItems='center'
       borderRadius='5px'
       p='2'
       bg='brand.100'>
        <Box p='2' width='200px'>
         <Text as='span' fontSize='1.6rem' p='1'>{props.data.title}</Text>
        </Box>
        <Suspense>
          <MenuNavigation text={<SettingsIcon />}>
            <Button
            p='2rem'
            onClick={() => props.deleteFavorite(props.data.title,props.data.id)}
            isLoading={props.action}
            width='100%'
            fontSize='1.5rem'
            loadingText='Deleteting'
            colorScheme='red'>delete</Button>
          </MenuNavigation>
        </Suspense>
        </Flex>
        <Box className='favorite-card-header'>
         <Suspense>
           <Card data={props.data}/>
         </Suspense>
        </Box>
    </>
  )
}