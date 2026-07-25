import { Input, VStack } from '@chakra-ui/react'
import React from 'react'

export default function Login() {
  return (
    <VStack>
        <Input placeholder='institution email'/>
        <Input placeholder='password'/>
    </VStack>
  )
}
