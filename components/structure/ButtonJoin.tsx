"use client"
import React, { useEffect, useState } from 'react'
import { checkIfJoinedHub, joinHub } from '../../app/actions/auth'
import { Button } from '@chakra-ui/react'

export default function ButtonJoin({uid, id}:{uid:string | null, id:string | null}) {
    const [hasjoined, setjoin] = useState<{ismember:boolean}>();
    useEffect(()=>{
        async function getting(){
            if(!uid || !id) return;
            const res  = await checkIfJoinedHub(uid , id);
            if(!res?.ismember) {
                setjoin({ismember:false})
            }
            setjoin(res)
        }
        getting()
    }, [])
    async function submit(){
        if(!uid || !id) return;
       const res =  await joinHub(uid, id)
       setjoin(res)
    }
  return (
    <Button background={hasjoined?.ismember ? 'green' : 'black'} onClick={submit} fontSize={12} size={"2xs"}>{hasjoined?.ismember ? "Joined" : "Join"}</Button>
  )
}
