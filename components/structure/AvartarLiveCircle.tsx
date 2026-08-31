"use client"
import React from 'react'

import {Box, Avatar , Text} from '@chakra-ui/react'
import { useCallStateHooks } from '@stream-io/video-react-sdk'


export default function AvatarLiveCircle(){
    const { useParticipants , useIsCallLive} = useCallStateHooks()
      const participants = useParticipants()
      const firstParticipant = participants[0]
    
    
      if (!firstParticipant) return null
    return(
        <Box >
            <Avatar.Root size={'lg'} padding={.5} borderColor={'green'} borderWidth={1.5}>
                <Avatar.Fallback name={firstParticipant?.name}/>
                {firstParticipant?.image &&
                <Avatar.Image src={firstParticipant?.image}/>
                }
                
            </Avatar.Root>
            <Text color={'gray'} fontSize={10}>{firstParticipant?.name.slice(0,10)}</Text>
        </Box>
    )
}