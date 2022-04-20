// import { Client } from "discord.js";

// import { MessageEmbed, TextChannel } from "discord.js";
// import { IGame } from "~/types";
// const channels = {
//   csgo: "947839849732390923",
//   dota: "843516234724540456",
//   fortnite: "843516252244279317",
//   halo: "842781172635140105",
//   leageOfLegends: "843516268446220288",
//   pubg: "843516280237850663",
//   valorant: "918204752217661480",
//   codWarZone: "853371299027615804"
// };

// export async function sendNewCompetitionToDiscord({
//   game,
//   author,
//   avatar,
//   name,
//   timestamp,
//   duration,
//   invite
// }: {
//   game: IGame["shorthand"];
//   author: string;
//   avatar: string;
//   name: string;
//   timestamp: number;
//   duration: number;
//   invite: string;
// }) {
//   const channelID = channels[game];
//   if (!channelID) {
//     console.error(`Unsupported game: ${game}`);
//     return;
//   }
//   const guild = await bot.guilds.fetch("739478451685425222");
//   const channel = await guild.channels.fetch(channelID) as TextChannel;

//   const startDate = new Date(timestamp);

//   const embed = new MessageEmbed()
//     .setThumbnail(avatar)
//     .setDescription(
//       `Hey! ${author} created a new competition:\n\n` +
//         `${name}\n\n` +
//         `Starts <t:${Math.round(startDate.getTime() / 1000)}:R>\n\n` +
//         `[Join the competition!](${invite})`
//     );

//   await channel.send({ embeds: [embed] });
// }

// export const bot: Client = new Client({ intents: 49151 }); //use 48893 if no privileged intents (GUILD_PRESENCES and GUILD_MEMBERS)

// bot.login(process.env.DISCORD_BOT_TOKEN);

export {};
