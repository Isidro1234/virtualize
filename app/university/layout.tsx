import { HStack, Spinner, Text, VStack } from '@chakra-ui/react'
import React, { Suspense } from 'react'
import SibarUser from '../../components/structure/SibarUser'
import { adminAuth, admindb } from '../../config/admin-firestore'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import MainUser from '../../components/structure/MainUser'
import { cacheData, getSession } from '../actions/auth'
import UniversityLayoutComp from '../../components/structure/UniversityComp'
import { Metadata } from 'next'


export const metadata: Metadata  = {
  title:'Virtualize | University Portal',
  description:`Universities can register courses, create share-classrooms environments for their students,
  invite celebrities to an online virtual call with a classroom, the world united with one click`,
  twitter:{
    images:['https://njinga-worker.njinga.workers.dev/virtualize2.png',
      'https://njinga-worker.njinga.workers.dev/virtualphoto.png',
      'https://njinga-worker.njinga.workers.dev/Screenshot_5-9-2026_65840_virtualize-bice.vercel.app.jpeg'
    , 'https://njinga-worker.njinga.workers.dev/Screenshot_28-8-2026_14140_localhost.jpeg'],
    title:"Virtualize | Global Learning platform",
    description:`
    Global learning platform, helping universities collaborate, improving education quality,
  shared-classes, physical virtual room, made by angolans to the world`
  },
  openGraph:{
    images:['https://njinga-worker.njinga.workers.dev/virtualize2.png',
      'https://njinga-worker.njinga.workers.dev/virtualphoto.png',
      'https://njinga-worker.njinga.workers.dev/Screenshot_5-9-2026_65840_virtualize-bice.vercel.app.jpeg'
    , 'https://njinga-worker.njinga.workers.dev/Screenshot_28-8-2026_14140_localhost.jpeg'],
    description:`Global learning platform, helping universities collaborate, improving education quality,
  shared-classes, physical virtual room, made by angolans to the world`,
    title:'Virtualize | Global Learning platform',
    videos:['https://njinga-worker.njinga.workers.dev/video2.mp4']
  },
}

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
