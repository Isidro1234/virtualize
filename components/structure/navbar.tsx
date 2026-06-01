import { Button, Heading, HStack, Input, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'
import Logo from '../../public/logo2.svg'
import Search from  '../../public/icons/search.svg'
export default function Navbar() {
  return (
    <HStack  backgroundColor={"white"} width={"100%"} padding={5}>
      <VStack alignItems={'flex-start'} flex={1}>
        <Logo style={{scale:4, marginLeft:75}} height="50px" width="50px"/>
      </VStack>

        <HStack gap={10} justifyContent={'flex-end'}>
          <Text className='nav-bar-links'>Services</Text>
          <Text className='nav-bar-links'>For Universities</Text>
          <Text className='nav-bar-links'>About us</Text>
          <Button borderRadius={50} paddingLeft={7} paddingRight={7} bg={'#00bf63'}>Login</Button>
        </HStack>


    </HStack>
  ) 
}
