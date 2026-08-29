import React from 'react'
import {VStack , HStack , Box, Heading, Avatar, Text , Button, Input} from "@chakra-ui/react"
import {Icons} from "../../utils/exportIcons"
import Image from 'next/image'
import { admindb } from '../../config/admin-firestore'
import AvatarWithId from './AvartWithId'
import VideoPlayer from './VideoPlayer'

export default async function DocCard(){ 
    const videoref =  admindb.collection('DocSeries')
    const videos = await videoref.get()
    if(videos.empty) return;
    const res_vids = videos.docs.map((v)=>{
      return v.data()
    })
    console.log(res_vids)
    const format = Intl.DateTimeFormat('en-US', {
      minute:'2-digit',
      second:'2-digit'
    })
    return(
       <HStack className="post-horizontal" justifyContent={'flex-start'} width={'100%'} maxWidth={700} overflowX={'auto'} alignItems={'flex-start'} >
             {res_vids.map((item, index)=>{
              return(
                 <VStack overflow={'hidden'} key={index} background={"black"} position={'relative'} height={300} gap={5} minWidth={700} width={'100%'} borderRadius={20} borderWidth={1.5} padding={8} alignItems={'flex-start'}>
        
                        <HStack  padding={2} paddingRight={5} borderRadius={15} justifySelf="flex-start" background={'#1d1d1d'} right={0} zIndex={100} bottom={5} left={5} position={'absolute'} alignItems={'center'} >
                          <AvatarWithId id={item?.id}/>
                          <Box flex={1}>
                            <Heading color={'white'} fontSize={14}>{item?.title}</Heading>
                            <Text marginTop={-1.5} color={'gray'} fontSize={12}>{item?.university}</Text>
                            <Text marginTop={-1.4} color={'gray'} fontSize={11}>Author: {item?.author}</Text>
                            
                          </Box>
                         
                        </HStack>
                        <VideoPlayer duration={item?.durantion} video={item?.video}/>
                        </VStack> 
              )
             })}
                
        </HStack>
        
    )
}