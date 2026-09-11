import { VStack } from '@chakra-ui/react'
import React from 'react'

export default function MainSideCLassRoom({children}:{children:React.ReactNode}) {
    
  return (
    <VStack  flex={1} height={'100%'} minWidth={100} background={'#181a1c'}  borderRadius={20} padding={5} >
      {children}
    </VStack>
  )
}
