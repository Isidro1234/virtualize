import React from 'react'
import {HStack , Avatar , Box , Text , Heading} from '@chakra-ui/react'



export default function AvatarInfoCard(){
    return(
        <HStack borderRadius={12} padding={4} paddingRight={18}  zIndex={200} left={0} bottom={0} position={'absolute'}>
            <Avatar.Root size={"sm"}>
                <Avatar.Fallback name="W"/>
            </Avatar.Root>
           
         </HStack>
    )
}