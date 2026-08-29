import { HStack, Text, VStack } from '@chakra-ui/react'
import React, { Suspense } from 'react'
import ProfessorCompLayout from '../../components/structure/ProfessorCompLayout'

export default async function ProfLayout({children}:{children:React.ReactNode}) {
   <Suspense fallback={<Text>loading...</Text>}>
     <ProfessorCompLayout>
       {children}
     </ProfessorCompLayout>
   </Suspense>
  
}
