"use client"
import { Button, Heading, HStack, Input, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Icons } from '../../utils/exportIcons'
import { usePathname } from 'next/navigation'

export default function NavLabel() {
  const pathname = usePathname()
  return (
    <HStack  background={'#131313'} padding={4} flex={1}>
        <HStack>
                <VStack alignItems={'flex-start'} gap={0}>
                    <Heading lineHeight={1.5} color={'white'}>{pathname.split('/user/')[1]?.toUpperCase() || "HOME"}</Heading>
                    <Text lineHeight={1.2} color={'gray'} fontSize={10}>powered by inta inc </Text>
                </VStack>
                <HStack marginLeft={10}>
                  <Input fontSize={12} outline={'none'} border={'none'} paddingLeft={5} background={'white'} borderRadius={50} placeholder='Search something'/>
                  <Button borderRadius={50}><Icons.Search/></Button>
                </HStack>
                
        </HStack>
      

    </HStack>
  )
}
