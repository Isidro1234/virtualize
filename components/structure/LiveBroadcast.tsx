"use client"
import { Box, Button, HStack, Input, Text, VStack } from "@chakra-ui/react"
import React, { useEffect, useRef, useState } from "react"
import { Icons } from "../../utils/exportIcons"

type LiveStatus = "idle" | "live" | "ended"
type Comment = { id: string; author: string; text: string }

export const LiveBroadcast = () => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const streamRef = useRef<MediaStream | null>(null)
    const [status, setStatus] = useState<LiveStatus>("idle")
    const [comments, setComments] = useState<Comment[]>([])
    const [commentDraft, setCommentDraft] = useState("")

    useEffect(() => {
        return () => streamRef.current?.getTracks().forEach((t) => t.stop())
    }, [])

    async function handleStart() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            streamRef.current = stream
            if (videoRef.current) videoRef.current.srcObject = stream
            setStatus("live")
            // TODO: iniciar transmissão para o servidor (WebRTC / RTMP)
        } catch (err) {
            console.error("Não foi possível acessar a câmara", err)
        }
    }

    function handleStop() {
        streamRef.current?.getTracks().forEach((t) => t.stop())
        streamRef.current = null
        setStatus("idle")
        // TODO: pausar a transmissão sem terminar a sessão
    }

    function handleEnd() {
        streamRef.current?.getTracks().forEach((t) => t.stop())
        streamRef.current = null
        setStatus("ended")
        // TODO: encerrar definitivamente a sessão no backend
    }

    function handleSendComment() {
        if (!commentDraft.trim()) return
        setComments((prev) => [...prev, { id: crypto.randomUUID(), author: "Você", text: commentDraft.trim() }])
        setCommentDraft("")
    }

    return (
        <HStack align="stretch" gap={4} h="full" wrap="wrap">
            <VStack flex={2} minW="280px" align="stretch" gap={3}>
                <Box borderRadius="md" overflow="hidden" bg="black" minH="400px">
                    <video ref={videoRef} autoPlay muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </Box>
                <HStack gap={2}>
                    <Button flex={1} colorPalette="red" onClick={handleStart} disabled={status === "live"}>Iniciar</Button>
                    <Button flex={1} variant="outline" onClick={handleStop} disabled={status !== "live"}>Parar</Button>
                    <Button flex={1} variant="outline" onClick={handleEnd} disabled={status === "ended"}>Encerrar</Button>
                </HStack>
            </VStack>

            <VStack flex={1} minW="240px" align="stretch" gap={3} borderWidth="1px" borderRadius="md" p={3}>
                <Text fontWeight="bold">Comentários</Text>
                <VStack align="stretch" gap={2} flex={1} overflowY="auto" minH="200px">
                    {comments.map((c) => (
                        <Text key={c.id} fontSize="sm">
                            <Text as="span" fontWeight="bold">{c.author}: </Text>{c.text}
                        </Text>
                    ))}
                </VStack>
                <HStack gap={2}>
                    <Input placeholder="Escreva um comentário" value={commentDraft} onChange={(e) => setCommentDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSendComment()} />
                    <Button onClick={handleSendComment}>
                        <Icons.Send strokeWidth={1.5} height={18} width={18} />
                    </Button>
                </HStack>
            </VStack>
        </HStack>
    )
}