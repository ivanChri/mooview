import { 
  Flex,
  IconButton 
} from "@chakra-ui/react"
import { ArrowLeftIcon,ArrowRightIcon } from "@chakra-ui/icons";
export default function ContentNavigation(props){
    return(
        <>
        <Flex className='navigation'  p='2' justifyContent='space-around' display={['none','none','flex']} alignItems='center' mt='2' mb='2'>
            <IconButton
                colorScheme='telegram'
                aria-label='prev'
                size='lg'
                onClick={props.prev}
                padding='9'
                mr='3'
                icon={<ArrowLeftIcon />} />
            <IconButton
                colorScheme='telegram'
                aria-label='next'
                padding='9'
                size='lg'
                onClick={props.next}
                icon={<ArrowRightIcon />} />
        </Flex>
     </>
    )
}