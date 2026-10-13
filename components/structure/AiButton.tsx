"use client"
import { useCustomButton } from '@isidrozau/react-voice-gemini-live-realtime'
import React, { useEffect, useState } from 'react'
import { Icons, Voice } from '../../utils/exportIcons'
import { Button, Skeleton, SkeletonCircle } from '@chakra-ui/react'
import { Suspense } from 'react'

export default function AiButton() {
    const {buttonref, isConnected} = useCustomButton()
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    function handler (){
        if(!buttonref.current) return
        buttonref.current.click()
    }
  return (
      <Skeleton borderRadius={50} loading={!mounted}>
          <div  style={{display: mounted && isConnected  ? "block" : "none"}} onClick={handler}>
        <Button background={'#1d1f21'}  borderRadius={50}><Voice color={'white'} width={40} height={40}/> </Button>
      </div>  
      </Skeleton>
        
  )
}
