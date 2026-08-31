import { ParticipantView, SpeakerLayout, StreamTheme } from '@stream-io/video-react-sdk'
import React from 'react'
import CustomLayout from './CustomLayout'

export default function HostPreview() {
  return (
    <StreamTheme>
      <CustomLayout/>
    </StreamTheme>
  )
}
