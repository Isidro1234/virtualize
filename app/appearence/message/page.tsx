
import React from 'react'
import { ChannelList } from 'stream-chat-react'
import { getCurrentId } from '../../actions/auth'
import ChatListBox from '../../../components/structure/ChatListBox'
import { HStack } from '@chakra-ui/react'

export default async function Message() {
    const uid = await getCurrentId()
  return (
    <HStack height={'100%'} width={'100%'}>
     <ChatListBox uid={uid}/>
    </HStack>
  )
}
