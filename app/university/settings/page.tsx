'use client'
import { Button } from '@chakra-ui/react'
import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../../../config/firestore'
import { deleteSession } from '../../actions/auth'
import { useRouter } from 'next/navigation'

export default function Settings() {
    const router = useRouter()
    async function logout(){
        await signOut(auth)
        await deleteSession()
        router.push('/login')
    }
  return (
    <div>
      <Button onClick={logout}>log out</Button>
    </div>
  )
}
