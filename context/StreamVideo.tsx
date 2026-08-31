"use client"; // Ensure this directive is at the very top

import { VStack } from "@chakra-ui/react";
import { StreamCall, StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { createContext, useContext, useEffect, useState } from "react";

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY || "";

interface StreamVideoContextProps {
  children: React.ReactNode,
  userdata:any | null ,
  uid: string | null
  token:string | null
}
interface contextTypes {
    videoClient : StreamVideoClient | null,
    setVideoClient: Function | null,
    user: any,
    setUser:Function | null,
    isLogged: string | null ,
    setLogged: Function | null
}
const StreamContext = createContext<contextTypes>({
  videoClient:null,
  setVideoClient:()=> null,
  user: null,
  isLogged:null,
  setLogged:()=>null,
  setUser:()=> null,
})
export default function StreamVideoContext({ 
  children , token , userdata , uid}: StreamVideoContextProps) {
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null);
  const [user, setUser] = useState<any>(null)
  const [isLogged, setLogged] = useState<any>(null)
  useEffect(() => {
  if (videoClient && user) return;
  if (!STREAM_API_KEY) return;
  if (!uid || !userdata || !token) return;   // ✅ check the prop

  const client = new StreamVideoClient({
    apiKey: STREAM_API_KEY,
    user: { id: uid, image: userdata?.photo, name: userdata?.name },
    token: token
  })
  setVideoClient(client)
  setUser(userdata)   // ✅ store the prop, not the stale state
  setLogged(uid)
}, [uid, userdata, token])


  return (

    <StreamContext.Provider value={{
      setLogged,
      setUser,
      setVideoClient,
      user,
      isLogged,
      videoClient,
    }}>
      {!videoClient ? (
        children
      ) : (
        <StreamVideo client={videoClient}>
          {children}
        </StreamVideo>
      )}
    </StreamContext.Provider>
  );
}

export const useStreamContext = () => useContext(StreamContext)