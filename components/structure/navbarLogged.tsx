import { Avatar, Box, HStack, Text, VStack, Input , Button} from '@chakra-ui/react'
import React from 'react'
import Logo from "../../public/logo2.svg"
import Icons from "../../utils/exportIcons"
export default function NavbarLogged() {
  return (
   <HStack className={'nav-bar'} padding={4} width={'100%'}  borderBottomWidth={0} >
      <Logo style={{scale:3, marginLeft:25, marginRight:45, cursor:"pointer"}} height="50px" width="50px"/>
      <HStack gap={4} flex={1} justifyContent={'flex-end'} paddingRight={5} >
          <Button borderRadius= {50} border={'none'} variant={'outline'}><Icons.Search color='black'/></Button>
          <Button borderRadius= {50} border={'none'}  variant={'outline'}><Icons.Bell color='black'/></Button>
          <Button borderRadius= {50} border={'none'}  variant={'outline'}><Icons.MessageCircle color='black'/></Button>
          <Button borderRadius= {50} border={'none'} variant={'outline'}><Icons.SettingsIcon color='black'/></Button>
      </HStack>

      <HStack marginRight={25}>
        <Avatar.Root>
          <Avatar.Fallback name='something'/>
        </Avatar.Root>
      </HStack>
   </HStack>
  )
}
