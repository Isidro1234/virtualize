import { Box, Button, HStack, Input , Text, VStack} from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { Icons } from '../../utils/exportIcons'
import { Toaster, toaster } from '../ui/toaster'
import { uploadDocSeries } from '../../app/actions/auth'
import { store } from '../../utils/storemedia'

export default function DocSeriesaddingComp() {
    const [title, setTitle] = useState("")
    const [author, setAthor] = useState("")
    const [preview, setPreview] = useState<any>("")
    const [video, setVideo] = useState<File | null>(null)
   const inputref = useRef<HTMLInputElement>(null)
    async function upload(e:File){
            const reader = new FileReader()
            reader.onload = (e)=>{
              setPreview(e.target?.result)  
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
            setVideo(e)
            toaster.create({
                    title:"Photo uploaded",
                    type:"success",
                    duration:5000
                })
            return
        }
    
        async function submit(){
           
           if(!author || !video?.name || !title){
            return
           }
           try {
                    let duration = null
                const url = URL.createObjectURL(video)
                const videos = document.createElement('video')
                videos.addEventListener('loadedmetadata', ()=>{
                    duration = videos.duration
                    URL.revokeObjectURL(url)
                })
                videos.src = url;
                const url_up = await store({image:video , name:video.name , type:video.type})
                if(!url_up) return
                await uploadDocSeries(url_up, title , author , duration) 
                toaster.create({
                title:"Doc uploaded successfully",
                duration:5000,
                type:'success'
              })
                return
           } catch (error) {
              toaster.create({
                title:"error",
                duration:5000,
                type:'error'
              })
           }
           return
           
        }
  return (
    <VStack width={'100%'}>
                            <Box background={'#f6f6f6'} width={'100%'} height={200} position={'relative'}>
                                <Button onClick={()=>{inputref.current?.click()}} bottom={5} right={5} position={'absolute'} borderRadius={50} size={'2xs'}><Icons.Video/></Button>
                                <Input  ref={inputref} onChange={(e:any)=>{upload(e.target.files[0])}} display={'none'} type='file'/>
                                {preview &&
                                 <video  src={preview} controls style={{width:"100%", height:"100%", objectFit:"cover"}}/>
                                }
                               </Box>
                            <HStack padding={4} justifyContent={'flex-start'} alignItems={'center'} gap={2} width={'100%'}>
                                <Box width={'100%'} padding={0}>
                                    <Text>Documentary Title</Text>
                                    <HStack marginTop={2} padding={1} width={'100%'} gap={2} background={'#f6f6f6'} borderRadius={50}>
                                    <Icons.Text  style={{marginLeft:10}} strokeWidth={1} height={20} width={20}/>
                                    <Input onChange={(e)=>{setTitle(e.target.value)}} flex={1} border={'none'} outline={'none'} placeholder='Documentary name'/>  
                                    </HStack>
                                </Box>
                            </HStack>
                            <Box width={'100%'} padding={4} paddingTop={0}>
                                    <Text>Author's name</Text>
                                    <HStack marginTop={2} padding={1} width={'100%'} gap={2} background={'#f6f6f6'} borderRadius={50}>
                                    <Icons.Film  style={{marginLeft:10}} strokeWidth={1} height={20} width={20}/>
                                    <Input onChange={(e)=>{setAthor(e.target.value)}} flex={1} border={'none'} outline={'none'} placeholder='Professors email'/>  
                                    </HStack>
                            </Box>
                            
                            <Box width={'100%'} padding={4} paddingTop={0} >
                              <Button onClick={submit} width={'100%'}>Submit</Button>  
                            </Box>
                            <Toaster/>
                        </VStack>
  )
}
