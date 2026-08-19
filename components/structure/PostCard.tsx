import React from 'react'
import {VStack , HStack , Box, Heading, Avatar, Text , Button, Input} from "@chakra-ui/react"
import Icons from "../../utils/exportIcons"

export default function PostCard(){
    return(
        <VStack gap={5} minWidth={700} width={'100%'} borderRadius={20} borderWidth={1.5} padding={8} alignItems={'flex-start'}>
        
                        <HStack alignItems={'center'} width={'100%'}>
                          <Avatar.Root>
                            <Avatar.Fallback name={"W"}/>
                          </Avatar.Root>
                          <Box flex={1}>
                            <Heading fontSize={14}>Wilson</Heading>
                            <Text marginTop={-1} color={'gray'} fontSize={10}>UHD Professor</Text>
                          </Box>
                          <Button borderRadius={50} background={"transparent"}>
                            <Icons.Reply color="#1d1d1d"/>
                          </Button>
                        </HStack>
                        <Text maxWidth={'100%'} color={'#1d1d1d'} fontSize={18} marginTop={5}>Physics is the study of the universe and the phenomenon that occurs around us;
                          so when we care to matter about the universe, we care to matter about us</Text>
                        <HStack marginTop={4}>
                          <Button borderRadius={50} background={"transparent"}>
                            <Icons.HeartIcon color="gray"/>
                            <Text color={'gray'}>25.7k</Text>
                          </Button>
                          <Button borderRadius={50} background={"transparent"} >
                            <Icons.MessageSquare color="gray"/>
                            <Text color={'gray'}>2k</Text>
                          </Button>
                          <Button borderRadius={50} background={"transparent"}>
                            <Icons.Vote color="gray"/>
                            <Text color={'gray'}>25.7k</Text>
                          </Button>
                          <Button borderRadius={50} background={"transparent"} >
                            <Icons.Share color="gray"/>
                            <Text color={'gray'}>25.7k</Text>
                          </Button>
                          
                        </HStack>
                        <HStack marginTop={-2} width={'100%'} borderTopWidth={1} paddingTop={4}>
                          <Avatar.Root size={"2xs"}>
                            <Avatar.Fallback name={'W'}/>
                          </Avatar.Root>
                          <Box background={"#f6f6f6"} borderRadius={50} flex={1}>
                            <Input border={'none'} outline={"none"} placeholder="digit your comment"/>
                          </Box>
                        </HStack>
                        </VStack>
    )
}