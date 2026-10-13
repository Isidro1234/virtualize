"use client"
import React from 'react'
import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firestore'
import { useStreamContext } from '../../context/StreamVideo'
import { useStreamChatContext } from '../../context/StreamChat'
import { deleteSession } from '../../app/lib/sessions'

export default function LogoutButton() {
  const {videoClient} = useStreamContext()
  const {client} = useStreamChatContext()
    const router = useRouter()
    async function logout(){
        await videoClient?.disconnectUser()
        await client?.disconnectUser()
        await deleteSession()
        router.push('/login') 
    }
  return (
    <Button marginTop={5} background={'red'} fontSize={10} borderRadius={50} onClick={logout}>logout</Button>
  )
}
