import { VStack , HStack } from '@chakra-ui/react'
import React from 'react'
import NavbarLogged from '../../components/structure/navbarLogged';
import SideBar from '../../components/structure/SideBar';
import SideRight from '../../components/structure/SideRight';

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HStack className="post-horizontal"  width={"100%"}  display={'grid'} gridTemplateColumns={'.1fr 1fr'}   alignItems="flex-start" >
      <SideBar/>
      <VStack  overflowY={'auto'} height={'100vh'}>
          <NavbarLogged/>
          {children}
      </VStack>
     
    </HStack>
  )
}
