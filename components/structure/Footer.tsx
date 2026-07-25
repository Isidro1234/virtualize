"use client"
import { Heading, HStack, VStack , Text } from '@chakra-ui/react'
import React from 'react'
import Logo from "../../public/logo2.svg"
import Logos2 from "../../public/inta2.svg"
import * as motion from "motion/react-client";
export default function Footer() {
  return (
    <motion.div style={{width:"100%", background:"#1d1d1d"}} initial={{ opacity: 0}}
      whileInView={{ opacity: 1,}}
      transition={{ duration: 1 }}
      viewport={{ once: false, amount: 0.2 }} >
    <VStack width={"100%"} background={"#1d1d1d"}  minHeight={'80vh'}>
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
       
          <VStack justifyContent={"center"} gap={0} alignItems={"center"}>
             <Logo height="70px" width="70px"  style={{scale:2}} />
          </VStack>
           <VStack marginTop={-1} justifyContent={"center"} gap={0} alignItems={"center"}>
             <Logos2 height="70px" width="70px"  style={{scale:2, marginLeft:"85px"}} />
          </VStack>
          
          <Text marginTop={-5} fontSize={12} color={"gray"}>&copy; Copyright inta inc {new Date().getFullYear()}. All rights reserved</Text>
    </VStack>
    </motion.div>
    
  )
}
