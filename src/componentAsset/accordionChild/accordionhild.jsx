import {
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Button
  } from '@chakra-ui/react'
export default function AccordionChild(props){
    return(
    <AccordionItem bg='brand.100' borderRadius='12px' mb='5'>
    <h2>
      <AccordionButton p='4' _expanded={{ color: 'white', bg: 'blue.500' }} borderRadius='12px'>
        <Box as="span" fontSize='1.4rem' flex='1' textAlign='left'>
          {props.title}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb='4'>
      {props.children}
    </AccordionPanel>
  </AccordionItem>
    )
}