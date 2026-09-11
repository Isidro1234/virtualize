import { Button, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Icons } from '../../utils/exportIcons'

export default function SibeBarClassroom() {
  return (
    <VStack justifyContent={'flex-start'} paddingTop={10} alignItems={'center'} borderRadius={20} height={'100%'} width={100} background={'#181a1c'}>
        <Button>
            <Text>Classes</Text>
        </Button>
        <Button>
            <Text>Sessions</Text>
        </Button>
        <Button>
            <Text>Connections</Text>
        </Button>
        <Button>
            <Text>Settings</Text>
        </Button>
    </VStack>
  )
}
