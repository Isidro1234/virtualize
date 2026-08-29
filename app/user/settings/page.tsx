"use client"
import { Avatar, Button, Input, VStack } from '@chakra-ui/react'
import { signOut } from 'firebase/auth'
import React, { useRef, useState } from 'react'
import { auth } from '../../../config/firestore'
import { deleteSession, updatCache, updateUserPhoto } from '../../actions/auth'
import { useRouter } from 'next/navigation'
import { store } from '../../../utils/storemedia'

export default function Settings() {
    const router = useRouter()
    const inputref = useRef<HTMLInputElement>(null)
    const [name , setName] = useState('')
    const [password, setPassword] = useState('')
    const [photo, setPhoto] = useState<File | null>(null)
    async function logout(){
        await signOut(auth)
        await deleteSession()
        router.push('/login')
    }
    async function update(){
       if(!photo?.name && !name && !password){
          return 'update something'
       }

       if(photo?.name){
          const url = await store({image:photo, name:photo.name , type:photo.type})
          if(!url) return;
          const uid = await updateUserPhoto({photo:url , password , name})
          if(!uid) return
          return  await updatCache(uid)
       }
       const uid = await updateUserPhoto({photo:null , password , name})
       if(uid){
        return await updatCache(uid)
       }
      return
    }

    async function upload(e:File){
      const reader = new FileReader();
      reader.onload = (e)=>{
        e.target?.result
      }
      reader.readAsDataURL(e);
      setPhoto(e)
    }

  return (
    <VStack width={'100%'}>
      <Avatar.Root onClick={()=>{inputref.current?.click()}}>
        <Avatar.Fallback name='name'/>
      </Avatar.Root>
      <Input display={'none'} onChange={(e:any)=>{upload(e.target.files[0])}} ref={inputref} type='file'/>
      <Input placeholder='digit your name' onChange={(e)=>{setName(e.target.value)}}/>
      <Input placeholder='digit your new password' onChange={(e)=>{setPassword(e.target.value)}}/>
      <Button onClick={update}>Update</Button>
      <Button onClick={update}>Apply for Academic verification</Button>
      <Button onClick={logout}>logout</Button>
    </VStack>
  )
}
