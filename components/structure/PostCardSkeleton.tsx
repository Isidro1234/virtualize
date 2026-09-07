import React from 'react'
import { VStack, HStack, Box, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

export default function PostCardSkeleton() {
  return (
    <VStack gap={5} minWidth={700} width={'100%'} borderRadius={20} background={'#17191a'} borderWidth={0} padding={0} alignItems={'flex-start'}>
      <HStack alignItems={'center'} width={'100%'} padding={8} paddingBottom={0}>
        <SkeletonCircle size={'10'} />
        <Box flex={1}>
          <Skeleton height={'14px'} width={'120px'} mb={2} />
          <Skeleton height={'10px'} width={'70px'} />
        </Box>
        <SkeletonCircle size={'8'} />
      </HStack>

      <Box padding={8} paddingTop={0} paddingBottom={0} width={'100%'}>
        <SkeletonText noOfLines={2} gap={2} width={'80%'} marginTop={2} />
      </Box>

      <Skeleton height={'350px'} width={'100%'} />

      <HStack marginTop={-2} padding={5} paddingTop={0} paddingBottom={0} gap={4}>
        <Skeleton height={'32px'} width={'60px'} borderRadius={50} />
        <Skeleton height={'32px'} width={'60px'} borderRadius={50} />
        <Skeleton height={'32px'} width={'40px'} borderRadius={50} />
        <Skeleton height={'32px'} width={'40px'} borderRadius={50} />
      </HStack>

      <VStack width={'100%'} alignItems={'flex-start'} borderColor={'#1d1d1d'} borderTopWidth={1} marginTop={2} paddingTop={4}>
        <HStack width={'100%'} padding={8} paddingTop={0} gap={3}>
          <SkeletonCircle size={'12'} />
          <Skeleton height={'40px'} flex={1} borderRadius={50} />
        </HStack>
      </VStack>
    </VStack>
  )
}