const { SlashCommandBuilder } = require('discord.js')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('hello')
		.setDescription('Replies with hi!'),
	async execute(interaction) {
		await interaction.reply('hi!');
	},
};
