import { HStack, Spinner, Text, VStack } from '@chakra-ui/react'
import React, { Suspense } from 'react'
import SibarUser from '../../components/structure/SibarUser'
import { adminAuth, admindb } from '../../config/admin-firestore'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import MainUser from '../../components/structure/MainUser'
import { cacheData, getSession } from '../actions/auth'
import UniversityLayoutComp from '../../components/structure/UniversityComp'

export default async function UniversityLayout({children}:{children:React.ReactNode}) {
   const schools=[{
        label:"Harvard University", value:'HRU'
    },{
        label:"University of Houston", value:'HOU'
    },{
        label:"Oxford University ", value:'OU'
    },{
        label:"Houston City College", value:'HCC'
    },{
        label:"Universidade Catolica de Angola", value:'UCA'
    },{
        label:"Universidade Agustinho Neto", value:'UAN'
    },
]

  return (
    <Suspense fallback={<VStack background={'#1d1d1d'} justifyContent={'center'} alignItems={'center'} height={'100vh'} width={'100%'}>
          <Spinner size={'md'} color={'white'}/>
        </VStack>}>
    <UniversityLayoutComp>
      {children}
    </UniversityLayoutComp>
    </Suspense>
  )
  
  
}
