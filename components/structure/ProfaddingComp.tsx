import { Box, Button, Heading, HStack, Input, Text, VStack } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { Icons } from '../../utils/exportIcons'
import { store } from '../../utils/storemedia'
import { creatAuthAccountProfessor } from '../../app/actions/auth'
import { toaster, Toaster } from '../ui/toaster'
import Image from 'next/image'

const fieldLabelProps = {
  fontSize: 11,
  fontWeight: 600,
  color: 'gray.400',
  letterSpacing: '0.06em',
  textTransform: 'uppercase' as const,
  mb: 1.5,
}

const pillInputProps = {
  border: 'none',
  outline: 'none',
  color: 'white',
  _placeholder: { color: 'gray.500' },
}

export default function ProfaddingComp() {
    const [profname, setProfname] = useState('')
    const [profemail, setProfemail] = useState('')
    const [profphoto, setProfphoto] = useState<File | null>(null)
    const [preview, setPreview] = useState<any>('')
    const [loading, setLoading] = useState(false)
    const inputref = useRef<HTMLInputElement>(null)

    async function upload(e: File) {
        const reader = new FileReader()
        reader.onload = (e) => {
            setPreview(e.target?.result)
        }
        reader.readAsDataURL(e)
        setProfphoto(e)
        toaster.create({
            title: "uploaded",
            type: "success",
            duration: 5000
        })
        return
    }

    async function submit() {
        if (!profname || !profphoto?.name) {
            toaster.create({
                title: "missing info",
                type: "error",
                duration: 5000
            })
            return
        }
        setLoading(true)
        try {
            const url_rs = await store({ image: profphoto, name: profphoto.name, type: profphoto.type })
            if(!url_rs){
                toaster.create({
                    title:"no photo",
                    duration:5000,
                    type:'error'
                })
                return
            }
            await creatAuthAccountProfessor(profname, null, profemail, url_rs)
            toaster.create({
                title: "user created",
                type: "success",
                duration: 5000
            })
        } catch (error) {
            console.log(error)
            toaster.create({
                title: "user created",
                type: 'error',
                duration: 5000
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <VStack width={'100%'} height={'100%'} gap={5} background={'#1d1d1d'} padding={6} borderRadius={0}>
            <Box background={'#262626'} border={'1.5px solid'} borderColor={'whiteAlpha.100'} width={'100%'} height={200} position={'relative'} borderRadius={'14px'} overflow={'hidden'}>
                {preview &&
                    <Image style={{ width: '100%', height: "100%", objectFit: "cover" }} fill alt='image' src={preview} />
                }
                <Button
                    zIndex={100}
                    onClick={() => { inputref.current?.click() }}
                    bottom={5}
                    right={5}
                    position={'absolute'}
                    borderRadius={50}
                    size={'2xs'}
                    background={'green.300'}
                    color={'#1d1d1d'}
                    _hover={{ background: 'green.200' }}
                >
                    <Icons.Image />
                </Button>
                <Input ref={inputref} display={'none'} type='file' onChange={(e: any) => { upload(e.target.files[0]) }} />
            </Box>

            <Box width={'100%'}>
                <Heading {...fieldLabelProps}>Name</Heading>
                <HStack
                    padding={1}
                    width={'100%'}
                    gap={2}
                    background={'#262626'}
                    border={'1.5px solid'}
                    borderColor={'whiteAlpha.100'}
                    borderRadius={50}
                    _focusWithin={{
                        borderColor: 'green.300',
                        boxShadow: '0 0 0 3px rgba(134,239,172,0.15)',
                    }}
                >
                    <Icons.User2Icon style={{ marginLeft: 10 }} strokeWidth={1} height={20} width={20} color="var(--chakra-colors-gray-400)" />
                    <Input
                        {...pillInputProps}
                        onChange={(e) => { setProfname(e.target.value) }}
                        flex={1}
                        placeholder='Professors name'
                    />
                </HStack>
            </Box>

            <Box width={'100%'}>
                <Heading {...fieldLabelProps}>Email</Heading>
                <HStack
                    padding={1}
                    width={'100%'}
                    gap={2}
                    background={'#262626'}
                    border={'1.5px solid'}
                    borderColor={'whiteAlpha.100'}
                    borderRadius={50}
                    _focusWithin={{
                        borderColor: 'green.300',
                        boxShadow: '0 0 0 3px rgba(134,239,172,0.15)',
                    }}
                >
                    <Icons.Mail style={{ marginLeft: 10 }} strokeWidth={1} height={20} width={20} color="var(--chakra-colors-gray-400)" />
                    <Input
                        {...pillInputProps}
                        onChange={(e) => { setProfemail(e.target.value) }}
                        flex={1}
                        placeholder='Professors email'
                    />
                </HStack>
            </Box>

            <Box width={'100%'}>
                <Button
                    onClick={submit}
                    width={'100%'}
                    minH={'46px'}
                    background={'green.300'}
                    color={'#1d1d1d'}
                    fontWeight={700}
                    borderRadius={'10px'}
                    loading={loading}
                    _hover={{ background: 'green.200' }}
                >
                    Submit
                </Button>
            </Box>
            <Toaster />
        </VStack>
    )
}