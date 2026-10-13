import React from 'react'
import {VStack , HStack , Box, Heading,Text} from "@chakra-ui/react"


export default async function DocCard(){ 
    const videoref = null
    return(
       <HStack className="post-horizontal" justifyContent={'flex-start'} width={'100%'} maxWidth={570} overflowX={'auto'} alignItems={'flex-start'} >
             {/*videoref?.map((item:any, index:any)=>{
              return(
                 <VStack overflow={'hidden'} key={index} background={"black"} position={'relative'} height={300} gap={5} minWidth={570} width={'100%'} borderRadius={20} borderWidth={1.5} padding={8} alignItems={'flex-start'}>
        
                        <HStack  padding={2} paddingRight={5} borderRadius={15} justifySelf="flex-start" background={'#1d1d1d'} right={0} zIndex={100} bottom={5} left={5} position={'absolute'} alignItems={'center'} >
                          <AvatarWithId id={item?.id}/>
                          <Box flex={1}>
                            <Heading color={'white'} fontSize={14}>{item?.title}</Heading>
                            <Text marginTop={-1.5} color={'gray'} fontSize={12}>{item?.university}</Text>
                            <Text marginTop={-1.4} color={'gray'} fontSize={11}>Author: {item?.author}</Text>
                            
                          </Box>
                         
                        </HStack>
                        <VideoPlayer duration={item?.durantion} video={item?.video}/>
                        </VStack> 
              )
             })*/}
                
        </HStack>
        
    )
}