"use client"
import { Box, Button, Heading, HStack, Input, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'
import Logo from "../../public/logo5.svg"
import Link from 'next/link'
import Icons from '../../utils/exportIcons'
export default function Login() {
  return (
    <VStack position={
      'relative'
    } padding={10} height={'120vh'} background={'black'} justifyContent={'center'} alignItems={'center'}>
        <VStack gap={2} marginTop={10} position={'relative'} zIndex={100} borderRadius={10} justifyContent={'center'}  padding={10}>
          <VStack gap={2} zIndex={200} minW={400}>
            
            <Logo  style={{scale:9, marginTop:15}}/>
          <Box marginTop={4}>
              <Heading color={'white'} textAlign={'center'} lineHeight={1.1} fontWeight={500} fontSize={14}>Create an account</Heading>
            </Box>
          <HStack marginTop={4} borderRadius={0} width={'100%'} padding={0} borderBottomWidth={1.5} borderColor={'gray'}>
            <Icons.User width={20} height={20} color='gray'/>
            <Input outline={'none'} color={"white"} borderWidth={0} placeholder='username or instituional name'/>
          </HStack>
          <HStack borderRadius={0} width={'100%'} padding={0} borderBottomWidth={1.5} borderColor={'gray'}>
            <Icons.Mail width={20} height={20} color='gray'/>
            <Input outline={'none'} color={"white"} borderWidth={0} placeholder='email'/>
          </HStack>
          <HStack borderRadius={0} width={'100%'} padding={0}  borderBottomWidth={1.5} borderColor={'gray'}>
            <Icons.Lock width={20} height={20} color='gray'/>
            <Input outline={'none'} color={"white"} border={"none"} placeholder='password'/>
          </HStack>
          <Text marginTop={2} marginBottom={4} width={'100%'} textAlign={'left'} color={'white'} fontSize={12}>Forgot your password?</Text>
          <Button width={'100%'} bg={'#00bf63'}>Create Account</Button>
           <Link href={'/login'}><Text marginTop={4}   color={'#00bf63'} fontSize={12}>Already have an account? click here</Text></Link>
          <Text  lineHeight={1.1} marginTop={3} textAlign={'center'} color={'gray'} fontSize={10}>Universities and colleges connected in a unprecedente manner</Text>
          <Text  textAlign={'center'} color={'gray'} fontSize={10}>Want to know more about our work? contact us</Text>
          <Text  textAlign={'center'} color={'gray'} fontSize={10}>&copy; Copyright inta {new Date().getFullYear()}</Text>
          </VStack>
          
          <Box opacity={.5} borderRadius={10} zIndex={100} background={'black'}  height={'100%'} width={'100%'} position={'absolute'}></Box>
        </VStack>
        <Image style={{width:"100%", height:"100%", objectFit:"cover", opacity:.4}} fill alt='image' src={'https://images.pexels.com/photos/24304586/pexels-photo-24304586.jpeg'}/>
    </VStack>
  )
}
