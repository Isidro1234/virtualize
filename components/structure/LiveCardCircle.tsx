"use client"
import { Heading, HStack, VStack } from '@chakra-ui/react'
import { StreamCall, useCalls } from '@stream-io/video-react-sdk'
import React from 'react'
import AvatarLiveCircle from './AvartarLiveCircle'

export default function LiveCardCircle() {
  const calls = useCalls()
  return (<VStack alignItems={'flex-start'} width={'100%'}>
                              <HStack gap={7}>
      {calls?.map((item, index)=>{
        return(
          <StreamCall call={item} key={item.id}>
            <AvatarLiveCircle  key={index}/>
          </StreamCall>
        )
      })}   
      </HStack>
      </VStack>
  )
}
