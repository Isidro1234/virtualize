"use server"
import { cookies } from "next/headers";
import { adminAuth, admindb } from "../../config/admin-firestore";
import {StreamClient} from "@stream-io/node-sdk"



const stream = new StreamClient(`${process.env.STREAM_API_KEY}` , `${process.env.STREAM_SECRET}`)
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

export async function creatAuthAccount(username:string , email:string, password:string, 
    photo:string | null , role:string | null){
    try {
        const photourl = photo || ''
        const user = await adminAuth.createUser({email, password, photoURL:photourl })
        await adminAuth.updateUser(user.uid , {displayName:username})
        const uid = user.uid
         await admindb.collection('users').doc(uid).create({
        name:username,
        email:email,
        createdAt:new Date(),
        photo:photourl,
        role:role
     })
     await stream.upsertUsers([{
        id:uid,
        image:photourl,
        name:username,
     }])
     return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export async function createUserAccount(username:string, email:string , uid:string){
    try {
        await admindb.collection('users').doc(uid).create({
        name:username,
        email:email,
        createdAt:new Date(),
        role:"individual"
     })
     await stream.upsertUsers([{
        id:uid,
        image:"",
        name:username,
     }])
     return true
    } catch (error) {
        console.log(error)
        return false
    }
     
}

export async function getStreamToken(uid:string){
    try {
      if(!uid) return;
    const token = stream.generateUserToken({user_id:uid, validity_in_seconds:60*60*24})
    return token  
    } catch (error) {
        return null
    }
    
}