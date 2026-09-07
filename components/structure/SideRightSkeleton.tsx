import React from 'react'
import { VStack, Box, HStack, Skeleton } from '@chakra-ui/react'

export default function SideRightSkeleton() {
  return (
    <VStack minWidth={50} borderRadius={20} background={'#17191a'} maxWidth={340} width={'100%'} position={'relative'} padding={5} paddingTop={5} marginRight={2} marginTop={0} marginLeft={0}>
      <Skeleton borderRadius={15} height={250} width={'100%'} />

      <Box padding={5} background={'#f6f6f6'} borderRadius={15} height={220} width={'100%'}>
        <Skeleton height={'20px'} width={'60px'} mb={4} />
        <HStack gap={2} width={'100%'} overflow={'hidden'}>
          {[0, 1, 2].map((i) => (
            <HStack key={i} marginTop={4} minWidth={200}>
              <Skeleton borderRadius={10} height={100} width={100} />
              <VStack gap={2} alignItems={'flex-start'} flex={1}>
                <Skeleton height={'14px'} width={'80px'} />
                <Skeleton height={'10px'} width={'60px'} />
                <Skeleton height={'8px'} width={'70px'} />
                <Skeleton height={'24px'} width={'70px'} borderRadius={50} />
              </VStack>
            </HStack>
          ))}
        </HStack>
      </Box>
    </VStack>
  )
}