"use server";
import { StreamClient } from "@stream-io/node-sdk";
import { VerifySession } from "./verifySession";
export async function getStreamToken(): Promise<string> {
  const apiKey = process.env.STREAM_API_KEY;
  const secret = process.env.STREAM_SECRET;
  if (!apiKey || !secret) throw new Error("Missing STREAM_API_KEY / STREAM_SECRET");

  const user = await VerifySession();
  if (!user?.userId) throw new Error("Unauthorized");

  return new StreamClient(apiKey, secret).generateUserToken({
    user_id: user.userId,
    validity_in_seconds: 60 * 60, 
  });
}
