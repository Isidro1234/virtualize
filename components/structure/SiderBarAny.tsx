import { VStack } from '@chakra-ui/react'
import React from 'react'

export default function SiderBarAny({children}:{children:React.ReactNode}) {
  return (
    <VStack borderRadius={20} background={'#17191a'} height={'100%'} width={100}>
      {children}
    </VStack>
  )
}
