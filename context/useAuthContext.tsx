"use client"
import { onIdTokenChanged } from 'firebase/auth'
import React, { createContext, useEffect, useRef } from 'react'
import { createSession, deleteSession } from '../app/actions/auth'
import { auth } from '../config/firestore'

// Firebase's client SDK auto-refreshes the ID token roughly every hour,
// which is what makes onIdTokenChanged fire repeatedly on its own — that's
// exactly what we want for silent session renewal. But we don't need to
// re-issue the server session cookie on every single one of those firings;
// throttling avoids redundant createSession calls (each of which triggers
// a full page/layout re-render, since it's a Server Action that touches
// cookies() — see https://nextjs.org/docs/app/getting-started/mutating-data).
const MIN_REFRESH_INTERVAL_MS = 30 * 60 * 1000 // 30 minutes

const AuthContext = createContext({})
export default function AuthContextProvider({children}:{children:React.ReactNode}) {
  const lastSyncedUidRef = useRef<string | null>(null)
  const lastSyncedAtRef = useRef<number>(0)
  const loggedOutRef = useRef(false)

  useEffect(()=>{
        // onIdTokenChanged fires on sign-in, sign-out, AND on every silent
        // token refresh — onAuthStateChanged only covers sign-in/sign-out,
        // which is why the 5-day session cookie was never being renewed.
        const subscribe = onIdTokenChanged(auth , async(user)=>{
            if(user){
                const now = Date.now()
                const sameUser = lastSyncedUidRef.current === user.uid
                const recentlySynced = now - lastSyncedAtRef.current < MIN_REFRESH_INTERVAL_MS
                if(sameUser && recentlySynced) return // avoid duplicate createSession -> duplicate reload

                const token = await user.getIdToken()
                await createSession(token)
                lastSyncedUidRef.current = user.uid
                lastSyncedAtRef.current = now
                loggedOutRef.current = false
            }else{
                if(loggedOutRef.current) return // avoid duplicate deleteSession calls too
                loggedOutRef.current = true
                lastSyncedUidRef.current = null
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