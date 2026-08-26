"use client"
import React, { createContext, useContext, useState, useEffect } from 'react'
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk"
import { deleteSession } from '../app/actions/auth';

const StreamChatContext = createContext<any>({})

interface StreamChatProps {
  children: React.ReactNode;
  uid: string;
  token: string;
}

export default function StreamChat({ children, uid , token }: StreamChatProps) {
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const apikey = process.env.NEXT_PUBLIC_STREAM_API_KEY || ""
  useEffect(() => {
    // Instantiate the heavy SDK class safely on the client environment
    if(!uid || !token){
        deleting()
    }
    async function deleting(){
        return await deleteSession()
    }
    if(!apikey) return;
    const streamClient = new StreamVideoClient({
      apiKey:apikey,
      user: { id: uid, image: "" },
      token: token,
    });

    setClient(streamClient);

    // Clean up connection when component unmounts
    return () => {
      streamClient.disconnectUser().catch(err => console.error("Error disconnecting Stream client", err));
    };
  }, [uid , token]);

  // Loading state prevents children from rendering before the client initializes
  if (!client) {
    return <div>Loading communication networks...</div>; 
  }

  return (
    <StreamChatContext.Provider value={{ setClient, client }}>
      <StreamVideo client={client}>
        {children}
      </StreamVideo>
    </StreamChatContext.Provider>
  )
}

export const useStream = () => useContext(StreamChatContext)
