import React from "react"
import {VStack, Box , Button, Heading, HStack, Text} from "@chakra-ui/react"
import AvatarInfoCard from "./AvartarInfoCard"
import Image from "next/image"
import LiveCardPreviewOuter from "./LiveCardPreviewOuter"
import { getHubs } from "../../app/actions/auth"
import ButtonJoin from "./ButtonJoin"

export default async function SideRight(){
    const hubs = await  getHubs()
    return(
        <VStack className="post-horizontal"  minWidth={50} borderRadius={20} background={'#17191a'} maxWidth={340} width={'100%'} position={'relative'}  padding={5} paddingTop={5} marginRight={2} marginTop={0} top={0} bottom={0} right={0} left={0} marginLeft={0} justifySelf={'flex-start'}>
            <Box  position={'relative'} overflow={'hidden'} background={'black'} borderRadius={15} height={250} width={'100%'}>
                <LiveCardPreviewOuter/>                    
            </Box>
            
            <Box  padding={5} background={'#f6f6f6'} borderRadius={15} height={220} width={'100%'}>
                <Heading>Hubs</Heading>
                <HStack className="post-horizontal" gap={2} justifyContent={'flex-start'} width={'100%'} overflowX={'auto'}>
                {
                            hubs.map((item, index)=>{
                                return(
                                    <HStack key={index} marginTop={4} justifyContent={'flex-start'} minWidth={200}>
                                    <Box position={'relative'} background={'white'} borderRadius={10} height={100} width={100}>
                                        <Image alt={"image-live"} src={item?.photo} fill style={{height:"100%" , borderRadius:10, width:"100%", opacity:1 , objectFit:"cover"}}/>
                                    </Box>
                                    <VStack gap={2} alignItems={'flex-start'}>
                                        <Heading lineHeight={1} fontSize={17}>{item?.hubname?.slice(0,12)}</Heading>
                                        <Text lineHeight={1} fontSize={12}>{item?.university}</Text>
                                        <Text lineHeight={1} fontSize={10}>{item?.members} members</Text>
                                        <ButtonJoin uid={item?.previousuid} id={item?.id}/>
                                    </VStack>
                                </HStack>
                                )
                            })  
                            }

                </HStack>
               
                
            </Box>
       </VStack>
    )
}