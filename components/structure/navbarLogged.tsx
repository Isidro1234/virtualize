import { Avatar, Box, HStack, Text, VStack, Input , Button} from '@chakra-ui/react'
import React from 'react'
import Logo from "../../public/logo2.svg"
import {Icons} from "../../utils/exportIcons"
import { cookies } from 'next/headers'
import { adminAuth } from '../../config/admin-firestore'
import { redirect } from 'next/navigation'
import Link from 'next/link'
export default async function NavbarLogged({user}:{user:any}) {

  return (
   <HStack className={'nav-bar'} padding={4} background={'#17191a'} width={'100%'}  borderBottomWidth={0} >
      <Logo style={{scale:3, marginLeft:25, marginRight:45, cursor:"pointer"}} height="50px" width="50px"/>
      <HStack gap={4} flex={1} justifyContent={'flex-end'} paddingRight={5} >
          <Button _hover={{background:'#00bf63'}} borderRadius= {50} border={'none'} variant={'outline'}><Icons.Search strokeWidth={1} color='white'/></Button>
          <Button _hover={{background:'#00bf63'}} borderRadius= {50} border={'none'}  variant={'outline'}><Icons.Bell strokeWidth={1} color='white'/></Button>
          <Button _hover={{background:'#00bf63'}} borderRadius= {50} border={'none'}  variant={'outline'}><Icons.MessageCircle strokeWidth={1} color='white'/></Button>
          <Link href={'/user/settings'} ><Button _hover={{background:'#00bf63'}} borderRadius= {50} border={'none'} variant={'outline'}><Icons.SettingsIcon strokeWidth={1} color='white'/></Button></Link>
      </HStack>
       <Text></Text>
      <HStack marginRight={25}>
        <VStack justifyContent={'center'} alignItems={'flex-start'} gap={1}>
          <Text fontSize={14} lineHeight={1} color={'white'}>{user?.name || ""}</Text>
          <Text fontSize={10} lineHeight={1} color={'gray'}>@{user?.role?.[0] || ""}</Text>
        </VStack>
        <Avatar.Root>
          { user?.photo &&
            <Avatar.Image src={ user?.photo  || ""}/>
          }
          
          <Avatar.Fallback name={user?.name || ""}/>
        </Avatar.Root>
        
      </HStack>
   </HStack>
  )  
}
