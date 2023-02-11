const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rank')
		.setDescription('Get your valorant rank!')
        .addStringOption(option =>
            option.setName('name')
                .setDescription(`Insert Your Valorant's name`)
                .setRequired(true))
        .addStringOption(option =>
            option.setName('tag')
                .setDescription(`Insert Your Valorant's Tag`)
                .setRequired(true)),
	async execute(interaction) {
        const name = interaction.options.getString('name')
        const tag = interaction.options.getString('tag')

        uri = `https://api.henrikdev.xyz/valorant/v1/mmr/ap/${name}/${tag}`

        let data = await fetch(uri)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            return data.data
        })

        const embed = new EmbedBuilder()
        .setColor('Gold')
        .setTitle(`${data.name}#${data.tag}`)
        // .setDescription('Some description here')
        .setThumbnail(`${data.images.small}`)
        .addFields(
            { name: 'Current :', value: `${data.currenttierpatched}`, inline: false },
            { name: 'MMR :', value: `${data.currenttier}`, inline: false },
            { name: 'Last Game :', value: `${data.mmr_change_to_last_game}`, inline: false },
            // { name: '\u200B', value: '\u200B' },
            )
        .setTimestamp()

		await interaction.reply({ embeds: [embed] });
	},
};
