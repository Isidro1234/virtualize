import { HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import AvatarByUid from './AvatarByUid'
import { getCurrentId, getcurrentuserdata } from '../../app/actions/auth'

export default async function MainBarAny({children}:{children:React.ReactNode}) {
    const uid = await getCurrentId()
  return (
    <VStack padding={10} height={'100%'} overflowY={'auto'} flex={1} borderRadius={20} background={'#17191a'}>
      <HStack justifyContent={'flex-end'} width={'100%'}>
              {uid &&
                <AvatarByUid withdetails={true} uid={uid}/>
             }
            
      </HStack>
      {children}
    </VStack>
  )
}
