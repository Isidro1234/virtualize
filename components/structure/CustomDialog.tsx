import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import React from "react"


export const CustomDialog = ({icon, children, title}:{title:string, icon:React.ReactNode, children:React.ReactNode}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {icon}
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title fontSize={12} fontWeight={400}>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              {children}
            </Dialog.Body>
            
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
