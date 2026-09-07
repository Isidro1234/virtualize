"use client"
import { Box, Button, Heading, HStack, Input, Text, VStack, SimpleGrid } from '@chakra-ui/react'
import React, { useState } from 'react'
import { store } from '../../utils/storemedia'
import { creatAuthAccountProfessor } from '../../app/actions/auth'
import { toaster, Toaster } from '../ui/toaster'
import { Icons } from '../../utils/exportIcons'
import { DrawerCustom2 } from './DrawerCustom2'
import ProfaddingComp from './ProfaddingComp'
import LiveaddingComp from './LiveAddingComp'
import DebatesaddingComp from './DebatesAddingComp'
import HubAddingComp from './HubAddingComp'
import EventsaddingComp from './EventAddingComp'
import CourseaddingComp from './CourseAddingComp'
import DocSeriesaddingComp from './Doc&SeriesAddingComp'
import { useRouter } from 'next/navigation'
import AddClassrooms from './AddClassrooms'
import AddSession from './AddSession'

// Distinct-but-professional accents so cards read apart from each other
// while staying inside the #111313 / #181a1c / #00bf63 palette family.
const ACCENTS = ['#00bf63', '#2dd4bf', '#38bdf8', '#a78bfa', '#fbbf24', '#f472b6']

export default function AddProf({universities, universityList , courses , professors}:
    {universities:string , universityList:any, courses:any , professors:any,}) {
    const [name , setName] = useState('')
    const [photo , setPhoto] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function upload(e:File){
        const reader = new FileReader()
        reader.onload = (e)=>{
          e.target?.result;
        }
        reader.readAsDataURL(e)
        if(!e){
            toaster.create({
                title:"Photo not selected",
                type:"error",
                duration:5000
            })
            return
        }
        setPhoto(e)
        toaster.create({
                title:"Photo uploaded",
                type:"success",
                duration:5000
            })
        return
    }

    async function submit(){
        setLoading(true)
        if(!name || !universities || !photo){
            toaster.create({
                title:"missing information",
                type:"error",
                duration:5000
            })
            setLoading(false)
            return
        }
        try {
            const url = await store({image:photo , type:photo.type , name:photo.name})
            const finalurl = url || null
            await creatAuthAccountProfessor(name , universities , null , finalurl)
            toaster.create({
                title:"Professor account created with success",
                type:"success",
                duration:5000
            })
            return setLoading(false)
        } catch (error) {
            console.log(error)
            toaster.create({
                title:"Server error",
                type:"error",
                duration:5000
            })
            return setLoading(false)
        }
    }

    const activities = [
        {
            title:"Professors",
            icon:<Icons.User2Icon size={22}/>,
            element:<ProfaddingComp/>
        },
        {
            title:"Debates",
            icon:<Icons.MessageSquare size={22}/>,
            element:<DebatesaddingComp/>
        },
        {
            title:"Hubs",
            icon:<Icons.Share size={22}/>,
            element:<HubAddingComp/>
        },
        {
            title:"Events",
            icon:<Icons.Text size={22}/>,
            element:<EventsaddingComp/>
        },
        {
            title:"Session",
            icon:<Icons.Activity size={22}/>,
            element:<AddSession courses={courses}/>
        },
        {
            title:"Classrooms",
            icon:<Icons.School size={22}/>,
            element:<AddClassrooms/>
        },
        {
            title:"Courses",
            icon:<Icons.Film size={22}/>,
            element:<CourseaddingComp professors={professors} courses={ courses} universityList={universityList}/>
        },
        {
            title:"Documentaries",
            icon:<Icons.Video size={22}/>,
            element:<DocSeriesaddingComp/>
        }
    ]

  return (
    <VStack gap={6}  width={'100%'} alignItems={'flex-start'} background={'#111313'} padding={8} borderRadius={20}>
        <Box>
            <Heading fontSize={22} color={'#00bf63'} fontWeight={700}>University Activity Hub</Heading>
            <Text fontSize={13} color={'gray.500'} mt={1}>Manage professors, courses, and campus activity in one place</Text>
        </Box>

        <SimpleGrid overflowY={'auto'} height={'45vh'} columns={{ base: 1, sm: 2, lg: 3 }} gap={5} width={'100%'}>
            {activities.map((item, index) => {
                const accent = ACCENTS[index % ACCENTS.length]
                return (
                    <Box
                        key={index}
                        position={'relative'}
                        background={'#181a1c'}
                        border={'1.5px solid'}
                        borderColor={'whiteAlpha.100'}
                        borderTop={'3px solid'}
                        borderTopColor={accent}
                        borderRadius={'14px'}
                        padding={5}
                        minH={'120px'}
                        transition={'all 0.2s'}
                        _hover={{ borderColor: 'whiteAlpha.200', transform: 'translateY(-2px)' }}
                    >
                        <HStack gap={3} alignItems={'center'}>
                            <Box
                                background={`${accent}1A`}
                                color={accent}
                                borderRadius={'10px'}
                                padding={2}
                                display={'flex'}
                                alignItems={'center'}
                                justifyContent={'center'}
                            >
                                {item.icon}
                            </Box>
                            <Heading fontSize={15} color={'white'} fontWeight={600}>{item.title}</Heading>
                        </HStack>

                        <HStack position={'absolute'} gap={2} padding={4} right={0} bottom={0}>
                            <DrawerCustom2 icon={
                                <Button
                                    borderRadius={50}
                                    size={'sm'}
                                    background={accent}
                                    color={'#111313'}
                                    fontWeight={700}
                                    _hover={{ filter: 'brightness(1.1)' }}
                                >
                                    <Icons.Plus />
                                </Button>
                            }>
                                {item.element}
                            </DrawerCustom2>

                            <Button
                                borderRadius={50}
                                size={'sm'}
                                background={'transparent'}
                                border={'1.5px solid'}
                                borderColor={'whiteAlpha.200'}
                                color={'gray.400'}
                                _hover={{ borderColor: accent, color: accent }}
                            >
                                <Icons.Expand />
                            </Button>
                        </HStack>
                    </Box>
                )
            })}
        </SimpleGrid>

        <Button
            onClick={()=>{router.push('/university/lives')}}
            alignSelf={'flex-start'}
            background={'#181a1c'}
            border={'1.5px solid'}
            borderColor={'whiteAlpha.100'}
            color={'#00bf63'}
            fontWeight={600}
            borderRadius={'10px'}
            px={6}
            _hover={{ borderColor: '#00bf63', background: '#1d1f21' }}
        >
            Lives
        </Button>

        <Toaster/>
    </VStack>
  )
}