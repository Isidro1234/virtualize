"use server"
import { VerifySession } from "./verifySession"
import { admindb } from "../../config/admin-firestore"
import { cacheTag } from "next/cache"



export  const getUser = async () => {
  
  try {
    const session = (await VerifySession())?.userId;
  const id = session;
  if (!session || !id) return null;
    const data = await admindb.collection('users').doc(id).get();
    if(!data.exists) return null;
    const user = data.data()
    return {username:user?.username , photo:user?.photo , role:user?.role}
  } catch (error) {
    console.log('Failed to fetch user')
    return null
  }
}

export async function getUserById(id:string){
    "use cache"
    cacheTag(`user-${id}`)
    try {
    const docref = await admindb.collection('users').doc(id).get();
    if(!docref.exists) return null;
    const user = docref.data()  
    return {username: user?.username , role:user?.role , photo:user?.photo}
    } catch (error) {
        return null
    }
}

export async function getUserByIdRealtime(id:string, onupdate:any){
    try {
     return admindb.collection('users').doc(id).onSnapshot((d) => {
            if (!d.exists) {
                onupdate(null);
                return;
            }
            
            const u = {
                username: d.data()?.username, 
                role: d.data()?.role, 
                photo: d.data()?.photo
            };
            
            onupdate(u); 
        });
    } catch (error) {
        return null
    }
}