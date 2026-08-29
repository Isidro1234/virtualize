import { Box, Heading, HStack, Input, VStack, Button, Text } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { CustomSelect } from '../../components/structure/CustomSelect'
import { store } from '../../utils/storemedia'
import { creatAuthAccount } from '../actions/auth'
import { toaster, Toaster } from '../../components/ui/toaster'
import AddUSer from '../../components/structure/AddUsers'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { adminAuth, admindb } from '../../config/admin-firestore'
import UserCompt from '../../components/structure/UserCompt'

export default async function Admin() {
  const cookie = await cookies()
  const token = cookie.get('session_virtualise')?.value;
  if(!token){
    return redirect('/login')
  }
  let user = null;
  try {
    const decode = await adminAuth.verifySessionCookie(token)
    if(!decode.uid){
      return redirect('/login')
    }
    const docref = await admindb.collection('users').limit(10).get()
    if(docref.empty){
      return redirect('/login')
    }
   user = docref.docs.map((dc)=>{
      return dc.data()
    }) 
    
  } catch (error) {
      return redirect('/login')
  }
  return (
    <VStack>
        <AddUSer/>
        {user?.map((item, index)=>{
          return(
            <Text key={index}>{item?.name}</Text>
          )
        })}
    </VStack>
  )
 
}
