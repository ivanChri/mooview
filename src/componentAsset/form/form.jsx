import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Text,
  Box,
  Link
} from '@chakra-ui/react'
import { ViewIcon,ViewOffIcon } from '@chakra-ui/icons'
import { useState,useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link as ReactLink } from "react-router-dom"
export default function Form (props) {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [username,setUsername] = useState('')
  const [updateValue,setUpdateValue] = useState('')
  const [load,setLoad] = useState(false)
  const [visible,setVisible] = useState(false)
  const errorRef = useRef('')
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }
  const handleUpdateValueChange = (e) => {
    setUpdateValue(e.target.value)
  }
  const showPassword = () => {
    setVisible(!visible)
  }
  const navigate = useNavigate()
  const submit = async () => {
    try{
      setLoad(true)
      const result = await props.event(username,email,password,updateValue)
      if(result === true){
        navigate(`${props.navigate}`)
        return window.location.reload()
      }
      return errorRef.current.innerHTML = `<h1>${result}</h1>`
    }catch(error){
       console.log(error)
    }finally{
      setLoad(false)
    }
  }
  return (
    <FormControl 
    isRequired
    width={['100%','70%']}
    m='auto'
    p='5'
    borderRadius='8'
    border='.5px solid lightblue'
    bg='brand.100'
    mt='10'
    >
     <FormLabel>username</FormLabel>
     <Input type='text' aria-required id='username' p='1rem' my='2' onChange={handleUsernameChange} value={username}/>
     <FormLabel>Email address</FormLabel>
     <Input type='email' id='email' mb='1' p='1rem' onChange={handleEmailChange} value={email}/>
     <FormLabel>Password</FormLabel>
     <Input type={visible ? 'text':'password'} id='password' p='1rem' onChange={handlePasswordChange} value={password}/>
     <FormHelperText color='white' my='1'>{props.passwordInfo}</FormHelperText>
     <Button
      colorScheme='telegram' 
      width='30%'  
      p='1.8rem' 
      my='4'
      onClick={showPassword}
     >{visible ? <ViewOffIcon boxSize={7}/> : < ViewIcon boxSize={7}/>}</Button>
      {props.message && <FormHelperText color='white' mb='1'>
       {props.message} <Link as={ReactLink} color='lightblue' p='1' to={props.route}>here</Link>
      </FormHelperText>}
      {props.updateText &&
      <>
      <FormLabel>new {props.updateText}</FormLabel>
      <Input type='text' aria-required id='update' p='1rem' my='2' onChange={handleUpdateValueChange} value={updateValue}/>
      <FormHelperText color='white' my='1'>{props.updateInfo}</FormHelperText>
      </>
      }
     <Box p='3' bg='brand.200' mt='5' ref={errorRef} textAlign='center' borderRadius='5px' fontSize='1.2rem' color='red'>
     </Box>
     <Button
     isLoading ={load}
     loadingText='Submitting'
     colorScheme='telegram' 
     width='100%'  
     p='2rem' 
     mt='5'
     onClick={submit}
     >
     <Text fontSize='1.2rem'>{props.name}</Text>
    </Button>
   </FormControl>
  )
}