import { StreamChat}  from 'stream-chat'


export async function StartChannel(
  chatClient: StreamChat | null,
  participantsId: string[],
  chatType: "messaging",
  uid:string
) {
  if (!chatClient) return null;

  const id = crypto.randomUUID()
  const channel = chatClient.channel(chatType, id, {
    members: participantsId,
  });
  await channel.watch()
  return channel;
}