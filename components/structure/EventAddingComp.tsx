"use client"
import { Box, Button, HStack, Input, Text, Textarea, VStack } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { Icons } from '../../utils/exportIcons'
import { addEvent } from '../../app/actions/auth'
import { CustomSelect } from './CustomSelect'
import { toaster } from '../ui/toaster'
import { store } from '../../utils/storemedia'
import Image from 'next/image'

export default function EventsaddingComp() {
    const [eventname, setEventname] = useState("")
    const [maxLimit, setMaxLimit] = useState("")
    const [allowedEntryTo, setAllowedEntryTo] = useState("")
    const [eventType, setEventType] = useState("")
    const [photo, setphoto] = useState<File | null>(null)
    const [preview, setpreview] = useState<any>(null)
    const reinput = useRef<HTMLInputElement | null>(null)
    const [eventdescription , setevenD] = useState("")
    const [eventlocation , setevenLocation] = useState("")
    const [loading, setLoading] = useState(false)

    function upload(file?: File) {
        if (!file) return
        setLoading(true)
        const reader = new FileReader()
        reader.onload = (e) => {
            setpreview(e.target?.result || null)
            toaster.create({
                title: 'uploaded',
                type: 'success',
                duration: 5000
            })
        }
        reader.readAsDataURL(file)
        setphoto(file)
        setLoading(false)
    }

    async function submit() {
        setLoading(true)

        const limitNum = Number(maxLimit)
        if (!eventname || !maxLimit || !allowedEntryTo || !eventdescription || !eventType || Number.isNaN(limitNum) || limitNum <= 0) {
            setLoading(false)
            toaster.create({
                title: 'error in submission',
                type: 'error',
                duration: 5000
            })
            return
        }
        if (!photo?.name) {
            setLoading(false)
            toaster.create({
                title: 'error in submission',
                type: 'error',
                duration: 5000
            })
            return
        }

        const photo_url = await store({ image: photo, name: photo.name, type: photo.type })
        if (!photo_url) {
            setLoading(false)
            toaster.create({
                title: 'error in submission',
                type: 'error',
                duration: 5000
            })
            return
        }

        const res = await addEvent(eventname, limitNum, allowedEntryTo, eventType, photo_url,
          eventdescription , eventlocation !== 'online' ?  eventlocation : null
        )
        if (!res) {
            toaster.create({
                title: 'error in submission',
                type: 'error',
                duration: 5000
            })
            setLoading(false)
            return
        }

        toaster.create({
            title: 'submitted',
            type: 'success',
            duration: 5000
        })
        setEventname("")
        setMaxLimit("")
        setAllowedEntryTo("")
        setEventType("")
        setphoto(null)
        setpreview(null)
        setLoading(false)
    }

    return (
        <VStack width={'100%'}>
            <Box background={'#f6f6f6'} width={'100%'} height={200} position={'relative'}>
                {preview &&
                    <Image src={preview} fill unoptimized style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt='preview' />
                }
                <Button onClick={() => { reinput.current?.click() }} bottom={5} right={5} position={'absolute'} borderRadius={50} size={'2xs'}>
                    <Icons.Image />
                </Button>
                <Input
                    onChange={(e: any) => { upload(e.target.files?.[0]) }}
                    ref={reinput}
                    type='file'
                    style={{ display: 'none' }}
                />
            </Box>
            <HStack padding={4} justifyContent={'flex-start'} alignItems={'center'} gap={2} width={'100%'}>
                <Box width={'100%'} padding={0}>
                    <Text>Name</Text>
                    <HStack marginTop={2} padding={1} width={'100%'} gap={2} background={'#f6f6f6'} borderRadius={50}>
                        <Icons.User2Icon style={{ marginLeft: 10 }} strokeWidth={1} height={20} width={20} />
                        <Input
                            value={eventname}
                            onChange={(e) => { setEventname(e.target.value) }}
                            flex={1} border={'none'} outline={'none'} placeholder='Event name'
                        />
                    </HStack>
                </Box>
            </HStack>
            <Box width={'100%'} padding={4} paddingTop={0}>
                <Text>Max Limit</Text>
                <HStack marginTop={2} padding={1} width={'100%'} gap={2} background={'#f6f6f6'} borderRadius={50}>
                    <Icons.Mail style={{ marginLeft: 10 }} strokeWidth={1} height={20} width={20} />
                    <Input
                        value={maxLimit}
                        onChange={(e) => { setMaxLimit(e.target.value) }}
                        type='number'
                        min={1}
                        flex={1} border={'none'} outline={'none'} placeholder='Max attendees'
                    />
                </HStack>
            </Box>
            <Box width={'100%'} padding={4} paddingTop={0}>
                <Text>Who can join</Text>
                <HStack marginTop={2} padding={1} width={'100%'} gap={2} background={'#f6f6f6'} borderRadius={50}>
                    <CustomSelect
                        onchange={(e: any) => { setAllowedEntryTo(e[0]) }}
                        items={[
                            { label: 'anyone', value: 'anyone' },
                            { label: 'invite only', value: 'invite' },
                            { label: 'same university', value: 'university' }
                        ]}
                        title='Permission'
                        placeholder='Who can join'
                    />
                </HStack>
            </Box>
            <Box width={'100%'} padding={4} paddingTop={0}>
                <Text>Event Type</Text>
                <HStack marginTop={2} padding={1} width={'100%'} gap={2} background={'#f6f6f6'} borderRadius={50}>
                    <CustomSelect
                        onchange={(e: any) => { setEventType(e[0]) }}
                        items={[
                            { label: 'online', value: 'online' },
                            { label: 'in person', value: 'in_person' },
                            { label: 'hybrid', value: 'hybrid' }
                        ]}
                        title='Type'
                        placeholder='Event type'
                    />
                </HStack>
            </Box>
            <Box display={eventType !== 'online' ? 'block' : 'none'} width={'100%'} padding={4} paddingTop={0}>
                <Text>Event Location</Text>
                <HStack marginTop={2} padding={1} width={'100%'} gap={2} background={'#f6f6f6'} borderRadius={50}>
                    <Input onChange={(e)=>{setevenLocation(e.target.value)}} placeholder='where'/>
                </HStack>
            </Box>
            <Box width={'100%'} padding={4} paddingTop={0}>
                <Text>Event Description</Text>
                <HStack marginTop={2} padding={1} width={'100%'} gap={2} background={'#f6f6f6'} borderRadius={50}>
                    <Textarea onChange={(e)=>{setevenD(e.target.value)}} placeholder='describe this event'/>
                </HStack>
            </Box>
            <Box width={'100%'} padding={4} paddingTop={0}>
                <Button onClick={submit} loading={loading} width={'100%'}>Submit</Button>
            </Box>
        </VStack>
    )
}
