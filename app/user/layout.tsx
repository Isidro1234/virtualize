import { VStack , Spinner, Text } from '@chakra-ui/react'
import AuthLayout from '../../components/structure/AuthLayout';
import { VerifySession } from '../lib/verifySession';
import { getUserById } from '../lib/dal';
import { Suspense } from 'react';





export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   
  return(

        <AuthLayout >
          {children}
        </AuthLayout>      

  )


}
