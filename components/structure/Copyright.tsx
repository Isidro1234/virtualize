import { Text } from '@chakra-ui/react'
import React from 'react'

export default function Copyright() {
  return (
    <>{new Date()?.getFullYear() || ''}</>
  )
}
