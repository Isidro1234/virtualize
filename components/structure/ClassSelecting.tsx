"use client"
import { VStack } from '@chakra-ui/react'
import React from 'react'
import { CustomSelect } from './CustomSelect'
import { useLogicState } from '../../states/useLogicState'

export default function ClassSelecting({classroom}:{classroom:any | null}) {
  const setclass = useLogicState((state)=> state.settingClassroom)

  return (
    <VStack>
        <CustomSelect       
                onchange={(val: any)=>{setclass(val[0])}}
                items={classroom?.map((i:any) => ({label:`${i?.university} classroom number ${i?.number}` , value:i?.id})) ?? []}title='Classroom'
                placeholder='Select Course for this session'
                />
    </VStack>
  )
}
