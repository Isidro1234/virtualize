"use client"
import { Button, Heading, HStack, Input, Span, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { motion } from "motion/react"
import Image from 'next/image'

export default function Universities() {
  return (
    <VStack>
         <VStack gap={0} background={"#1d1d1d"}>
       <motion.div style={{width:"100%"}} initial={{opacity:0}} animate={{opacity:1, }} transition={{duration:1}}>
             <VStack  gap={0} position={'relative'} alignItems={'flex-start'} backgroundColor={'#1d1d1d'} justifyContent={'center'} width={'100%'} height={"90vh"}>
               <VStack padding={10}   marginTop={10} zIndex={100} position={'absolute'} alignItems={'flex-start'}>
                     <Text borderRadius={50} padding={0} fontSize={12}  color={"#00bf63"}>Are you an Universities?
                     </Text>
                     <Heading className='text-title' fontSize={45} color={'white'} lineHeight={1.2} minWidth={100} maxWidth={520} width={'100%'}>Let's <Span color={'#00bf63'}>Connect</Span> </Heading>
                     <Text marginTop={4} fontSize={18} minWidth={70} maxWidth={400} color={"#e6e6e6e6"}>From Shared cross-university classes
                       to online debate panels, interviews, free books, collaborative hubs for professors and students, Virtualize is your final
                       online destination for an enhanced learning experience capable of fueling innovation, collaborative work, and academic participation
                     </Text>
                        <Button width={200}  bg={'transparent'} marginTop={2} size={"lg"} color={'#00bf63'} padding={4} borderColor={'#00bf63'} borderRadius={50}>Get Started Today</Button>
        
                   </VStack>
             </VStack>
           </motion.div>
           <motion.div style={{width:"100%"}} initial={{ opacity: 0, background:"white"}}
             whileInView={{ opacity: 1 }}
             transition={{ duration: 1 }}
             viewport={{ once: false, amount: 0.2 }} > 
           <HStack className='Debates' justifyContent={'flex-start'} width={'100%'}  padding={10} background={'white'}>
                   <VStack alignItems={'flex-start'} flex={1} padding={10}>
                     <Heading className='text-title' lineHeight={1.1} fontSize={64} color={'#1d1d1d'}>Register now University on  <Span color={'#00bf63'}> our platforms</Span> </Heading>
                     <Text color={'gray'} minWidth={100} maxWidth={500} marginTop={8}>Students participate in online debate forums, learn, share-experiences,
                       and improve on their public speaking habilities.
                     </Text>
                     <Button borderColor={'#00bf63'} color={'#00bf63'} background={'transparent'} borderWidth={1} borderRadius={50} marginTop={2}>Read more</Button>
                   </VStack> 
                   <Image className='images' alt="live" height={500} style={{borderRadius:20}} width={500} src={'/school.png'}/>
           
           
                 </HStack>
             </motion.div>
    </VStack>
    </VStack>
  )
}
