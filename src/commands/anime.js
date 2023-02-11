const { SlashCommandBuilder } = require('discord.js')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('anime')
		.setDescription('Replies with anime detail!'),
	async execute(interaction) {
		await interaction.reply('hi!');
	},
};
