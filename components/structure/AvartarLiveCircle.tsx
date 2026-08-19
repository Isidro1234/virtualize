import React from 'react'

import {Box, Avatar , Text} from '@chakra-ui/react'


export default function AvatarLiveCircle(){
    return(
        <Box>
            <Avatar.Root>
                <Avatar.Fallback name={'isi'}/>
                <Avatar.Image src="https://images.pexels.com/photos/37795361/pexels-photo-37795361.jpeg"/>
            </Avatar.Root>
            <Text fontSize={10}>Calculus</Text>
        </Box>
    )
}