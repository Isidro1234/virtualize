import { Avatar, Heading, HStack, VStack, Box, Text, Input, Button } from '@chakra-ui/react'
import React from 'react'
import PostCard from "../../components/structure/PostCard"
import LiveCard from '../../components/structure/LiveCard'
import SideRight from '../../components/structure/SideRight'
import DocCard from "../../components/structure/DocCard"
import AvatarLiveCircle from '../../components/structure/AvartarLiveCircle'
export default function UserVisitant() {
  return (
    <HStack className={'scroll-special'} overflowX={'hidden'}  padding={2} overflowY={'auto'} width={'100%'} position={'relative'}  alignItems={'flex-start'} paddingBottom={10}>
    
        <VStack alignItems={'flex-start'} flex={1} padding={0} >
            <VStack alignItems={'flex-start'} width={'100%'}>
              <Heading color={'#00bf63'} fontSize={14}>Live Tutoring</Heading>
              <HStack gap={7}>
                <AvatarLiveCircle/>
                <AvatarLiveCircle/>
                <AvatarLiveCircle/>
                <AvatarLiveCircle/>
                <AvatarLiveCircle/>
                <AvatarLiveCircle/>
                <AvatarLiveCircle/>
                <AvatarLiveCircle/>
                <AvatarLiveCircle/>
                <AvatarLiveCircle/>
                <AvatarLiveCircle/>
              </HStack>
            </VStack>
            <Heading color={'#00bf63'} marginTop={5} fontSize={18} width={'100%'}>Hot Topics</Heading>
            <HStack className="post-horizontal" justifyContent={'flex-start'} width={'100%'} maxWidth={700} overflowX={'auto'} alignItems={'flex-start'} >
              <PostCard/>
              <PostCard/>
              <PostCard/>
            </HStack>
            <Heading color={'#00bf63'} marginTop={5} fontSize={18} width={'100%'}>Live Debates</Heading>
            <HStack className="post-horizontal"  overflowX={'auto'} maxWidth={770} justifyContent="flex-start" width={'100%'}>
              <LiveCard/>
              <LiveCard/>
              <LiveCard/>
              <LiveCard/>
            </HStack>
            <Heading color={'#00bf63'} marginTop={5} fontSize={18} width={'100%'}>Documentaries & Science Series </Heading>
            <HStack className="post-horizontal" justifyContent={'flex-start'} width={'100%'} maxWidth={700} overflowX={'auto'} alignItems={'flex-start'} >
              <DocCard/>
              <DocCard/>
              <DocCard/>
            </HStack>
        </VStack>

        
       
    </HStack>
  )
}
