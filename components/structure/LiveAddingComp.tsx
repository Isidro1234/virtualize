"use client"
import { Box, Button, HStack, Input , Text, VStack} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Icons } from '../../utils/exportIcons'
import { useStreamContext } from '../../context/StreamVideo'
import { Call } from '@stream-io/video-react-sdk';
import LiveDisplay from './LiveDisplay'

export default function LiveaddingComp() {
  const {videoClient , user} = useStreamContext();
  const [cal , setCall] = useState<Call | null>(null)
  const [showcall, setshow] = useState(false)
  useEffect(()=>{
    runthis()
  }, [])
  async function runthis(){
    console.log('me here') 
    if(!videoClient || !user?.name){
      console.log('I don exist', videoClient , user)
      return};
    const nametrimed = 'mDVfSB23TaIf26xiZsbvQ2'
    const call = videoClient?.call('livestream', nametrimed);
   if(!call) {console.log('no call exists')
    return}
    await call?.join({create:true })
    await call.camera.enable()
    await call.microphone.enable()
  
  
    setCall(call)
    setshow(true)
  }
  if(!cal){
    return <Text>Loading...</Text>
  }
  return (
    <VStack width={'100%'}>

      <VStack  width={'100%'}>
        <LiveDisplay callid={cal}/>
      </VStack>
                            
    </VStack>
  )
}
