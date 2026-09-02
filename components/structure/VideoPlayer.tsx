"use client"
import { Box, Text } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { Icons } from '../../utils/exportIcons'

export default function VideoPlayer({video , duration}:{video:string, duration:string }) {
    const ref = useRef<HTMLVideoElement | null>(null)
    const [visible, setVisible] = useState(true)
    function handleclick(){
        const video = ref.current
        if(!video) return;
        if(video.paused && visible){
           ref.current?.play() 
           setVisible(false) 
           return
        }else{
            ref.current?.pause() 
           setVisible(true) 
           return
        }
       
    }
    const formater = new Intl.DurationFormat('video' , {
        minutes:'2-digit',
        seconds:'2-digit'
    })
  return (
    <div onClick={handleclick}>
        <Box  alignItems={'center'} justifySelf="center" cursor={'pointer'} alignSelf={'center'} justifyContent={'center'} display={visible ? 'flex' : 'none'} left={0} right={0} top={0} bottom={0} position={'absolute'} zIndex={100} backgroundColor={'purple'} borderRadius={50} height={50} width={50}>
            <Icons.PlayIcon color="white" fill="white"/>
        </Box>
        <Box padding={2} zIndex={300} right={5} bottom={10} position={'absolute'} borderRadius={5} background={'#1d1d1d'}>
            <Text color={'white'} fontSize={10}>{formater.format({ seconds: parseInt(duration) }) }</Text>
        </Box>
        <video ref={ref} style={{width:'100%', left:0,top:0, height:"100%", objectFit:"cover", position:'absolute'}} controls={false} src={video}/>
                              
    </div>
  )
}
