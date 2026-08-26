import { Avatar, Box, HStack, Text, VStack, Input , Button} from '@chakra-ui/react'
import React from 'react'
import Logo from "../../public/logo2.svg"
import {Icons} from "../../utils/exportIcons"
import { cookies } from 'next/headers'
import { adminAuth } from '../../config/admin-firestore'
import { redirect } from 'next/navigation'
import Link from 'next/link'
export default async function NavbarLogged() {
  try {
    const cookie = await cookies()
  const token = cookie.get('session_virtualise')?.value
  if(!token){
    redirect('/')
  };
  const verify = await adminAuth?.verifyIdToken(token)
  const uid = verify?.uid || ""
  return (
   <HStack className={'nav-bar'} padding={4} background={'#17191a'} width={'100%'}  borderBottomWidth={0} >
      <Logo style={{scale:3, marginLeft:25, marginRight:45, cursor:"pointer"}} height="50px" width="50px"/>
      <HStack gap={4} flex={1} justifyContent={'flex-end'} paddingRight={5} >
          <Button borderRadius= {50} border={'none'} variant={'outline'}><Icons.Search strokeWidth={1} color='white'/></Button>
          <Button borderRadius= {50} border={'none'}  variant={'outline'}><Icons.Bell strokeWidth={1} color='white'/></Button>
          <Button borderRadius= {50} border={'none'}  variant={'outline'}><Icons.MessageCircle strokeWidth={1} color='white'/></Button>
          <Link href={'/user/settings'} ><Button borderRadius= {50} border={'none'} variant={'outline'}><Icons.SettingsIcon strokeWidth={1} color='white'/></Button></Link>
      </HStack>
       <Text></Text>
      <HStack marginRight={25}>
        <Avatar.Root>
          <Avatar.Fallback name='something'/>
        </Avatar.Root>
      </HStack>
   </HStack>
  )
  } catch (error) {
    return <Text>redirecting...</Text>
  }
  
}
