import { Box, Heading, HStack, Input, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Icons } from '../../../utils/exportIcons'
import AvatarByUid from '../../../components/structure/AvatarByUid'
import { getAllUni, getCurrentId } from '../../actions/auth'
import StartMessageButton from '../../../components/structure/StartMessageButton'
import StarCallButtonRelative from '../../../components/structure/StartCallButtonRelative'

export default async  function Calls() {
    const uid = await getCurrentId()
    const unis = await getAllUni()
   
  return (
    <HStack width={'100%'} height={'100%'}>

      <Box padding={10} borderRadius={20} height={'100%'} flex={1}  background={'#1d1d1d'}>
        <Heading color={'white'}>Conctats</Heading>
        <HStack alignItems={'center'}>
            <HStack marginTop={4} background={'#f6f6f6'} padding={1} borderRadius={50}>
                <Input fontSize={12}  border={'none'} outline={'none'} placeholder='Pesquisar Contactos'/>
                <Icons.Search color='#1d1d1d' strokeWidth={1}/>
            </HStack>
            
        </HStack>
        <VStack padding={10} paddingLeft={0}>
            {
                unis?.map((item, index)=>{
                    return(
            <HStack key={index} justifyContent={'flex-start'} width={'100%'}>
                <VStack>
                            <AvatarByUid withdetails={true} uid={item?.id}/>
                       
                </VStack>
                <HStack>
                    <StartMessageButton route='/appearence/message' participants={[uid , item?.id]} uid={uid}/>
                    <StarCallButtonRelative participants={[uid , item?.id]}/>
                </HStack>
                
                        
            </HStack>
                    )
                })
            }
            {unis?.length <= 0 &&
            <HStack>
                <Text fontSize={12} color={'gray'}>No Universities!</Text>
            </HStack>
            }
        </VStack>
        
           
      </Box>
    </HStack>
  )
}
