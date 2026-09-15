"use client"
import { Button } from '@chakra-ui/react'
import React from 'react'
import { startCall } from '../../utils/StartCall'
import { useStreamContext } from '../../context/StreamVideo'
import { Icons } from '../../utils/exportIcons'

export default function StarCallButtonRelative({participants}:{
    participants:string[]
}) {
    const {videoClient} = useStreamContext()
    async function call(){
        if(!videoClient || participants.length <= 0) return;
        await startCall(videoClient , participants)
    }
  return (
    <Button zIndex={100}  borderRadius={50} onClick={call}><Icons.PhoneCall color='white' strokeWidth={1}/></Button>
  )
}
