"use client"
import { Box, Heading, HStack, Input, VStack, Button } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { CustomSelect } from '../../components/structure/CustomSelect'
import { store } from '../../utils/storemedia'
import { toaster, Toaster } from '../../components/ui/toaster'
import { creatAuthAccount } from '../../app/actions/auth'

export default function AddUSer() {
  const [usercat, setUsercat] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [previewPic, setPreview] = useState<any>(null)
  const [pic, setPic] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [country, setCountry] = useState("")
  const refphoto = useRef<HTMLInputElement>(null)

  function handlePic(pic:any){
     
      if(!pic?.name) {
        toaster.create({
          title:"No picture uploaded",
          duration:5000,
          type:"error"
        })
        return
      };
      const reader = new FileReader()
      reader.onload = (e)=>{
       setPreview(e.target?.result || null) 
      }
      reader.readAsDataURL(pic)
      setPic(pic)
      toaster.create({
          title:"picture uploaded",
          duration:5000,
          type:"success"
        })
      return
  }
  async function submit(){
     setLoading(true)
    if(!name || !email || !usercat || !country){
       setLoading(false)
       toaster.create({
          title:"user email or name or user category not provided",
          duration:5000,
          type:"error"
        })
      return;
    }
    const password = "test1234"
    if(!pic?.name){
      await creatAuthAccount(name , email , password , null , usercat, country)
       setLoading(false)
       toaster.create({
          title:"picture not uploaded",
          duration:5000,
          type:"error"
        })
      return
    } 
    const url = await store({image:pic, name:pic.name , type:pic.type});
    if(!url){
       setLoading(false)
       toaster.create({
          title:"picture does not exist",
          duration:5000,
          type:"error"
        })
      return
    }
    await creatAuthAccount(name , email , password , url, usercat, country)
     setLoading(false)
     toaster.create({
          title:"user created",
          duration:5000,
          type:"success"
        })
    return
  }
  return (
    <VStack>
      <VStack>

      </VStack>
      <VStack>
        <HStack>
          
          <CustomSelect onchange={(e:any)=>{setUsercat(e)}} items={[{label:"University" , value:"university"},
            {label:"Professor" , value:"professor"},
            {label:"Student" , value:"student"},
            {label:"admin agent" , value:"agent"}
           ]} title='Select user type' placeholder='what type of user you want to add?'/>
        </HStack>
        <HStack>
          <Box>
            <Heading fontSize={14}>Name</Heading>
            <Input onChange={(e)=>{setName(e.target.value)}}  placeholder={`what is your ${usercat || ''} name`}/>
          </Box>
          <Box>
            <Heading fontSize={14}>email</Heading>
            <Input onChange={(e)=>{setEmail(e.target.value)}} placeholder={`what is your ${usercat || ''} email`}/>
          </Box>
          <Box>
            <Heading fontSize={14}>Photo</Heading>
            <Input onChange={(e:any)=>{handlePic(e.target.files[0])}} display={'none'} ref={refphoto} type='file'/>
            <Button onClick={()=>{refphoto.current?.click()}}>photo</Button>
          </Box>
          <Box>
            <Heading fontSize={14}>Country</Heading>
            <Input onChange={(e)=>{setCountry(e.target.value)}}  type='text'/>
          </Box>
        </HStack>
        <Toaster/>
        <Button onClick={submit}>Submit</Button>
      </VStack>
    </VStack>
  )
}
