"use client"
import React from 'react'
import { useState } from 'react'
import { store } from '../../utils/storemedia'
import { changepic } from '../../app/actions/auth'
import { toaster } from '../ui/toaster'
import { Avatar, Input } from '@chakra-ui/react'
import { useRef } from 'react'

export default function AvatarChange({user}:{user:{username:string , photo:string}}) {
     const [photos, setPhoto] = useState<File | null>(null)
     const [preview , setPreview] = useState<any>("")
     const inputref = useRef<HTMLInputElement | null>(null)
    async function update(photoFile?: File | null) {
       const fileToUpload = photoFile ?? photos
       if(!fileToUpload){
          return 'update something'
       }
    
       let photoUrl: any = null
       if(fileToUpload){
          photoUrl = await store({ image: fileToUpload, name: fileToUpload.name, type: fileToUpload.type })
          if(!photoUrl) return
       }
    
       const uid = await changepic(photoUrl)
       if(uid){
          return null
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
    <div>
    <Avatar.Root cursor={'pointer'} onClick={()=>{inputref.current?.click()}}>
        <Avatar.Fallback name={user.username}/>
        {user.photo &&  <Avatar.Image src={ preview || user.photo}/>}
    </Avatar.Root>
      <Input outline={'none'} maxWidth={200} border={'none'} borderRadius={20} background={'#131313'} display={'none'} onChange={(e:any)=>{upload(e.target.files[0])}} ref={inputref} type='file'/>
    </div>
  )
}
