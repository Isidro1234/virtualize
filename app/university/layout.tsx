import { HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import SibarUser from '../../components/structure/SibarUser'
import { adminAuth, admindb } from '../../config/admin-firestore'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import MainUser from '../../components/structure/MainUser'

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
const cookie  = await cookies()
  const token = cookie.get('session_virtualise')?.value;
  if(!token){
    return redirect('/login')
  }
  let decode ;
  try {
    decode = await adminAuth.verifyIdToken(token)
    } catch (error) {
    decode = null
  }
  if(!decode){
      return redirect('/login')
  }
  const uid = decode.uid;
const catg = ['Live Sessions' , 'Debates' ]
const docref = await admindb.collection('users').doc(uid).get()
    if(!docref.exists){
       return redirect('/login')
    }
    const user = docref.data()
    if(user?.role[0] !== 'university'){
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
