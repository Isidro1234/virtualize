"use client"
import { Button, CloseButton, Drawer, Portal, Text, VStack } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/navigation"


export const DrawerCustom = ({icon}:{icon:React.ReactNode}) => {
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
            <Drawer.Header>
              <Drawer.Title fontWeight={500} fontSize={12}>Menu</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
             <VStack   gap={10} justifyContent={'flex-end'}>
                       <Link href={'/services'}><Text className='nav-bar-links' ></Text><Text className='nav-bar-links' color={ "#1d1d1d" }>Services</Text></Link>
                       <Link href={'/universities'}><Text className='nav-bar-links' color={"#1d1d1d"}>For Universities</Text></Link>
                       <Link href={'/aboutus'}><Text className='nav-bar-links' ></Text><Text className='nav-bar-links' color={"#1d1d1d"}>About us</Text></Link>
                       <Button onClick={()=>{router.push('/login')}} borderRadius={50} color={'#00bf63'} _hover={{background:"#00bf63", color:"white"}} paddingLeft={7} bg={'transparent'} borderColor={'#00bf63'} paddingRight={7} >Login</Button>
                     </VStack>
            </Drawer.Body>
            <Drawer.Footer>
              
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}
