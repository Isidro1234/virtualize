"use client"

import {
  useCalls,
  useCall,
  useCallStateHooks,
  StreamCall,
  CallingState,
  SpeakerLayout,
  CallControls,
  StreamTheme,
  ToggleAudioOutputButton,
  ToggleVideoPreviewButton,
} from "@stream-io/video-react-sdk"
import "@stream-io/video-react-sdk/dist/css/styles.css" // <-- required: StreamTheme only sets CSS variables, this file has the actual rules that consume them
import { Avatar, Box, Button, HStack, Text, VStack } from "@chakra-ui/react"
import { useStreamContext } from "../../context/StreamVideo"
import { Icons } from "../../utils/exportIcons"
import MyUIView from "./MyUIView"

export default function CallManager() {
  const { videoClient } = useStreamContext()
  const calls = useCalls()

  if (!videoClient) return null

 
  const call = calls.find((c) =>
    [
      CallingState.RINGING,
      CallingState.JOINING,
      CallingState.JOINED,
      CallingState.RECONNECTING,
    ].includes(c.state.callingState)
  )

  if (!call) return null

  return (
    <StreamCall call={call}>
      <CallOverlay />
    </StreamCall>
  )
}

function CallOverlay() {
  const call = useCall()
  const { useCallCallingState } = useCallStateHooks()
  const callingState = useCallCallingState()

  if (!call) return null

  if (callingState === CallingState.JOINED) {
    return <ActiveCallPanel />
  }

  if (
    callingState === CallingState.RINGING ||
    callingState === CallingState.JOINING
  ) {
    return call.isCreatedByMe ? <OutgoingCallPanel /> : <IncomingCallPanel />
  }
  return null
}

function OutgoingCallPanel() {
  const call = useCall()
  const { useCallMembers } = useCallStateHooks()
  const members = useCallMembers()
  const callee = members?.find((m) => m.user.id !== call?.currentUserId)

  return (
    <Overlay>
      <VStack gap={4}>
        <Avatar.Root>
          <Avatar.Fallback name={callee?.user.name || 'Anonym'}/>
        </Avatar.Root>
        <Text color="gray" fontSize="sm">
          {callee?.user.name || 'Anonym'}
        </Text>
        <Text color="gray.300" fontSize="sm">
          Ringing...
        </Text>
        <HStack justifyContent={'center'} width={'100%'}>
          <Button
           borderRadius={50}
          background={'red'}
            onClick={() =>
              call
                ?.leave({ reject: true, reason: "cancel" })
                .catch((err) => console.error("leave() failed:", err))
            }
          >
            <Icons.PhoneCallIcon color="white"/>
          </Button>
        </HStack>
      </VStack>
    </Overlay>
  )
}

function IncomingCallPanel() {
  const call = useCall()
  const { useCallMembers } = useCallStateHooks()
  const members = useCallMembers()
  const caller = members?.find((m) => m.user.id !== call?.currentUserId)

  return (
    <Overlay>
      <VStack gap={4}>
        <Avatar.Root>
          <Avatar.Fallback name={caller?.user.name || 'Anonym'}/>
        </Avatar.Root>
        <Text color="gray" fontSize="sm">
         { caller?.user.name || 'Anonym'}
        </Text>
        <Text color="gray.300" fontSize="sm">
          Incoming call...
        </Text>
        <HStack justifyContent={'center'} width={'100%'}>
          <Button borderRadius={50}
            background={'green'}
            onClick={() =>
              call?.join().catch((err) => console.error("join() failed:", err))
            }
          >
            <Icons.PhoneCallIcon color="white"/>
          </Button>
          <Button
          borderRadius={50}
          background={'red'}
            onClick={() =>
              call
                ?.leave({ reject: true, reason: "decline" })
                .catch((err) => console.error("leave() failed:", err))
            }
          >
             <Icons.PhoneIncoming color="white"/>
          </Button>
        </HStack>
      </VStack>
    </Overlay>
  )
}

function ActiveCallPanel() {
  return (
    <Box
      position="fixed"
      inset={0}
      zIndex={1400}
      bg="black"
      display="flex"
      flexDirection="column"
      height="100vh" 
      width="100vw"  
    >               
      <StreamTheme style={{position:'relative', width:'100%', height:'100vh', background:'#1d1d1d'}}>
        <Box height={'100%'} width={'100%'} position="relative">
          <MyUIView/>
        </Box>
        <Box zIndex={200} justifyContent={'center'} alignItems={'center'} display={'flex'} width={'100%'} bottom={12} position={'absolute'}>
          <CallControls />
        </Box>
      </StreamTheme>
    </Box>
  )
}

function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <Box
      position="fixed"
      inset={0}
      zIndex={1400}
      bg="blackAlpha.900"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {children}
    </Box>
  )
}