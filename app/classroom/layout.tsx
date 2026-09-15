import { HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import MainSideCLassRoom from '../../components/structure/MainSideCLassRoom'
import SibeBarClassroom from '../../components/structure/SibeBarClassroom'

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <HStack width={'100%'} height={'100vh'} padding={4} background={'#111313'}>
      <SibeBarClassroom/>
      <MainSideCLassRoom>
         {children}
      </MainSideCLassRoom>
     
    </HStack>
  )
}
