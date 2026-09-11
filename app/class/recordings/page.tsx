"use client"
import { VStack , Box, Button} from '@chakra-ui/react'
import { CallRecording } from '@stream-io/node-sdk'
import { StreamCall, useCall, useCalls } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'
import { useStreamContext } from '../../../context/StreamVideo'



export default function Recording() {

    
  return (
    <VStack>
        <Button>recordings</Button>
    </VStack>
  )
}
