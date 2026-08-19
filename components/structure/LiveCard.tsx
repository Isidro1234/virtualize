import React from "react"
import {VStack, HStack , Button, Text , Avatar , Heading , Box} from "@chakra-ui/react"
import Image from "next/image"



export default function LiveCard(){
    return(
        <VStack position={'relative'} borderRadius={10} background={"black"} minWidth={250} height={350}>
                          <Button zIndex={100} right={5} top={5} position={'absolute'} fontSize={10} size={'2xs'} color={'white'} background={'red'} borderRadius={5}>Live</Button>
                          <HStack zIndex={200} left={4} bottom={5} position={'absolute'}>
                            <Avatar.Root size={"sm"}>
                              <Avatar.Fallback name="W"/>
                            </Avatar.Root>
                            <Box>
                              <Heading color={"white"} fontSize={14}>Politica internacional</Heading>
                              <Text marginTop={-1.5} color={'gray'} fontSize={10}>University of Houston</Text>
                              <Text marginTop={-.8} color={'gray'} fontSize={10}>350k views</Text>
                            </Box>
                          </HStack>
                          <Image alt={"image-live"} src={'https://images.pexels.com/photos/8847142/pexels-photo-8847142.jpeg'} fill style={{height:"100%" , borderRadius:10, width:"100%", opacity:.5 , objectFit:"cover"}}/>
                      </VStack>
    )
}