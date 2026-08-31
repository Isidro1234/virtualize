"use client"
import {  Call, LivestreamPlayer, StreamCall} from '@stream-io/video-react-sdk'
import '@stream-io/video-react-sdk/dist/css/styles.css';
import React from 'react'
import HostPreview from './HostPreview';
import DeviceCameraAudio from './DeviceCameraAudio';

export default function LiveDisplay({callid}:{callid:Call | null}) {
    if(!callid) return;
  return (
    <StreamCall call={callid}>
      <HostPreview/>
      <DeviceCameraAudio call={callid}/>
    </StreamCall>
  )
}
