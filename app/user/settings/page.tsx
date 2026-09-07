"use client"
import { Avatar, Button, Input, VStack } from '@chakra-ui/react'
import { signOut } from 'firebase/auth'
import React, { useRef, useState } from 'react'
import { auth } from '../../../config/firestore'
import { deleteSession, updatCache, updateUserPhoto } from '../../actions/auth'
import { useRouter } from 'next/navigation'
import { store } from '../../../utils/storemedia'
import { toaster, Toaster } from '../../../components/ui/toaster'

export default function Settings() {
    const router = useRouter()
    const inputref = useRef<HTMLInputElement>(null)
    const [name , setName] = useState('')
    const [password, setPassword] = useState('')
    const [photos, setPhoto] = useState<File | null>(null)
    const [preview , setPreview] = useState<any>("")
    async function logout(){
        await signOut(auth)
        await deleteSession()
        router.push('/login')
    }
async function update(photoFile?: File | null) {
   const fileToUpload = photoFile ?? photos
   if(!fileToUpload && !name && !password){
      return 'update something'
   }

   let photoUrl: any = null
   if(fileToUpload){
      photoUrl = await store({ image: fileToUpload, name: fileToUpload.name, type: fileToUpload.type })
      if(!photoUrl) return
   }

   const uid = await updateUserPhoto({
      photo: photoUrl,
      password: password || null,
      name: name || null,
   })
   if(uid){
      return await updatCache(uid)
   }
   return
}

async function upload(file: File){
  const reader = new FileReader();
  reader.onload = (e) => setPreview(e.target?.result)
  reader.readAsDataURL(file);
  setPhoto(file)
  try {
     await update(file)   // pass the File directly — no stale-state read
     toaster.create({ title: "picture submitted", type: "success", duration: 5000 })
  } catch (error) {
    toaster.create({ title: "error", type: "error", duration: 5000 })
  }
}

  return (
    <VStack width={'100%'}>
      <Avatar.Root onClick={()=>{inputref.current?.click()}}>
        <Avatar.Fallback name='name'/>
        {preview &&
        <Avatar.Image src={preview}/>
        }
        
      </Avatar.Root>
      <Input display={'none'} onChange={(e:any)=>{upload(e.target.files[0])}} ref={inputref} type='file'/>
      <Input placeholder='digit your name' onChange={(e)=>{setName(e.target.value)}}/>
      <Input placeholder='digit your new password' onChange={(e)=>{setPassword(e.target.value)}}/>
      <Button onClick={()=>{update(photos)}}>Update</Button>
      <Button onClick={()=>{update(photos)}}>Apply for Academic verification</Button>
      <Button onClick={logout}>logout</Button>
      <Toaster/>
    </VStack>
  )
}
