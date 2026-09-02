"use client"
import { Box, Button, HStack, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { addComment } from '../../app/actions/auth'
import { Icons } from '../../utils/exportIcons'

export default function CustomComent({id}:{id:string}) {
    const [comment, setComment] = useState('')
    const [isPosting, setIsPosting] = useState(false)

    async function commenting(){
        if(!id || !comment.trim() || isPosting) return
        setIsPosting(true)
        try {
            await addComment(id, comment.trim())
            setComment('') // NEW: was never resetting
        } finally {
            setIsPosting(false)
        }
    }
    return (
        <HStack width={'100%'} alignItems={'center'}>
            <Box background={"#f6f6f6"} borderRadius={50} flex={1}>
                <Input
                    value={comment}
                    onChange={(e)=>{setComment(e.target.value)}}
                    onKeyDown={(e)=> e.key === 'Enter' && commenting()}
                    border={'none'} outline={"none"} placeholder="digit your comment"
                />
            </Box>
            <Button borderRadius={50} onClick={commenting} disabled={!comment.trim() || isPosting}>
                <Icons.Send/>
            </Button>
        </HStack>
    )
}