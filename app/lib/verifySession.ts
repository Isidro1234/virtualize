"use server"
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { decrypting, deleteSession } from './sessions';




export async function VerifySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) {
    return null
  }
  try {
    const verifiedUser = await decrypting(token);
    return { isAuth: true, role: verifiedUser?.role, userId: verifiedUser?.userid  };
  } catch (error: any) {
    return redirect('/login')
  }
}

