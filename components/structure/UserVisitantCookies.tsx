import React from 'react'
import DocCard from './DocCard'
import { Heading, HStack, VStack } from '@chakra-ui/react'
import LiveCard from './LiveCard'
import PostCard from './PostCard'
import AvatarLiveCircle from './AvartarLiveCircle'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { adminAuth } from '../../config/admin-firestore'
import { cacheData, getSession } from '../../app/actions/auth'

export default async function UserVisitantCookies() {
  const user = await getSession()
  if(!user){
     return redirect('/login')
  }
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
                <DocCard/>
          
            </VStack>
    
            
           
        </HStack>
  )
}
