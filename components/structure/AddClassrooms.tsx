"use client"
import { Box, Heading, HStack, Input, VStack, Button, Text, SimpleGrid } from '@chakra-ui/react'
import React, { useMemo, useRef, useState } from 'react'
import { CustomSelect } from '../../components/structure/CustomSelect'
import { store } from '../../utils/storemedia'
import { toaster, Toaster } from '../../components/ui/toaster'
import { creatAuthAccount, addCourse, addclassroom } from '../../app/actions/auth'
import { Icons } from '../../utils/exportIcons'
import Image from 'next/image'

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const fieldLabelProps = {
  fontSize: 11,
  fontWeight: 600,
  color: 'gray.400',
  letterSpacing: '0.06em',
  textTransform: 'uppercase' as const,
  mb: 1.5,
}

const inputProps = {
  bg: '#262626',
  border: '1.5px solid',
  borderColor: 'whiteAlpha.100',
  borderRadius: '10px',
  color: 'white',
  minH: '42px',
  px: 4,
  fontSize: 13,
  fontWeight: 500,
  _placeholder: { color: 'gray.500' },
  _hover: { borderColor: 'green.300', bg: '#2b2b2b' },
  _focusVisible: {
    outline: 'none',
    borderColor: 'green.300',
    boxShadow: '0 0 0 3px rgba(134,239,172,0.15)',
  },
}

const sectionProps = {
  borderTop: '1.5px solid',
  borderColor: 'whiteAlpha.100',
  pt: 5,
}

export default function AddClassrooms() {
  
const [classnumber , setNumber] = useState(0)
const [loading, setLoading] = useState(false)
async function handleclass(){
  setLoading(true)
  if(classnumber == 0){
     setLoading(false)
    return
  }
  const res = await addclassroom(classnumber);
  if(!res){
    setLoading(false)
    toaster.create({
    title:'classroom not created',
    duration:5000,
    type:'error'
  })
    return
  };
  toaster.create({
    title:'classroom created with success',
    duration:5000,
    type:'success'
  })
  setLoading(false)
}
  return (
    <VStack height={'100%'} alignItems={'flex-start'} gap={2} width="100%" maxWidth="800px" margin="0 auto" padding={6} background={'#1d1d1d'} borderRadius={0}>
      <Text color={'white'}>classroom number</Text>
      <Input defaultValue={1} min={1} color={'white'} onChange={(e)=>{setNumber(parseInt(e.target.value))}} type='number'/>
      <Button width={'100%'} loading={loading} onClick={handleclass}>Add a classroom</Button>
      <Toaster/>
    </VStack>
  )
}