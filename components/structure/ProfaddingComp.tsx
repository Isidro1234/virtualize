import { Box, Button, HStack, Input , Text, VStack} from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { Icons } from '../../utils/exportIcons'
import { store } from '../../utils/storemedia'
import { creatAuthAccountProfessor } from '../../app/actions/auth'
import { toaster, Toaster } from '../ui/toaster'
import Image from 'next/image'

export default function ProfaddingComp() {
    const [profname , setProfname] = useState('')
    const [profemail , setProfemail] = useState('')
    const [profphoto , setProfphoto] = useState<File | null>(null)
    const [preview, setPreview] = useState<any>('')
    const inputref = useRef<HTMLInputElement>(null)
    async function upload(e:File){
        const reader = new FileReader()
        reader.onload = (e)=>{
            setPreview(e.target?.result)
        }
        reader.readAsDataURL(e)
        setProfphoto(e)
        toaster.create({
                title:"uploaded",
                type:"success",
                duration:5000
            })
        return
    }
    async function submit(){
        if(!profname || !profemail || !profphoto?.name){
            
            toaster.create({
                title:"missing info",
                type:"error",
                duration:5000
            })
            return
        }
        try {
            const url_rs =  await store({image:profphoto , name:profphoto.name , type:profphoto.type})
            const url = url_rs || null
            await creatAuthAccountProfessor(profname, null ,  profemail, url) 
            toaster.create({
                title:"user created",
                type:"success",
                duration:5000
            })
        } catch (error) {
            console.log(error)
            toaster.create({
                title:"user created",
                type:'error',
                duration:5000
            })
        }
        
    }
  return (
    <VStack width={'100%'}>
                            <Box  background={'#f6f6f6'} width={'100%'} height={200} position={'relative'}>
                                {preview &&
                                <Image style={{width:'100%', height:"100%", objectFit:"cover"}} fill alt='image' src={preview}/>
                                }
                                
                                <Button zIndex={100} onClick={()=>{inputref.current?.click()}} bottom={5} right={5} position={'absolute'} borderRadius={50} size={'2xs'}><Icons.Image/></Button>
                                <Input ref={inputref} display={'none'} type='file' onChange={(e:any)=>{upload(e.target.files[0])}}/>
                            </Box>
                            <HStack padding={4} justifyContent={'flex-start'} alignItems={'center'} gap={2} width={'100%'}>
                                <Box width={'100%'} padding={0}>
                                    <Text>Name</Text>
                                    <HStack marginTop={2} padding={1} width={'100%'} gap={2} background={'#f6f6f6'} borderRadius={50}>
                                    <Icons.User2Icon  style={{marginLeft:10}} strokeWidth={1} height={20} width={20}/>
                                    <Input onChange={(e)=>{setProfname(e.target.value)}} flex={1} border={'none'} outline={'none'} placeholder='Professors name'/>  
                                    </HStack>
                                </Box>
                            </HStack>
                            <Box width={'100%'} padding={4} paddingTop={0}>
                                    <Text>Email</Text>
                                    <HStack marginTop={2} padding={1} width={'100%'} gap={2} background={'#f6f6f6'} borderRadius={50}>
                                    <Icons.Mail  style={{marginLeft:10}} strokeWidth={1} height={20} width={20}/>
                                    <Input onChange={(e)=>{setProfemail(e.target.value)}} flex={1} border={'none'} outline={'none'} placeholder='Professors email'/>  
                                    </HStack>
                            </Box>
                            <Box width={'100%'} padding={4} paddingTop={0} >
                              <Button onClick={submit} width={'100%'}>Submit</Button>  
                            </Box>
                            <Toaster/>
                        </VStack>
  )
}
