import { VStack , HStack } from '@chakra-ui/react'
import React from 'react'
import NavbarLogged from '../../components/structure/navbarLogged';
import SideBar from '../../components/structure/SideBar';
import SideRight from '../../components/structure/SideRight';
import { cookies } from 'next/headers';
import { adminAuth } from '../../config/admin-firestore';
import { getStreamToken } from '../actions/auth';
import StreamChat from '../../context/StreamChat';
import { StreamVideoClient } from '@stream-io/video-react-sdk';

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = await cookies()
  const token = cookie.get('session_virtualise')?.value
  if(!token) return;
  const decode = await adminAuth.verifyIdToken(token)
  const uid = decode.uid;
  const streamtoken = await getStreamToken(uid)
 
  return (
    <StreamChat token={streamtoken || ''} uid={uid}>
        <HStack className="post-horizontal"  width={"100%"}   display={'grid'} gridTemplateColumns={'.1fr 1fr'}   alignItems="flex-start" >
        <SideBar/>
        <VStack className="post-horizontal"  width={'100%'} >
            <NavbarLogged/>
            <HStack alignItems={'flex-start'} width={'100%'} overflowY={'hidden'} >
              <VStack height={'85vh'} overflowY={'auto'} flex={1}>
                {children}
              </VStack>
              
              <SideRight/>
            </HStack>
        </VStack>
        
      </HStack>
    </StreamChat>
   
  )
}
