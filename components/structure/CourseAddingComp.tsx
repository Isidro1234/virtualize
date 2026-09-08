"use client"
import { Box, Heading, HStack, Input, VStack, Button, Text, SimpleGrid } from '@chakra-ui/react'
import React, { useMemo, useRef, useState } from 'react'
import { CustomSelect } from '../../components/structure/CustomSelect'
import { store } from '../../utils/storemedia'
import { toaster, Toaster } from '../../components/ui/toaster'
import { creatAuthAccount, addCourse } from '../../app/actions/auth'
import { Icons } from '../../utils/exportIcons'
import Image from 'next/image'

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const fieldLabelProps = {
  fontSize: 11,
  fontWeight: 600,
  color: 'gray.400',
  letterSpacing: '0.06em',
  textTransform: 'uppercase' as const,
  mb: 1.5,
}

const inputProps = {
  bg: '#262626',
  border: '1.5px solid',
  borderColor: 'whiteAlpha.100',
  borderRadius: '10px',
  color: 'white',
  minH: '42px',
  px: 4,
  fontSize: 13,
  fontWeight: 500,
  _placeholder: { color: 'gray.500' },
  _hover: { borderColor: 'green.300', bg: '#2b2b2b' },
  _focusVisible: {
    outline: 'none',
    borderColor: 'green.300',
    boxShadow: '0 0 0 3px rgba(134,239,172,0.15)',
  },
}

const sectionProps = {
  borderTop: '1.5px solid',
  borderColor: 'whiteAlpha.100',
  pt: 5,
}

export default function AddUser({universityList , courses , professors}:{
  universityList:any , courses:any , professors:any
}) {
  const [previewPic, setPreview] = useState<any>(null)
  const [pic, setPic] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const [courseName, setCourseName] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [courseMode, setCourseMode] = useState<"full" | "partial" | "connectonly" | ''>("")

  const [mainProfessor, setMainProfessor] = useState("")
  const [coProfessor, setCoProfessor] = useState("")

  const [mainUniversity, setMainUniversity] = useState("")
  const [secondaryUniversity, setSecondaryUniversity] = useState("")
  const [mainCountry, setMainCountry] = useState("")
  const [secondaryCountry, setSecondaryCountry] = useState("")
  const [mainState, setMainState] = useState("")
  const [secondaryState, setSecondaryState] = useState("")

  const refphoto = useRef<HTMLInputElement>(null)

  const professorItems = useMemo(
    () => (Array.isArray(professors) ? professors.filter((p: any) => p?.label && p?.value) : []),
    [professors]
  )

  const toggleDay = (day: string) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    )
  }

  function handlePic(pic: any) {
    if (!pic?.name) {
      toaster.create({ title: "No picture uploaded", duration: 5000, type: "error" })
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => { setPreview(e.target?.result || null) }
    reader.readAsDataURL(pic)
    setPic(pic)
    toaster.create({ title: "Picture uploaded", duration: 5000, type: "success" })
  }

  const isConnectOnly = courseMode === 'connectonly'
  const isSameCountry = !isConnectOnly && !!mainCountry && !!secondaryCountry && mainCountry.trim().toLowerCase() === secondaryCountry.trim().toLowerCase()

  async function submit() {
    setLoading(true)

    if (!courseName || !startDate || !endDate || !startTime || !endTime || selectedDays.length === 0 || !courseMode || !mainProfessor || !mainUniversity) {
      setLoading(false)
      toaster.create({ title: "Missing required course fields", duration: 5000, type: "error" })
      return
    }

    // check university
    if(mainUniversity === secondaryUniversity){
      toaster.create({ title: "Full or partial shared courses must be between two different universities", duration: 5000, type: "error" })
      setLoading(false)
      return
    }

    // Single uploaded image is reused as both the user's profile photo and the course photo
    let photoUrl: string | null = null
    if (pic?.name) {
      photoUrl = (await store({ image: pic, name: pic.name, type: pic.type })) || null
      if (!photoUrl) {
        setLoading(false)
        toaster.create({ title: "Image upload failed", duration: 5000, type: "error" })
        return
      }
    }

    const professorIds = [
      mainProfessor,
      ...(courseMode === 'partial' && coProfessor ? [coProfessor] : [])
    ].filter(Boolean)

    const courseCreated = await addCourse(
      courseName,
      courseMode,
      professorIds,
      photoUrl || '',
      startDate,
      endDate,
      mainUniversity,
      secondaryUniversity,
      isConnectOnly ,
      selectedDays,
      `${startTime}-${endTime}`
    )

    setLoading(false)
    if (courseCreated) {
      toaster.create({ title: "Course created", duration: 5000, type: "success" })
    } else {
      toaster.create({ title: "Course creation failed", duration: 5000, type: "error" })
    }
  }

  return (
    <VStack gap={6} width="100%" maxWidth="800px" margin="0 auto" padding={6} background={'#1d1d1d'} borderRadius={0}>
      {/* Banner Upload */}
      <VStack position={'relative'} background={'#262626'} border={'1.5px solid'} borderColor={'whiteAlpha.100'} width={'100%'} height={200} borderRadius={'14px'} overflow="hidden">
        {previewPic && (
          <Image alt='image' src={previewPic} fill style={{ width: "100%", height: '100%', objectFit: 'cover' }} />
        )}
        <Button
          right={5}
          bottom={5}
          position={'absolute'}
          borderRadius={50}
          size={'2xs'}
          background={'green.300'}
          color={'#1d1d1d'}
          _hover={{ background: 'green.200' }}
          onClick={() => { refphoto.current?.click() }}
        >
          <Icons.Image />
        </Button>
        <Input ref={refphoto} onChange={(e: any) => { handlePic(e.target.files[0]) }} display={'none'} type="file" accept="image/*" />
      </VStack>

      <VStack padding={2} width="100%" gap={5} align="stretch">

        {/* Course Duration & Schedule Section */}
        <Box {...sectionProps}>
          <Heading fontSize={16} fontWeight={600} color={'white'} mb={4}>Course Schedule & Timings</Heading>

          <Box mb={4}>
            <Heading {...fieldLabelProps}>Title</Heading>
            <Input {...inputProps} placeholder="Course name" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
          </Box>

          <SimpleGrid columns={{ base: 2, md: 4 }} gap={3} mb={5}>
            <Box>
              <Heading {...fieldLabelProps}>Start</Heading>
              <Input {...inputProps} px={2} type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} css={{ colorScheme: 'dark' }} />
            </Box>
            <Box>
              <Heading {...fieldLabelProps}>End</Heading>
              <Input {...inputProps} px={2} type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} css={{ colorScheme: 'dark' }} />
            </Box>
            <Box>
              <Heading {...fieldLabelProps}>From</Heading>
              <Input {...inputProps} px={2} type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} css={{ colorScheme: 'dark' }} />
            </Box>
            <Box>
              <Heading {...fieldLabelProps}>To</Heading>
              <Input {...inputProps} px={2} type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} css={{ colorScheme: 'dark' }} />
            </Box>
          </SimpleGrid>

          {/* Days of Week Selector */}
          <Box mb={4}>
            <Heading {...fieldLabelProps}>Days</Heading>
            <HStack gap={2} flexWrap="wrap">
              {DAYS_OF_WEEK.map((day) => {
                const isSelected = selectedDays.includes(day)
                return (
                  <Button
                    key={day}
                    size="sm"
                    borderRadius={'8px'}
                    border={'1.5px solid'}
                    borderColor={isSelected ? 'green.300' : 'whiteAlpha.100'}
                    background={isSelected ? 'green.300' : '#262626'}
                    color={isSelected ? '#1d1d1d' : 'gray.400'}
                    fontWeight={600}
                    _hover={{ borderColor: 'green.300', background: isSelected ? 'green.200' : '#2b2b2b' }}
                    onClick={() => toggleDay(day)}
                  >
                    {day}
                  </Button>
                )
              })}
            </HStack>
          </Box>
        </Box>

        {/* Course Sharing Mode & Professors */}
        <Box {...sectionProps}>
          <Heading fontSize={16} fontWeight={600} color={'white'} mb={4}>Course Sharing & Faculty</Heading>

          <Box mb={4}>
            <CustomSelect
              onchange={(val: any) => setCourseMode(val[0])}
              items={[
                { label: "Full Shared Course (1 Lead Professor)", value: "full" },
                { label: "Partial Shared Course (Main + Co-Professor)", value: "partial" },
                { label: "Connect only", value: "connectonly" }
              ]}
              title='Course Sharing Mode'
              placeholder='Select Full or Partial Sharing'
            />
          </Box>

          <SimpleGrid columns={{ base: 1, md: courseMode === 'partial' ? 2 : 1 }} gap={4}>
            <Box>
              <CustomSelect
                onchange={(val: any) => setMainProfessor(val[0])}
                items={professorItems}
                title={courseMode === 'partial' ? 'Main Leading Professor' : 'Lead Professor'}
                placeholder='Select professor'
              />
              {professorItems.length == 0 &&
              <Box  zIndex={1000} right={5} bottom={5} position={'fixed'} bg={'red'} fontSize={14} color={'white'} borderRadius={10} padding={4}>please add a professor</Box>
              }
            </Box>

            {courseMode === 'partial' && (
              <Box>
                <CustomSelect
                  onchange={(val: any) => setCoProfessor(val[0])}
                  items={professorItems.filter((p: any) => p.value !== mainProfessor)}
                  title='Secondary / Co-Professor'
                  placeholder='Select co-professor'
                />
              </Box>
            )}
          </SimpleGrid>
        </Box>

        {/* Universities & Location Information */}
        <Box {...sectionProps}>
          <Heading fontSize={16} fontWeight={600} color={'white'} mb={4}>
            {isConnectOnly ? 'University' : 'Partner Universities & Locations'}
          </Heading>

          <SimpleGrid columns={{ base: 1, md: isConnectOnly ? 1 : 2 }} gap={4} mb={4}>
            <Box>
              <CustomSelect
                onchange={(val: any) => setMainUniversity(val[0])}
                items={universityList}
                title='Main University'
                placeholder='Select main uni'
              />
            </Box>
            <Box alignSelf={'end'}>
              <Input {...inputProps} placeholder="Country" value={mainCountry} onChange={(e) => setMainCountry(e.target.value)} />
            </Box>

            {courseMode != 'connectonly' && (
              <>
                <Box>
                  <CustomSelect
                    onchange={(val: any) => setSecondaryUniversity(val[0])}
                    items={universityList}
                    title='Secondary University'
                    placeholder='Select secondary uni'
                  />
                </Box>
                <Box alignSelf={'end'}>
                  <Input {...inputProps} placeholder="Country" value={secondaryCountry} onChange={(e) => setSecondaryCountry(e.target.value)} />
                </Box>
              </>
            )}
          </SimpleGrid>

          {!isConnectOnly && isSameCountry && (
            <Box background={'#262626'} border={'1.5px solid'} borderColor={'green.300'} p={4} borderRadius={'10px'} mb={4}>
              <Text fontSize="xs" color="gray.400" mb={3}>
                Both universities are located in <Text as="span" color={'green.300'} fontWeight={600}>{mainCountry}</Text>. Please specify their respective state or county:
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                <Box>
                  <Input {...inputProps} bg={'#1d1d1d'} placeholder="Main state / county" value={mainState} onChange={(e) => setMainState(e.target.value)} />
                </Box>
                <Box>
                  <Input {...inputProps} bg={'#1d1d1d'} placeholder="Secondary state / county" value={secondaryState} onChange={(e) => setSecondaryState(e.target.value)} />
                </Box>
              </SimpleGrid>
            </Box>
          )}
        </Box>

        {/* Action Button */}
        <Button
          width={'100%'}
          minH={'46px'}
          background={'green.300'}
          color={'#1d1d1d'}
          fontWeight={700}
          borderRadius={'10px'}
          loading={loading}
          onClick={submit}
          mt={2}
          _hover={{ background: 'green.200' }}
        >
          Submit Course & User Profile
        </Button>
      </VStack>

      <Toaster />
    </VStack>
  )
}