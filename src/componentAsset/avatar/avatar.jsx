import { Avatar } from '@chakra-ui/react';
export default function AvatarComponent (props) {
 return (
    <Avatar 
    name={props.name} 
    size={props.size} 
    colorScheme='telegram'
    showBorder={true}
    src={props.img}
    />
 )
}
