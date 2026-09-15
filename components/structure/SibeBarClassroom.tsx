"use client"
import { Button, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Icons } from '../../utils/exportIcons'
import { useRouter } from 'next/navigation'

export default function SibeBarClassroom() {
    const router = useRouter()
  return (
    <VStack justifyContent={'flex-start'} paddingTop={10} gap={10} alignItems={'center'} borderRadius={20} height={'100%'} width={100} background={'#181a1c'}>
        <Button className='button-style' onClick={()=>{router.push('/classroom/')}}>
            <Icons.SchoolIcon/>
        </Button>
        <Button className='button-style' onClick={()=>{router.push('/classroom/appearance')}} >
            <Icons.ContactIcon/>
        </Button>
        <Button className='button-style' onClick={()=>{router.push('/classroom/settings')}}>
            <Icons.Settings/>
        </Button>
    </VStack>
  )
}
