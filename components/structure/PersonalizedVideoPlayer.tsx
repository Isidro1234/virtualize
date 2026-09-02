"use client"
import React, { useRef } from 'react'

export default function PersonalizedVideoPlayer() {
    const ref = useRef<HTMLVideoElement>(null)
    const formater = new Intl.DurationFormat('video' , {
        hours:'2-digit',
        minutes:'2-digit',
        seconds:'2-digit'
    })
    function handleVolume(){

    }
    function handlePlay(){

    }
    function handleSlide(){

    }
    function handleTiming(){

    }
    
  return (
    <div>
      <video ref={ref} controls={false}/>
    </div>
  )
}
