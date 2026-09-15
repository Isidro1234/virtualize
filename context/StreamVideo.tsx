"use client";

import { StreamCall, StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { createContext, useContext, useEffect, useMemo } from "react";
import CallManager from "../components/structure/CallManager";
import RecordingManager from "../components/structure/RecordingManager";

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY || "";

interface contextTypes {
  videoClient: StreamVideoClient | null;
  user: any;
}
const StreamContext = createContext<contextTypes>({ videoClient: null, user: null });

export default function StreamVideoContext({
  children, token, userdata, uid,
}: { children: React.ReactNode; userdata: any | null; uid: string | null; token: string | null }) {
  if (!token || !uid) {
    return (
      <StreamContext.Provider value={{ videoClient: null, user: userdata }}>
        {children}
      </StreamContext.Provider>
    );
  }
  return (
    <ConnectedStreamVideo token={token} userdata={userdata} uid={uid}>
      {children}
    </ConnectedStreamVideo>
  );
}

function ConnectedStreamVideo({
  children, token, userdata, uid,
}: { children: React.ReactNode; token: string; userdata: any; uid: string }) {
  const client = useMemo(
    () =>
      StreamVideoClient.getOrCreateInstance({
        apiKey: STREAM_API_KEY,
        user: { id: uid, name: userdata?.name, image: userdata?.photo },
        token,
      }),
    [uid, token]
  );



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