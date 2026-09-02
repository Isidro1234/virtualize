import { Avatar, HStack, Text, VStack } from '@chakra-ui/react'

export default function AvatarDisplay({name, image, role, withdetails}:{
    name?: string | null, image?: string | null, role?: string | null, withdetails: boolean | null
}) {
  return (
    <HStack justifyContent={'flex-start'} alignItems={'center'}>
        <Avatar.Root>
            <Avatar.Fallback name={name || undefined}/>
            { image && <Avatar.Image src={image}/> }
        </Avatar.Root>
        <VStack display={withdetails ? 'flex' : 'none'} alignItems={'flex-start'} gap={0}>
            <Text color={'white'} fontSize={14} lineHeight={1}>{name}</Text>
            <Text color={'gray'} fontSize={10}>{role}</Text>
        </VStack>
    </HStack>
  )
}