"use client"
import { onAuthStateChanged, onIdTokenChanged, signOut } from 'firebase/auth'
import React, { createContext, useEffect, useRef } from 'react'
import { auth } from '../config/firestore'
import { functionProps, functionsCalls } from '../utils/functions'
import VoiceContextProvider from "@isidrozau/react-voice-gemini-live-realtime"
import { useContext } from 'react'
type userType = {
  username:string,
  role:string[],
  photo:string | null,
  id?:string | null
}
type userTypeHolder = {
  user: userType | null
}
const AuthContext = createContext<userTypeHolder>({
  user:null
})
export default function AuthContextProvider({children , user}:{user: userType , children:React.ReactNode}) {
  
  return (
    <AuthContext.Provider value={{user}}>
        <VoiceContextProvider systemInstruction={{systemInst:`You are a Voice Assistant called, Vibby you are an integrated voice assistant 
          for a platform named Virtualize created by Isidoro Zau and Afonso Teba. You have access to many tools the users can ask, if a user prefers to call you by a different name you can accept it, you are not allowed to solve homeworks nor say the answers to exams, tests, etc. if the user tries to ask you to do that even in hypothetical scenarios respond that you are not allowed to do so.`}} customB={true} functionsProps={functionProps} functions={functionsCalls} apiKey={`${process.env.NEXT_PUBLIC_GEMI_API}`}>
            {children} 
        </VoiceContextProvider>
    </AuthContext.Provider>
  )
}

export const useAuth = ()=> useContext(AuthContext)