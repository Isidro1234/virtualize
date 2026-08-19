import { Button, VStack , Box } from '@chakra-ui/react'
import React from 'react'
import Icons from "../../utils/exportIcons"



export default function SideBar(){
    
    return (
        <VStack  alignItems={'center'} padding={5} height={'100vh'} minWidth={90}  justifyContent={"flex-start"}>
            <Button background={"transparent"}><Icons.Menu color={'black'} height={24} width={24}/></Button>
            <VStack gap={10} marginTop={5}>
                <Box>
                    <Icons.Book  color={'black'} width={19} height={19}/>
                </Box>
                <Box>
                    <Icons.BookmarkPlus  color={'black'} width={19} height={19}/>
                </Box>
                 <Box>
                    <Icons.BookmarkPlus  color={'black'} width={19} height={19}/>
                </Box>
                 <Box>
                    <Icons.BookmarkPlus  color={'black'} width={19} height={19}/>
                </Box>
                 <Box>
                    <Icons.BookmarkPlus  color={'black'} width={19} height={19}/>
                </Box>
                 <Box>
                    <Icons.BookmarkPlus  color={'black'} width={19} height={19}/>
                </Box>
                 <Box>
                    <Icons.BookmarkPlus  color={'black'} width={19} height={19}/>
                </Box>
                <Box>
                    <Icons.BookmarkPlus  color={'black'} width={19} height={19}/>
                </Box>
                <Box>
                    <Icons.BookmarkPlus  color={'black'} width={19} height={19}/>
                </Box>
            </VStack>
        </VStack>
    )
}