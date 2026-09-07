// app/dashboard/loading.tsx
import { Box, HStack, Skeleton, SkeletonText, VStack } from '@chakra-ui/react'

export default function Loading() {
  return (
    <VStack p={4} width="100%" alignItems="flex-start" gap={6}>
      {/* Top circles skeleton */}
      <HStack gap={3}>
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} />
        ))}
      </HStack>

      {/* Main feed post skeleton */}
      <VStack width="100%" maxWidth={700} gap={4}>
        <Skeleton height="200px" width="100%" borderRadius="lg" />
        <SkeletonText width="100%" noOfLines={4} />
      </VStack>
    </VStack>
  )
}