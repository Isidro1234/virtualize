import React from 'react'
import { getCurrentId } from '../../actions/auth'
import { HStack } from '@chakra-ui/react'
import ChatListBox from '../../../components/structure/ChatListBox'

export default async function MessageClass() {
    const uid = await getCurrentId()
    return (
      <HStack height={'100%'} width={'100%'}>
       <ChatListBox uid={uid}/>
      </HStack>
    )
}
