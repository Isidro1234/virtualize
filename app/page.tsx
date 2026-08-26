import React from 'react'
import HomeCustom from '../components/structure/HomeCustom'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { deleteSession } from './actions/auth'
import { adminAuth } from '../config/admin-firestore'

export default async function Home() {
  const cookie =  await cookies()
  const token = cookie.get('session_virtualise')?.value;
  if (token) {
    redirect('/user')
  }
  if(!token){
     return (
    <HomeCustom/>
  )
  }
  
  let decode;
  try {
    decode = await adminAuth?.verifyIdToken(token);
  } catch (error: any) {
    if (error.code === 'auth/id-token-expired') {
      await deleteSession();
      return;
    }
     return (
    <HomeCustom/>
  )
  }
  
  const uid = decode?.uid;
  if (!uid) {
    await deleteSession();
    return;
  }else{
     return (
    <HomeCustom/>
  )
  }
 
}
