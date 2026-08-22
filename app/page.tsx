import React from 'react'
import HomeCustom from '../components/structure/HomeCustom'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Home() {
  const cookie =  await cookies()
  const token = cookie.get('session_virtualise')?.value
  if(token){
    redirect('/user')
  }
  return (
    <HomeCustom/>
  )
}
