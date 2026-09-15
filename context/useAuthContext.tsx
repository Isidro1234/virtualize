"use client"
import { onAuthStateChanged, onIdTokenChanged } from 'firebase/auth'
import React, { createContext, useEffect, useRef } from 'react'
import { createSession, deleteSession } from '../app/actions/auth'
import { auth } from '../config/firestore'



const AuthContext = createContext({})
export default function AuthContextProvider({children}:{children:React.ReactNode}) {
  const lastSyncedUidRef = useRef<string | null>(null)
  const lastSyncedAtRef = useRef<number>(0)
  const loggedOutRef = useRef(false)

  useEffect(() => {
  let active = true

  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const token = await user.getIdToken()
      if (!active) return // this subscription was cleaned up while we awaited — do nothing
      await createSession(token)
    } else {
      if (!active) return
      await deleteSession()
    }
  })

  return () => {
    active = false
    unsubscribe()
  }
}, [])
  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  )
}