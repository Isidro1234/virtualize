import { Avatar, Box, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Icons } from '../../utils/exportIcons'
import DialogingComp from './DialogingComp'
import Image from 'next/image'

export default function MainUser({user , schools , catg , children}:{user:any, schools:Array<any> , catg:Array<any>, children:React.ReactNode}) {
  return (
    <VStack flex={1} height={'100%'} minWidth={100} background={'#181a1c'}  borderRadius={20} padding={5} >
                 <HStack justifyContent={'flex-end'} width={'100%'} padding={2}>
                   
                     <Avatar.Root >
                       <Avatar.Fallback name={user?.name || ''}/>
                       {user?.photo &&
                       <Avatar.Image src={user?.photo || ''}/>
                       }
                       
                     </Avatar.Root> 
                     <VStack gap={0} alignItems={'flex-start'}>
                       <Heading color={'#f6f6f6'} lineHeight={1.0} fontWeight={400} fontSize={14}>{user?.name || ''}</Heading>
                       <Text color={'gray'} fontSize={12}>Houston, Texas</Text>
                     </VStack>
                     <Box marginRight={4} marginLeft={5}>
                       <Icons.Bell width="25px" height="25px" color='white' strokeWidth={1}/>
                     </Box>
                 </HStack>
                 
                        {children}
               </VStack>
  )
}
