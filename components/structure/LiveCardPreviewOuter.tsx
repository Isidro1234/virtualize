"use client"
import { useEffect, useRef, useState } from 'react'
import { StreamCall, Call } from '@stream-io/video-react-sdk'
import { useStreamContext } from '../../context/StreamVideo'
import LiveCardPreview from './LiveCardPreview'
import { Box } from '@chakra-ui/react'

const POLL_INTERVAL_MS = 3000

export default function LiveCardPreviewOuter() {
  const { videoClient } = useStreamContext()
  const [call, setCall] = useState<Call | null>(null)
  const activeCallRef = useRef<Call | null>(null)
  const cancelledRef = useRef(false)
  const inFlightRef = useRef(false)

  useEffect(() => {
    if (!videoClient) return
    cancelledRef.current = false

    const handleCallEnded = () => {
      activeCallRef.current = null
      setCall(null)
    }

    async function fetchLiveCall() {
      if (inFlightRef.current) return
      inFlightRef.current = true

      try {
        const { calls } = await videoClient!.queryCalls({
          filter_conditions: { ongoing: true },
          sort: [{ field: 'created_at', direction: -1 }],
          limit: 1,
        })

        if (cancelledRef.current) return

        const nextLive = calls[0] ?? null

        if (nextLive?.state?.backstage) {
          if (activeCallRef.current) {
            if (activeCallRef.current.state.callingState !== 'left') {
              await activeCallRef.current.leave().catch(() => {})
            }
            activeCallRef.current = null
            setCall(null)
          }
          return
        }

        if (activeCallRef.current && nextLive?.cid === activeCallRef.current.cid) {
          return
        }

        if (activeCallRef.current) {
          if (activeCallRef.current.state.callingState !== 'left') {
            await activeCallRef.current.leave().catch(() => {})
          }
          activeCallRef.current = null
          setCall(null)
        }

        if (!nextLive) return

        const existing = videoClient!.state.calls.find((c) => c.cid === nextLive.cid)

        if (existing && existing.state.callingState === 'joined') {
          activeCallRef.current = existing
          setCall(existing)
          existing.on('call.ended', handleCallEnded)
          existing.on('call.session_ended', handleCallEnded)
          return
        }

        if (existing && existing.state.callingState === 'joining') {
          return
        }

        await nextLive.join({ create: false })

        if (cancelledRef.current) {
          await nextLive.leave().catch(() => {})
          return
        }

        activeCallRef.current = nextLive
        setCall(nextLive)
        
        nextLive.on('call.ended', handleCallEnded)
        nextLive.on('call.session_ended', handleCallEnded)
      } catch (error: any) {
        if (error?.code === 17 || error?.message?.includes('JoinBackstage')) {
          return
        }
        console.warn('Failed to fetch or join live call:', {
          message: error?.message,
          code: error?.code,
        })
      } finally {
        inFlightRef.current = false
      }
    }

    fetchLiveCall()
    const interval = setInterval(fetchLiveCall, POLL_INTERVAL_MS)

    return () => {
      cancelledRef.current = true
      clearInterval(interval)
      if (activeCallRef.current) {
        activeCallRef.current.off('call.ended', handleCallEnded)
        activeCallRef.current.off('call.session_ended', handleCallEnded)
        if (activeCallRef.current.state.callingState !== 'left') {
          activeCallRef.current.leave().catch(() => {})
        }
      }
    }
  }, [videoClient])

  if (!videoClient || !call) {
    return (
      <Box position={'relative'} background={'black'} overflow={'hidden'} borderRadius={15} height={250} width={'100%'}>
        <video loop controls={false} autoPlay playsInline muted src={'/Education.mp4'} style={{width:'100%', height:'100%', objectFit:'cover'}}/>
      </Box>
    )
  }

  return (
    <StreamCall call={call}>
      <LiveCardPreview />
    </StreamCall>
  )
}