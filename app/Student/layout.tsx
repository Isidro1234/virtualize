import { HStack } from '@chakra-ui/react'
import React from 'react'
import SibeBarClassroom from '../../components/structure/SibeBarClassroom'
import MainSideCLassRoom from '../../components/structure/MainSideCLassRoom'
import MainBarAny from '../../components/structure/MainBarAny'
import SiderBarAny from '../../components/structure/SiderBarAny'
import StudentMenu from '../../components/structure/StudentMenu'

export default function LayoutStudent({children}:{children:React.ReactNode}) {
  return (
     <HStack width={'100%'} height={'100vh'} padding={4} background={'#111313'}>
          <SiderBarAny>
            <StudentMenu/>
            </SiderBarAny>
          <MainBarAny>
             {children}
          </MainBarAny>
         
        </HStack>
  )
}
