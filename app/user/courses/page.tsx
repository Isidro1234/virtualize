import { Heading, VStack , Box, HStack, Text, Button, Skeleton} from '@chakra-ui/react'
import React, { Suspense } from 'react'
import CourseCard from '../../../components/structure/CourseCard'

export default function CoursesUser() {
  return (
    <VStack width={'100%'} alignItems={'flex-start'}>
      <Heading textAlign={'start'} width={'100%'} color={'gray'}>Our Courses</Heading>
      <Suspense fallback={<Skeleton width={300} height={300} borderRadius={20}/>}>
        <CourseCard/>
      </Suspense>
      
    </VStack>
  )
}
