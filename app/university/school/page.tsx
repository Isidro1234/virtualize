import { VStack } from '@chakra-ui/react'
import React from 'react'
import AddProf from '../../../components/structure/AddProf'
import { adminAuth } from '../../../config/admin-firestore';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { cacheData, getcourses, getProf, getSession, getUniversityList } from '../../actions/auth';


export default async function School() {
 
    const user = await getSession()
    if(!user){
      return redirect('/login')
    }
    const professors =  await getProf()
    const courses = await getcourses()
    const unis = await getUniversityList()
  return (

    <VStack  width={'100%'} >
        <AddProf universityList={unis} courses={courses} professors={professors} universities={user?.name?.trim()}/>
    </VStack>
  )
}
