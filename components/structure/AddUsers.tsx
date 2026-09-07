"use client"
import { Box, Heading, HStack, Input, VStack, Button } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { CustomSelect } from '../../components/structure/CustomSelect'
import { store } from '../../utils/storemedia'
import { toaster, Toaster } from '../../components/ui/toaster'
import { creatAuthAccount, deleteSession } from '../../app/actions/auth'
import { useRouter } from 'next/navigation'

const COLORS = {
  bg: "#111313",
  surface: "#1a1d1d",
  border: "#2a2e2e",
  accent: "#00bf63",
  accentHover: "#00a857",
  text: "#f2f2f2",
  subtext: "#9a9a9a",
}

export default function AddUSer() {
  const [usercat, setUsercat] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [previewPic, setPreview] = useState<any>(null)
  const [pic, setPic] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [country, setCountry] = useState("")
  const refphoto = useRef<HTMLInputElement>(null)
   const router = useRouter()
  function handlePic(pic:any){
      if(!pic) {
        toaster.create({
          title:"No picture uploaded",
          duration:5000,
          type:"error"
        })
        return
      };
      const reader = new FileReader()
      reader.onload = (e)=>{
       setPreview(e.target?.result || null) 
      }
      reader.readAsDataURL(pic)
      setPic(pic)
      toaster.create({
          title:"picture uploaded",
          duration:5000,
          type:"success"
        })
      return
  }

 async function submit() {
  setLoading(true)

  // 1. Validation
  if (!name || !email || !usercat || !country) {
    setLoading(false)
    toaster.create({
      title: "Please fill in all required fields (Name, Email, Category, Country)",
      duration: 5000,
      type: "error"
    })
    return
  }

  const password = "test1234"
  let imageurl: string | null = null

  // 2. Handle Image Upload if a picture was selected
  if (pic) {
    try {
      imageurl = (await store({ image: pic, name: pic.name, type: pic.type })) || null
      if (!imageurl) {
        toaster.create({
          title: "Image upload failed. Proceeding without profile picture.",
          duration: 4000,
          type: "error"
        })
      }
    } catch (err) {
      console.error("Storage upload error:", err)
      toaster.create({
        title: "Could not upload photo due to network error. Account will be created without photo.",
        duration: 4000,
        type: "error"
      })
    }
  }

  // 3. Create Account & Save Database Record
  const success = await creatAuthAccount(name, email, password, imageurl || null, usercat[0], country)

  setLoading(false)

  if (success) {
    toaster.create({
      title: "User successfully created",
      duration: 5000,
      type: "success"
    })
  } else {
    toaster.create({
      title: "Failed to create account in database",
      duration: 5000,
      type: "error"
    })
  }
}


async function handlelogout(){
  await deleteSession()
  router.push('/')
}
  return (
    <Box bg={COLORS.bg} minH="100vh" w="100%" py={10} px={4}>
      <VStack maxW="900px" mx="auto" gap={8} align="stretch">

        <VStack align="start" gap={1}>
          <Heading color={COLORS.text} fontSize={22}>Add User</Heading>
          <Box color={COLORS.subtext} fontSize={14}>
            Create a new university, professor, student, or admin agent account
          </Box>
        </VStack>

        <VStack
          bg={COLORS.surface}
          borderWidth="1px"
          borderColor={COLORS.border}
          borderRadius="lg"
          p={6}
          gap={6}
          align="stretch"
        >
          <HStack>
            <CustomSelect
              onchange={(e:any)=>{setUsercat(e)}}
              items={[
                {label:"University" , value:"university"},
                {label:"Professor" , value:"professor"},
                {label:"Student" , value:"student"},
                {label:"admin agent" , value:"agent"}
              ]}
              title='Select user type'
              placeholder='what type of user you want to add?'
            />
          </HStack>

          <HStack gap={4} wrap="wrap" align="flex-start">
            <Box flex="1" minW="180px">
              <Heading fontSize={14} color={COLORS.text} mb={1}>Name</Heading>
              <Input
                onChange={(e)=>{setName(e.target.value)}}
                placeholder={`what is your ${usercat || ''} name`}
                bg={COLORS.bg}
                borderColor={COLORS.border}
                color={COLORS.text}
                _placeholder={{ color: COLORS.subtext }}
                _hover={{ borderColor: COLORS.accent }}
                _focus={{ borderColor: COLORS.accent, boxShadow: `0 0 0 1px ${COLORS.accent}` }}
              />
            </Box>

            <Box flex="1" minW="180px">
              <Heading fontSize={14} color={COLORS.text} mb={1}>email</Heading>
              <Input
                onChange={(e)=>{setEmail(e.target.value)}}
                placeholder={`what is your ${usercat || ''} email`}
                bg={COLORS.bg}
                borderColor={COLORS.border}
                color={COLORS.text}
                _placeholder={{ color: COLORS.subtext }}
                _hover={{ borderColor: COLORS.accent }}
                _focus={{ borderColor: COLORS.accent, boxShadow: `0 0 0 1px ${COLORS.accent}` }}
              />
            </Box>

            <Box>
              <Heading fontSize={14} color={COLORS.text} mb={1}>Photo</Heading>
              <Input
                onChange={(e:any)=>{handlePic(e.target.files[0])}}
                display={'none'}
                ref={refphoto}
                type='file'
              />
              <Button
                onClick={()=>{refphoto.current?.click()}}
                bg={COLORS.accent}
                color="#0a0a0a"
                fontWeight="semibold"
                _hover={{ bg: COLORS.accentHover }}
                _active={{ bg: COLORS.accentHover }}
              >
                {pic?.name ? "Change photo" : "Upload photo"}
              </Button>
            </Box>

            <Box flex="1" minW="180px">
              <Heading fontSize={14} color={COLORS.text} mb={1}>Country</Heading>
              <Input
                onChange={(e)=>{setCountry(e.target.value)}}
                type='text'
                bg={COLORS.bg}
                borderColor={COLORS.border}
                color={COLORS.text}
                _hover={{ borderColor: COLORS.accent }}
                _focus={{ borderColor: COLORS.accent, boxShadow: `0 0 0 1px ${COLORS.accent}` }}
              />
            </Box>
          </HStack>

          {previewPic && (
            <Box
              w="80px"
              h="80px"
              borderRadius="md"
              overflow="hidden"
              borderWidth="1px"
              borderColor={COLORS.border}
            >
              <img src={previewPic} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </Box>
          )}

          <Toaster/>

          <Button
            onClick={submit}
            loading={loading}
            bg={COLORS.accent}
            color="#0a0a0a"
            fontWeight="bold"
            size="lg"
            _hover={{ bg: COLORS.accentHover }}
            _active={{ bg: COLORS.accentHover }}
          >
            Submit
          </Button>
        </VStack>
        <Button onClick={handlelogout}>Log out</Button>
      </VStack>
    </Box>
  )
}