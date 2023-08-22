import { Box } from "@chakra-ui/react"
import LoadingSpiner from "../spiner/spiner"
export default function Fallback(){
    return(
        <Box height='100vh' m='auto' width='100%' p='2' >
            <LoadingSpiner />
        </Box>
    )
}