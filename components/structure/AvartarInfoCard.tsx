import React from 'react'
import {HStack , Avatar , Box , Text , Heading} from '@chakra-ui/react'



export default function AvatarInfoCard(){
    return(
        <HStack borderRadius={12} padding={2} paddingRight={18} background={'#1d1d1d'} zIndex={200} left={0} bottom={0} position={'absolute'}>
            <Avatar.Root size={"sm"}>
                <Avatar.Fallback name="W"/>
            </Avatar.Root>
            <Box>
                <Heading color={'white'} fontSize={14}>Politica internacional</Heading>
                <Text marginTop={-1.5} color={'gray'} fontSize={10}>University of Houston</Text>
                <Text marginTop={-.8} color={'gray'} fontSize={10}>350k views</Text>
            </Box>
         </HStack>
    )
}