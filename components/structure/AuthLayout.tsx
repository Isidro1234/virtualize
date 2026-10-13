"use server"
import { redirect } from 'next/navigation'
import { HStack, Skeleton, VStack } from '@chakra-ui/react';
import SideBar from './SideBar';
import NavbarLogged from './navbarLogged';
import SideRight from './SideRight';
import NavLabel from './NavLabel';
import { getUser, getUserById, getUserByIdRealtime } from '../../app/lib/dal';
import { VerifySession } from '../../app/lib/verifySession';
import { admindb } from '../../config/admin-firestore';
import { Suspense } from 'react';


export default async function AuthLayout({children}:{ children:React.ReactNode}) {

      return (
            <HStack padding={6} paddingBottom={0}  gap={2} background={'#131313'}  className="post-horizontal"  width={"100%"}       alignItems="flex-start" >
            <SideBar/>
            <VStack className="post-horizontal"  width={'100%'}  >
              <HStack width={'100%'}>
                <NavLabel/>
                
                  <NavbarLogged/>
              
                
              </HStack>
                
                <HStack className={'scroll-special'} width={'100%'} alignItems={'flex-start'} paddingTop={2} overflowX={'hidden'}  overflowY={'hidden'} >
                  <VStack className={'scroll-special'} height={'82vh'} paddingLeft={4} overflowX={'hidden'} overflowY={'auto'} flex={1} marginRight={0}>
                    {children}
                  </VStack>
                  <SideRight/>
                </HStack>
            </VStack>
          </HStack>
      )
}