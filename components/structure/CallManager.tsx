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
import { useEffect, useRef, useState } from "react"

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

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const isPlayingRef = useRef<boolean>(false)
  const playPromiseRef = useRef<Promise<void> | null>(null)

  const handleRingtone = async (start: boolean) => {
    if (typeof window === 'undefined') return

    if (start) {
      if (!audioRef.current) {
        audioRef.current = new Audio('/ring.mp3')
        audioRef.current.loop = true
      }

      if (isPlayingRef.current) return

      isPlayingRef.current = true
      const playPromise = audioRef.current.play()
      playPromiseRef.current = playPromise

      try {
        await playPromise
      } catch (err) {
        // AbortError just means pause() interrupted us — not a real error
        if ((err as DOMException)?.name !== 'AbortError') {
          console.error('Audio playback failed:', err)
        }
        isPlayingRef.current = false
      } finally {
        playPromiseRef.current = null
      }
    } else {
      const audio = audioRef.current
      if (!audio) return

      // Wait for any in-flight play() to settle before pausing,
      // so we never pause mid-request
      if (playPromiseRef.current) {
        try {
          await playPromiseRef.current
        } catch {
          // ignore — already handled above
        }
      }

      audio.pause()
      audio.currentTime = 0
      audioRef.current = null
      isPlayingRef.current = false
    }
  }

  useEffect(() => {
    const activeRingingStates = [CallingState.RINGING, CallingState.JOINING]

    if (!activeRingingStates.includes(callingState)) {
      handleRingtone(false)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
        isPlayingRef.current = false
      }
    }
  }, [callingState])

  if (!call) return null

  if (callingState === CallingState.JOINED) {
    return <ActiveCallPanel onringstate={handleRingtone} />
  }

  if (callingState === CallingState.RINGING || callingState === CallingState.JOINING) {
    return call.isCreatedByMe
      ? <OutgoingCallPanel onringstate={handleRingtone} />
      : <IncomingCallPanel onringstate={handleRingtone} />
  }

  return null
}

function OutgoingCallPanel({onringstate}:{onringstate:Function}) {
  const call = useCall()
  const { useCallMembers } = useCallStateHooks()
  const members = useCallMembers()
  const callee = members?.find((m) => m.user.id !== call?.currentUserId)
  useEffect(()=>{
    onringstate(true)
  }, [])
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

function IncomingCallPanel({onringstate}:{onringstate:Function}) {
  const call = useCall()
  const { useCallMembers } = useCallStateHooks()
  const members = useCallMembers()
  const caller = members?.find((m) => m.user.id !== call?.currentUserId)
   useEffect(()=>{
    onringstate(true)
  }, [])
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

function ActiveCallPanel({onringstate}:{onringstate:Function}) {
  useEffect(()=>{
    onringstate(false)
  }, [])
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