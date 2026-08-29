import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth } from "../../config/admin-firestore";



export async function VerifySession(){
    const cookie = await cookies()
    const token = cookie.get('session_virtualise')?.value;
    if(!token){
        return redirect('/login')
    }
    const user = await adminAuth.verifySessionCookie(token)
    if(!user) return;
    return {isAuth:true , userId:user.uid}
}