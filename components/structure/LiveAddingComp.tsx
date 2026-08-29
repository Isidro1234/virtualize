import { Box, Button, HStack, Input , Text, VStack} from '@chakra-ui/react'
import React from 'react'
import { Icons } from '../../utils/exportIcons'

export default function LiveaddingComp() {
  return (
    <VStack width={'100%'}>
                            <Box background={'#f6f6f6'} width={'100%'} height={200} position={'relative'}>
                                <Button bottom={5} right={5} position={'absolute'} borderRadius={50} size={'2xs'}><Icons.Image/></Button>
                            </Box>
                            <HStack padding={4} justifyContent={'flex-start'} alignItems={'center'} gap={2} width={'100%'}>
                                <Box width={'100%'} padding={0}>
                                    <Text>Name</Text>
                                    <HStack marginTop={2} padding={1} width={'100%'} gap={2} background={'#f6f6f6'} borderRadius={50}>
                                    <Icons.User2Icon  style={{marginLeft:10}} strokeWidth={1} height={20} width={20}/>
                                    <Input flex={1} border={'none'} outline={'none'} placeholder='Professors name'/>  
                                    </HStack>
                                </Box>
                            </HStack>
                            <Box width={'100%'} padding={4} paddingTop={0}>
                                    <Text>Email</Text>
                                    <HStack marginTop={2} padding={1} width={'100%'} gap={2} background={'#f6f6f6'} borderRadius={50}>
                                    <Icons.Mail  style={{marginLeft:10}} strokeWidth={1} height={20} width={20}/>
                                    <Input flex={1} border={'none'} outline={'none'} placeholder='Professors email'/>  
                                    </HStack>
                            </Box>
                            <Box width={'100%'} padding={4} paddingTop={0} >
                              <Button width={'100%'}>Submit</Button>  
                            </Box>
                            
                        </VStack>
  )
}
