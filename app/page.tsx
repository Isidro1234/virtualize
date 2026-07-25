"use client"
import { Box, Button, Heading, HStack, Span, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import VirtualPage from "../public/main-virtualize.svg"
import Footer from "@/components/structure/Footer";
import * as motion from "motion/react-client";



export default function Home(){
  return (<VStack gap={0} background={'#1d1d1d'}>
    <motion.div style={{width:"100%"}} initial={{opacity:0}} animate={{opacity:1, }} transition={{duration:1}}>
      <VStack className="hero" gap={0} position={'relative'} alignItems={'flex-start'} backgroundColor={'green'} justifyContent={'center'} width={'100%'} height={"90vh"}>
        <video style={{width:"100%", height:"100%", objectFit:"cover"}} playsInline autoPlay loop src={'/vid (2).mp4'} />
        <VStack padding={10}   marginTop={4} zIndex={100} position={'absolute'} alignItems={'flex-start'}>
              <Text borderRadius={50} padding={0} fontSize={12}  color={"#00bf63"}>From the classroom to the world
              </Text>
              <Heading fontSize={45} color={'white'} lineHeight={1.2} width={520}>Global <Span color={'#00bf63'}>interactive</Span> learning<Span > Platform</Span> </Heading>
              <Text marginTop={4} fontSize={18}  width={400} color={"#e6e6e6e6"}>Connect with students across the globe, share experience,
                learn from the best Universities
              </Text>
              <Button width={200}  bg={'transparent'} marginTop={2} size={"lg"} color={'#00bf63'} padding={4} borderColor={'#00bf63'} borderRadius={50}>Get Started Today</Button>
        </VStack>
      </VStack>
    </motion.div>
      <motion.div style={{width:"100%"}} initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  viewport={{ once: false, amount: 0.2 }} >
          <VStack padding={10} background={'#1d1d1d'} width={'100%'}>
          <Heading color={'#00bf63'}>Our Platform</Heading>
          <Text color={'gray'} fontSize={12}>help students make best out of college</Text>

          <Box marginTop={4} borderRadius={20}  padding={2}>
            <Image style={{borderRadius:20}} height={900} width={900} alt="image" src={'/virtrs.png'}/>
          </Box>
        
        </VStack>
      </motion.div>
      <motion.div style={{width:"100%"}} initial={{ opacity: 0, x: -350 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 1 }}
  viewport={{ once: false, amount: 0.2 }} > 
<HStack justifyContent={'flex-start'} width={'100%'}  minHeight={'90vh'} background={'#1f1f1f'}>
        <VStack alignItems={'flex-start'} flex={1} padding={10}>
          <Heading fontSize={64} color={'white'}>Live <Span color={'#00bf63'}>Dabates</Span> </Heading>
          <Text color={'gray'} maxWidth={500} marginTop={8}>Students can again in online debate forums, learn, share-experiences,
            and improve on their public speaking habilities.
          </Text>
          <Button borderColor={'#00bf63'} color={'#00bf63'} background={'transparent'} borderWidth={1} borderRadius={50} marginTop={2}>Read more</Button>
        </VStack> 
        <Image alt="live" height={500} width={500} src={'/debates5.png'}/>


      </HStack>
  </motion.div>
      <motion.div style={{width:"100%", padding:5}} initial={{ opacity: 0, scale:0 , borderRadius:50}}
  whileInView={{ opacity: 1, scale:1.0, borderRadius:20}}
  transition={{ duration: 1 }}
  viewport={{ once: false, amount: 0.2 }} > 
       <HStack justifyContent={'flex-start'} width={'100%'} borderRadius={20}  minHeight={'90vh'} backgroundColor={"white"} >
        <Box position={'relative'}  flex={.7} height={'100%'}>
           <Image alt="live"  width={300} height={300} src={'/professor.png'}/>
        </Box>
       
        <VStack alignItems={'flex-start'}  padding={10}>
          <Heading fontSize={64} color={'#2d2d2d'}>Live <Span color={'#00bf63'}>Tutors</Span> </Heading>
          <Text color={'gray'} maxWidth={500} marginTop={8}>Students, Professors, Self-taught individuals can share their knowledge with 
            the world, teach a variety of materials, to peers, aid in dubts.
          </Text>
          <Button borderColor={'#00bf63'} color={'#00bf63'} background={'transparent'} borderWidth={1} borderRadius={50} marginTop={2}>Read more</Button>
        </VStack> 
        


      </HStack>
      </motion.div>
      <motion.div style={{width:"100%", padding:5}} initial={{ opacity: 0, x:20 , borderRadius:50}}
  whileInView={{ opacity: 1, x:0, borderRadius:20}}
  transition={{ duration: 1 }}
  viewport={{ once: false, amount: 0.2 }} > 
     <HStack justifyContent={'flex-start'} alignItems={'center'} width={'100%'}  height={'90vh'} background={'#1a1a1a'}>
        
       
        <VStack alignItems={'flex-start'}  padding={10} flex={1}>
          <Heading fontSize={48} width={590} lineHeight={1.2} color={'white'}>Free extra-curriculum  <Span color={'#00bf63'}>Courses</Span> </Heading>
          <Text color={'gray'} maxWidth={500} marginTop={4}>We offer a huge stack of free courses for anyone willing to learn.
            We will be  working with schools and the education department to 
            turn these courses CE-credited
          </Text>
          <Button borderColor={'#00bf63'} color={'#00bf63'} background={'transparent'} borderWidth={1} borderRadius={50} marginTop={2}>Read more</Button>
        </VStack> 
        <Box position={'relative'}  height={'100%'} marginTop={40}>
           <Image alt="live"  height={700} width={700} src={'/course.png'}/>
        </Box>
        


      </HStack>
      </motion.div>
      <motion.div style={{width:"100%", padding:5}} initial={{ opacity: 0, y:10 , borderRadius:50}}
  whileInView={{ opacity: 1, y:0, borderRadius:20}}
  transition={{ duration: 1 }}
  viewport={{ once: false, amount: 0.2 }} > 
      <HStack justifyContent={'center'} width={'100%'} height={'90vh'} background={'#00bf63'}>
        
  
        <VStack  alignItems={'center'}  padding={10} flex={0}>
          <Heading textAlign={'center'} fontSize={64} lineHeight={1.0} width={510} color={'white'}>Feedbacks  <Span color={'green'}>on our work</Span> </Heading>
          <Text fontSize={24} textAlign={'center'} color={'black'} maxWidth={400} marginTop={2}>Share with us any thing we can improve on our application
          </Text>
          <Button size={"lg"}  color={'#00bf63'} background={'white'} borderWidth={0} borderRadius={50} marginTop={2}>Read more</Button>
        </VStack> 
        
        
        <Box position={'relative'}  >
           <Image alt="live" height={500} width={700} src={'/feedback (2).png'}/>
        </Box>
        
      </HStack>
      </motion.div>
   
    
      
  </VStack>)
}