import { Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";




export default function Home(){
  return (<VStack gap={0}>
      <VStack gap={0} position={'relative'} backgroundColor={'black'} justifyContent={'center'} width={'100%'} height={400}>
        <Image alt="background" fill style={{height:'100%', opacity:".3", objectFit:"cover"}} src={'/learn.jpg'}/>
        <VStack zIndex={100} position={'absolute'}>
              <Heading fontSize={25} color={'white'}>Global interactive learning Platform</Heading>
              <Text fontSize={13} textAlign={'center'} width={400} color={"#e6e6e6e6"}>Connect with students across the globe, share experience,
                learn from the best Universities
              </Text>
              <Button bg={'#00bf63'} borderRadius={10}>Get Started Today</Button>
        </VStack>
      </VStack>
      
      <HStack gap={0} marginTop={0} width={'100%'} padding={0} justifyContent={'space-evenly'} alignItems={'center'}>
        <VStack margin={0} padding={10} justifyContent={'center'} alignItems={'flex-start'} flex={1}>
          <Heading color={'green'}>Cross Global classes</Heading>
        <Text width={300} color={'gray'}>
  University students from both leading and underprivileged institutions
  around the world can share online lessons and collaborate in virtual
  classrooms. This promotes multicultural experiences, scientific
  collaboration, knowledge exchange, and greater social inclusion across
  diverse communities.
</Text>
        <Button bg={'#00bf63'}>Learn More</Button>
        </VStack>
        <VStack flex={1.2} height={400} position={'relative'}>
        <Image src={'/new.jpg'} alt="ic" fill style={{height:'100%', objectFit:"cover"}}/>
        </VStack>
      </HStack>
      <HStack gap={0} marginTop={0} width={'100%'} padding={0} flexDirection={'row-reverse'} justifyContent={'space-evenly'} alignItems={'center'}>
        <VStack margin={0} padding={10} justifyContent={'center'} alignItems={'flex-start'} flex={1}>
          <Heading color={'green'}>Multi-disciplinary live tutoring lessons</Heading>
          <Text width={300} color={'gray'}>
    With the emerging livestreaming industry, university students can provide
    live tutoring sessions to learners around the world. This fosters an
    environment of accessibility, inclusion, and continuous learning while
    helping students develop valuable skills that are shaping the future of our
    global society.
  </Text>
        <Button bg={'#00bf63'}>Learn More</Button>
        </VStack>
        <VStack flex={1.13} height={400} position={'relative'}>
        <Image src={'/new.jpg'} alt="ic" fill style={{height:'100%', objectFit:"cover"}}/>
        </VStack>
      </HStack>
      <HStack gap={0} marginTop={0} width={'100%'} padding={0} justifyContent={'space-evenly'} alignItems={'center'}>
        <VStack margin={0} padding={10} justifyContent={'center'} alignItems={'flex-start'} flex={1}>
          <Heading color={'green'}>Online Debate forums </Heading>
        <Text width={300} color={'gray'}>University students can participate in debate forums with peers from around
  the world, discussing relevant topics, analyzing them from diverse cultural
  and academic perspectives, and gaining a deeper understanding of global
  issues and societies.
</Text>
        <Button bg={'#00bf63'}>Learn More</Button>
        </VStack>
        <VStack flex={1.2} height={400} position={'relative'}>
        <Image src={'/new.jpg'} alt="ic" fill style={{height:'100%', objectFit:"cover"}}/>
        </VStack>
      </HStack>
      <HStack gap={0} marginTop={0} width={'100%'} padding={0} flexDirection={'row-reverse'} justifyContent={'space-evenly'} alignItems={'center'}>
        <VStack margin={0} padding={10} justifyContent={'center'} alignItems={'flex-start'} flex={1}>
          <Heading color={'green'}>Global Events</Heading>
          <Text width={300} color={'gray'}>
      Universities can organize cross-institutional events where students from
  different colleges and countries can interact, collaborate, and share
  experiences. These events provide opportunities to expand professional and
  social networks, develop communication skills, and build meaningful
  connections with peers from diverse backgrounds.
  </Text>
        <Button bg={'#00bf63'}>Learn More</Button>
        </VStack>
        <VStack flex={1.13} height={400} position={'relative'}>
        <Image src={'/new.jpg'} alt="ic" fill style={{height:'100%', objectFit:"cover"}}/>
        </VStack>
      </HStack>
  </VStack>)
}