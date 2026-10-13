import React from 'react'
import { getUserById } from '../../app/lib/dal'
import { VerifySession } from '../../app/lib/verifySession'
import AuthContextProvider from '../../context/useAuthContext'

export default async function MainLayout({children}:{children:React.ReactNode}) {
     const id = (await VerifySession())?.userId
      const user = id ? await getUserById(id) : null
  return (
    <AuthContextProvider user={{username:user?.username , id:id, role:user?.role , photo:user?.photo}}>
            {children}
    </AuthContextProvider>

  )
}
