import React from 'react'
import HomeCustom from '../components/structure/HomeCustom'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { deleteSession } from './actions/auth'
import { adminAuth } from '../config/admin-firestore'

export default async function Home() {
  const cookie =  await cookies()
  const token = cookie.get('session_virtualise')?.value;
  try {
    if(token){
      const decode = await adminAuth.verifyIdToken(token)
      const uid = decode.uid;
      if(uid){
        return redirect('/user')
      }
      return
    }
    return (
    <HomeCustom/>
  )
  } catch (error) {
     return (
    <HomeCustom/>
  )
  }

}
