"use server"
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

interface CustomSessionPayload extends JWTPayload {
  user_id: string;
  role: string;
}
const jwt_secret= new TextEncoder().encode(process.env.JWT_SECRET) 

export async function encrypting({role , user_id }:{role:string[], user_id:string | null }){
  if(!user_id || role.length <= 0)  return null;
  const jwt_session = await new SignJWT({role , user_id }).setProtectedHeader({alg:'HS256'})
    .setExpirationTime('5d').
    sign(jwt_secret)
    return jwt_session
}
export async function decrypting(tokens:string){
    "use cache"
    try {
        const {payload} = await jwtVerify( tokens , jwt_secret)
        const {user_id,  role}  = payload as CustomSessionPayload
        return {userid:user_id, role}
    } catch (error) {
        return null
    }
   
}
export async function createSession(sessions:string){
     const cookie = await cookies()
        const expirationDate = 24 * 60 * 60 * 1000 * 5;
        cookie.set('session', sessions , {
                httpOnly:true,
                sameSite:'lax',
                maxAge:expirationDate,
                path:'/',
                secure:true
        })
}

export async function updateSession(){
    const cookie = await cookies()
    const session = cookie.get('session')?.value;
    if(!session) return null;
    const payload = await decrypting(session)
    if(!session || !payload){
        return null
    }
    const expires = 5 * 24 * 60 * 60 * 1000
 
  const cookieStore = await cookies()
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession(){
    const cookie = await cookies()
    cookie.delete('session')
}