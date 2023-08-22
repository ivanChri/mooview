import { useState,useEffect,lazy,Suspense } from "react";
import { Box } from "@chakra-ui/react";
const ContentComponent = lazy(()=>import('../content/content'))
export default function ContentParent(props){
    const [data,setData] = useState([])
    const [load,setLoad] = useState(true)
    const [arg,setArg] = useState(props.keyword[0].param)
    useEffect(()=>{
        const getData = async (arg) =>{
          try{
            const movieData =  await props.fetch(arg)
            setData(movieData)
          }catch(err){
            console.log(err)
          }finally{
            setLoad(false)
          }
        }
    getData(arg)
    return () =>{
        setLoad(true)
    }
    },[arg])
    const changeArg = (key) =>{
        setArg(key)
    }
  return(
    <Box as='article' className={props.class}>
      <Suspense>
      <ContentComponent
        title={props.title}
        movie={data}
        event={changeArg}
        keyword={props.keyword}
        isLoading={load}
        />
      </Suspense>
    </Box>
  )
}