"use client"
import { Heading , Box , Text , Button, HStack, VStack, Skeleton } from '@chakra-ui/react'
import React, { Suspense } from 'react'
import AvatarCourse from './AvatarCourse'
import { useAuth } from '../../context/useAuthContext'
import Image from 'next/image'
import { CheckIcont, Free, LiveIcon, StudentIcon } from '../../utils/exportIcons'

export default function CourseCard() {
  const {user} = useAuth()
  return (
    <Box marginTop={2} borderRadius={10} padding={5}>
            <Box overflow={'hidden'} position={'relative'} height={170} background={'gray'} borderRadius={10} width={270}>

              <Free style={{position:'absolute', background:"#1d1d1d", padding:2, borderRadius:50, zIndex:200, top:10, right:10}} height="30px" width="30px" color="#00bf63"/>
              <Image style={{height:"100%", objectFit:"cover"}} fill alt='novo' src={'https://images.pexels.com/photos/8617965/pexels-photo-8617965.jpeg'}/>
            </Box>
            <HStack alignItems={'center'}>
              <Heading marginTop={2} color={'white'} fontSize={20} >Matematica 007</Heading>
              
            </HStack>
            
            <HStack>
              <Box>

              </Box>
              <VStack>

              </VStack>
            </HStack>
            <HStack>
              
              <HStack alignItems={'center'}>
                <StudentIcon height="20px" width="20px" color="gray"/>
                <Text fontSize={12} color={'gray'}>100 enrolled</Text>
              </HStack>
              
              <HStack alignItems={'center'}>
                <LiveIcon height="20px" width="20px" color="gray"/>
                <Text fontSize={12} color={'gray'}>live </Text>
              </HStack>
              
            </HStack>
            <HStack>
                 <AvatarCourse user={{id:user?.id || null, username:user?.username || null, photo:user?.photo || null}}/>
             </HStack>
            <Button background={'#00bf63'} borderRadius={50} marginTop={4} fontSize={14} width={'100%'}>Enroll</Button>
          </Box>
  )
}
