import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import React from 'react'
import StreamChat from '../../context/StreamChat';
import { HStack, VStack } from '@chakra-ui/react';
import SideBar from './SideBar';
import NavbarLogged from './navbarLogged';
import SideRight from './SideRight';
import { cacheData, getSession, getStreamToken } from '../../app/actions/auth';
import { adminAuth } from '../../config/admin-firestore';
import { VerifySession } from '../../app/lib/verifySession';

export default async function AuthLayout({children}:{children:React.ReactNode}) {
  
    const res = await VerifySession()
    const docref = await getSession()
    const uid = res?.userId;
    if(!docref){
        console.log('here 2')
        return redirect('/login')
    }
    const user = docref
    
    if(user?.role[0] == 'university'){
      return redirect(`/university`)
    }else if(user?.role[0] == 'professor'){
      return redirect('/professor')
    }
    if(!uid) return
      const streamtoken = await getStreamToken(uid)
     
      return (
        <StreamChat token={streamtoken || ''} uid={uid}>
            <HStack  gap={0} background={'#131313'}  className="post-horizontal"  width={"100%"}       alignItems="flex-start" >
            <SideBar/>
            <VStack className="post-horizontal"  width={'100%'}  >
                <NavbarLogged user={user}/>
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
    
}
