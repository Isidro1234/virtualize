"use client"
import { Text, VStack } from '@chakra-ui/react'
import React from 'react'

export default function UserCompt({name}:{name:string}) {
  return (
    <VStack>
      <Text>{name}</Text>
    </VStack>
  )
}
