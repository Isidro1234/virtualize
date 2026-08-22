"use client"
import { Button } from '@chakra-ui/react'
import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../../../config/firestore'
import { deleteSession } from '../../actions/auth'

export default function Settings() {
    async function logout(){
        await signOut(auth)
        await deleteSession()
    }
  return (
    <div>
      <Button onClick={logout}>logout</Button>
    </div>
  )
}
