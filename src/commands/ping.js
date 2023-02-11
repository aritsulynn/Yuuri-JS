const { SlashCommandBuilder } = require('discord.js')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};



// const { SlashCommandBuilder } = require('discord.js')
// // const { CommandInteraction, Client, ApplicationCommandType } = require('discord.js');

// module.exports = {
// 	name: 'ping',
// 	description:"Repliess PONG!",
// 	type: ApplicationCommandType.ChatInput,
// 	async execute(client, interaction, args){
// 		interaction.reply({
// 			content:"PONG!"
// 		}).catch((e)=>{console.log(e)})
// 	}
// };