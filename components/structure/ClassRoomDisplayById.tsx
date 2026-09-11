"use client"
import { VStack, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { getClassroom } from '../../app/actions/auth'
import ClassSelecting from './ClassSelecting'
import { CustomSelect } from './CustomSelect'

export default function ClassRoomDisplayById({ id , onchange }: { id: string , onchange:Function}) {
  const [classes, setClasses] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!id) {
      setClasses(null)
      return
    }
    let cancelled = false
    setLoading(true)
    getClassroom(id).then((result) => {
      if (!cancelled) {
        setClasses(result || null)
        setLoading(false)
      }
    })
    return () => { cancelled = true }
  }, [id])

  if (loading) return <Spinner size="sm" color="white" />
console.log(classes)
  return (
    <VStack>
      <CustomSelect      
                      onchange={(val: any)=>{onchange(val[0])}}
                      items={classes?.map((i:any) => ({label:`${i?.university} classroom number ${i?.number}` , value:i?.id})) ?? []}title='Classroom'
                      placeholder='Select Course for this session'
                      />
    </VStack>
  )
}