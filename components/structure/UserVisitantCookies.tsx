import React from 'react'
import DocCard from './DocCard'
import { Heading, HStack, VStack } from '@chakra-ui/react'
import LiveCard from './LiveCard'
import PostCard from './PostCard'
import AvatarLiveCircle from './AvartarLiveCircle'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { adminAuth } from '../../config/admin-firestore'
import { cacheData, deleteSession, getPosts, getSession } from '../../app/actions/auth'
import LiveCardCircle from './LiveCardCircle'
import LiveCircleOuter from './LiveCircleOuter'
import LiveCardOuter from './LiveCardOuter'

export default async function UserVisitantCookies() {
  const user = await getSession()
  if(!user){
     return null
  }
  const posts = await getPosts()
  return (
    <HStack className={'scroll-special'} overflowX={'hidden'}  padding={2} overflowY={'auto'} width={'100%'} position={'relative'}  alignItems={'flex-start'} paddingBottom={10}>
        
            <VStack alignItems={'flex-start'} flex={1} padding={0} >
                 <LiveCircleOuter/>
                <VStack className="post-horizontal" justifyContent={'flex-start'} width={'100%'} maxWidth={700}  alignItems={'flex-start'} >
                  {posts?.map((item,index)=>{
                    return(
                      <PostCard likes={item?.likes || 0} commentnumber={item?.comment_number} id={item?.id} media={item?.media} text={item?.text} user_id={item?.user_id} key={index}/>
                    )
                  })}
                  
                </VStack>
                <Heading color={'#00bf63'} marginTop={5} fontSize={18} width={'100%'}>Live Debates</Heading>
                <HStack className="post-horizontal"  overflowX={'auto'} maxWidth={770} justifyContent="flex-start" width={'100%'}>
                  <LiveCardOuter/>
                </HStack>
                <Heading color={'#00bf63'} marginTop={5} fontSize={18} width={'100%'}>Documentaries & Science Series </Heading>
                <DocCard/>
          
            </VStack>
    
            
           
        </HStack>
  )
}
