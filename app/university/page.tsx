import { Avatar, Box, Heading, HStack, Input, Text, VStack } from '@chakra-ui/react'
import React from 'react'

import Image from 'next/image'
import { adminAuth, admindb } from '../../config/admin-firestore'
import DialogingComp from '../../components/structure/DialogingComp'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { cacheData, getcourses, getCurrentId, getSession } from '../actions/auth'

export default async function Uni() {
    
      try {
        const user = await getSession()
     if(user?.role[0] !== 'university'){
                return redirect('/login')
    }
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
  const courses = await getcourses() || []
  return (

     
          <HStack width={'100%'} gap={5} marginTop={4} alignItems={'flex-start'}>
                <VStack alignItems={'flex-start'} flex={1} >
                  <Box borderRadius={20} minHeight={250} position={'relative'} overflow={'hidden'} background={'#f6f6f6'} padding={10} width={'100%'}>
                    <Image  fill style={{width:'100%', height:"100%" , objectFit:"cover"}} src={'/unit.png'} alt='image'/>
                </Box>
                    <VStack width={'100%'} padding={4} alignItems={'flex-start'} >
                    <HStack width={'100%'}>
                        <Heading color={'#00bf63'} flex={1} marginTop={5} fontSize={20}>Courses</Heading> 
                        <Heading color={'#00bf63'} fontWeight={400} fontSize={12}>show all</Heading>
                    </HStack>
                  <DialogingComp schools={schools}/>
                    
                </VStack>
                
              </VStack>
              <VStack flex={1}>
                <Box borderRadius={20} display={'grid'} gap={4} gridTemplateColumns={'repeat(auto-fit, minmax(105px, 1fr))'} minHeight={250}
                background={'#272a2e'} padding={5} flex={1} width={'100%'}>
                  {catg.map((it , index)=>{
                    return (<Box alignItems={'center'} justifyContent={'center'} display={'flex'} borderRadius={20} position={'relative'}
                     overflow={'hidden'} background={'#00bf63'} height={'100%'} key={index}>
                        <Heading color={'#1d1d1d'} fontSize={27}>{it}</Heading>
                  </Box>)
                  })}
                  

               </Box>
               <VStack width={'100%'} justifyItems={'flex-start'} alignItems={'flex-start'}>
                    <HStack width={'100%'} alignItems={'center'}>
                        <Heading color={'#00bf63'} flex={1} marginTop={5} fontSize={20}>Explore</Heading> 
                        <Heading color={'#00bf63'} fontWeight={400} fontSize={12}>show all</Heading>
                    </HStack>
                    
                    <HStack width={'100%'} gap={4} alignItems={'flex-start'}>
                      {courses?.map((item, index)=>{
                      return(
                       <Box flex={1} key={index}>
                         <HStack padding={4} paddingLeft={0} alignItems={'flex-start'}>
                            <Box borderRadius={10} position={'relative'} outline={'none'} overflow={'hidden'} height={100} width={100} background={'#f6f6f6'}>
                                 <Image  fill style={{width:'100%', height:"100%" , objectFit:"cover"}} src={item?.photo} alt='image'/>
                            </Box> 
                            <VStack gap={1.5} alignItems={'flex-start'} justifyContent={'center'}>
                              <Heading lineHeight={1} color={'#00bf63'} flex={1} marginTop={2} fontSize={14}>{item?.coursename}</Heading> 
                              <Text color={'gray'} lineHeight={1} fontSize={12}>London - Houston</Text>
                              <Text color={'gray'} lineHeight={1} fontSize={11}>{item?.coursemode}</Text>
                              <Text color={'gray'} lineHeight={1} fontSize={11}>Professor: {item?.professor} ({item?.unimain})</Text>
                              <Text color={'gray'} lineHeight={1} fontSize={11}>Mondays & Wednesdays | 10:00 am - 12:00 am</Text>
                            </VStack>
                         </HStack>
                      </Box> 
                      )
                    })}
                      <Box>
                         <Heading color={'#00bf63'} flex={1} marginTop={5} fontSize={17}>Universities</Heading> 
                         <HStack alignItems={'center'} padding={4} paddingLeft={0}>
                          <Avatar.Root size={'sm'}>
                            <Avatar.Fallback name='dfdsf'/>
                          </Avatar.Root>
                          <VStack alignItems={'flex-start'}>
                            <Heading color={'#97c6af'}  marginTop={0} fontSize={14} lineHeight={1}>UHD</Heading> 
                            <Text color={'gray'} fontSize={12} lineHeight={1}>Houston, Texas</Text>
                          </VStack>
                         </HStack>
                      </Box>
                    </HStack>
               </VStack>
              </VStack>
               
          </HStack>

  )
      } catch (error) {
        return redirect('/login')
      }
      
      
}
