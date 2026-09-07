import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'

export default function FreeBooks() {
  return (
    <VStack width={'100%'}>
        <Box>
            <Image  height={200} width={200} src={''} alt='pic'/>
            <Box>
                <Heading>Title of the book</Heading>
                <Text>Author of the book</Text>
                <Button>Read</Button>
            </Box>
        </Box>
    </VStack>
  )
}
