const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Replies with the user\'s info!'),
    
	async execute(interaction) {
		await interaction.reply(`User info: ${interaction.user.username}`);
	},
};