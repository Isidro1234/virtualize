"use server"
import { cookies } from "next/headers";
import { adminAuth, admindb } from "../../config/admin-firestore";
import {StreamClient} from "@stream-io/node-sdk"
import { cacheTag, revalidateTag } from "next/cache";
import { VerifySession } from "../lib/verifySession";
import { redirect } from "next/navigation";



const stream = new StreamClient(`${process.env.STREAM_API_KEY}` , `${process.env.STREAM_SECRET}`)

export async function createSession(idToken:string){
    const expiresin = 60 * 60 * 24 * 5;
    const sessionCookies = await adminAuth.createSessionCookie(idToken , {expiresIn:expiresin})
    const cookie = await cookies()
    cookie.set('session_virtualise', sessionCookies , {
      httpOnly:true,
      secure:true,
      sameSite:'lax',
      path:'/' ,
      maxAge: expiresin 
    })

}

export async function deleteSession(){
    const cookie = await cookies()
    cookie.delete('session_virtualise')
}

export async function getSession(){
    const cookie  = await cookies();
    const token = cookie.get('session_virtualise')?.value
    if(!token)return null;
    try {
        const decode = await adminAuth.verifySessionCookie(token);
        return await cacheData(decode.uid)
    } catch (error) {
        return null
    }
}
export async function creatAuthAccount(username:string , email:string, password:string, 
    photo:string | null , role:string | null){
    try {
        const photourl = photo || ''
        const user = await adminAuth.createUser({email, password, photoURL:photourl })
        await adminAuth.updateUser(user.uid , {displayName:username})
        const uid = user.uid
         await admindb.collection('users').doc(uid).create({
            id:uid,
        name:username,
        email:email,
        createdAt:new Date(),
        photo:photourl,
        role:[role]
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
        id:uid,
        name:username,
        email:email,
        createdAt:new Date(),
        role:["individual"]
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

export async function creatAuthAccountProfessor(username:string , uniname:string | null, 
    emails:string | null , photo:string | null ){
    try {
        const cookie = await cookies()
    const token = cookie.get('session_virtualise')?.value;
    if(!token) return false;
    const verify = await adminAuth.verifyIdToken(token)
    const uid2 = verify.uid;
    if(!uid2) return false;
    const useref = admindb.collection('users').doc(uid2)
        const photourl = photo || ''
        const email = emails || username + "@" + uniname + '.edu'
        const password = 'test1234'
        const user = await adminAuth.createUser({email, password, photoURL:photourl })
        await adminAuth.updateUser(user.uid , {displayName:username})
        const uid = user.uid
        const check = await useref.get();
        const uninames = check.exists ? check.data()?.name : null;
        const finaluniname = uniname || uninames
         await admindb.collection('users').doc(uid).create({
        id:uid,
        name:username,
        email:email,
        createdAt:new Date(),
        photo:photourl,
        university:finaluniname,
        role:['uni-professor']
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

export async function cacheData(user_id: string) {
  "use cache"; // Enables Next.js App Router caching for this scope
  cacheTag(`user-${user_id}`); // Assigns a specific tag for target invalidation
  
  try {
    const docref = await admindb.collection('users').doc(user_id).get();
    if (!docref.exists) {
      return null;
    }
    // Convert Firestore dates/timestamps to plain objects before returning
    const data = docref.data();
    return JSON.parse(JSON.stringify(data)); 
  } catch (error) {
    console.error("Error fetching cached user:", error);
    return null;
  }
}

export async function updateUserPhoto({photo , password , name}:{photo:string | null, password:string | null , name:string | null}){
    const cookie = await cookies()
    const token = cookie.get('session_virtualise')?.value;
    if(!token) return false;
    const verify = await adminAuth.verifyIdToken(token)
    const uid = verify.uid;
    if(!uid) return false;
    const useref = admindb.collection('users').doc(uid)
    if(!name && !photo && !password) return false
    if(name){
        await useref.update({
        name: name,
        updatedAt: new Date()
    })
    return uid
    } 
    if(photo){
        await useref.update({
        photo:photo,
        updatedAt: new Date()
    })
    return uid
    }
    if(password){
        await adminAuth.updateUser(uid, {
            password:password
        })
    return uid
    }
}

export async function updatCache(uid:string){
    revalidateTag(`user-${uid}`, 'max')
}


export async function uploadDocSeries(url:string , title:string , author:string , durantion:string | null ,

){
    const cookie = await cookies()
    const token = cookie.get('session_virtualise')?.value;
    if(!token) return false;
    const verify = await adminAuth.verifyIdToken(token)
    const uid = verify.uid;
    if(!uid) return false;
    const docref = await admindb.collection('users').doc(uid).get()
    if(!docref.exists) return
    const name =  docref.data()?.name || ""
    await admindb.collection('DocSeries').add({
        id: uid,
        video:url,
        title:title,
        author:author,
        durantion:durantion,
        university:name,
        createdAt:new Date()
    })
    return 
}

export async function userdata(){
    try {
        const token = await VerifySession();
        if(!token) return null
        const docref = await cacheData(token.userId)
        if(!docref.exists) return null
        const user = docref.data()
        return user  
    } catch (error) {
        return null
    }
    
}
export async function redirectRoute(){
    try {
       const token = await VerifySession();
    if (!token) return "/login";

    const docref = await cacheData(token.userId);
    if (!docref.exists) return "/login";

    const user = docref.data();
    const primaryRole = user?.role?.[0];

    // Map your user categories to matching layout paths cleanly
    switch (primaryRole) {
      case "individual":
        return "/user";
      case "uni-professor":
      case "university":
        return "/university";
      case "professor":
        return "/professor";
      case "student":
        return "/student";
      case "admin":
        return "/admin";
      default:
        return "/login";
    }
    } catch (error) {
        return "/login"
    }
    
}





