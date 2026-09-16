import React from 'react'
import { getAllCeleb, getCurrentId } from '../../actions/auth'
import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import StarCallButtonRelative from '../../../components/structure/StartCallButtonRelative'
import Image from 'next/image'

export default async function Appearence() {
    const uid = await getCurrentId()
    const celeb = await getAllCeleb()
      const colorScheme = [
          '#752944',
          '#309283',
          '#857109',
          '#198264',
          '#099049',
          '#021275',
          '#393671',
          '#009386'
      ]
    return (
      <VStack alignItems={'flex-start'} width={'100%'} overflowY={'auto'} maxWidth={'100%'}>
  <Heading marginBottom={4} color={'gray'} fontSize={14}>Personalities</Heading>
          <HStack gridTemplateColumns={'repeat(auto-fit, minmax(200px, 300px))'} display={'grid'} width={'100%'}>
             {
              celeb.map((items, index)=>{
                  return (
                  <VStack className='celeb' gap={1} position={'relative'} overflow={'hidden'} padding={10} borderRadius={10} background={'#111313'} justifyContent={'center'} alignItems={'flex-start'} key={index}>
                     <Box background={`${colorScheme[index]}`} width={5} height={'100%'} top={0} left={0} position={'absolute'}></Box>
                    {items?.photo &&
                    <Box borderRadius={50} height={70} width={70} position={'relative'}>
                      <Image style={{borderRadius:50, objectFit:'cover', width:'100%', height:"100%"}} alt='pic' fill src={items?.photo}/>
                     </Box>
                    }
                     
                   
                     <Heading marginTop={1} lineHeight={1.0} color={'white'} fontSize={14}> {items?.name} </Heading>
                      {items?.more?.profession &&
                    <Text color={'gray'} fontSize={10}> {items?.more?.profession}</Text>
                    }
                     
                     <Text marginBottom={4} padding={1} borderRadius={50} background={'#1d1d1d'} paddingRight={5} paddingLeft={5} color={'#f6f6f6'} fontSize={10}> {items?.more?.uni}</Text>
                     {uid &&
                      <StarCallButtonRelative participants={[uid , items?.id]}/>
                     }
                    
                  </VStack>
                  )
              })
              
              }
      </HStack>
      </VStack>
  
    )
}
