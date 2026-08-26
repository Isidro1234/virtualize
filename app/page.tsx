import React from 'react'
import HomeCustom from '../components/structure/HomeCustom'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { deleteSession } from './actions/auth'
import { adminAuth } from '../config/admin-firestore'

export default async function Home() {
  const cookie = await cookies()
  const token = cookie.get('session_virtualise')?.value;
  
  let shouldRedirect = false;

  if (token) {
    try {
      const decode = await adminAuth.verifyIdToken(token)
      if (decode?.uid) {
        shouldRedirect = true;
      }
    } catch (error) {
      // Firebase token verification failed (expired or invalid token)
      console.error("Token verification failed:", error);
      // Optional: Clear the invalid session cookie here if needed
    }
  }

  // Execute redirect completely outside of the try-catch block
  if (shouldRedirect) {
    redirect('/user')
  }

  return <HomeCustom />
}
