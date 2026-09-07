import { VStack , HStack, Text, Spinner } from '@chakra-ui/react'
import React, { Suspense } from 'react'
import NavbarLogged from '../../components/structure/navbarLogged';
import SideBar from '../../components/structure/SideBar';
import SideRight from '../../components/structure/SideRight';
import { cookies } from 'next/headers';
import { adminAuth, admindb } from '../../config/admin-firestore';
import { cacheData, deleteSession, getSession, getStreamToken } from '../actions/auth';
import StreamChat from '../../context/StreamChat';
import { StreamVideoClient } from '@stream-io/video-react-sdk';
import { redirect } from 'next/navigation';
import AuthLayout from '../../components/structure/AuthLayout';
import { Metadata } from 'next';


export const metadata: Metadata  = {
  title:'Virtualize | Social Space',
  description:`Learn , Collaborate , Participate, Debate. Socialize in a academic environment built to foster
  intellectual curiosity, debates and critical thinking`,
  twitter:{
    images:['https://njinga-worker.njinga.workers.dev/virtualize2.png',
      'https://njinga-worker.njinga.workers.dev/virtualphoto.png',
      'https://njinga-worker.njinga.workers.dev/Screenshot_5-9-2026_65840_virtualize-bice.vercel.app.jpeg'
    , 'https://njinga-worker.njinga.workers.dev/Screenshot_28-8-2026_14140_localhost.jpeg'],
    title:"Virtualize | Global Learning platform",
    description:`
    Global learning platform, helping universities collaborate, improving education quality,
  shared-classes, physical virtual room, made by angolans to the world`
  },
  openGraph:{
    images:['https://njinga-worker.njinga.workers.dev/virtualize2.png',
      'https://njinga-worker.njinga.workers.dev/virtualphoto.png',
      'https://njinga-worker.njinga.workers.dev/Screenshot_5-9-2026_65840_virtualize-bice.vercel.app.jpeg'
    , 'https://njinga-worker.njinga.workers.dev/Screenshot_28-8-2026_14140_localhost.jpeg'],
    description:`Global learning platform, helping universities collaborate, improving education quality,
  shared-classes, physical virtual room, made by angolans to the world`,
    title:'Virtualize | Global Learning platform',
    videos:['https://njinga-worker.njinga.workers.dev/video2.mp4']
  },
}


export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return(
    <Suspense fallback={<VStack background={'#1d1d1d'} justifyContent={'center'} alignItems={'center'} height={'100vh'} width={'100%'}>
      <Spinner size={'md'} color={'white'}/>
    </VStack>}>
      <AuthLayout>
        {children}
      </AuthLayout>
    </Suspense>
  )


}
