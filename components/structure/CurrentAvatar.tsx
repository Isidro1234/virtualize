import React from 'react'
import { admindb } from '../../config/admin-firestore'
import { VerifySession } from '../../app/lib/verifySession'
import { Avatar, Skeleton } from '@chakra-ui/react';

export default async function CurrentAvatar({id}:{id:string}) {

    const user = (await admindb.collection('users').doc(id).get()).data()
  return (
    <Skeleton loading={!user}>
        <Avatar.Root boxSize={'40px'}>
                      <Avatar.Fallback name={user?.username}/>
                      {user?.photo &&
                      <Avatar.Image src={user?.photo}/>
                      }
      </Avatar.Root>
    </Skeleton>
    
  )
}
