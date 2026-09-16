"use client"
import { Button, VStack } from '@chakra-ui/react'
import React from 'react'
import { Icons } from '../../utils/exportIcons'
import { usePathname, useRouter } from 'next/navigation'

export default function AppearanceMenu() {
    const router = useRouter()
    const pathname  = usePathname()
  return (
    <VStack paddingTop={10} gap={10}>
        <Button className='link-item-btn' background={pathname === '/appearence' ? '#00bf63' : 'transparent'} onClick={()=>{router.push('/appearence')}} borderRadius={50} size={'md'}><Icons.Home strokeWidth={1} width={50} height={50}/></Button>
        <Button className='link-item-btn' background={pathname === '/appearence/celebrities' ? '#00bf63' : 'transparent'} onClick={()=>{router.push('/appearence/celebrities')}} borderRadius={50} size={'md'}><Icons.PresentationIcon strokeWidth={1} width={50} height={50}/></Button>
        <Button className='link-item-btn' background={pathname === '/appearence/message' ? '#00bf63' : 'transparent'} onClick={()=>{router.push('/appearence/message')}} borderRadius={50} size={'md'}><Icons.LucideMessageCircle strokeWidth={1} width={50} height={50}/></Button>
        <Button className='link-item-btn' background={pathname === '/appearence/schools'? '#00bf63' : 'transparent'} onClick={()=>{router.push('/appearence/schools')}} borderRadius={50} size={'md'}><Icons.School strokeWidth={1} width={50} height={50}/></Button>
        <Button className='link-item-btn' background={pathname === '/appearence/profile' ? '#00bf63' : 'transparent'} onClick={()=>{router.push('/appearence/profile')}} borderRadius={50} size={'md'}><Icons.UserCircle strokeWidth={1} width={50} height={50}/></Button>
    </VStack>
  )
}
