import React from 'react'

import {Box, Avatar , Text} from '@chakra-ui/react'
import { admindb } from '../../config/admin-firestore'


export default async function AvatarWithId({id}:{id:string}){
    const docref = await admindb.collection('users').doc(id).get()
    if(!docref.exists) return;
    const user = docref.data()
    return(
        <Box>
            <Avatar.Root>
                <Avatar.Fallback name={user?.name}/>
                <Avatar.Image src={user?.photo}/>
            </Avatar.Root>
        </Box>
    )
}