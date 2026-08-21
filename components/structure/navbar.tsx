"use client"
import { Button, Heading, HStack, Input, Text, VStack } from '@chakra-ui/react'

import Logo from '../../public/logo2.svg'
import Logo2 from '../../public/logo5.svg'
import Search from  '../../public/icons/search.svg'
import {useEffect , useRef , useState} from "react"
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Icons from '../../utils/exportIcons'
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const navref = useRef<HTMLDivElement>(null)
  const textref = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
 useEffect(() => {
  if (!navref.current) return;

  const handleScroll = () => {
    if (!navref.current || !textref.current) return;

    if (window.scrollY >= 20) {
      navref.current.style.background = "white";
          navref.current.style.transition = "all ease-in-out 300ms";
          textref.current.style.color = "black"
          setScrolled(true)
    } else if (window.scrollY <= 20) {
      navref.current.style.background = "transparent";
      navref.current.style.transition = "all ease-in-out 300ms"
      setScrolled(false)
    }
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);
  return (
    <HStack className={'nav-bar'} display={pathname.includes('/user') ? "none" : "flex"} ref={navref} zIndex={500}  background={'transparent'} position={'fixed'} width={"100%"} padding={5}>
      <VStack   onClick={()=>{router.push('/')}}  alignItems={'flex-start'} flex={1}>
        {scrolled ? 
        <Logo style={{scale:4, marginLeft:75, cursor:"pointer"}} height="50px" width="50px"/>
      :
      <Logo2 style={{scale:12, marginLeft:95, marginTop:10, cursor:"pointer"}} />
      
      }
        
      
      </VStack>

        <HStack className='menu-nav' ref={textref} gap={10} justifyContent={'flex-end'}>
          <Link href={'/services'}><Text className='nav-bar-links' ></Text><Text className='nav-bar-links' color={scrolled ? "#1d1d1d" : "white"}>Services</Text></Link>
          <Link href={'/universities'}><Text className='nav-bar-links' color={scrolled ? "#1d1d1d" : "white"}>For Universities</Text></Link>
          <Link href={'/aboutus'}><Text className='nav-bar-links' ></Text><Text className='nav-bar-links' color={scrolled ? "#1d1d1d" : "white"}>About us</Text></Link>
          <Button onClick={()=>{router.push('/login')}} borderRadius={50} color={'#00bf63'} _hover={{background:"#00bf63", color:"white"}} paddingLeft={7} bg={'transparent'} borderColor={'#00bf63'} paddingRight={7} >Login</Button>
        </HStack>
        <VStack className='menu-combo' paddingRight={5}>
          <Icons.Menu width={34} height={34} color={scrolled ? "#1d1d1d" : "white"}/>
        </VStack>

    </HStack>
  ) 
}
