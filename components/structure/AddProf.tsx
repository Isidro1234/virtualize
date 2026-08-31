"use client"
import { Box, Button, Heading, HStack, Input, Text, VStack } from '@chakra-ui/react'
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
import { features } from 'process'
import DocSeriesaddingComp from './Doc&SeriesAddingComp'
import { useRouter } from 'next/navigation'

export default function AddProf({universities}:{universities:string}) {
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
            image:'',
            element:<ProfaddingComp/>
        },
         {
            title:"Debates",
            image:'',
            element:<DebatesaddingComp/>
        },
         {
            title:"Hubs",
            image:'',
            element:<HubAddingComp/>
        },
         {
            title:"Events",
            image:'',
            element:<EventsaddingComp/>
        },
         {
            title:"Courses",
            image:'',
            element:<CourseaddingComp/>
        },
        {
            title:"Documentaries",
            image:'',
            element:<DocSeriesaddingComp/>
        }
    ]
  return (
    <VStack gap={4} width={'100%'} alignItems={'flex-start'}>
         <Heading color={'#00bf63'}>University Activity Hub</Heading>
        <HStack gap={5} flexWrap={'wrap'} alignItems={'flex-start'} width={'100%'}>
           
           
             {
                    activities.map((item, index)=>{
                        return (
                           <Box  className='box' gap={4} key={index} position={'relative'}>
            <Heading color={'white'}>{item.title}</Heading>
            <HStack  position={'absolute'} padding={4} right={0} bottom={0}>
               
                <DrawerCustom2 icon={
                    <Button borderRadius={50} size={'sm'}><Icons.Plus /></Button>
                }>
                    {item.element}
                </DrawerCustom2>

                <Button borderRadius={50} size={'sm'}><Icons.Expand /></Button>
            </HStack>
        </Box> 
                        )
                    })
                }
           <Button onClick={()=>{router.push('/university/lives')}}>Lives</Button>
        </HStack>
        <VStack>

        </VStack>
        <Toaster/>
    </VStack>
  )
}
