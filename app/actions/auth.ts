"use server"
import { cookies } from "next/headers";



export async function createSession(idToken:string){
    const cookie = await cookies()
    cookie.set('session_virtualise', idToken , {
      httpOnly:true,
      secure:true,
      sameSite:'lax',
      path:'/' ,
      maxAge: 60 * 60 * 24 * 5
    })
    
}

export async function deleteSession(){
    const cookie = await cookies()
    cookie.delete('session_virtualise')
}