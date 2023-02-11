const { Events } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {

        // if (interaction.commandName === 'ping') {
        //     await interaction.reply('Pong!');
        //     await wait(10);
        //     await interaction.editReply('Pong again!');
        // }

		const command = interaction.client.commands.get(interaction.commandName);
		// const command = slashCommands.get(interaction.commandName);
		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			console.log("HELLo")
			await command.execute(interaction);
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
	},
};