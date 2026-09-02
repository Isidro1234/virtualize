"use client"
import React, { useRef } from 'react'

export default function PersonalizedVideoPlayer() {
    const ref = useRef<HTMLVideoElement>(null)
    
  return (
    <div>
      <video ref={ref} controls={false}/>
    </div>
  )
}
