"use client";

import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { createContext, useContext, useMemo } from "react";
import CallManager from "../components/structure/CallManager";
import RecordingManager from "../components/structure/RecordingManager";
import { getStreamToken } from "../app/lib/stream"; // adjust to wherever your action lives

interface Props {
  children: React.ReactNode;
  apiKey: string;
  token: string | null; // first token, minted on the server
  userdata: any | null;
  uid: string | null;
}
interface ContextTypes {
  videoClient: StreamVideoClient | null;
  user: any;
}

const StreamContext = createContext<ContextTypes>({ videoClient: null, user: null });

export default function StreamVideoContext({ children, apiKey, token, userdata, uid }: Props) {
  if (!apiKey || !token || !uid) {
    return <StreamContext.Provider value={{ videoClient: null, user: userdata }}>{children}</StreamContext.Provider>;
  }
  return (
    <ConnectedStreamVideo apiKey={apiKey} token={token} userdata={userdata} uid={uid}>
      {children}
    </ConnectedStreamVideo>
  );
}

function ConnectedStreamVideo({ children, apiKey, token, userdata, uid }: Props & { apiKey: string; token: string; uid: string }) {
  const client = useMemo(() => {
    let firstToken: string | null = token;
    return StreamVideoClient.getOrCreateInstance({
      apiKey,
      user: { id: uid, name: userdata?.username, image: userdata?.photo },
      // Called immediately when the client is created (during render), so the first
      // call must NOT touch a server action. Later calls (token expiry) are fine.
      tokenProvider: async () => {
        if (firstToken) {
          const t = firstToken;
          firstToken = null;
          return t;
        }
        return getStreamToken();
      },
    });
  }, [apiKey, uid]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StreamContext.Provider value={{ videoClient: client, user: userdata }}>
      <StreamVideo client={client}>
        <CallManager />
        <RecordingManager />
        {children}
      </StreamVideo>
    </StreamContext.Provider>
  );
}

export const useStreamContext = () => useContext(StreamContext);
