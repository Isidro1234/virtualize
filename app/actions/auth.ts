"use server"
import { cookies } from "next/headers";
import { adminAuth, admindb } from "../../config/admin-firestore";
import {StreamClient} from "@stream-io/node-sdk"
import { cacheTag, revalidateTag } from "next/cache";
import { VerifySession } from "../lib/verifySession";
import { redirect } from "next/navigation";
import {SignJWT} from 'jose'
import { FieldValue } from "firebase-admin/firestore";
import { CommentItem } from "../../utils/type";
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)


const stream = new StreamClient(`${process.env.STREAM_API_KEY}` , `${process.env.STREAM_SECRET}`)

// Recursively converts Firestore Timestamp instances (and Dates, for safety)
// into plain ISO strings so results are safe to pass from Server -> Client Components.
function serializeFirestore<T>(data: T): T {
    if (data === null || data === undefined) return data
    // Firestore Timestamp: has toDate() and both _seconds/_nanoseconds fields
    if (typeof (data as any)?.toDate === 'function' && '_seconds' in (data as any)) {
        return (data as any).toDate().toISOString() as unknown as T
    }
    if (data instanceof Date) {
        return data.toISOString() as unknown as T
    }
    if (Array.isArray(data)) {
        return data.map((item) => serializeFirestore(item)) as unknown as T
    }
    if (typeof data === 'object') {
        const out: Record<string, any> = {}
        for (const [key, value] of Object.entries(data as Record<string, any>)) {
            out[key] = serializeFirestore(value)
        }
        return out as T
    }
    return data
}

export async function createSession(idToken:string){
    const expiresin = 60 * 60 * 24 * 5;
    const decode = await adminAuth.verifyIdToken(idToken)
    const userdoc = await admindb.collection('users').doc(decode.uid).get()
    const userdata = userdoc.data()
    const primaryRole = userdata?.role[0] || 'individual';

    const sessionCookies = await adminAuth.createSessionCookie(idToken , {expiresIn:expiresin})
    
    const roleTaken =  await new SignJWT({uid:decode.uid , role:primaryRole})
    .setProtectedHeader({alg:'HS256'})
    .setIssuedAt()
    .setExpirationTime('5d')
    .sign(JWT_SECRET)

    const cookie = await cookies()
    cookie.set('session_virtualise', sessionCookies , {
      httpOnly:true,
      secure:true,
      sameSite:'lax',
      path:'/' ,
      maxAge: expiresin 
    })

    cookie.set('user_role', roleTaken , {
        httpOnly:true,
        secure:true,
        sameSite:'lax',
        path:'/',
        maxAge:expiresin
    })

}

export async function deleteSession(){
    const cookie = await cookies()
    cookie.delete('session_virtualise')
    cookie.delete('user_role')
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
    photo:string | null , role:string | null, country:string){
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
        country,
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
    const token = stream.generateUserToken({user_id:uid})
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
        const verify = await adminAuth.verifySessionCookie(token)
        const uid2 = verify.uid;
        if(!uid2) return false;
        const useref = admindb.collection('users').doc(uid2)
        const photourl = photo || ''
        const email = emails || username.trim() + "@" + uniname + '.edu'
        const password = 'test1234'
        const user = await adminAuth.createUser({email, password, photoURL:photourl })
        await adminAuth.updateUser(user.uid , {displayName:username})
        const uid = user.uid
        const check = await useref.get();
        const uninames = check.exists ? check.data()?.name : null;
        const finaluniname = uniname || uninames
        await admindb.collection('professors').doc(uid).create({
            id:uid,
            name:username,
            email:email,
            createdAt:new Date(),
            photo:photourl,
            university:finaluniname,
            university_id:uid2,          // ← fixed: was ""
            role:['uni-professor']
        })
        await stream.upsertUsers([{
            id:uid,
            image:photourl,
            name:username,
        }])
        revalidateTag(`professors-${uid2}`, 'max')
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
    return serializeFirestore(docref.data())
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
    revalidateTag(`user-${uid}`, 'max')
    return uid
    } 
    if(photo){
        await useref.update({
        photo:photo,
        updatedAt: new Date()
    })
    revalidateTag(`user-${uid}`, 'max')
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
        if(!docref?.exists) return null
        const user = docref.data()
        return user  
    } catch (error) {
        return null
    }
    
}
export async function redirectRoute(){
    try {
    const token = await VerifySession();
    if (!token) return {role:null , user:null, uid:null};

    const docref = await cacheData(token.userId);
    if (!docref?.exists) return {role:null , user:null, uid:null};

    const user = docref.data();
    const primaryRole = user?.role?.[0];

    return {role:primaryRole , user , uid:token.userId}
    } catch (error) {
        return {role:null , user:null , uid:null}
    }
    
}


export async function getuniversities(){
    "use cache"
    cacheTag('universities-list')
    const uni = await admindb.collection('users').where("role", "array-contains", "university").get()
    if(uni.empty) return;
    const data = uni.docs.map((d)=>{
        return  {label:d.data()?.name , value:d.data()?.name} 
    })
    return serializeFirestore(data)

}

export async function getProf(){
    const cookie = await cookies()
    const token = cookie.get('session_virtualise')?.value;
    if(!token) return;
    try {
        const u = await adminAuth.verifySessionCookie(token)
        return await getProfCached(u.uid)
    } catch (error) {
        return redirect('/login')
    }
}
async function getProfCached(uid: string){
    "use cache"
    cacheTag(`professors-${uid}`)
    const uni = await admindb.collection('users').doc(uid).collection('professors').get()
    if(uni.empty) return;
    const data = uni.docs.map((d)=>{
        return  {label:d.data()?.name , value:d.id} // CHANGED: value was d.data()?.name — now the professor's actual uid
    })
    return serializeFirestore(data)
}

export async function getCurrentId(){
    const cookie = await cookies()
    const token = cookie.get('session_virtualise')?.value
    if(!token) return null;
    const uid = await adminAuth.verifySessionCookie(token)
    return uid.uid
}

async function getUnidata(){
    const id =  await getCurrentId()
    if(!id) return null;
    return await cacheData(id)
}
async function getUniname(){
    const data =  await getUnidata()
    if(!data) return null
    return data?.name
}
export async function addCourse(coursename: string,
    coursemode: string, professor: string[],
    coursephoto: string,
    coursestart: string,
    coursend: string,
    unimain: string,
    unisecond: string | null,
    coursedays: string[],
    coursetime: string,
) {
    try {
        const uid = await getCurrentId()
        if (!uid) return null;
        const docref = admindb.collection('courses').doc()
        await docref.create({
            id: docref.id,
            coursename,
            coursemode,
            start: coursestart,
            end: coursend,
            unimain,
            unisecond,
            professor_ids: professor,
            university_id:uid,
            photo: coursephoto,
            days: coursedays,
            time: coursetime,
            createdAt: new Date()
        })
        revalidateTag(`courses-${uid}`, 'max')
        return true
    } catch (error) {
        return null
    }
}



export async function addHubs(hubname:string, member_limit:number , allowed_entry_to:string,
    hubphoto:string,
 ){
    try {
      const uid = await getCurrentId()
    if(!uid) return null;
    const docref = admindb.collection('users').doc(uid).collection('hubs').doc()
    const uniname = await getUniname() || null
    await docref.create({
        id:docref.id,
        hubname,
        member_limit,
        permission:allowed_entry_to,
        photo:hubphoto,
        previousuid:uid,
        members:0,
        university:uniname,
        createdAt:new Date()
    })
    revalidateTag('hubs-list', 'max')
    return true  
    } catch (error) {
       return null 
    } 
    
}

export async function addEvent(Eventname:string, max_limit:number , allowed_entry_to:string ,
     type:string, eventphoto:string  , eventdescription:string, eventlocation:string | null){
    try {
      const uid = await getCurrentId()
    if(!uid) return null;
    const docref = admindb.collection('users').doc(uid).collection('events').doc()
     const uniname = await getUniname() || null
    await docref.create({
        Eventname,
        max_limit,
        permission:allowed_entry_to,
        type,
        university:uniname,
        location:eventlocation,
        description:eventdescription,
        photo:eventphoto,
        createdAt:new Date()
    })
    return true  
    } catch (error) {
       return null 
    }
    
}

export async function getcourses(){
    const uid = await getCurrentId()
    if(!uid) return
    return await getcoursesCached(uid)
}
async function getcoursesCached(uid: string){
    "use cache"
    cacheTag(`courses-${uid}`)
    const course = await admindb.collection('users').doc(uid).collection('courses').get()
    if(course.empty) return null
    const data = course.docs.map((c)=>{
        return c.data()
    })
    return serializeFirestore(data);
}


export async function getHubs() {
    "use cache"
    cacheTag('hubs-list')
    const docref = await admindb.collection('users').where('role', 'array-contains', 'university').get()
    if (docref.empty) return [];

    const hubscrapping = docref.docs.map(async (d) => {
        const dort = await admindb.collection('users').doc(d.id).collection('hubs').get()
        if (dort.empty) return [];
        return dort.docs.map((t) => t.data())
    })

    const results = await Promise.all(hubscrapping)
    return serializeFirestore(results.flat())
}


export async function joinHub(uid:string, id:string){
    const currentid = await getCurrentId()
    if(!currentid) return {ismember:false};
    const docref = admindb.collection('users').doc(uid).collection('hubs').doc(id)
    const datac = await docref.get()
    if(!datac.exists) return {ismember:false}
    const check = await docref.collection('members').where('user_id', "==", currentid).get()
    if(!check.empty){
        const member_new_number2 = datac.data()?.members - 1
        await docref.update({
                members: member_new_number2
            })
            revalidateTag('hubs-list', 'max')
            revalidateTag(`hub-membership-${currentid}-${id}`, 'max')
            return {ismember:true}
    };
    const idt =   docref.collection('members').doc()
    await idt.create({
        id:idt.id,
        user_id:currentid,
        createAt:new Date()
    })
   const member_new_number = datac.data()?.members + 1
   await docref.update({
        members: member_new_number
    })
    revalidateTag('hubs-list', 'max')
    revalidateTag(`hub-membership-${currentid}-${id}`, 'max')
    return {ismember:true}
}

export async function checkIfJoinedHub(uid:string, id:string){
    const currentid = await getCurrentId()
    if(!currentid) return {ismember:false};
    return await checkIfJoinedHubCached(uid, id, currentid)
}
async function checkIfJoinedHubCached(uid: string, id: string, currentid: string){
    "use cache"
    cacheTag(`hub-membership-${currentid}-${id}`)
    const docref = admindb.collection('users').doc(uid).collection('hubs').doc(id)
    const datac = await docref.get()
    if(!datac.exists) return {ismember:false}
    const check = await docref.collection('members').where('user_id', "==", currentid).get()
    if(!check.empty){
            return {ismember:true}
    };
    return {ismember:false}
}


export async function postVideo(video:string, title:string , tag:string | null, description:string | null){
  const uid = await getCurrentId();
  if(!uid) return null;
  const docref = admindb.collection('Post').doc()
  const post = {
    id:docref.id,
    user_id:uid,
    media:[video],
    title,
    tag,
    description,
    createdAt:new Date()
  }
  await docref.create(post)
  revalidateTag('posts', 'max')
  return serializeFirestore(post)
}
export async function postText(text:string | null , media:any){
    const uid = await getCurrentId();
  if(!uid) return null;
  const docref = admindb.collection('Post').doc()
  const post = {
    id:docref.id,
    user_id:uid,
    text,
    media,
    createdAt:new Date()
  }
  await docref.create(post)
  revalidateTag('posts', 'max')
  return serializeFirestore(post)
    
}

export async function getUserAvatarByUid(uid:string){
    "use cache"
    cacheTag(`user-${uid}`)
    const docref = await admindb.collection('users').doc(uid).get()
    if(!docref.exists)return
    return serializeFirestore({name:docref.data()?.name , image:docref.data()?.photo , role:docref.data()?.role[0]})
}

export async function getCurrentUserAvatar(){
    const uid = await getCurrentId()
    if(!uid) return null
    const avatar = await getUserAvatarByUid(uid)
    return avatar ? { ...avatar, uid } : null
}

export async function getPosts(){
  "use cache"
  cacheTag('posts')
  const docref = await admindb.collection('Post').orderBy('createdAt', 'desc').get()
  if(docref.empty) return []
  const posts = docref.docs.map((d)=> d.data())
  const uids = [...new Set(posts.map((p: any) => p.user_id))]
  const entries = await Promise.all(uids.map(async (uid) => [uid, await getUserAvatarByUid(uid)] as const))
  const avatarByUid = Object.fromEntries(entries)
  return serializeFirestore(posts.map((p: any) => ({ ...p, author: avatarByUid[p.user_id] })))
}

export async function addComment(uid:string , comment:string){
    const currentUser = await getCurrentId()
    if(!currentUser) return null
    const postRef = admindb.collection('Post').doc(uid)
    const commentRef = postRef.collection('comments').doc()
    const current = (await postRef.get()).data()?.comment_number || 0
    const newComment = {
        id: commentRef.id,
        comment,
        sender_id: currentUser,
        createdAt: new Date()
    }
    await postRef.update({ comment_number: current + 1 })
    await commentRef.create(newComment)
    revalidateTag(`comments-${uid}`, 'max')
    revalidateTag('posts', 'max')

    const avatar = await getUserAvatarByUid(currentUser)
    return serializeFirestore({
        ...newComment,
        sender_name: avatar?.name ?? null,
        sender_image: avatar?.image ?? null,
        sender_role: avatar?.role ?? null
    })
}
const COMMENTS_PAGE_SIZE = 5


export async function getComment(
    postId: string,
    cursor?: string | null
): Promise<{ comments: CommentItem[]; nextCursor: string | null; hasMore: boolean }> {
    "use cache"
    cacheTag(`comments-${postId}`)

    let query = admindb.collection('Post').doc(postId).collection('comments')
        .orderBy('createdAt', 'desc')
        .limit(COMMENTS_PAGE_SIZE + 1)

    if (cursor) {
        query = query.startAfter(new Date(cursor))
    }

    const snap = await query.get()
    if (snap.empty) return { comments: [], nextCursor: null, hasMore: false }

    const docs = snap.docs
    const hasMore = docs.length > COMMENTS_PAGE_SIZE
    const pageDocs = hasMore ? docs.slice(0, COMMENTS_PAGE_SIZE) : docs

    const comments: CommentItem[] = await Promise.all(pageDocs.map(async (d) => {
        const raw = serializeFirestore(d.data())
        const avatar = await getUserAvatarByUid(raw.sender_id)
        return {
            id: raw.id,
            comment: raw.comment,
            sender_id: raw.sender_id,
            sender_name: avatar?.name ?? null,
            sender_image: avatar?.image ?? null,
            sender_role: avatar?.role ?? null
        }
    }))

    const lastDoc = pageDocs[pageDocs.length - 1]
    const nextCursor = hasMore ? lastDoc.data().createdAt.toDate().toISOString() : null

    return { comments, nextCursor, hasMore }
}
export async function addLikes(uid:string){
    const currentUser = await getCurrentId()
    if(!currentUser) return null
    const docref = admindb.collection('Post').doc(uid)
    const likeRef = docref.collection('likes').doc(currentUser)
    const check = await likeRef.get()

    if(check.exists){
        await docref.update({ likes: FieldValue.increment(-1) }) // CHANGED: atomic, no read-then-write race
        await likeRef.delete()
        revalidateTag('posts', 'max') // NEW
        return { liked: false }
    }

    await docref.update({ likes: FieldValue.increment(1) }) // CHANGED
    await likeRef.create({
        sender_id: currentUser, // CHANGED: was docref.id — the post's own id, not the user's
        createdAt: new Date()
    })
    revalidateTag('posts', 'max') // NEW
    return { liked: true }
}