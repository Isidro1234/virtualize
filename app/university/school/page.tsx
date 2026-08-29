import { VStack } from '@chakra-ui/react'
import React from 'react'
import AddProf from '../../../components/structure/AddProf'
import { adminAuth } from '../../../config/admin-firestore';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { cacheData, getSession } from '../../actions/auth';


export default async function School() {
 
    const user = await getSession()
    if(!user){
      return redirect('/login')
    }
  return (
    <VStack width={'100%'} >
        <AddProf universities={user?.name?.trim()}/>
    </VStack>
  )
}
