"use client"
import { Input, VStack, Text , Heading , Span, Button, HStack } from '@chakra-ui/react'
import React from 'react'
import { motion } from "motion/react"
import Image from "next/image";


export default function Aboutus() {
  return (
    <VStack gap={0} background={"#1d1d1d"}>
       <motion.div style={{width:"100%"}} initial={{opacity:0}} animate={{opacity:1, }} transition={{duration:1}}>
             <VStack  gap={0} position={'relative'} alignItems={'flex-start'} backgroundColor={'#1d1d1d'} justifyContent={'center'} width={'100%'} height={"90vh"}>
               <VStack padding={10}   marginTop={4} zIndex={100} position={'absolute'} alignItems={'flex-start'}>
                     <Text borderRadius={50} padding={0} fontSize={12}  color={"#00bf63"}>Who are we?
                     </Text>
                     <Heading fontSize={45} color={'white'} lineHeight={1.2} width={520}>About <Span color={'#00bf63'}>us</Span> </Heading>
                     <Text marginTop={4} fontSize={18}  width={400} color={"#e6e6e6e6"}>we are a educational startup focused on
                        providing tools to improve on scientific literacy, across many levels of education
                     </Text>
                        <Button width={200}  bg={'transparent'} marginTop={2} size={"lg"} color={'#00bf63'} padding={4} borderColor={'#00bf63'} borderRadius={50}>Get Started Today</Button>
        
                   </VStack>
             </VStack>
           </motion.div>
            <motion.div style={{width:"100%"}} initial={{ opacity: 0, x: -350 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 1 }}
             viewport={{ once: false, amount: 0.2 }} > 
           <HStack justifyContent={'flex-start'} width={'100%'}  minHeight={'90vh'} background={'#1f1f1f'}>
                   <VStack alignItems={'flex-start'} flex={1} padding={10}>
                     <Heading lineHeight={1.1} fontSize={64} color={'white'}>Check out the set of activities  <Span color={'#00bf63'}>on our platforms</Span> </Heading>
                     <Text color={'gray'} maxWidth={500} marginTop={8}>Students participate in online debate forums, learn, share-experiences,
                       and improve on their public speaking habilities.
                     </Text>
                     <Button borderColor={'#00bf63'} color={'#00bf63'} background={'transparent'} borderWidth={1} borderRadius={50} marginTop={2}>Read more</Button>
                   </VStack> 
                   <Image alt="live" height={500} width={500} src={'/debates5.png'}/>
           
           
                 </HStack>
             </motion.div>
    </VStack>
  )
}
