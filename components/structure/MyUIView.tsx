import { Box, VStack } from '@chakra-ui/react'
import { ParticipantView, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'

function Participant({participant}:{participant:any}){
  return(
    <VStack aspectRatio={1080/760} objectFit={'cover'} height={'100%'} width={'100%'}>
      <ParticipantView  participant={participant}/>
    </VStack>
    
  )
}



export default function MyUIView() {

  const  { useLocalParticipant , useRemoteParticipants} = useCallStateHooks()
  const participant = useLocalParticipant()
  const participants = useRemoteParticipants()
  return (
    <VStack  height={'100%'} width={'100%'} position={'relative'}>
       <Box height={300} width={300} zIndex={200} right={10} bottom={5} position={'absolute'}>
          <Participant participant={participant}/>
       </Box>
       {participants.map((participant, index)=>{
        return(
          <Participant key={index} participant={participant}/>
        )
       })}
    </VStack>
  )
}
