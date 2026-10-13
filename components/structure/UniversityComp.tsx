import { HStack } from '@chakra-ui/react'
import React from 'react'
import SibarUser from '../../components/structure/SibarUser'
import MainUser from '../../components/structure/MainUser'

export default async function UniversityLayoutComp({children}:{children:React.ReactNode}) {
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
const docref = null // await getSession()

    if(!docref){
       return null
    }
    const user = docref

  return (
    <HStack width={'100%'} background={'#111313'}  height={'100vh'} padding={5} gap={5} alignItems={'flex-start'}>
      <SibarUser  user={user} />
      <MainUser schools={schools} catg={catg} user={user}>
         {children}
      </MainUser>
    </HStack>
  )
  
  
}
