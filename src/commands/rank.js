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
            // console.log(data)
            return data.data
        })

        if(!data){
            return await interaction.reply({ content: "Cannot find your Valorant!" });
        }

        const embed = new EmbedBuilder()
        .setColor('Gold')
        .setTitle(`${data.name}#${data.tag}`)
        // .setDescription('Some description here')
        .setThumbnail(`${data.images.small}`)
        .addFields(
            { name: 'Currented', value: `${data.currenttierpatched}`, inline: true },
            { name: 'Elo', value: `${data.elo}`, inline: true },
            { name: '\u200B', value: '\u200B', inline: true  },
            { name: 'Ranked Rating', value: `${data.ranking_in_tier}`, inline: true },
            { name: 'Last Game', value: `${data.mmr_change_to_last_game}`, inline: true },
            { name: '\u200B', value: '\u200B', inline: true  },
            )
        .setTimestamp()

		await interaction.deferReply({ephemeral: true});
        await interaction.editReply({ embeds: [embed] , ephemeral: true});
        
    },
};
