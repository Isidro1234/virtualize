import { Avatar, Box, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Icons } from '../../utils/exportIcons'
import DialogingComp from './DialogingComp'
import Image from 'next/image'
import ButtonCustom from './ButtonCustom'

export default function SibarUser({user}:{user:any}) {
  return (
            <VStack gap={0} alignItems={'center'} height={'100%'} minWidth={70} borderWidth={0} background={'#17191a'} overflow={'hidden'} 
                     borderRadius={12} padding={0} border={'none'} >
                      <ButtonCustom link='/university'>
                        <Box width={70} position={'relative'} background={'white'} borderTopRadius={0} height={70} >
                            <Image style={{height:'100%', objectFit:'cover', width:"100%", borderRadius:0}} src={user?.photo || ''} fill alt='image'/>
                        </Box>
                      </ButtonCustom>
                         
                        <VStack gap={0} width={'100%'} alignItems={'flex-start'} padding={0} flex={1}>
                          <ButtonCustom link='/university/school'>
                            <Box className='sibe-cont'  padding={4} alignItems={'center'} gap={2} display={'flex'}>
                              <Icons.School2Icon width="25px" height="25px" color='white' strokeWidth={1}/> 
                            </Box>
                         </ButtonCustom>
                          <ButtonCustom link='/university/Hubs'>
                            <Box className='sibe-cont' padding={4} alignItems={'center'} gap={2} display={'flex'}>
                                <Icons.FlaskRound width="25px" height="25px" color='white' strokeWidth={1}/>
                            </Box>
                          </ButtonCustom>
                        <ButtonCustom link='/university/lives'>
                          <Box className='sibe-cont' padding={4} alignItems={'center'} gap={2} display={'flex'}>
                            <Icons.CircleDot width="25px" height="25px" color="white" strokeWidth={1}/>
                          </Box>
                        </ButtonCustom>
                       <ButtonCustom link='/university/Debates'>
                          <Box className='sibe-cont' padding={4} alignItems={'center'} gap={2} display={'flex'}>
                            <Icons.VoicemailIcon width="25px" height="25px" color='white' strokeWidth={1}/>
                            </Box>
                       </ButtonCustom>
                        
                        
                        </VStack>
                         <ButtonCustom link='/university/settings'>
                            <Box cursor={'pointer'} justifyContent={'center'} width={'100%'} marginBottom={5} padding={4} alignItems={'center'} gap={2} display={'flex'}>
                              <Icons.Settings width="25px" height="25px" color='white' strokeWidth={1}/>
                            </Box>
                         </ButtonCustom>
                        
                    </VStack>
  )
}
