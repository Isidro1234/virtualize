"use client"
import { Button } from '@chakra-ui/react'
import { CallRecordingList, useCalls } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'
import { useLogicState } from '../../states/useLogicState'

export default function RecordingManager() {
    const calls = useCalls()
    const setrec = useLogicState((state)=>state.setRecordings)
        async function Recordings(){
            const data = calls.map(async(call)=>{
                const rec = await call.listRecordings()
                return rec.recordings
            })
            const res = await Promise.all(data)
            const ref = res.flat()
            console.log(ref)
            setrec(res)
        }
  return (
    <div>
      <Button onClick={Recordings}>recordings</Button>
     
    </div>
  )
}
