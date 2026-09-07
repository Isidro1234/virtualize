import { StreamVideoClient } from "@stream-io/video-react-sdk"

export async function startCall(
  videoClient: StreamVideoClient,
  calleeIds: string[],
  callType: string = "default"
) {
  const callId = crypto.randomUUID()
  const call = videoClient.call(callType, callId)
  await call.getOrCreate({
    ring: true,
    data: { members: calleeIds.map((id) => ({ user_id: id })) },
  })
  return call
}