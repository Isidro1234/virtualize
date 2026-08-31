"use client"
import { Box, VStack } from '@chakra-ui/react'
import "@stream-io/video-react-sdk/dist/css/styles.css"
import { LivestreamLayout, useCall } from '@stream-io/video-react-sdk'
import React from 'react'
import { CustomLivestreamView } from './CustomUserViewer'

export default function LiveCardPreview() {
    const call = useCall()

    if(!call){
        return (
            <Box position={'relative'} background={'black'} overflow={'hidden'} borderRadius={15} height={250} width={'100%'}>
                <video controls={false} autoPlay playsInline muted src={'https://www.pexels.com/download/video/7226920/'} style={{width:'100%', height:'100%', objectFit:'cover'}}/>
            </Box>
        )
    }
    console.log(call)
  return (
    <Box position={'relative'} background={'black'} borderRadius={15} height={250} width={'100%'}>

        <CustomLivestreamView/>

    </Box>
  )
}
