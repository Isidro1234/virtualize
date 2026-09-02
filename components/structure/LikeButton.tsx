"use client"
import { Button, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Icons } from '../../utils/exportIcons'
import { addLikes } from '../../app/actions/auth'

export default function LikeButton({uid, likes}:{uid:string, likes:number}) {
    const [count, setCount] = useState(likes)
    const [liked, setLiked] = useState(false)
    const [pending, setPending] = useState(false)

    async function like(){
        if(pending) return
        setPending(true)
        setLiked((prev) => !prev)
        setCount((prev) => prev + (liked ? -1 : 1))
        try {
            await addLikes(uid)
        } finally {
            setPending(false)
        }
    }
    return (
        <Button onClick={like} borderRadius={50} background={"transparent"} disabled={pending}>
            <Icons.HeartIcon fill={liked ? "#00bf63" : "transparent"} color={liked ? "#00bf63" : "gray"}/>
            <Text color={'gray'}>{count || ''}</Text>
        </Button>
    )
}