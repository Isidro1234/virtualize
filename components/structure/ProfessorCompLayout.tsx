import { HStack } from '@chakra-ui/react';
import React from 'react'
import SibarUser from './SibarUser';
import MainUser from './MainUser';
import { adminAuth, admindb } from '../../config/admin-firestore';
import { redirect } from 'next/navigation';
import { cacheData, getSession } from '../../app/actions/auth';

export default async function ProfessorCompLayout({children}:{children:React.ReactNode}) {
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

const catg = ['Live Sessions' , 'Debates' ]

const docref = await getSession()
    if(!docref.exists){
        return
    }
    const user = docref.data()
     if(user?.role[0] !== 'professor'){
            return redirect('/login')
        }
  return (
    <HStack width={'100%'} background={'#111313'}  height={'100vh'} padding={5} gap={5} alignItems={'flex-start'}>
      <SibarUser  user={user} />
      <MainUser schools={schools} catg={catg} user={user}>
         {children}
      </MainUser>
    </HStack>
  )

}
