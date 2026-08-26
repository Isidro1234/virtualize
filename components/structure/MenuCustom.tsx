import { Button, Menu, Portal } from "@chakra-ui/react"
import { CustomDialog } from "./CustomDialog"
import React from "react"
import { Icons } from "../../utils/exportIcons"


export const CustomMenu = ({ icon}:{icon:React.ReactNode}) => {
    
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        {icon}
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item  value="new-txt-1"><Icons.Video strokeWidth={1.5} height={20} width={20}/> Videos</Menu.Item> 
            <Menu.Item  value="new-txt-2"><Icons.MessageCircle strokeWidth={1.5} height={20} width={20}/>Post</Menu.Item> 
            <Menu.Item  value="new-txt-3"><Icons.Voicemail strokeWidth={1.5} height={20} width={20}/>Live</Menu.Item> 
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}
