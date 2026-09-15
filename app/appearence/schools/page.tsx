import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { getAllUni } from '../../actions/auth'
import Image from 'next/image'

export default async function Schools() {
    const unis = await getAllUni()
    const colorScheme = [
        '#752944',
        '#309283',
        '#857109',
        '#198264',
        '#099049',
        '#021275',
        '#393671',
        '#009386'
    ]
  return (
     <VStack alignItems={'flex-start'} height={'100%'} width={'100%'} overflowY={'auto'} maxWidth={'100%'}>
    <Heading marginBottom={4} color={'gray'} fontSize={14}>Universities</Heading>
            <HStack gridTemplateColumns={'repeat(auto-fit, minmax(200px, 300px))'} display={'grid'} width={'100%'}>
               {
                unis?.map((items, index)=>{
                    return (
                    <VStack  className='celeb' gap={1} height={150} position={'relative'} overflow={'hidden'} padding={10} borderRadius={10} background={'#111313'} justifyContent={'center'} alignItems={'flex-start'} key={index}>
                      
       
                        <Image style={{ objectFit:'cover', width:'100%', height:"100%"}} alt='pic' fill src={items?.photo}/>
                     
                       <Heading marginTop={1} lineHeight={1.0} color={'white'} fontSize={14}> {items?.name} </Heading>
                    </VStack>
                    )
                })
                
                }
        </HStack>
        {unis.length <= 0 && <HStack fontWeight={400} height={'100%'} alignItems={'center'} width={'100%'} justifyContent={'center'}>
            <Heading fontSize={12} color={'gray'}>No university Found yet!</Heading>
            </HStack>}
        </VStack>
  )
}
