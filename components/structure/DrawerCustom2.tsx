"use client"
import { Button, CloseButton, Drawer, Portal, Text, VStack } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/navigation"


export const DrawerCustom2 = ({icon, children}:{children:React.ReactNode,icon:React.ReactNode}) => {
    const router = useRouter()
  return (
    <Drawer.Root >
      <Drawer.Trigger asChild>
        {icon}
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Body padding={0}>
                {children}
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}
