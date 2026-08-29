import { Box, Heading, HStack, Input, VStack, Button, Text } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { CustomSelect } from '../../components/structure/CustomSelect'
import { store } from '../../utils/storemedia'
import { creatAuthAccount } from '../actions/auth'
import { toaster, Toaster } from '../../components/ui/toaster'
import AddUSer from '../../components/structure/AddUsers'

export default async function Admin() {
  
  return (
    <VStack>
        <AddUSer/>
    </VStack>
  )
 
}
