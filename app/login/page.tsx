"use client"
import { Box, Button, Heading, HStack, Input, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import React, { Suspense, useState } from 'react'
import Logo from "../../public/logo5.svg"
import Link from 'next/link'
import {Icons} from '../../utils/exportIcons'
import { toaster, Toaster } from '../../components/ui/toaster'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firestore'
import { useRouter } from 'next/navigation'
import { createSession, redirectRoute } from '../actions/auth'
import Copyright from '../../components/structure/Copyright'
export default function Login() {
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  async function Login(){
    setLoading(true)
    if(!email || !password){
      !email && toaster.create({
        title:"email not provided",
        description:"please fill the email field",
        duration:5000,
        type:"error"
      })
      !password && toaster.create({
        title:"password not provided",
        description:"please fill the password field",
        duration:5000,
        type:"error"
      })
      setLoading(false)
      return
    }
    try {
      const credentials = await signInWithEmailAndPassword(auth, email, password);
    if(!credentials?.user?.email){
       toaster.create({
        title:"user does not exist",
        description:"please create an account this user does not exist",
        duration:5000,
        type:"error"
      })
      setLoading(false)
      return
    }
    const token = await credentials.user.getIdToken()
    await createSession(token) 
    const routing = await redirectRoute()
    router.push(routing)
    toaster.create({
        title:"user logged",
        description:"Welcome back Sr",
        duration:5000,
        type:"success"
      })
      setLoading(false)
      
    return 
    } catch (error:any) {
      if(error?.message?.includes('auth')){
        toaster.create({
        title:"Wrong password",
        description:"please check your email and password",
        duration:5000,
        type:"error"
      })
      setLoading(false)
      return
      }
      toaster.create({
        title:"server error",
        description:"some error happened, please try later",
        duration:5000,
        type:"error"
      })
      setLoading(false)
      return
    }
    
  }
  return (
    <VStack position={
      'relative'
    } padding={10} height={'120vh'} background={'black'} justifyContent={'center'} alignItems={'center'}>
        <VStack gap={2} position={'relative'} zIndex={100} borderRadius={10} justifyContent={'center'}  padding={10}>
          <VStack gap={2} zIndex={200} minW={200}  maxWidth={400}>
            
            <Logo  style={{scale:9, marginTop:15}}/>
          <Box marginTop={4}>
              <Heading color={'white'} textAlign={'center'} lineHeight={1.1} fontWeight={500} fontSize={14}>Log in to your Account</Heading>
          <Heading color={'white'} textAlign={'center'} fontWeight={400} fontSize={12}>Welcome to Virtualize</Heading>
            </Box>
          <HStack borderRadius={0} width={'100%'} padding={0} borderBottomWidth={1.5} borderColor={'gray'}>
            <Icons.Mail width={20} height={20} color='gray'/>
            <Input onChange={(e)=>{setEmail(e.target.value)}} outline={'none'} color={"white"} borderWidth={0} placeholder='email'/>
          </HStack>
          <HStack borderRadius={0} width={'100%'} padding={0}  borderBottomWidth={1.5} borderColor={'gray'}>
            <Icons.Lock width={20} height={20} color='gray'/>
            <Input onChange={(e)=>{setPassword(e.target.value)}} outline={'none'} color={"white"} border={"none"} placeholder='password'/>
          </HStack>
          <Text marginTop={2} marginBottom={4} width={'100%'} textAlign={'left'} color={'white'} fontSize={12}>Forgot your password?</Text>
          <Button onClick={Login} loading={loading} width={'100%'} bg={'#00bf63'}>Log-in</Button>
          <Link href={'/register'}><Text marginTop={2}   color={'#00bf63'} fontSize={12}>Don't have an account yet? click here</Text></Link>
          <Text  lineHeight={1.1} marginTop={3} textAlign={'center'} color={'gray'} fontSize={10}>Universities and colleges connected in a unprecedente manner</Text>
          <Text  textAlign={'center'} color={'gray'} fontSize={10}>Want to know more about our work? contact us</Text>
          <Text  textAlign={'center'} color={'gray'} fontSize={10}>&copy; Copyright inta <Suspense fallback={null}><Copyright/></Suspense></Text>
          </VStack>
          <Toaster/>
          <Box opacity={.5} borderRadius={10} zIndex={100} background={'black'}  height={'100%'} width={'100%'} position={'absolute'}></Box>
        </VStack>
        <Image style={{width:"100%", height:"100%", objectFit:"cover", opacity:.4}} fill alt='image' src={'https://images.pexels.com/photos/24304586/pexels-photo-24304586.jpeg'}/>
    </VStack>
  )
}
