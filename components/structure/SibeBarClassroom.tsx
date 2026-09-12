import { Button, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Icons } from '../../utils/exportIcons'

export default function SibeBarClassroom() {
  return (
    <VStack justifyContent={'flex-start'} paddingTop={10} gap={10} alignItems={'center'} borderRadius={20} height={'100%'} width={100} background={'#181a1c'}>
        <Button className='button-style'>
            <Icons.SchoolIcon/>
        </Button>
        <Button className='button-style'>
            <Icons.Server/>
        </Button>
        <Button className='button-style'>
            <Icons.ContactIcon/>
        </Button>
        <Button className='button-style'>
            <Icons.Settings/>
        </Button>
    </VStack>
  )
}
