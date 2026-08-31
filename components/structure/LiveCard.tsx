"use client"
import React from "react"
import {VStack, HStack , Button, Text , Avatar , Heading , Box} from "@chakra-ui/react"
import Image from "next/image"
import { LivestreamPlayer, useCall, useCalls } from "@stream-io/video-react-sdk"
import { useStreamContext } from "../../context/StreamVideo"



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