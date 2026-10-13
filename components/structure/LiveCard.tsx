"use client"
import React from "react"
import {VStack} from "@chakra-ui/react"
import { LivestreamPlayer, useCall, useCalls } from "@stream-io/video-react-sdk"



export default function LiveCard(){

  const calls = useCall()
  if(!calls){
    return
  }
    return(
        <VStack position={'relative'} borderRadius={10} background={"black"} minWidth={247} height={350}>
        
          <LivestreamPlayer callId={calls.id} callType={calls.type}/>
        </VStack>
    )
}