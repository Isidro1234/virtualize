"use client"
import { Box, Button, HStack, Input, Textarea, VStack } from "@chakra-ui/react"
import React, { useEffect, useRef, useState } from "react"
import { Icons } from "../../utils/exportIcons"
import { store } from "../../utils/storemedia"
import { postVideo } from "../../app/actions/auth"
import { toaster, Toaster } from "../ui/toaster"

type VideoMode = "short" | "long"

export const VideoPostContent = () => {
    const [mode, setMode] = useState<VideoMode>("short")

    // ---- Short video (camera) ----
    const videoRef = useRef<HTMLVideoElement>(null)
    const streamRef = useRef<MediaStream | null>(null)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const chunksRef = useRef<Blob[]>([])
    const [isRecording, setIsRecording] = useState(false)
    const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null)
    const [recordedUrl, setRecordedUrl] = useState<string | null>(null)
    const [loading , setLoading] = useState(false)

    // ---- Long form (upload) ----
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [longVideoFile, setLongVideoFile] = useState<File | null>(null)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [tags, setTags] = useState("")

    // Open the camera only while in "short" mode and nothing recorded yet
    useEffect(() => {
        if (mode !== "short" || recordedBlob) return
        let active = true

        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                if (!active) {
                    stream.getTracks().forEach((t) => t.stop())
                    return
                }
                streamRef.current = stream
                if (videoRef.current) videoRef.current.srcObject = stream
            })
            .catch((err) => console.error("Não foi possível acessar a câmara", err))

        return () => {
            active = false
            streamRef.current?.getTracks().forEach((t) => t.stop())
            streamRef.current = null
        }
    }, [mode, recordedBlob])

    function handleStartRecording() {
        if (!streamRef.current) return
        chunksRef.current = []
        const recorder = new MediaRecorder(streamRef.current, { mimeType: "video/webm" })
        recorder.ondataavailable = (e) => e.data.size > 0 && chunksRef.current.push(e.data)
        recorder.onstop = () => {
            const blob = new Blob(chunksRef.current, { type: "video/webm" })
            setRecordedBlob(blob)
            setRecordedUrl(URL.createObjectURL(blob))
        }
        mediaRecorderRef.current = recorder
        recorder.start()
        setIsRecording(true)
    }

    function handleStopRecording() {
        mediaRecorderRef.current?.stop()
        setIsRecording(false)
    }

    function handleDiscardRecording() {
        if (recordedUrl) URL.revokeObjectURL(recordedUrl)
        setRecordedBlob(null)
        setRecordedUrl(null)
    }

    function handleLongFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (file) setLongVideoFile(file)
    }

    async function handlePostShort() {
        setLoading(true)
        if (!recordedBlob){
            toaster.create({
                title:'video not sent',
                type:'error',
                duration:5000
            })
            setLoading(false)
            return
        }
        // TODO: enviar recordedBlob para o backend
         if(!title || !description || tags.length <= 0){
            toaster.create({
                title:'information missing',
                type:'error',
                duration:5000
            })
            setLoading(false)
            return
        }
        const ext = recordedBlob.type.split("/")[1] || "webm" // "webm"
        const name = `${Date.now()}-virtualize.${ext}`
        try {
           const url = await store({image:recordedBlob , name:name , type:recordedBlob.type});
        if(!url){
             toaster.create({
                title:'video not uploaded',
                type:'error',
                duration:5000
            })
            setLoading(false)
            return
        }
        await postVideo(url , title , tags, description)
        toaster.create({
                title:'post uploaded with success',
                type:'success',
                duration:5000
            })
            setLoading(false)
        } catch (error) {
           toaster.create({
                title:'error server',
                type:'error',
                duration:5000
            })
            setLoading(false)
            return
        }
    }

    async function handlePostLong() {
        setLoading(true)
        if (!longVideoFile){
            toaster.create({
                title:'video not sent',
                type:'error',
                duration:5000
            })
            setLoading(false)
            return
        }
        // TODO: enviar longVideoFile, title, description, tags para o backend
        if(!title || !description || tags.length <= 0){
            toaster.create({
                title:'information missing',
                type:'error',
                duration:5000
            })
            setLoading(false)
            return
        }
        try {
          
           const url = await store({image:longVideoFile , name:longVideoFile.name , type:longVideoFile.type});
        if(!url) {
            toaster.create({
                title:'video not uploaded',
                type:'error',
                duration:5000
            })
            setLoading(false)
            return
        }
        await postVideo(url , title , tags, description)
        toaster.create({
                title:'post uploaded with success',
                type:'success',
                duration:5000
            })
            setLoading(false)
        console.log("A publicar vídeo longo", { longVideoFile, title, description, tags }) 
        } catch (error) {
            toaster.create({
                title:'error server',
                type:'error',
                duration:5000
            })
            setLoading(false)
            return
        }
        
    }

    return (
        <VStack align="stretch" gap={4}>
            <HStack gap={2}>
                <Button flex={1} variant={mode === "short" ? "solid" : "outline"} onClick={() => setMode("short")}>
                    Vídeo Curto
                </Button>
                <Button flex={1} variant={mode === "long" ? "solid" : "outline"} onClick={() => setMode("long")}>
                    Vídeo Longo
                </Button>
            </HStack>

            {mode === "short" ? (
                <VStack align="stretch" gap={3}>
                    <Box borderRadius="md" overflow="hidden" bg="black" minH="320px">
                        {recordedUrl ? (
                            <video src={recordedUrl} controls style={{ width: "100%", display: "block" }} />
                        ) : (
                            <video ref={videoRef} autoPlay muted playsInline style={{ width: "100%", display: "block" }} />
                        )}
                    </Box>

                    {recordedBlob ? (
                        <HStack gap={2}>
                            <Button flex={1} variant="outline" onClick={handleDiscardRecording}>Regravar</Button>
                            <Button flex={1} colorPalette="red" onClick={handlePostShort}>Publicar</Button>
                        </HStack>
                    ) : (
                        <Button loading={loading} colorPalette="red" onClick={isRecording ? handleStopRecording : handleStartRecording}>
                            {isRecording ? "Parar Gravação" : "Gravar"}
                        </Button>
                    )}
                    <Input placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <Textarea placeholder="Descrição (opcional)" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
                    <Input placeholder="Tags (opcional, separadas por vírgula)" value={tags} onChange={(e) => setTags(e.target.value)} />

                </VStack>
            ) : (
                <VStack align="stretch" gap={3}>
                    <Input ref={fileInputRef} type="file" accept="video/*" display="none" onChange={handleLongFileChange} />
                    <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                        <Icons.Upload strokeWidth={1.5} height={18} width={18} />
                        {longVideoFile ? longVideoFile.name : "Escolher Vídeo"}
                    </Button>

                    <Input placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <Textarea placeholder="Descrição (opcional)" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
                    <Input placeholder="Tags (opcional, separadas por vírgula)" value={tags} onChange={(e) => setTags(e.target.value)} />

                    <Button loading={loading} colorPalette="red" onClick={handlePostLong} disabled={!longVideoFile || !title}>
                        Publicar
                    </Button>
                </VStack>
            )}
            <Toaster/>
        </VStack>
    )
}