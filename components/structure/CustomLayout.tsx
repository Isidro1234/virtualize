"use client"
import { Button, VStack } from '@chakra-ui/react'
import { ParticipantView, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import { Icons } from '../../utils/exportIcons'

export default function CustomLayout() {
  const {useLocalParticipant, useIsCallLive , useParticipantCount , useAnonymousParticipantCount} = useCallStateHooks()
  const localparticipant = useLocalParticipant()
  const cameras = localparticipant
  const isLive = useIsCallLive()
  return (
    <VStack width={'100%'} position={'relative'} height={200}>{
      localparticipant &&
      <ParticipantView  ParticipantViewUI={<VStack>
          <Button fontSize={12} background={'red'} borderRadius={50} size={'sm'} left={5} top={5}  position={'absolute'}> {isLive ? "Live" : 'offline'} </Button>
        
      </VStack>} participant={localparticipant}/>
      }
    </VStack>
  )
}
