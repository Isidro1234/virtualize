import { HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import MainBarAny from '../../components/structure/MainBarAny'
import SiderBarAny from '../../components/structure/SiderBarAny'
import AppearanceMenu from '../../components/structure/AppearanceMenu'

export default function layoutAppearence({children}:{children:React.ReactNode}) {
  return (
    <HStack  background={'#111313'} padding={4} width={'100%'} height={'100vh'}>
     <SiderBarAny>
        <AppearanceMenu/>
     </SiderBarAny>
     <MainBarAny>
      {children}
      </MainBarAny>
    </HStack>
  )
}
