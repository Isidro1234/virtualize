import { VStack } from '@chakra-ui/react'
import React from 'react'

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <VStack>
      {children}
    </VStack>
  )
}
