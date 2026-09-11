"use client"
import React from 'react'
import { deleteSession } from '../../app/actions/auth'
import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firestore'

export default function LogoutButton() {
    const router = useRouter()
    async function logout(){
        await deleteSession()
        await signOut(auth)
        router.push('/login') 
    }
  return (
    <Button onClick={logout}>Log out</Button>
  )
}
