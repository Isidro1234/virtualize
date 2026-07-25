import { Input, VStack } from '@chakra-ui/react'
import React from 'react'

export default function Register() {
  return (
    <VStack>
        <Input placeholder='institution name'/>
        <Input placeholder='institution email'/>
        <Input placeholder='password'/>
    </VStack>
  )
}
