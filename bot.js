const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
  console.log('Server ready!')
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
		await interaction.reply(`Hi <@${interaction.user.id}>!!! Pong !!!! :DDD <33333333`);
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name} \n Total members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`User info: ${interaction.user.username}`);
	}
});

client.login(token);