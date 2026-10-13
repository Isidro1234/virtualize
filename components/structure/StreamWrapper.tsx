import React from "react";
import StreamVideoContext from "../../context/StreamVideo";
import StreamChatContext from "../../context/StreamChat";
import { VerifySession } from "../../app/lib/verifySession";
import { getUserById } from "../../app/lib/dal";
import { getStreamToken } from "../../app/lib/stream"; // adjust to wherever your action lives

export default async function StreamWrapper({ children }: { children: React.ReactNode }) {
  const apiKey = process.env.STREAM_API_KEY ?? "";
  let uid: string | null = null;
  let user: any = null;
  let token: string | null = null;

  try {
    uid = (await VerifySession()).userId || null;
    if (uid) {
      const u = await getUserById(uid);
      if (u) {
        const { password: _password, ...safe } = u as any; // never ship the hash to the client
        user = safe;
      }
      token = await getStreamToken(); // plain function call on the server, id comes from the session
    }
  } catch {
    uid = null;
    user = null;
    token = null;
  }

  return (
    <StreamVideoContext apiKey={apiKey} token={token} userdata={user} uid={uid}>
      <StreamChatContext apiKey={apiKey} userdata={user} uid={uid}>
        {children}
      </StreamChatContext>
    </StreamVideoContext>
  );
}
