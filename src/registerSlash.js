require('dotenv').config();

const { REST, Routes } = require('discord.js');
const fs = require('node:fs');

const commands = [];
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}
const rest = new REST({ version: '10' }).setToken(process.env.botToken);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		await rest.put(Routes.applicationCommands(process.env.clientId), { body: [] })
		.then(() => console.log('Successfully deleted all application commands.'))
		.catch(console.error);

		// const data = await rest.put(
		// 	Routes.applicationGuildCommands(process.env.clientId, process.env.guildId),
		// 	{ body: commands },
		// );

        const data = await rest.put(
            Routes.applicationCommands(process.env.clientId),
            { body: commands },
        );

		

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();


// node ./src/handler/registerSlash.js