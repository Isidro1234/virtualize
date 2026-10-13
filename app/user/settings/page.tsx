"use client"
import { Avatar, Button, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { toaster, Toaster } from '../../../components/ui/toaster'
import LogoutButton from '../../../components/structure/LogoutButton'
import AvatarChange from '../../../components/structure/AvatarChange'
import { useAuth } from '../../../context/useAuthContext'

export default  function Settings() {
   const {user} = useAuth()
   if(!user?.username || !user.photo) return
  return (
    <VStack width={'100%'} borderRadius={20} background={'#17191a'} margin={10} paddingTop={0} marginRight={14} padding={10}>
      <AvatarChange user={{username:user?.username , photo:user?.photo}}/>
      <Heading marginTop={-1} color={'gray'} fontSize={12}>@{user?.username}</Heading>
      <LogoutButton/>
      <Toaster/>
    </VStack>
  )
}
