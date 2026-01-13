import { Client, EmbedBuilder, ThreadChannel } from "discord.js";

export default async function noticeNewRecruit(
  client: Client,
  thread: ThreadChannel,
) {
  const name = thread.name;

  const groupType = name.includes("部")
    ? "部"
    : name.includes("サークル")
      ? "サークル"
      : name.includes("同好会")
        ? "同好会"
        : "その他";

  const starterMessage = await thread.fetchStarterMessage();

  const embed = new EmbedBuilder()
    .setTitle(`${thread.name}　が募集開始したよ！`)
    .setDescription(starterMessage!.content)
    .addFields(
      { name: "種別", value: groupType },
      {
        name: "募集開始日時",
        value: `${thread?.createdAt?.toLocaleString()}`,
      },
    )
    .setTimestamp()
    .setColor("#707070");

  const channel = client.channels.cache.get("1454109906545414185");
  if (!channel || !channel.isSendable()) return;
  await channel.send({ embeds: [embed] });
}
