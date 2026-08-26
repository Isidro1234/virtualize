import { VStack , HStack } from '@chakra-ui/react'
import React from 'react'
import NavbarLogged from '../../components/structure/navbarLogged';
import SideBar from '../../components/structure/SideBar';
import SideRight from '../../components/structure/SideRight';
import { cookies } from 'next/headers';
import { adminAuth, admindb } from '../../config/admin-firestore';
import { deleteSession, getStreamToken } from '../actions/auth';
import StreamChat from '../../context/StreamChat';
import { StreamVideoClient } from '@stream-io/video-react-sdk';
import { redirect } from 'next/navigation';

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = await cookies()
 // app/user/layout.tsx
const token = cookie.get('session_virtualise')?.value;
if (!token) return;

let decode;
try {
  decode = await adminAuth?.verifyIdToken(token);
  
const uid = decode?.uid;
if (!uid) {
  return redirect('/login')
}

const docref = await admindb.collection('users').doc(uid).get();
if(!docref.exists){
    return redirect('/login')
}
const user = docref.data()

if(user?.role[0] == 'university'){
  return redirect(`/university`)
}else if(user?.role[0] == 'professor'){
  return redirect('/professor')
}else if (user?.role[0] == 'individual'){
  const streamtoken = await getStreamToken(uid)
 
  return (
    <StreamChat token={streamtoken || ''} uid={uid}>
        <HStack  gap={0} background={'#131313'}  className="post-horizontal"  width={"100%"}       alignItems="flex-start" >
        <SideBar/>
        <VStack className="post-horizontal"  width={'100%'}  >
            <NavbarLogged/>
            <HStack className={'scroll-special'} alignItems={'flex-start'} paddingTop={4} overflowX={'hidden'}  overflowY={'hidden'} >
              <VStack className={'scroll-special'} height={'82vh'} overflowX={'hidden'} overflowY={'auto'} flex={1} marginRight={0}>
                {children}
              </VStack>
              
              <SideRight/>
            </HStack>
        </VStack>
        
      </HStack>
    </StreamChat>
   
  )
}else{
  return redirect('/login')
}
} catch (error: any) {
  if (error.code === 'auth/id-token-expired') {
    return redirect('/login')
  }
  return redirect('/login')
}

}
