"use client"
import { Button, VStack , Box, Text } from '@chakra-ui/react'
import React, {useRef} from 'react'
import {Icons} from "../../utils/exportIcons"
import { usePathname, useRouter } from 'next/navigation'
import PostCard from './PostCard'
import { CustomMenu } from './MenuCustom'
import { CustomDialog } from './CustomDialog'



export default function SideBar(){
    const view = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const pathname = usePathname()
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

                <CustomMenu icon={
                   <Box className={'conteier-text-box'} gap={2} display={"flex"} alignItems={"center"}>
                    <Icons.Plus  strokeWidth={1} color={'white'} width={19} height={19}/>
                    <Text className={'text-side-bar no-show'}>Add</Text>
                </Box>  
                }>
                </CustomMenu>
                
                
            </VStack>
        </VStack>
    )
}