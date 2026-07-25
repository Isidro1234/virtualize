import { Heading, HStack, VStack , Text } from '@chakra-ui/react'
import React from 'react'
import Logo from "../../public/logo2.svg"

export default function Footer() {
  return (
    <VStack width={"100%"} background={"#1d1d1d"}  minHeight={'70vh'}>
      <HStack justifyContent={"space-between"} alignItems={"flex-start"}  padding={10} width={'100%'}>
              
              <VStack alignItems={"flex-start"}>
                <Heading color={"#00bf63"}>Contact</Heading>
                <Text className="link-items">w212212997@student.hccs.edu</Text>
              </VStack>
              <VStack alignItems={"flex-start"}>
                <Heading color={"#00bf63"}>Services</Heading>  
                <Text className="link-items">Live Tutoring</Text>
                <Text className="link-items">PVirtual ClassRoom</Text>
                <Text className="link-items">Innovation Hubs</Text>
                <Text className="link-items">Books</Text>
                <Text className="link-items">Courses</Text>
                <Text className="link-items">Collaborative tools</Text>
                <Text className="link-items">Debate forums</Text>
                <Text className="link-items">Live Debates</Text>
              </VStack>
              <VStack alignItems={"flex-start"}>
                <Heading color={"#00bf63"}>About us</Heading> 
                <Text className="link-items">Who we are</Text>
                <Text className="link-items">Our Mission</Text>
                <Text className="link-items">Goals</Text>
                <Text className="link-items">Learn More...</Text>
              </VStack>
          </HStack>
          <HStack>
            <Logo height="70px" width="70px" style={{scale:2.2}}/>

          </HStack>
          <Text fontSize={12} color={"gray"}>&copy; Copyright inta inc {new Date().getFullYear()}. All rights reserved</Text>
    </VStack>
    
  )
}
