'use client'
import React from 'react'
import { useStreamChatContext } from '../../context/StreamChat'
import { Button } from '@chakra-ui/react'
import { startCall } from '../../utils/StartCall'
import { StartChannel } from '../../utils/StartChat'
import { Icons } from '../../utils/exportIcons'
import { useRouter } from 'next/navigation'

export default function StartMessageButton({uid , participants , route}:{uid:string | null , participants:string[], route:string}) {
    const {client} = useStreamChatContext()
    const router = useRouter()
    async function startchat(){
        if(!uid) return
        const channel = await StartChannel(client, participants , "messaging", uid)
        channel?.create()
        router.push(route)
    }
  return (
    <div>
      <Button borderRadius={50} onClick={startchat}><Icons.MessageCircle height={20} width={20} strokeWidth={1} color='white'/></Button>
    </div>
  )
}
