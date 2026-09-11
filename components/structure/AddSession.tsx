"use client"
import { Box, Button, HStack, Input, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { CustomSelect } from './CustomSelect'
import ClassRoomDisplayById from './ClassRoomDisplayById'
import { Toaster, toaster } from '../ui/toaster'
import { addClassSession } from '../../app/actions/auth'

export default function AddSession({courses}:{courses:any}) {
    const [course , setCourse] = useState<any>(null)
    const [classroom1 , setClassroom1] = useState(null)
    const [classroom2 , setClassroom2] = useState(null)
    const [loading, setLoading] = useState(false)

    async function submitSession(){
      setLoading(true)
       if((!classroom1 && !classroom2 ) || !course?.id  || !course?.time){
        toaster.create({
          title:"Missing Information",
          duration:5000,
          type:'error'
        })
        setLoading(false)
          return
       }
      const res = await addClassSession({class1:classroom1 , class2:classroom2,
        course:course?.id , time:course?.time
      })

      if(!res){
          toaster.create({
          title:"Missing Information",
          duration:5000,
          type:'error'
        })
        setLoading(false)
          return
      }
      toaster.create({
          title:"Session Created",
          duration:5000,
          type:'success'
        })
        setLoading(false)
          return
    }
  return (
    <VStack padding={4} width={'100%'} justifyContent={'flex-start'} height={'100%'} background={'#1d1d1d'}>
      <Box width={'100%'}>
        <CustomSelect        
                          onchange={(val: any) => setCourse({...courses?.filter((i:any)=> i?.id == val[0])[0]})}
                          items={courses?.map((i:any) => ({label:i?.coursename , value:i?.id})) ?? []}title='Courses'
                          placeholder='Select Course for this session'
         />
      </Box>
      <Text marginTop={4} width={'100%'} textAlign={'start'} fontWeight={500} fontSize={12} color={'#a1a1aa'}>CLASSROOM SESSION</Text>
      <Box background={'#1a1a24'} padding={4} width={'100%'} fontSize={14} color={'white'} borderRadius={10} borderWidth={0}>
        {course?.time}
      </Box>
      <HStack width={'100%'}>
        <ClassRoomDisplayById onchange={(e:any)=>{setClassroom1(e)}} id={course?.unimain || ""}/>
          {(course?.coursemode == "partial" || course?.coursemode == 'full') &&
          <ClassRoomDisplayById onchange={(e:any)=>{setClassroom2(e)}} id={course?.unisecond || ""}/>
          }
      </HStack>
      <Button loading={loading} onClick={submitSession} padding={4} borderRadius={10} width={'100%'}>submit</Button>
      <Toaster/>
    </VStack>
  )
}
