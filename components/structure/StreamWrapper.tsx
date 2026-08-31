import React from "react";
import StreamVideoContext from "../../context/StreamVideo";
import { getSession, getStreamToken } from "../../app/actions/auth";
import { VerifySession } from "../../app/lib/verifySession";




export default async function StreamWrapper({children}:{children:React.ReactNode}){
    let user;
    let uid;
    let token
    try {
        user = await getSession() || null
        uid = await VerifySession() || null
        token = await getStreamToken(uid.userId) || null 
    } catch (error) {
        user = null;
        uid = null;
        token = null
    }
    
    return(
        <StreamVideoContext token={token} userdata={user} uid={uid?.userId || null}>
            {children}
        </StreamVideoContext>
    )
}