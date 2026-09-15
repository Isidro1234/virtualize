"use client";

import { createContext, useContext } from "react";
import { Chat, useCreateChatClient } from "stream-chat-react";
import { StreamChat } from "stream-chat";

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY || "";

interface StreamChatContextProps {
  children: React.ReactNode;
  userdata: any | null;
  uid: string | null;
  token: string | null;
}
interface contextTypes {
  user: any;
  client: StreamChat | null;
}
const StreamContext = createContext<contextTypes>({ user: null, client: null });

export default function StreamChatContext({ children, token, userdata, uid }: StreamChatContextProps) {
  if (!token || !userdata || !uid) {
    return (
      <StreamContext.Provider value={{ user: userdata, client: null }}>
        {children}
      </StreamContext.Provider>
    );
  }
  return (
    <ConnectedStreamChat token={token} userdata={userdata} uid={uid}>
      {children}
    </ConnectedStreamChat>
  );
}

function ConnectedStreamChat({
  children, token, userdata, uid,
}: { children: React.ReactNode; token: string; userdata: any; uid: string }) {
  const client = useCreateChatClient({
    apiKey: STREAM_API_KEY,
    tokenOrProvider: token,
    userData: { id: uid, name: userdata?.name, image: userdata?.photo },
  });

  return (
    <StreamContext.Provider value={{ user: userdata, client }}>
      {client ? <Chat client={client}>{children}</Chat> : children}
    </StreamContext.Provider>
  );
}

export const useStreamChatContext = () => useContext(StreamContext);