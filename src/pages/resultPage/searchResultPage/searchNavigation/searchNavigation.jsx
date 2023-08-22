import { Tabs, TabList, Tab,Text } from '@chakra-ui/react'
export default function SearchNavigation(props){
  const totalResult = (media) => {
    const filter = props.data.filter((el)=>{
        return el.media_type === media
     })
    return filter.length
  }
  return(
    <><Text as='h2' fontSize='1.8rem' p='2' className='result-header' mb='10' mt='8'>Result For {props.query}</Text>
     <Tabs isFitted isLazy={true} size='lg' colorScheme='telegram' variant='enclosed'>
          <TabList mb='1em'>
              {['movie', 'tv'].map((el, index) => {
                 return <Tab  _selected={{ color: 'white', bg: 'blue.500' }} key={index} padding='3' fontSize='1.3rem' onClick={() => props.event(el,props.data)}>{el.toLocaleUpperCase()} ({totalResult(el)})</Tab>
              })}
          </TabList>
      </Tabs>
    </>
  )
}