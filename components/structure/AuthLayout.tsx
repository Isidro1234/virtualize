import { redirect } from 'next/navigation'
import { HStack, VStack } from '@chakra-ui/react';
import SideBar from './SideBar';
import NavbarLogged from './navbarLogged';
import SideRight from './SideRight';
import { getSession } from '../../app/actions/auth';
import { VerifySession } from '../../app/lib/verifySession';

export default async function AuthLayout({children}:{children:React.ReactNode}) {

    const res = await VerifySession()
    const uid = res?.userId;
    // No valid role JWT at all — nothing to render, send them to log in
    // instead of silently returning nothing (this was the blank/"error" page).
    if(!uid){
        redirect('/login')
    }

    const docref = await getSession()
    // Role JWT was still valid but the underlying Firebase session cookie
    // wasn't (expired/revoked/out of sync) — same treatment.
    if(!docref){
        redirect('/login')
    }
    const user = docref

      return (
            <HStack  gap={0} background={'#131313'}  className="post-horizontal"  width={"100%"}       alignItems="flex-start" >
            <SideBar/>
            <VStack className="post-horizontal"  width={'100%'}  >
                <NavbarLogged user={user}/>
                <HStack className={'scroll-special'} width={'100%'} alignItems={'flex-start'} paddingTop={4} overflowX={'hidden'}  overflowY={'hidden'} >
                  <VStack className={'scroll-special'} height={'82vh'} paddingLeft={4} overflowX={'hidden'} overflowY={'auto'} flex={1} marginRight={0}>
                    {children}
                  </VStack>
                  <SideRight/>
                </HStack>
            </VStack>
          </HStack>
      )
}