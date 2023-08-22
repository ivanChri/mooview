import {Flex} from "@chakra-ui/react"
import MovieCard from "../card/card"
import Error from "../error/error"
export default function CardList(props){
  return (
    <Flex  wrap='wrap' p='1.5' justifyContent='space-evenly' className='card-content-container'>
      {props.data.length ? props.data.map((el,index)=>{
        return <MovieCard data={el} key={index}/>
    }):<Error message={props.message}/>} 
    </Flex>
  )
}