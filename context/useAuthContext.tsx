"use client"
import { onAuthStateChanged } from 'firebase/auth'
import React, { createContext, useEffect } from 'react'
import { createSession, deleteSession } from '../app/actions/auth'
import { auth } from '../config/firestore'



 
const AuthContext = createContext({})
export default function AuthContextProvider({children}:{children:React.ReactNode}) {
  useEffect(()=>{
        const subscribe = onAuthStateChanged(auth , async(user)=>{
            if(user){
                const token = await user.getIdToken()
                await createSession(token)
            }else{
                await deleteSession()
            }
        })

        return () => subscribe()
  }, [])
  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  )
}
