"use client";

import { createContext, useContext } from "react";
import { Chat, useCreateChatClient } from "stream-chat-react";
import { StreamChat } from "stream-chat";
import { getStreamToken } from "../app/lib/stream";

interface Props {
  children: React.ReactNode;
  apiKey: string;
  userdata: any | null;
  uid: string | null;
}
interface ContextTypes {
  user: any;
  client: StreamChat | null;
}

const StreamContext = createContext<ContextTypes>({ user: null, client: null });

export default function StreamChatContext({ children, apiKey, userdata, uid }: Props) {
  if (!apiKey || !userdata || !uid) {
    return <StreamContext.Provider value={{ user: userdata, client: null }}>{children}</StreamContext.Provider>;
  }
  return (
    <ConnectedStreamChat apiKey={apiKey} userdata={userdata} uid={uid}>
      {children}
    </ConnectedStreamChat>
  );
}

function ConnectedStreamChat({ children, apiKey, userdata, uid }: Props & { apiKey: string; uid: string }) {
  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: getStreamToken,
    // `username`, matching the video client. `name` doesn't exist on your user docs.
    userData: { id: uid, name: userdata?.username, image: userdata?.photo },
  });

  return (
    <StreamContext.Provider value={{ user: userdata, client }}>
      {client ? <Chat client={client}>{children}</Chat> : children}
    </StreamContext.Provider>
  );
}

export const useStreamChatContext = () => useContext(StreamContext);
