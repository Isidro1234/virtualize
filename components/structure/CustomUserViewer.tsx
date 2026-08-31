import { Box, Button, Span, VStack } from '@chakra-ui/react'
import { ParticipantView, useCallStateHooks } from '@stream-io/video-react-sdk'
import { useEffect } from 'react'

export function CustomLivestreamView() {
  const { useParticipants , useIsCallLive} = useCallStateHooks()
  const participants = useParticipants()
  const firstParticipant = participants[0]
  const islive = useIsCallLive();

 
  if (!firstParticipant) return null

  return (
    <Box width="100%" height="100%" position="relative" overflow="hidden" borderRadius={15}>
      <ParticipantView
        participant={firstParticipant} 
        trackType="videoTrack"
        className='view'
       ParticipantViewUI={
        <VStack>
            <Button fontWeight={400} background={'red'} right={4} top={5} zIndex={200} position={'absolute'} borderRadius={50} size={'2xs'}>{islive ? 'Live' : 'offline'}</Button>
            <Button fontWeight={400} background={'purple'} left={4} top={5} zIndex={200} position={'absolute'} borderRadius={50} size={'2xs'}>{participants.length} <Span fontSize={10}>views</Span></Button>
        </VStack>
       }
      />
    </Box>
  )
}