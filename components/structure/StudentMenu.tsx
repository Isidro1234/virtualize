"use client"
import { Button, VStack } from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { Icons } from '../../utils/exportIcons'

export default function StudentMenu() {
  const router = useRouter()
      const pathname  = usePathname()
    return (
      <VStack paddingTop={10} gap={10}>
          <Button className='link-item-btn' background={pathname.includes('appearence') ? '#00bf63' : 'transparent'} onClick={()=>{router.push('/appearence')}} borderRadius={50} size={'md'}><Icons.Home strokeWidth={1} width={50} height={50}/></Button>
          <Button className='link-item-btn' background={pathname.includes('calls') ? '#00bf63' : 'transparent'} onClick={()=>{router.push('/appearence/calls')}} borderRadius={50} size={'md'}><Icons.Book strokeWidth={1} width={50} height={50}/></Button>
          <Button className='link-item-btn' background={pathname.includes('celebrities') ? '#00bf63' : 'transparent'} onClick={()=>{router.push('/appearence/celebrities')}} borderRadius={50} size={'md'}><Icons.Calculator strokeWidth={1} width={50} height={50}/></Button>
          <Button className='link-item-btn' background={pathname.includes('message') ? '#00bf63' : 'transparent'} onClick={()=>{router.push('/appearence/message')}} borderRadius={50} size={'md'}><Icons.Section strokeWidth={1} width={50} height={50}/></Button>
          <Button className='link-item-btn' background={pathname.includes('schools') ? '#00bf63' : 'transparent'} onClick={()=>{router.push('/appearence/schools')}} borderRadius={50} size={'md'}><Icons.Workflow strokeWidth={1} width={50} height={50}/></Button>
          <Button className='link-item-btn' background={pathname.includes('profile') ? '#00bf63' : 'transparent'} onClick={()=>{router.push('/appearence/profile')}} borderRadius={50} size={'md'}><Icons.UserCircle strokeWidth={1} width={50} height={50}/></Button>
      </VStack>
    )
}
