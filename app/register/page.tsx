"use client"
import { Box, Button, Heading, HStack, Input, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import React, { Suspense, useActionState } from 'react'
import Logo from "../../public/logo5.svg"
import Link from 'next/link'
import { Icons } from '../../utils/exportIcons'
import { Toaster } from '../../components/ui/toaster'
import Copyright from '../../components/structure/Copyright'
import { signup } from '../actions/auth'

export default function Register() {
  const [state, action, pending] = useActionState(signup, undefined)

  return (
    <VStack position={'relative'} padding={10} height={'120vh'} background={'black'} justifyContent={'center'} alignItems={'center'}>
      <VStack gap={2} marginTop={10} position={'relative'} zIndex={100} borderRadius={10} justifyContent={'center'} padding={10}>
        <form action={action} style={{ gap: 12, zIndex: 200, display: 'flex', flexDirection: 'column', minWidth: 200, maxWidth: 400, alignItems: 'center' }}>
          <Logo style={{ scale: 9, marginTop: 15 }} />
          <Box marginTop={4}>
            <Heading color={'white'} textAlign={'center'} lineHeight={1.1} fontWeight={500} fontSize={14}>Create an account</Heading>
          </Box>

          {/* Username Input */}
          <Box width={'100%'}>
            <HStack marginTop={4} borderRadius={0} width={'100%'} padding={0} borderBottomWidth={1.5} borderColor={'gray'}>
              <Icons.User width={20} height={20} color='gray' />
              <Input id={"name"} name={"name"} outline={'none'} color={"white"} borderWidth={0} placeholder='username or institutional name' />
            </HStack>
            {state?.errors?.name && <Text color="red.400" fontSize={11} marginTop={1}>{state.errors.name[0]}</Text>}
          </Box>

          {/* Email Input */}
          <Box width={'100%'}>
            <HStack borderRadius={0} width={'100%'} padding={0} borderBottomWidth={1.5} borderColor={'gray'}>
              <Icons.Mail width={20} height={20} color='gray' />
              <Input id={"email"} name={"email"} outline={'none'} color={"white"} borderWidth={0} placeholder='email' />
            </HStack>
            {state?.errors?.email && <Text color="red.400" fontSize={11} marginTop={1}>{state.errors.email[0]}</Text>}
          </Box>

          {/* Password Input */}
          <Box width={'100%'}>
            <HStack borderRadius={0} width={'100%'} padding={0} borderBottomWidth={1.5} borderColor={'gray'}>
              <Icons.Lock width={20} height={20} color='gray' />
              <Input id={"password"} name={"password"} type='password' outline={'none'} color={"white"} border={"none"} placeholder='password' />
            </HStack>
            {state?.errors?.password && <Text color="red.400" fontSize={11} marginTop={1}>{state.errors.password[0]}</Text>}
          </Box>

          <Text marginTop={2} marginBottom={2} width={'100%'} textAlign={'left'} color={'white'} fontSize={12}>Forgot your password?</Text>
          
          <Button type='submit' loading={pending} disabled={pending} width={'100%'} bg={'#00bf63'}>
            {pending ? 'Creating Account...' : 'Create Account'}
          </Button>

          <Link href={'/login'}><Text marginTop={2} color={'#00bf63'} fontSize={12}>Already have an account? click here</Text></Link>
          <Text lineHeight={1.1} marginTop={3} textAlign={'center'} color={'gray'} fontSize={10}>Universities and colleges connected in an unprecedented manner</Text>
          <Text textAlign={'center'} color={'gray'} fontSize={10}>Want to know more about our work? contact us</Text>
          <Text textAlign={'center'} color={'gray'} fontSize={10}>&copy; Copyright inta <Suspense fallback={null}><Copyright /></Suspense></Text>
        </form>

        <Toaster />
        
        <Box opacity={.5} borderRadius={10} zIndex={100} pointerEvents="none" background={'black'} height={'100%'} width={'100%'} position={'absolute'}></Box>
      </VStack>
      <Image style={{ width: "100%", height: "100%", objectFit: "cover", opacity: .4 }} fill alt='image' src={'https://images.pexels.com/photos/24304586/pexels-photo-24304586.jpeg'} />
    </VStack>
  )
}