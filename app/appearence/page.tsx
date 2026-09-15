import { Box, Heading, HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import AvatarByUid from '../../components/structure/AvatarByUid'
import { getAllUni } from '../actions/auth'
import Image from 'next/image'

export default async function AppearencePage() {
    const unis = await getAllUni()
  return (
    <VStack alignItems={'flex-start'} width={'100%'} >
      
      {unis?.length > 0 &&
      <Heading marginTop={5} fontSize={14} color={'white'}>Universities</Heading>
      }
      
      {unis?.map((item, index)=>{
        return(
          <HStack key={index} justifyContent={'flex-start'} width={'100%'} maxWidth={'100%'} overflowX={'auto'}>
        <Box position={'relative'} overflow={'hidden'} background={'#f6f6f6'} height={150} width={250} borderRadius={10}>
            {item?.photo
            
            &&
             <Image src={item?.photo} style={{height:"100%", width:"100%" , objectFit:'cover'}} alt='uni' fill/>
        
            }
           </Box>
      </HStack>
        )
      })}
      
      <Heading marginTop={5} fontSize={14} color={'white'}>Video Guide</Heading>
      <HStack justifyContent={'flex-start'} width={'100%'} maxWidth={'100%'} overflowX={'auto'}>
        <Box overflow={'hidden'} background={'transparent'} borderWidth={0} border={'none'} position={'relative'} height={350} width={'100%'} borderRadius={20}>
          <video controls style={{width:'100%', height:'100%', objectFit:'cover'}} src='/Education.mp4'/>
        </Box>
      </HStack>
      
    </VStack>
  )
}
