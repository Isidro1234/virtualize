import React from "react"
import {VStack, Box , Button, Heading, HStack, Text} from "@chakra-ui/react"
import AvatarInfoCard from "./AvartarInfoCard"
import Image from "next/image"
import LiveCardPreviewOuter from "./LiveCardPreviewOuter"

export default function SideRight(){
    return(
        <VStack className="post-horizontal"  minWidth={50} borderRadius={20} background={'#17191a'} maxWidth={340} width={'100%'} position={'relative'}  padding={5} paddingTop={5} marginTop={0} top={0} bottom={0} right={0} left={0} marginLeft={0} justifySelf={'flex-start'}>
            <Box  position={'relative'} overflow={'hidden'} background={'black'} borderRadius={15} height={250} width={'100%'}>
                <LiveCardPreviewOuter
            
                />                    
            </Box>
            <Box padding={5} background={'#f6f6f6'} borderRadius={15} height={220} width={'100%'}>
                <Heading>Hubs</Heading>
                <HStack marginTop={4} justifyContent={'flex-start'}>
                    <Box position={'relative'} background={'white'} borderRadius={10} height={100} width={100}>
                        <Image alt={"image-live"} src={'https://images.pexels.com/photos/24304586/pexels-photo-24304586.jpeg'} fill style={{height:"100%" , borderRadius:10, width:"100%", opacity:1 , objectFit:"cover"}}/>
                    </Box>
                    <VStack gap={2} alignItems={'flex-start'}>
                        <Heading lineHeight={1} fontSize={17}>UTA Engineering</Heading>
                        <Text lineHeight={1} fontSize={12}>University of Texas Austin</Text>
                        <Text lineHeight={1} fontSize={10}>360 members</Text>
                        <Button fontSize={12} size={"2xs"}>Join</Button>
                    </VStack>
                </HStack>
            </Box>
       </VStack>
    )
}