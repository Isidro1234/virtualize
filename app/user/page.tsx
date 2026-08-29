import { Avatar, Heading, HStack, VStack, Box, Text, Input, Button } from '@chakra-ui/react'
import React, { Suspense } from 'react'
import PostCard from "../../components/structure/PostCard"
import LiveCard from '../../components/structure/LiveCard'
import SideRight from '../../components/structure/SideRight'
import DocCard from "../../components/structure/DocCard"
import AvatarLiveCircle from '../../components/structure/AvartarLiveCircle'
import UserVisitantCookies from '../../components/structure/UserVisitantCookies'
export default function UserVisitant() {
 return(
  <Suspense fallback={<VStack><Text>loading...</Text></VStack>}>
    <UserVisitantCookies/>
  </Suspense>
 )
}
