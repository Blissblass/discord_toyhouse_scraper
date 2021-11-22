const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply(`Hi <@${interaction.user.id}> !!! Pong !!!! :DDD <33333333`);
	},
};