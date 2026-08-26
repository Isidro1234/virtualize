import React from 'react'
import {VStack , HStack , Box, Heading, Avatar, Text , Button, Input} from "@chakra-ui/react"
import {Icons} from "../../utils/exportIcons"
import Image from 'next/image'

export default function DocCard(){
    return(
        <VStack background={"black"} position={'relative'} height={300} gap={5} minWidth={700} width={'100%'} borderRadius={20} borderWidth={1.5} padding={8} alignItems={'flex-start'}>
        
                        <HStack padding={2} paddingRight={5} borderRadius={15} justifySelf="flex-start" background={'#1d1d1d'} right={0} zIndex={100} bottom={5} left={5} position={'absolute'} alignItems={'center'} >
                          <Avatar.Root>
                            <Avatar.Fallback name={"W"}/>
                          </Avatar.Root>
                          <Box flex={1}>
                            <Heading color={'white'} fontSize={14}>The State of the World</Heading>
                            <Text marginTop={-1.5} color={'gray'} fontSize={10}>Professor Wilson Corter</Text>
                            <Text marginTop={-.5} color={'gray'} fontSize={9}>University of Houston | 360k views</Text>
                          </Box>
                         
                        </HStack>
                        <Box alignItems={'center'} justifySelf="center" cursor={'pointer'} alignSelf={'center'} justifyContent={'center'} display={'flex'} left={0} right={0} top={0} bottom={0} position={'absolute'} zIndex={100} backgroundColor={'purple'} borderRadius={50} height={50} width={50}>
                          <Icons.PlayIcon color="white" fill="white"/>
                        </Box>
                        <Box padding={2} zIndex={300} right={5} bottom={10} position={'absolute'} borderRadius={5} background={'#1d1d1d'}>
                          <Text color={'white'} fontSize={10}>01:24:00</Text>
                        </Box>
                        <Image fill style={{width:"100%", height:"100%", borderRadius:20, objectFit:"cover", opacity:.5}} 
                        alt="doc" src="https://images.pexels.com/photos/16740230/pexels-photo-16740230.jpeg"/>
                        </VStack>
    )
}