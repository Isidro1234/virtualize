"use client"
import { Button, VStack , Box, Text } from '@chakra-ui/react'
import React, {useRef} from 'react'
import {Icons} from "../../utils/exportIcons"
import { useRouter } from 'next/navigation'
import PostCard from './PostCard'
import { CustomMenu } from './MenuCustom'
import { CustomDialog } from './CustomDialog'



export default function SideBar(){
    const view = useRef<HTMLDivElement>(null)
    const router = useRouter()
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
          view.current.style.width = '200px'
          view.current.style.alignItems= "flex-start"
          boxes.forEach((box)=>{
            box.classList.add("space")
          })
          
       }
        
    }
    return (
        <VStack background={'#17191a'} transition={"all ease-in-out 500ms"} ref={view}  alignItems={'center'} padding={5} height={'100vh'} minWidth={90}  justifyContent={"flex-start"}>
            <Button cursor={'pointer'} onClick={toggle} background={"transparent"}><Icons.Menu strokeWidth={1} color={'white'} height={24} width={24}/></Button>
            <VStack alignItems={'flex-start'} gap={10} marginTop={5}>
                <Box className={'conteier-text-box'}  gap={2} display={"flex"} alignItems={"center"}>
                    <Icons.Book  strokeWidth={1} color={'white'} width={19} height={19}/>
                    <Text className={'text-side-bar no-show'}>Free Books</Text>
                </Box>
                <Box className={'conteier-text-box'}  gap={2} display={"flex"} alignItems={"center"}>
                    <Icons.Video strokeWidth={1} color={'white'} width={19} height={19}/>
                    <Text className={'text-side-bar no-show'}>Docu and Series</Text>
                </Box>
                 <Box className={'conteier-text-box'} gap={2} display={"flex"} alignItems={"center"}>
                    <Icons.Navigation  strokeWidth={1} color={'white'} width={19} height={19}/>
                    <Text className={'text-side-bar no-show'}>Explore</Text>
                </Box>
                 <Box className={'conteier-text-box'} onClick={()=>{router.push('/user/university')}} gap={2} display={"flex"} alignItems={"center"}>
                    <Icons.School  strokeWidth={1} color={'white'} width={19} height={19}/>
                    <Text className={'text-side-bar no-show'}>Shared Classes</Text>
                </Box>
                 <Box className={'conteier-text-box'} gap={2} display={"flex"} alignItems={"center"}>
                    <Icons.Voicemail  strokeWidth={1} color={'white'} width={19} height={19}/>
                    <Text className={'text-side-bar no-show'}>Debates</Text>
                </Box>
                 <Box className={'conteier-text-box'} gap={2} display={"flex"} alignItems={"center"}>
                    <Icons.Group strokeWidth={1} color={'white'} width={19} height={19}/>
                    <Text className={'text-side-bar no-show'} >Clubs</Text>
                </Box>
                 <Box className={'conteier-text-box'} gap={2} display={"flex"} alignItems={"center"}>
                    <Icons.Toolbox  strokeWidth={1} color={'white'} width={19} height={19}/>
                    <Text className={'text-side-bar no-show'}>Collab Hubs</Text>
                </Box>
               
                <CustomMenu icon={
                   <Box className={'conteier-text-box'} gap={2} display={"flex"} alignItems={"center"}>
                    <Icons.Plus  strokeWidth={1} color={'white'} width={19} height={19}/>
                    <Text className={'text-side-bar no-show'}>Add</Text>
                </Box>  
                }>
                </CustomMenu>
                
                <Box className={'conteier-text-box'}  gap={2} display={"flex"} alignItems={"center"}>
                    <Icons.BookmarkPlus strokeWidth={1} color={'white'} width={19} height={19}/>
                    <Text className={'text-side-bar no-show'}>Bookmark</Text>
                </Box>
            </VStack>
        </VStack>
    )
}