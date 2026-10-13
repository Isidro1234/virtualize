"use client"
import { Button, VStack , Box, Text } from '@chakra-ui/react'
import React, {useRef} from 'react'
import {AddIcon, Books, CoursesIcon, DocumentaryIcon, EventIcon, Home, HubIcon, Icons, LogoLast} from "../../utils/exportIcons"
import { usePathname, useRouter } from 'next/navigation'
import { CustomMenu } from './MenuCustom'
import Link from 'next/link'



export default function SideBar(){
    const view = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const pathname = usePathname()
    const isCourse = pathname.includes('/user/course')
    const isAdd = pathname.includes('/user/add')
    function toggle(){
        if(!view.current) return;
        const texts = document.querySelectorAll('.text-side-bar');
        const boxes = document.querySelectorAll('.conteier-text-box')
        texts.forEach((text)=>{
            text.classList.toggle('no-show')
        }) 
       if(texts[0].classList.contains('no-show')){
        view.current.style.width = 'auto';
        view.current.style.alignItems= "center"
        boxes.forEach((box)=>{
            box.classList.remove("space")
          })
       }else{
          view.current.style.alignItems= "flex-start"
          boxes.forEach((box)=>{
            box.classList.add("space")
          })
          
       }
        
    }
    return (
    <VStack background={'#17191a'}  borderRadius={20} transition={"all ease-in-out 500ms"} ref={view}  alignItems={'center'} padding={4} height={'90vh'}  width={'auto'} justifyContent={"flex-start"} paddingTop={12}>
            <LogoLast style={{  cursor:"pointer", scale:3, marginLeft:0}} />
            <VStack width={'100%'} alignItems={'center'} gap={4} marginTop={10}>
                <Box borderRadius={10} padding={4} width={210} background={isCourse ? "#1d1f21" : 'transparent'} gap={2} display={"flex"} flexDir={'row'} alignItems={"center"}>
                    <Home color={'white'} width={19} height={19}/>
                    <Text color={'white'} fontSize={12}>Home</Text>
                </Box>
               <Link href={'/user/courses'}>
               <Box borderRadius={10} padding={4} width={210} background={isCourse ? "#1d1f21" : 'transparent'} gap={2} display={"flex"} flexDir={'row'} alignItems={"center"}>
                    <CoursesIcon  strokeWidth={1} color={'white'} width={19} height={19}/>
                    <Text color={'white'} fontSize={12}>Courses</Text>
                </Box> </Link>
                
                <Box borderRadius={10} padding={4} width={210} background={isCourse ? "#1d1f21" : 'transparent'} gap={2} display={"flex"} flexDir={'row'} alignItems={"center"}>
                    <HubIcon color={'white'} width={19} height={19}/>
                    <Text color={'white'} fontSize={12}>Hubs</Text>
                </Box>
                <Box borderRadius={10} padding={4} width={210} background={isCourse ? "#1d1f21" : 'transparent'} gap={2} display={"flex"} flexDir={'row'} alignItems={"center"}>
                    <Books color={'white'} width={19} height={19}/>
                    <Text color={'white'} fontSize={12}>Books</Text>
                </Box>
                <Box borderRadius={10} padding={4} width={210} background={isCourse ? "#1d1f21" : 'transparent'} gap={2} display={"flex"} flexDir={'row'} alignItems={"center"}>
                    <EventIcon color={'white'} width={19} height={19}/>
                    <Text color={'white'} fontSize={12}>Events</Text>
                </Box>
                <Box borderRadius={10} padding={4} width={210} background={isCourse ? "#1d1f21" : 'transparent'} gap={2} display={"flex"} flexDir={'row'} alignItems={"center"}>
                    <DocumentaryIcon color={'white'} width={19} height={19}/>
                    <Text color={'white'} fontSize={12}>Documentary</Text>
                </Box>
                
            </VStack>
        </VStack>
    )
}