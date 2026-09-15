"use client"
import React from 'react'
import { Channel, ChannelHeader, ChannelList, MessageComposer, MessageList, Window } from 'stream-chat-react'
import { useStreamChatContext } from '../../context/StreamChat'
import { HStack } from '@chakra-ui/react'

export default function ChatListBox({ uid }: { uid: string | null }) {
  const { client } = useStreamChatContext()

  if (!client || !uid) return null

  return (
    <HStack width={'100%'} height={'100%'}>
      <ChannelList sort={{ last_message_at: -1 }} filters={{ type: 'messaging', members: { $in: [uid] } }} />
      <Channel>
        <Window>
          <ChannelHeader/>
          <MessageList/>
          <MessageComposer/>
        </Window>
      </Channel>
    </HStack>
  )
}