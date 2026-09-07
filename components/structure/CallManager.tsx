"use client"

import {
  useCalls,
  useCall,
  useCallStateHooks,
  StreamCall,
  CallingState,
  SpeakerLayout,
  CallControls,

  AcceptCallButton,
  CancelCallButton,
  StreamTheme,
  ToggleAudioOutputButton,
  ToggleVideoPreviewButton,
} from "@stream-io/video-react-sdk"
import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react"
import { useStreamContext } from "../../context/StreamVideo"

export default function CallManager() {
  const { videoClient } = useStreamContext()
  const calls = useCalls()

  // Nothing to do until the video client (and therefore <StreamVideo>) exists
  if (!videoClient) return null

  // There could technically be more than one ringing call — we surface the
  // first one, same approach Stream's own docs use.
  const ringingCall = calls.find(
    (c) => c.state.callingState === CallingState.RINGING
  )
  const activeCall = calls.find(
    (c) => c.state.callingState === CallingState.JOINED
  )

  const call = ringingCall || activeCall
  if (!call) return null

  return (
    <StreamCall call={call}>
      <CallOverlay />
    </StreamCall>
  )
}

// Renders whichever panel matches the current call's state.
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

// ---------- Outgoing (caller sees this while it rings) ----------
function OutgoingCallPanel() {
  const call = useCall()
  const { useCallMembers } = useCallStateHooks()
  const members = useCallMembers()
  const callee = members?.find((m) => m.user.id !== call?.currentUserId)

  return (
    <Overlay>
      <VStack gap={4}>
        <Text color="white" fontSize="lg" fontWeight="medium">
          {callee?.user.name || "Calling..."}
        </Text>
        <Text color="gray.300" fontSize="sm">
          Ringing...
        </Text>
        <HStack gap={4} mt={4}>
          <ToggleAudioOutputButton />
          <ToggleVideoPreviewButton />
          <CancelCallButton
            onClick={() => call?.leave({ reject: true, reason: "cancel" })}
          />
        </HStack>
      </VStack>
    </Overlay>
  )
}

// ---------- Incoming (callee sees this while it rings) ----------
function IncomingCallPanel() {
  const call = useCall()
  const { useCallMembers } = useCallStateHooks()
  const members = useCallMembers()
  const caller = members?.find((m) => m.user.id !== call?.currentUserId)

  return (
    <Overlay>
      <VStack gap={4}>
        <Text color="white" fontSize="lg" fontWeight="medium">
          {caller?.user.name || "Incoming call"}
        </Text>
        <Text color="gray.300" fontSize="sm">
          Incoming call...
        </Text>
        <HStack gap={4} mt={4}>
          <CancelCallButton
            onClick={() => call?.leave({ reject: true, reason: "decline" })}
          />
          <AcceptCallButton onClick={() => call?.join()} />
        </HStack>
      </VStack>
    </Overlay>
  )
}

// ---------- Ongoing (joined) call ----------
function ActiveCallPanel() {
  return (
    <Box
      position="fixed"
      inset={0}
      zIndex={1400}
      bg="black"
      display="flex"
      flexDirection="column"
    >
      <StreamTheme>
        <Box flex={1} minH={0}>
          <SpeakerLayout />
        </Box>
        <Box py={3}>
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