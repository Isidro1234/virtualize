"use client"
import { Avatar, Heading, HStack, Skeleton, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import CurrentAvatar from './CurrentAvatar'
import { CheckIcont } from '../../utils/exportIcons'

export default function AvatarCourse({user}:{user:{id:string | null, username:string | null, photo:string | null}}) {
    const [imageload, setImageLoad] = useState(true)
  return (
    <HStack justifyContent={'flex-start'} marginTop={2}>
        <Skeleton borderRadius={50} loading={imageload} >
            {user?.id && 
                    <Avatar.Root size={'sm'} boxSize={'30px'}>
                        
                        {user?.username &&
                        <Avatar.Fallback name={user.username}/>
                        }
                        {user?.photo &&
                        <Avatar.Image onError={() => setImageLoad(false)} onLoad={()=>{setImageLoad(false)}} src={user.photo}/>
                        }
                    </Avatar.Root>
                    }
        </Skeleton>
        
      
      <VStack alignItems={'flex-start'} gap={0.5}>
        <HStack>
            <Skeleton loading={imageload} >
                <Heading fontWeight={700} lineHeight={1.1} color={'gray'} fontSize={12}>{user.username}</Heading>
            </Skeleton> 
            <Skeleton borderRadius={50} loading={imageload} >
                <CheckIcont color={'#00bf63'} height="17px" width="17px"/>
            </Skeleton> 
        </HStack>
        
        <Skeleton loading={imageload}>
            <Text color={'gray'} fontSize={9}>computer engineer</Text>
        </Skeleton>
        
      </VStack>
    </HStack>
  )
}
