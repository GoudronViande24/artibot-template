import { SlashCommandBuilder } from "discord.js";

export const pingpongdata = new SlashCommandBuilder()
	.setName("pingpong")
	.setDescription("Ping pong command");

export async function pingpong(interaction, artibot) {
	await interaction.reply({
		embeds: [
			artibot.createEmbed()
				.setTitle("Ping pong!")
				.setDescription("Pong!")
		]
	});
}