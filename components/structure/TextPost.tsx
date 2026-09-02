"use client"
import { Box, Button, HStack, IconButton, Image, Input, Text, Textarea, VStack, Wrap } from "@chakra-ui/react"
import React, { useRef, useState } from "react"
import { Icons } from "../../utils/exportIcons"
import { store } from "../../utils/storemedia"
import { postText } from "../../app/actions/auth"
import { Toaster, toaster } from "../ui/toaster"

type MediaItem = { file: File; url: string; type: "image" | "video" }

export const TextPostContent = () => {
    const [text, setText] = useState("")
    const [media, setMedia] = useState<MediaItem[]>([])
    const imageInputRef = useRef<HTMLInputElement>(null)
    const videoInputRef = useRef<HTMLInputElement>(null)

    function addFiles(files: FileList | null, type: "image" | "video") {
        if (!files) return
        const items: MediaItem[] = Array.from(files).map((file) => ({ file, url: URL.createObjectURL(file), type }))
        setMedia((prev) => [...prev, ...items])
    }

    function removeMedia(index: number) {
        setMedia((prev) => {
            const target = prev[index]
            if (target) URL.revokeObjectURL(target.url)
            return prev.filter((_, i) => i !== index)
        })
    }

    async function handlePost() {
        if (!text.trim() && media.length === 0){
            toaster.create({
                title:'missing info',
                duration:5000,
                type:'error'
            })
            return
        }
        // TODO: enviar text e media para o backend
        const medias =  media.map(async(url)=>{
            return await store({image:url.file , name:url.file.name , type:url.file.type})
        })
        const all = await Promise.all(medias) || []
        await postText(text , all)
        toaster.create({
                title:'post submitted',
                duration:5000,
                type:'success'
            })
    }

    return (
        <VStack align="stretch" gap={3}>
            <Textarea placeholder="No que está a pensar?" value={text} onChange={(e) => setText(e.target.value)} rows={5} resize="none" />

            {media.length > 0 && (
                <Wrap gap={2}>
                    {media.map((item, i) => (
                        <Box key={item.url} position="relative" boxSize="80px" borderRadius="md" overflow="hidden">
                            {item.type === "image" ? (
                                <Image src={item.url} alt="" boxSize="80px" objectFit="cover" />
                            ) : (
                                <video src={item.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            )}
                            <IconButton aria-label="Remover" size="2xs" position="absolute" top={1} right={1} borderRadius="full" onClick={() => removeMedia(i)}>
                                <Icons.X strokeWidth={2} height={12} width={12} />
                            </IconButton>
                        </Box>
                    ))}
                </Wrap>
            )}

            <Input ref={imageInputRef} type="file" accept="image/*" multiple display="none" onChange={(e) => addFiles(e.target.files, "image")} />
            <Input ref={videoInputRef} type="file" accept="video/*" multiple display="none" onChange={(e) => addFiles(e.target.files, "video")} />

            <HStack justify="space-between">
                <HStack gap={2}>
                    <IconButton aria-label="Adicionar foto" variant="ghost" onClick={() => imageInputRef.current?.click()}>
                        <Icons.Image strokeWidth={1.5} height={20} width={20} />
                    </IconButton>
                    <IconButton aria-label="Adicionar vídeo" variant="ghost" onClick={() => videoInputRef.current?.click()}>
                        <Icons.Video strokeWidth={1.5} height={20} width={20} />
                    </IconButton>
                </HStack>
                <Toaster/>
                <Button colorPalette="red" onClick={handlePost} disabled={!text.trim() && media.length === 0}>
                    Publicar
                </Button>
            </HStack>
        </VStack>
    )
}