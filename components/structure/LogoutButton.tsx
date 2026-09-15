"use client"
import React from 'react'
import { deleteSession } from '../../app/actions/auth'
import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firestore'
import { useStreamContext } from '../../context/StreamVideo'
import { useStreamChatContext } from '../../context/StreamChat'

export default function LogoutButton() {
  const {videoClient} = useStreamContext()
  const {client} = useStreamChatContext()
    const router = useRouter()
    async function logout(){
        await videoClient?.disconnectUser()
        await client?.disconnectUser()
        await deleteSession()
        await signOut(auth)
        router.push('/login') 
    }
  return (
    <Button onClick={logout}>Log out</Button>
  )
}
