// This is a JavaScript template for creating a bot with Artibot
// You can use this template to create your own bot
// You can also use TypeScript (that's what Artibot is written in)
// Find documentation at https://artibot.artivain.com

import { Artibot, ArtibotConfigBuilder, Module, SlashCommand } from "artibot";
import artibotCrypto from "artibot-crypto";
import artibotWelcome, { ArtibotWelcomeConfigBuilder } from "artibot-welcome";
import { pingpong, pingpongdata } from "./custom-slash-command.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Create a new instance of Artibot
const bot = new Artibot(new ArtibotConfigBuilder()
	.setBotName("My own bot")
	.setEmbedColor("Red")
	.setOwnerId("123456789012345678") // Your Discord user ID
	.setTestGuildId("775798875356397608") // Your server ID
	// Enable dev mode, so you can restart the bot more often without getting rate limited
	// Slash commands will be registered only in the test guild
	.setDevMode(true)
	.setPrefix("!")
	// Change other settings here
);

// Register "crypto" module
// It does not need configuration
bot.registerModule(artibotCrypto);

// Register "welcome" module
// It has a complex configuration
bot.registerModule(artibotWelcome, new ArtibotWelcomeConfigBuilder()
	.addServer("775798875356397608", server => server // Your server ID
		.setName("Test server") // Name of the server, or remove this line to use the server name from Discord
		.setWelcomeConfig(welcome => welcome
			.setChannel("926959115404738640") // Your welcome channel ID
			.showProfile()
		)
	)
);

// Register a custom module
bot.registerModule(new Module({
	name: "My custom module", // Name of the module
	id: "my-custom-module", // ID of the module, must be unique
	version: "1.0.0", // Version of the module, using semantic versioning
	parts: [ // Parts of the module
		// Register a slash command
		new SlashCommand({
			id: "pingpong", // ID of the slash command, must be unique
			mainFunction: pingpong, // Function to run when the slash command is used
			data: pingpongdata // Slash command data
		})
		// Add more parts here
	]
}));

// Login to Discord
bot.login({ token: process.env.DISCORD_TOKEN });