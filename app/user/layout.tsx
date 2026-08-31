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
