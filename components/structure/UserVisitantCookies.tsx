import React, { Suspense } from 'react'
import DocCard from './DocCard'
import { Heading, HStack, VStack, Skeleton, SkeletonText, Stack, Box } from '@chakra-ui/react'
import { getSession, getPosts } from '../../app/actions/auth'
import LiveCircleOuter from './LiveCircleOuter'
import LiveCardOuter from './LiveCardOuter'
import PostCard from './PostCard'
import PostCardSkeleton from './PostCardSkeleton'

// Skeleton Fallback for Live Circles / Avatars
function LiveCircleSkeleton() {
  return (
    <HStack gap={3} overflowX="hidden" width="100%" py={2}>
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i}   />
      ))}
    </HStack>
  )
}

// Skeleton Fallback for Posts Stream


// Skeleton Fallback for Cards (Live Debates / Documentaries)
function CardListSkeleton() {
  return (
    <HStack gap={4} width="100%" overflowX="hidden">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} height="160px" width="220px" borderRadius="lg"  />
      ))}
    </HStack>
  )
}

// Async Wrapper Component for Posts Feed
async function PostsFeed() {
  const posts = await getPosts()

  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <VStack className="post-horizontal" justifyContent="flex-start" width="100%" maxWidth={700} alignItems="flex-start">
      {posts.map((item, index) => (
        <PostCard
          key={item?.id || index}
          likes={item?.likes || 0}
          commentnumber={item?.comment_number}
          id={item?.id}
          media={item?.media}
          text={item?.text}
          user_id={item?.user_id}
        />
      ))}
    </VStack>
  )
}

export default async function UserVisitantCookies() {
  const user = await getSession()
  if (!user) {
    return null
  }

  return (
    <HStack
      className="scroll-special"
      overflowX="hidden"
      padding={2}
      overflowY="auto"
      width="100%"
      position="relative"
      alignItems="flex-start"
      paddingBottom={10}
    >
      <VStack alignItems="flex-start" flex={1} padding={0} width="100%">
        {/* Live Stories / Circles Section */}
        <Suspense fallback={<LiveCircleSkeleton />}>
          <LiveCircleOuter />
        </Suspense>

        {/* Posts Stream Section */}
        <Suspense fallback={<PostCardSkeleton />}>
          <PostsFeed />
        </Suspense>

        {/* Live Debates Section */}
        <Heading color="#00bf63" marginTop={5} fontSize={18} width="100%">
          Live Debates
        </Heading>
        <HStack className="post-horizontal" overflowX="auto" maxWidth={770} justifyContent="flex-start" width="100%">
          <Suspense fallback={<CardListSkeleton />}>
            <LiveCardOuter />
          </Suspense>
        </HStack>

        {/* Documentaries & Science Series Section */}
        <Heading color="#00bf63" marginTop={5} fontSize={18} width="100%">
          Documentaries & Science Series
        </Heading>
        <Suspense fallback={<CardListSkeleton />}>
          <DocCard />
        </Suspense>
      </VStack>
    </HStack>
  )
}