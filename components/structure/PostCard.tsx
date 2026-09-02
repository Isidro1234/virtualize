import React, { useEffect } from 'react'
import {VStack , HStack , Box, Heading, Avatar, Text , Button, Input} from "@chakra-ui/react"
import {Icons} from "../../utils/exportIcons"
import { getComment, getUserAvatarByUid } from '../../app/actions/auth'
import Image from 'next/image'
import { CustomCarousel } from './CarousellCustom'
import CustomComent from './CustomComent'
import AvatarByUid from './AvatarByUid'
import LikeButton from './LikeButton'
import CommentsList from './CommentList'
import CommentsSection from './CommentList'

export default async function PostCard({media, likes , commentnumber, user_id , text, id}:{
  media:any , user_id:string , text:string , id:string , commentnumber:number, likes:number
}){
    const userAvatar = await getUserAvatarByUid(user_id)
    const {comments, nextCursor, hasMore} = await getComment(id)
    return(
        <VStack gap={5} minWidth={700} width={'100%'} borderRadius={20} background={'#17191a'} borderWidth={0} padding={0} alignItems={'flex-start'}>
        
                        <HStack alignItems={'center'} width={'100%'} padding={8} paddingBottom={0}>
                          <Avatar.Root >
                            <Avatar.Fallback name={userAvatar?.name}/>
                            {userAvatar?.image &&
                            <Avatar.Image src={userAvatar.image}/>
                            }
                          </Avatar.Root>
                          <Box flex={1}>
                            <Heading fontSize={14} color={'white'}>{userAvatar?.name}</Heading>
                            <Text marginTop={-1} color={'gray'} fontSize={10}>{userAvatar?.role}</Text>
                          </Box>
                          <Button borderRadius={50} background={"transparent"}>
                            <Icons.Reply color="white"/>
                          </Button>
                        </HStack>
                        <Box padding={8} paddingTop={0} paddingBottom={0}>
                          <Text maxWidth={'100%'} color={'#f6f6f6'} fontSize={18} marginTop={2}>{text}</Text>
                        
                        </Box>
                        <CustomCarousel items={media?.length ? media : [media]}/>
                        <HStack marginTop={-2} padding={5} paddingTop={0} paddingBottom={0}>
                          <LikeButton likes={likes} uid={id}/>
                          <Button borderRadius={50} background={"transparent"} >
                            <Icons.MessageSquare color="gray"/>
                            <Text color={'gray'}>{commentnumber || ''}</Text>
                          </Button>
                          <Button borderRadius={50} background={"transparent"}>
                            <Icons.Vote color="gray"/>
                            <Text color={'gray'}></Text>
                          </Button>
                          <Button borderRadius={50} background={"transparent"} >
                            <Icons.Share color="gray"/>
                            <Text color={'gray'}></Text>
                          </Button>
                          
                        </HStack>

                        <VStack width={'100%'} alignItems={'flex-start'} borderColor={'#1d1d1d'} borderTopWidth={1} marginTop={2}  paddingTop={4}>
                          <CommentsSection useravatar={userAvatar} postId={id} initialComments={comments} initialCursor={nextCursor} initialHasMore={hasMore}/>
                        </VStack>
                        
                        </VStack>
    )
}