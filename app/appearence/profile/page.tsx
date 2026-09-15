"use client"
import { Box, Button, HStack } from '@chakra-ui/react'
import React from 'react'
import { deleteSession } from '../../actions/auth'
import { signOut } from 'firebase/auth'
import { auth } from '../../../config/firestore'

export default function Profile() {
   async function logout(){  
        await deleteSession()
        await signOut(auth)
   }
  return (
    <HStack>
        <Button onClick={logout}>Log out</Button>
    </HStack>
  )
}
