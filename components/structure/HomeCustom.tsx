"use client"
import { Box, Button, Heading, HStack, Span, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import VirtualPage from "../public/main-virtualize.svg"
import { motion } from "motion/react"



export default function HomeCustom(){
  return (<VStack gap={0} background={'#1d1d1d'}>
    <motion.div style={{width:"100%"}} initial={{opacity:0}} animate={{opacity:1, }} transition={{duration:1}}>
      <VStack className="hero" gap={0} position={'relative'} alignItems={'flex-start'} backgroundColor={'green'} justifyContent={'center'} width={'100%'} height={'90vh'}>
        <Image fill style={{width:"100%", height:"100%", objectFit:"cover", filter:"blur(0px)"}} alt="image-hero" src={'/school.png'} />
        <VStack zIndex={200} padding={10}   marginTop={4}  position={'absolute'} alignItems={'flex-start'}>
              <Text borderRadius={50} padding={0} fontSize={12}  color={"#00bf63"}>From the classroom to the world
              </Text>
              <Heading className="text-title"  fontSize={45} color={'white'} lineHeight={1.2} minWidth={70} maxWidth={520}  width={'100%'}>Global <Span color={'#00bf63'}>interactive</Span> learning<Span > Platform</Span> </Heading>
              <Text marginTop={4} fontSize={18} minWidth={70} maxWidth={400}  width={'100%'} color={"#e6e6e6e6"}>Connect with students across the globe, share experience,
                learn from the best Universities
              </Text>
              <Button minWidth={70} maxWidth={200}  width={'100%'}   marginTop={2} size={"lg"} color={'white'} padding={4} bg={'#00bf63'} borderRadius={50}>Get Started Today</Button>
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

          <Box marginTop={0} borderRadius={20}  padding={2} width={'100%'} display={'flex'} justifyContent={'center'}>
            <Image className={'images'} style={{borderRadius:20, minWidth:200 , width:'100%', maxWidth:700, height:'auto'}} height={900}  width={900} alt="image" src={'/v1.png'}/>
          </Box>
        
        </VStack>
      </motion.div>
      <motion.div style={{width:"100%"}} initial={{ opacity: 0, }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 1 }}
  viewport={{ once: false, amount: 0.2 }} > 
<HStack className={'Debates'}  justifyContent={'flex-start'} width={'100%'} padding={10} background={'#1f1f1f'}>
        <VStack alignItems={'flex-start'} flex={1} padding={10} paddingBottom={0} minWidth={0}>
          <Heading className="text-title" fontSize={{base: 32, md: 48, lg: 64}} color={'white'}>Live <Span color={'#00bf63'}>Debates</Span> </Heading>
          <Text color={'gray'} minWidth={70} maxWidth={500} width={'100%'} marginTop={8}>Students can engage in online debate forums, learn, share-experiences,
            and improve on their public speaking abilities.
          </Text>
          <Button borderColor={'#00bf63'} color={'#00bf63'} background={'transparent'} borderWidth={1} borderRadius={50} marginTop={2}>Read more</Button>
        </VStack> 
        <Image className={'images'} style={{minWidth:200 ,width:'100%', maxWidth:500, height:'auto'}} alt="live" height={500} width={500} src={'/debates5.png'}/>


      </HStack>
  </motion.div>
      <motion.div style={{width:"100%", padding:5}} initial={{ opacity: 0, scale:0 , borderRadius:50}}
  whileInView={{ opacity: 1, scale:1.0, borderRadius:20}}
  transition={{ duration: 1 }}
  viewport={{ once: false, amount: 0.2 }} > 
       <HStack className={'LiveTutor'} justifyContent={'flex-start'} width={'100%'} borderRadius={20} padding={10} backgroundColor={"white"} >
        <Box className="cont-prof" position={'relative'}  flex={.7} height={'100%'}>
           <Image className="professor" alt="live"   width={300} height={300}  src={'/professor.png'}/>
        </Box>
       
        <VStack alignItems={'flex-start'}  padding={10} minWidth={0}>
          <Heading className="text-title" fontSize={{base: 32, md: 48, lg: 64}} color={'#2d2d2d'}>Live <Span color={'#00bf63'}>Tutors</Span> </Heading>
          <Text color={'gray'} minWidth={70} maxWidth={500} width={'100%'} marginTop={4}>Students, Professors, Self-taught individuals can share their knowledge with 
            the world, teach a variety of materials, to peers, aid in doubts.
          </Text>
          <Button borderColor={'#00bf63'} color={'#00bf63'} background={'transparent'} borderWidth={1} borderRadius={50} marginTop={2}>Read more</Button>
        </VStack> 
        


      </HStack>
      </motion.div>
      <motion.div style={{width:"100%", padding:5}} initial={{ opacity: 0, borderRadius:50}}
  whileInView={{ opacity: 1, borderRadius:20}}
  transition={{ duration: 1 }}
  viewport={{ once: false, amount: 0.2 }} > 
     <HStack className={'activities'} justifyContent={'flex-start'} alignItems={'center'} width={'100%'}  padding={10} background={'#1a1a1a'}>
        
       
        <VStack alignItems={'flex-start'}  padding={10} paddingBottom={5} flex={1} minWidth={0}>
          <Heading className="text-title" fontSize={{base: 28, md: 36, lg: 48}} minWidth={70} maxWidth={590} width={'100%'} lineHeight={1.2} color={'white'}>Free extra-curriculum  <Span color={'#00bf63'}>Courses</Span> </Heading>
          <Text color={'gray'} minWidth={70} maxWidth={500} width={'100%'} marginTop={4}>We offer a huge stack of free courses for anyone willing to learn.
            We will be  working with schools and the education department to 
            turn these courses CE-credited
          </Text>
          <Button borderColor={'#00bf63'} color={'#00bf63'} background={'transparent'} borderWidth={1} borderRadius={50} marginTop={2}>Read more</Button>
        </VStack> 
        <Box position={'relative'} display={'flex'} alignItems={"center"} height={'100%'} marginTop={0}>
           <Image className={'images'} alt="live" style={{minWidth:200,width:'100%', maxWidth:700, height:'auto'}}  height={700} width={700} src={'/course.png'}/>
        </Box>
        


      </HStack>
      </motion.div>
      <motion.div style={{width:"100%", padding:5}} initial={{ opacity: 0, y:10 , borderRadius:50}}
  whileInView={{ opacity: 1, y:0, borderRadius:20}}
  transition={{ duration: 1 }}
  viewport={{ once: false, amount: 0.2 }} > 
      <HStack className={'feedback'} justifyContent={'center'} width={'100%'} padding={10} background={'#00bf63'}>
        
  
        <VStack  alignItems={'center'}  padding={10} flex={0} minWidth={0}>
          <Heading className="text-title" textAlign={'center'} fontSize={{base: 32, md: 48, lg: 64}} lineHeight={1.0} minWidth={70} maxWidth={510} width={'100%'} color={'white'}>Feedback  <Span color={'green'}>on our work</Span> </Heading>
          <Text fontSize={{base: 16, md: 20, lg: 24}} textAlign={'center'} color={'black'} maxWidth={400} width={'100%'} marginTop={2}>Share with us anything we can improve on our application
          </Text>
          <Button size={"lg"}  color={'#00bf63'} background={'white'} borderWidth={0} borderRadius={50} marginTop={2}>Read more</Button>
        </VStack> 
        
        
        <Box position={'relative'}  >
           <Image className={'images'} alt="live" style={{minWidth:200,width:'100%', maxWidth:700, height:'auto'}} height={500} width={700} src={'/feedback (2).png'}/>
        </Box>
        
      </HStack>
      </motion.div>
   
    
      
  </VStack>)
}
