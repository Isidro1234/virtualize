import { VStack } from '@chakra-ui/react'
import React from 'react'
import MainBarAny from '../../../components/structure/MainBarAny'
import SiderBarAny from '../../../components/structure/SiderBarAny'
import StudentMenu from '../../../components/structure/StudentMenu'

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <VStack background={'#111313'} height={'100vh'} width={'100%'}>
      <SiderBarAny>
        <StudentMenu/>
      </SiderBarAny>
      <MainBarAny>
        {children}
      </MainBarAny>
    </VStack>
  )
}
