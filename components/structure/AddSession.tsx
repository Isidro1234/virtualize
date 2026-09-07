import { Input, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function AddSession({courses}:{courses:any}) {
    const [course , setCourse] = useState(null)
  return (
    <VStack width={'100%'} height={'100%'} background={'#1d1d1d'}>
      <Text>Course</Text>
      <Input/>
      <Text>Session Time</Text>
      <Input/>
      <Text>ClassRoom 1</Text>
      <Input/>
      <Text>ClassRoom 2</Text>
      <Input/>
    </VStack>
  )
}
