"use client"
import { useState, useTransition } from 'react'
import { VStack, HStack, Box, Text, Button, Input, Avatar } from '@chakra-ui/react'
import AvatarDisplay from './AvatarDisplay'
import { addComment, getComment } from '../../app/actions/auth'
import { Icons } from '../../utils/exportIcons'
import { CommentItem } from '../../utils/type'

export default function CommentsSection({
    postId,
    initialComments,
    initialCursor,
    initialHasMore,
    useravatar,
}: {
    postId: string
    initialComments: CommentItem[]
    initialCursor: string | null
    initialHasMore: boolean,
    useravatar:{name:any , image:any , role:any} | undefined
}) {
    const [comments, setComments] = useState<CommentItem[]>(initialComments)
    const [cursor, setCursor] = useState<string | null>(initialCursor)
    const [hasMore, setHasMore] = useState(initialHasMore)
    const [isPending, startTransition] = useTransition()
    const [comment, setComment] = useState('')
    const [isPosting, setIsPosting] = useState(false)

    function loadMore() {
        startTransition(async () => {
            const result = await getComment(postId, cursor)
            setComments((prev) => [...prev, ...result.comments])
            setCursor(result.nextCursor)
            setHasMore(result.hasMore)
        })
    }

    async function commenting() {
        if (!postId || !comment.trim() || isPosting) return
        setIsPosting(true)
        try {
            const newComment = await addComment(postId, comment.trim())
            if (newComment) {
                setComments((prev) => [newComment as CommentItem, ...prev])
            }
            setComment('')
        } finally {
            setIsPosting(false)
        }
    }

    return (
        <VStack alignItems={'flex-start'} width={'100%'}>
            <HStack width={'100%'} alignItems={'center'} padding={8} paddingTop={0}>
                <Avatar.Root size={"lg"}>
                                            <Avatar.Fallback name={useravatar?.name}/>
                                            {useravatar?.image &&
                                            <Avatar.Image src={useravatar?.image}/>
                                            }
                                          </Avatar.Root>
                <Box background={"#f6f6f6"} borderRadius={50} flex={1}>
                    <Input
                        value={comment}
                        onChange={(e) => { setComment(e.target.value) }}
                        onKeyDown={(e) => e.key === 'Enter' && commenting()}
                        border={'none'} outline={"none"} placeholder="digit your comment"
                    />
                </Box>
                <Button borderRadius={50} onClick={commenting} disabled={!comment.trim() || isPosting}>
                    <Icons.Send/>
                </Button>
            </HStack>

            <VStack alignItems={'flex-start'} borderColor={'#1d1d1d'} borderTopWidth={1} marginTop={2} paddingTop={4} width={'100%'}>
                {comments.map((item) => (
                    <VStack borderColor={'#1d1d1d'} borderTop={1} padding={8} paddingTop={0} paddingBottom={5} key={item.id} alignItems={'flex-start'}>
                        <AvatarDisplay name={item.sender_name} image={item.sender_image} role={item.sender_role} withdetails={true} />
                        <Box marginLeft={"48px"} marginTop={-2}>
                            <Text fontSize={14} color={'white'}> {item.comment} </Text>
                        </Box>
                    </VStack>
                ))}
                {hasMore && (
                    <Button alignSelf={'center'} onClick={loadMore} disabled={isPending} background={'transparent'} color={'gray'}>
                        {isPending ? 'Loading...' : 'Load more comments'}
                    </Button>
                )}
            </VStack>
        </VStack>
    )
}