"use client"
import React, { useState } from 'react'
import { CustomDialog } from './CustomDialog'
import { Box, Heading, HStack, Input } from '@chakra-ui/react'
import { CustomSelect } from './CustomSelect'
import { Icons } from '../../utils/exportIcons'

export default function DialogingComp({schools}:{schools:Array<{label:string, value:string}>}) {
    const [coursemode, setCourseMode] = useState("")
    const [schoolCourses, setschoolCourses] = useState("")
    const [courseSchedule, setschedule] = useState("")
    const [mainUni, setMainUni] = useState("")
    const [secondUni, setSecondUni] = useState("")
    return (
    <CustomDialog  title='Add course' icon={<Box cursor={'pointer'} marginTop={5} alignItems={'center'} justifyContent={'center'} display={'flex'} width={70} background={'#e9e9e9'} borderRadius={50} height={70}>
                        <Icons.Plus strokeWidth={1} color='#1d1d1d' height={20} width={20}/>
                    </Box>}>
                    <HStack width={'100%'}>
                        <Box>
                            <Heading fontSize={12}>Course's name</Heading>
                            <Input  placeholder='course name'/>
                        </Box>
                         <Box>
                            <Heading fontSize={12}>Course's code</Heading>
                            <Input placeholder='course code'/>
                        </Box>
                        <Box flex={1}>
                            <CustomSelect onchange={(e:any)=>{setCourseMode(e)}} placeholder='Choose the course mode' title='Course mode' 
                            items={[{label:"Partial", value:"PC"},
                                {label:"Full", value:"FC"},
                                {label:"Connect" , value:"C"}
                            ]}/>
                        </Box>
                    </HStack>
                    <HStack width={'100%'}>
                        <Box flex={1}>
                            <Heading fontSize={12}>Professor's name</Heading>
                            <Input placeholder='Professor name'/>
                        </Box>
                         <Box flex={1}>
                            <CustomSelect onchange={(e:any)=>{setschedule(e)}} placeholder='Choose the schedule' title='Course schedule' 
                            items={[{label:"Monday & Wednesday", value:"MW"},
                                {label:"Tuesday & Wednesday", value:"TW"},
                                {label:"Friday" , value:"F"},
                                {label:"Wednesday" , value:"W"},
                                {label:"Mondays" , value:"M"}
                            ]}/>
                        </Box>
                    </HStack>
                    <HStack width={'100%'}>
    
                         <Box flex={1}>
                            <Heading fontSize={12}>Start date</Heading>
                            <Input type='date'/>
                        </Box>
                        <Box flex={1}>
                            <Heading fontSize={12}>End date</Heading>
                            <Input type='date'/>
                        </Box>
                    </HStack>
                    <HStack width={'100%'}>
    
                         <Box  flex={1}>
                            <CustomSelect onchange={(e:any)=>{setMainUni(e)}} placeholder='Choose the main University' 
                            title='Main College' items={schools}/>
                        </Box>
                        <Box display={coursemode == "PC" || coursemode == "FC" ? 'flex' :'none'} flex={1}>
                              <CustomSelect onchange={(e:any)=>{setSecondUni(e)}} placeholder='Choose the University you want to connect to' title='Connect University' items={schools}/>
                        </Box>
                    </HStack>
                   </CustomDialog>
  )
}
