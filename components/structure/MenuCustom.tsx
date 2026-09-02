"use client"
import { Button, Menu, Portal, Text } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { CustomDialog } from "./CustomDialog"
import React, { useRef, useState } from "react"
import { Icons } from "../../utils/exportIcons"
import { VideoPostContent } from "./VideoPost"
import { TextPostContent } from "./TextPost"

export const CustomMenu = ({ icon }: { icon: React.ReactNode }) => {
    const router = useRouter()
    const [postDialogOpen, setPostDialogOpen] = useState(false)
    const ref = useRef<HTMLButtonElement>(null)
    const ref2 = useRef<HTMLButtonElement>(null)
    function handleSelect(details: { value: string }) {
        switch (details.value) {
            case "new-txt-1": // Videos
                if(!ref.current)return 
                ref.current?.click()
                setPostDialogOpen(true)
                break
            case "new-txt-2": // Post
                if(!ref2.current)return 
                ref2.current?.click()
                setPostDialogOpen(true)
                break
            case "new-txt-3": // Live
                router.push('/user/live')
                break
        }
    }

    return (
        <>
            <Menu.Root onSelect={handleSelect}>
                <Menu.Trigger asChild>
                    {icon}
                </Menu.Trigger>
                <Portal>
                    <Menu.Positioner>
                        <Menu.Content>
                            <Menu.Item value="new-txt-1"><Icons.Video strokeWidth={1.5} height={20} width={20} /> Videos</Menu.Item>
                            <Menu.Item value="new-txt-2"><Icons.MessageCircle strokeWidth={1.5} height={20} width={20} />Post</Menu.Item>
                            <Menu.Item value="new-txt-3"><Icons.Voicemail strokeWidth={1.5} height={20} width={20} />Live</Menu.Item>
                        </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>

                <CustomDialog title="New Post" icon={<Button ref={ref} display={'none'}>fsdf</Button>}>
                    <VideoPostContent/>
                </CustomDialog>
                 <CustomDialog title="New Video" icon={<Button ref={ref2} display={'none'}>fsdf</Button>}>
                    <TextPostContent/>
                </CustomDialog>

        </>
    )
}
