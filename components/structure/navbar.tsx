"use client"
import { Button, Heading, HStack, Input, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'
import Logo from '../../public/logo2.svg'
import Search from  '../../public/icons/search.svg'
import {useEffect , useRef} from "react"
export default function Navbar() {
  const navref = useRef<HTMLDivElement>(null)
 useEffect(() => {
  if (!navref.current) return;

  const handleScroll = () => {
    if (!navref.current) return;

    if (window.scrollY >= 20) {
      navref.current.style.background = "white";
          navref.current.style.transition = "all ease-in-out 300ms"
    } else if (window.scrollY <= 20) {
      navref.current.style.background = "transparent";
      navref.current.style.transition = "all ease-in-out 300ms"
    }
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);
  return (
    <HStack ref={navref} zIndex={500}  background={'transparent'} position={'fixed'} width={"100%"} padding={5}>
      <VStack  alignItems={'flex-start'} flex={1}>
        <Logo style={{scale:4, marginLeft:75}} height="50px" width="50px"/>
      </VStack>

        <HStack gap={10} justifyContent={'flex-end'}>
          <Text className='nav-bar-links'>Services</Text>
          <Text className='nav-bar-links'>For Universities</Text>
          <Text className='nav-bar-links'>About us</Text>
          <Button borderRadius={50} color={'white'} _hover={{background:"#00bf63", color:"white"}} paddingLeft={7} bg={'#00bf63'} paddingRight={7} >Login</Button>
        </HStack>


    </HStack>
  ) 
}
