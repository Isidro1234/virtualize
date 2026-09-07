"use client"
import { Box, Button, HStack, Input, Heading, Textarea, VStack } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { Icons } from '../../utils/exportIcons'
import { addEvent } from '../../app/actions/auth'
import { CustomSelect } from './CustomSelect'
import { toaster } from '../ui/toaster'
import { store } from '../../utils/storemedia'
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

export default function EventsaddingComp() {
    const [eventname, setEventname] = useState("")
    const [maxLimit, setMaxLimit] = useState("")
    const [allowedEntryTo, setAllowedEntryTo] = useState("")
    const [eventType, setEventType] = useState("")
    const [photo, setphoto] = useState<File | null>(null)
    const [preview, setpreview] = useState<any>(null)
    const reinput = useRef<HTMLInputElement | null>(null)
    const [eventdescription, setevenD] = useState("")
    const [eventlocation, setevenLocation] = useState("")
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
          eventdescription, eventlocation !== 'online' ? eventlocation : null
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
        <VStack width={'100%'} gap={5} background={'#1d1d1d'} padding={6} borderRadius={0}>
            <Box background={'#262626'} border={'1.5px solid'} borderColor={'whiteAlpha.100'} width={'100%'} height={200} position={'relative'} borderRadius={'14px'} overflow={'hidden'}>
                {preview &&
                    <Image src={preview} fill unoptimized style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt='preview' />
                }
                <Button
                    onClick={() => { reinput.current?.click() }}
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
                <Input
                    onChange={(e: any) => { upload(e.target.files?.[0]) }}
                    ref={reinput}
                    type='file'
                    style={{ display: 'none' }}
                />
            </Box>

            <Box width={'100%'}>
                <Heading {...fieldLabelProps}>Name</Heading>
                <HStack {...pillWrapProps}>
                    <Icons.User2Icon style={{ marginLeft: 10 }} strokeWidth={1} height={20} width={20} color="var(--chakra-colors-gray-400)" />
                    <Input
                        {...pillInputProps}
                        value={eventname}
                        onChange={(e) => { setEventname(e.target.value) }}
                        flex={1}
                        placeholder='Event name'
                    />
                </HStack>
            </Box>

            <Box width={'100%'}>
                <Heading {...fieldLabelProps}>Limit</Heading>
                <HStack {...pillWrapProps}>
                    <Icons.Mail style={{ marginLeft: 10 }} strokeWidth={1} height={20} width={20} color="var(--chakra-colors-gray-400)" />
                    <Input
                        {...pillInputProps}
                        value={maxLimit}
                        onChange={(e) => { setMaxLimit(e.target.value) }}
                        type='number'
                        min={1}
                        flex={1}
                        placeholder='Max attendees'
                    />
                </HStack>
            </Box>

            <Box width={'100%'}>
                <Heading {...fieldLabelProps}>Entry</Heading>
                <CustomSelect
                    onchange={(val: any) => { setAllowedEntryTo(val) }}
                    items={[
                        { label: 'anyone', value: 'anyone' },
                        { label: 'invite only', value: 'invite' },
                        { label: 'same university', value: 'university' }
                    ]}
                    title='Permission'
                    placeholder='Who can join'
                />
            </Box>

            <Box width={'100%'}>
                <Heading {...fieldLabelProps}>Type</Heading>
                <CustomSelect
                    onchange={(val: any) => { setEventType(val) }}
                    items={[
                        { label: 'online', value: 'online' },
                        { label: 'in person', value: 'in_person' },
                        { label: 'hybrid', value: 'hybrid' }
                    ]}
                    title='Type'
                    placeholder='Event type'
                />
            </Box>

            <Box display={eventType && eventType !== 'online' ? 'block' : 'none'} width={'100%'}>
                <Heading {...fieldLabelProps}>Where</Heading>
                <HStack {...pillWrapProps}>
                    <Input
                        {...pillInputProps}
                        value={eventlocation}
                        onChange={(e) => { setevenLocation(e.target.value) }}
                        flex={1}
                        placeholder='where'
                    />
                </HStack>
            </Box>

            <Box width={'100%'}>
                <Heading {...fieldLabelProps}>About</Heading>
                <Box
                    {...pillWrapProps}
                    borderRadius={'14px'}
                >
                    <Textarea
                        {...pillInputProps}
                        value={eventdescription}
                        onChange={(e) => { setevenD(e.target.value) }}
                        placeholder='describe this event'
                        border={'none'}
                        resize={'vertical'}
                        minH={'90px'}
                    />
                </Box>
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
        </VStack>
    )
}