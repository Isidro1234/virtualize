"use client"
import { Button, VStack } from '@chakra-ui/react'
import { Call } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { CustomSelect } from './CustomSelect'
import { Icons } from '../../utils/exportIcons'
import { useRouter } from 'next/navigation'

export default function DeviceCameraAudio({call}:{call:Call | null}) {
    const [microphone, setMicrophone] = useState<MediaDeviceInfo[] | null>(null)
    const [cameras, setCamera] = useState<MediaDeviceInfo[] | null>(null)
    const [screens, setscreens] = useState<MediaDeviceInfo[] | null>(null)
    const [busy, setBusy] = useState(false) // 👈 guards against double-clicks / overlapping actions
    const router = useRouter()

    useEffect(() => {
        if (!call) return
        const camSub = call.camera.listDevices().subscribe(setCamera)
        const micSub = call.microphone.listDevices().subscribe(setMicrophone)
        const screenSub = call.screenShare.listDevices().subscribe(setscreens)

        return () => {
            camSub.unsubscribe()
            micSub.unsubscribe()
            screenSub.unsubscribe()
        }
    }, [call])

    async function goLive() {
        if (!call || busy) return
        setBusy(true)
        try {
            await call.goLive()
        } catch (error) {
            console.error('Failed to go live:', error)
        } finally {
            setBusy(false)
        }
    }

    async function stop() {
        if (!call || busy) return
        setBusy(true)
        try {
            await call.stopLive()
        } catch (error) {
            console.error('Failed to stop live:', error)
        } finally {
            setBusy(false)
        }
    }

    async function end() {
        if (!call || busy) return
        setBusy(true)
        try {
            await call.endCall()
            router.push('/university/school')
        } catch (error) {
            console.error('Failed to end call:', error)
            setBusy(false)
        }
    }

    async function disc() {
        if (!call || busy) return
        setBusy(true)
        try {
            await call.endCall()
        } catch (error) {
            console.error('Failed to disconnect:', error)
        } finally {
            setBusy(false)
        }
    }

    async function share() {
        if (!call) return
        try {
            await call.screenShare.enable()
        } catch (error: any) {
            if (error?.name === 'NotAllowedError') {
                console.log('User denied or cancelled screen share permission')
            } else {
                console.error('Failed to start screen share:', error)
            }
        }
    }

    return (
        <div>
            <CustomSelect
                onchange={(e: any) => call?.camera.select(e[0])}
                placeholder='select camera'
                title='cameras'
                items={cameras?.map((item) => ({ label: item.label, value: item.deviceId })) || []}
            />

            <CustomSelect
                onchange={(e: any) => call?.microphone.select(e[0])}
                placeholder='select microphone'
                title='microphones'
                items={microphone?.map((item) => ({ label: item.label, value: item.deviceId })) || []}
            />

            <Button onClick={share} disabled={!call}><Icons.Share/></Button>
            <Button onClick={goLive} loading={busy} disabled={!call}>Comecar</Button>
            <Button onClick={stop} loading={busy} disabled={!call}>Stop</Button>
            <Button onClick={end} loading={busy} disabled={!call}>End and exit</Button>
        </div>
    )
}