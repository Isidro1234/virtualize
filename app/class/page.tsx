import { Box, Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import { getSessionClassroom } from '../actions/auth'
import LogoutButton from '../../components/structure/LogoutButton'
import StarCallButton from '../../components/structure/StarCallButton'

export default async function page() {
  const sessions = await getSessionClassroom()
  return (
    <VStack alignItems={'flex-start'} width={'100%'} padding={10}>
      <Heading>Sessions</Heading>
      {sessions?.map((item , index)=>{return(
        <Box width={350} height={200} position={'relative'} background={'#f6f6f6'} borderRadius={10} padding={10} key={index}>
            {item?.time}
            <StarCallButton  participants={item?.participants}/>
        </Box>
      )})}
  
    </VStack>
  )
}
