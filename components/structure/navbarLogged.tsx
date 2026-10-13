"use client"
import { Avatar,  HStack, Text, VStack,  Button, Skeleton, Box} from '@chakra-ui/react'
import React, { useState } from 'react'
import Logo from "../../public/logo2.svg"
import {AddIcon, Icons, LogoLast} from "../../utils/exportIcons"
import Link from 'next/link'
import AiButton from './AiButton'
import { useAuth } from '../../context/useAuthContext'
import { CustomMenu } from './MenuCustom'
export default  function NavbarLogged() {
  const {user} = useAuth()
  const [imageLoad, setImageLoad] = useState(true)
  return (
   <HStack className={'nav-bar'} padding={4} marginRight={4} alignSelf={'flex-end'} borderRadius={20} background={'#17191a'} width={'auto'}  borderBottomWidth={0} >
      
      <HStack gap={4} flex={1} justifyContent={'flex-end'} paddingRight={5} >
          <Link href={'/user/settings'} ><Button _hover={{background:'#00bf63'}} borderRadius= {50} border={'none'} variant={'outline'}><Icons.SettingsIcon strokeWidth={1} color='white'/></Button></Link>
      </HStack>
      <AiButton/>
       <CustomMenu icon={
                          <Box borderRadius={50} padding={'10px'} background={"#1d1f21"} width={'auto'}  gap={2} display={"flex"} flexDir={'row'} alignItems={"center"}>
                           <AddIcon  strokeWidth={1} color={'white'} width={19} height={19}/>
                           
                       </Box>  
                       }>
      </CustomMenu>
      <HStack marginRight={25}>
        <VStack justifyContent={'center'} alignItems={'flex-start'} gap={1}>
           <Skeleton loading={imageLoad}>
              <Text fontSize={14} lineHeight={1} color={'white'}>{user?.username || ""}</Text>
           </Skeleton>
            <Skeleton loading={imageLoad}>
                <Text fontSize={10} lineHeight={1} color={'gray'}>@{user?.role?.[0] || ""}</Text>
            </Skeleton>

        </VStack>
        <Skeleton  borderRadius={50} loading={imageLoad}>
        <Avatar.Root boxSize={'40px'}>
          { user?.photo &&
            <Avatar.Image onError={()=>{setImageLoad(false)}} onLoad={()=>setImageLoad(false)} src={ user?.photo  || ""}/>
          }
          
          <Avatar.Fallback name={user?.username || ""}/>
        </Avatar.Root>
        </Skeleton>
      </HStack>
   </HStack>
  )  
}
