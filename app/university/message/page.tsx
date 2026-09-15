import { HStack } from '@chakra-ui/react'
import React from 'react'
import ChatListBox from '../../../components/structure/ChatListBox'
import { getCurrentId } from '../../actions/auth'

export default async function MessageHub() {
    const uid = await getCurrentId()
    return (
      <HStack height={'100%'} width={'100%'}>
       <ChatListBox uid={uid}/>
      </HStack>
    )
}
