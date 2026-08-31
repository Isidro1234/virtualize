"use server"
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { adminAuth } from '../../config/admin-firestore';
import { deleteSession } from '../actions/auth';

export async function VerifySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session_virtualise')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    const verifiedUser = await adminAuth.verifySessionCookie(token, true);
    return { isAuth: true, userId: verifiedUser.uid };
  } catch (error: any) {
    redirect('/login');
  }
}