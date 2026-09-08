import { Input, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { CustomSelect } from './CustomSelect'

export default function AddSession({courses}:{courses:any}) {
    const [course , setCourse] = useState<any>(null)
    console.log(courses)
  return (
    <VStack padding={4} width={'100%'} height={'100%'} background={'#1d1d1d'}>
      <CustomSelect
                          onchange={(val: any) => setCourse(val)}
                          items={[ ...courses?.map((i:any)=>{return{label:i?.name, value:i?.university_id}}) || []]}
                          title='Courses'
                          placeholder='Select Course for this session'
                        />
      <Text>Session Time</Text>
      <Input type='time'/>
      <Text>Session Time</Text>
      <Input type='time'/>
      <Text>ClassRoom 1</Text>
      <Input/>
      <Text>ClassRoom 2</Text>
      <Input/>
    </VStack>
  )
}
