"use client"
import { Box, Button, HStack, Input, Heading, VStack } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { Icons } from '../../utils/exportIcons'
import { Toaster, toaster } from '../ui/toaster'
import { uploadDocSeries } from '../../app/actions/auth'
import { store } from '../../utils/storemedia'

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

const pillWrapProps = {
  padding: 1,
  width: '100%',
  gap: 2,
  background: '#262626',
  border: '1.5px solid',
  borderColor: 'whiteAlpha.100',
  borderRadius: 50,
  _focusWithin: {
    borderColor: 'green.300',
    boxShadow: '0 0 0 3px rgba(134,239,172,0.15)',
  },
}

function getVideoDuration(file: File): Promise<number | null> {
    return new Promise((resolve) => {
        const url = URL.createObjectURL(file)
        const videoEl = document.createElement('video')
        videoEl.preload = 'metadata'
        videoEl.addEventListener('loadedmetadata', () => {
            URL.revokeObjectURL(url)
            resolve(Number.isFinite(videoEl.duration) ? videoEl.duration : null)
        })
        videoEl.addEventListener('error', () => {
            URL.revokeObjectURL(url)
            resolve(null)
        })
        videoEl.src = url
    })
}

export default function DocSeriesaddingComp() {
    const [title, setTitle] = useState("")
    const [author, setAthor] = useState("")
    const [preview, setPreview] = useState<any>("")
    const [video, setVideo] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const inputref = useRef<HTMLInputElement>(null)

    async function upload(e: File) {
        if (!e) {
            toaster.create({
                title: "Video not selected",
                type: "error",
                duration: 5000
            })
            return
        }
        const reader = new FileReader()
        reader.onload = (e) => {
            setPreview(e.target?.result)
        }
        reader.readAsDataURL(e)
        setVideo(e)
        toaster.create({
            title: "Video uploaded",
            type: "success",
            duration: 5000
        })
    }

    async function submit() {
        if (!author || !video?.name || !title) {
            toaster.create({
                title: "missing info",
                type: "error",
                duration: 5000
            })
            return
        }
        setLoading(true)
        try {
            const duration = await getVideoDuration(video)
            const url_up = await store({ image: video, name: video.name, type: video.type })
            if (!url_up) {
                toaster.create({
                    title: "error uploading video",
                    duration: 5000,
                    type: 'error'
                })
                setLoading(false)
                return
            }
            await uploadDocSeries(url_up, title, author, duration !== null ? String(duration) : null)
            toaster.create({
                title: "Doc uploaded successfully",
                duration: 5000,
                type: 'success'
            })
        } catch (error) {
            toaster.create({
                title: "error",
                duration: 5000,
                type: 'error'
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <VStack width={'100%'} gap={5} height={'100%'} background={'#1d1d1d'} padding={6} borderRadius={0}>
            <Box background={'#262626'} border={'1.5px solid'} borderColor={'whiteAlpha.100'} width={'100%'} height={200} position={'relative'} borderRadius={'14px'} overflow={'hidden'}>
                <Button
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
                    <Icons.Video />
                </Button>
                <Input ref={inputref} onChange={(e: any) => { upload(e.target.files[0]) }} display={'none'} type='file' accept="video/*" />
                {preview &&
                    <video src={preview} controls style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                }
            </Box>

            <Box width={'100%'}>
                <Heading {...fieldLabelProps}>Title</Heading>
                <HStack {...pillWrapProps}>
                    <Icons.Text style={{ marginLeft: 10 }} strokeWidth={1} height={20} width={20} color="var(--chakra-colors-gray-400)" />
                    <Input
                        {...pillInputProps}
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                        flex={1}
                        placeholder='Documentary name'
                    />
                </HStack>
            </Box>

            <Box width={'100%'}>
                <Heading {...fieldLabelProps}>Autor</Heading>
                <HStack {...pillWrapProps}>
                    <Icons.Film style={{ marginLeft: 10 }} strokeWidth={1} height={20} width={20} color="var(--chakra-colors-gray-400)" />
                    <Input
                        {...pillInputProps}
                        value={author}
                        onChange={(e) => { setAthor(e.target.value) }}
                        flex={1}
                        placeholder="Author's name"
                    />
                </HStack>
            </Box>

            <Box width={'100%'}>
                <Button
                    onClick={submit}
                    loading={loading}
                    width={'100%'}
                    minH={'46px'}
                    background={'green.300'}
                    color={'#1d1d1d'}
                    fontWeight={700}
                    borderRadius={'10px'}
                    _hover={{ background: 'green.200' }}
                >
                    Submit
                </Button>
            </Box>
            <Toaster />
        </VStack>
    )
}