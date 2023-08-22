import {
 Box,
 Text,
 HStack,
 Button,
 useDisclosure,
 Input,
 Textarea
} from "@chakra-ui/react"
import { Suspense,lazy,useState,useContext } from "react"
import { userContext } from "../../../App"
import { editProfile } from "../../../utils/profile"
const Modal = lazy(() => import('../../../componentAsset/modal/modal'))
const Avatar = lazy(() => import('../../../componentAsset/avatar/avatar'))
const AnimationWrapper = lazy(() => import('../../../componentAsset/animationWrapper/animationWrapper'))
export default function EditProfile(){
  const {user,profile,token} = useContext(userContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [username,setUsername] = useState(profile.username)
  const [about,setAbout] = useState(profile.about ? profile.about : '')
  const [currentAvatar,setCurrentAvatar] = useState(profile.avatar)
  const [load,setLoad] = useState(false)
  const [avatarData,setAvatarData] = useState([
    {
     id:'avatar_1',
     status:false,
     url:'https://i.postimg.cc/sgHHKtHk/631544-earth-flash-hero-man-saver-icon.png'
    },
    {
     id:'avatar_2',
     status:false,
     url:'https://i.postimg.cc/1zqtz1kP/631538-hero-man-punisher-saver-super-icon.png'
    },
    {
     id:'avatar_3',
     status:false,
     url:'https://i.postimg.cc/HLBSjFXZ/631546-bat-batman-hero-man-saver-icon.png'
    }
  ])
  const changeAvatarDataStatus = (id) => {
    return setAvatarData(avatarData.map((el) => {
      if(el.id === id) {
        return {...el,status:!el.status}
      }else{
        return {...el,status:false}
      }
    }))
  }
  const saveAvatar = () => {
    const newAvatar = avatarData.filter((el) => {
      return el.status === true
    })
    return setCurrentAvatar({
      id:newAvatar[0].id,
      name:newAvatar[0].id,
      url:newAvatar[0].url
    }
   )
  }
  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }
  const handleAboutChange = (e) => {
    setAbout(e.target.value)
  }
  const saveChanges = async () => {
    try {
      setLoad(true)
      const update = await editProfile({
        id:user.profileId,
        username,
        avatarId:currentAvatar.id,
        about
      },token)
      if(update.statusCode === 200){
        localStorage.setItem('profile',JSON.stringify({
          sub:profile.sub,
          username:username !== '' ? username : profile.username,
          about:about !== '' ? about : profile.about,
          avatar:{
            name:currentAvatar.name,
            url:currentAvatar.url
          }
        }))
        alert('update was successful')
        return window.location.reload()
      }else{
        return alert(update.response.message)
      }
    } catch (error) {
       console.log(error)
    } finally {
      setLoad(false)
    }
  }
  const cancelChanges = () => {
    if(confirm('Cancel changes') === true){
      alert('updates canceled')
      return window.location.reload()
    }else{
      return
    }
  }
  return (
    <AnimationWrapper>
    {user ?
    <Box className='edit-profile-page' p='2' mt='100' height='100%'>
     <Text as='h1' fontSize='2.2rem' p='1.2' my='6'>Edit Profile</Text>
     <Box className='avatar-container' bg='brand.100' p='3' borderRadius='5px'>
        <Text fontSize='1.8rem' p='1' mb='3'>Edit Avatar</Text>
        <HStack p='2' my='2' spacing={['20px','48px']} alignItems='center'>
         <Suspense>
          <Avatar img={currentAvatar.url} size='2xl'/>
         </Suspense>
         <Button p='2.1rem' fontSize='1rem' colorScheme='telegram' onClick={onOpen}>Change Avatar</Button>
         <Suspense>
          <Modal 
           isOpen={isOpen} 
           change={changeAvatarDataStatus} 
           data={avatarData} 
           onClose={onClose}
           save={saveAvatar}
          />
         </Suspense>
        </HStack>
      </Box>
      <Box className='username-container' bg='brand.100' p='3' borderRadius='5px' my='10'>
        <Text fontSize='1.8rem' p='1' mb='3'>Edit Username</Text>
        <Input 
         width='100%'
         p='4'
         size='xl'
         fontSize='1.3rem'
         placeholder='enter your new username here'
         borderRadius='5px'
         value={username}
         onChange={handleUsernameChange}
         my='4'
        />
      </Box>
      <Box className='about-container' bg='brand.100' p='3' borderRadius='5px' my='8'>
        <Text fontSize='1.8rem' p='1' mb='3'>Edit About</Text>
        <Textarea
         p='4'
         size='xl'
         fontSize='1.5rem'
         placeholder='enter your new about description here'
         borderRadius='5px'
         my='4'
         height={['70vh','40vh']}
         onChange={handleAboutChange}
         value={about}
        />
      </Box>
      <Box className='action-container' p='2' mt='4'>
        <Button 
         colorScheme='blue'
         p='2rem'
         fontSize='1.5rem'
         isLoading={load}
         onClick={saveChanges}
        >
          Save
        </Button>
        <Button colorScheme='blue' p='2rem' fontSize='1.5rem' ml='3' onClick={cancelChanges}>
          Cancel
        </Button>
      </Box>
    </Box>
     :
    <Box p='1' textAlign='center' height={['100vh','84vh']} bg='brand.100' borderRadius='5px' my='30'>
     <Text p='2' mt='18rem' fontSize='1.9rem'>You are not logged in, please login first</Text>
   </Box>
    }
    </AnimationWrapper>
  )
}