const { SlashCommandBuilder } = require('@discordjs/builders');
const { fetchProfile } = require("../functions/fetchProfile");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('scrape_test')
		.setDescription('This is a developmental command! It\s still WIP :3')
    .addStringOption(option => option.setName('link').setDescription('Enter a Toyhouse link for scraping.')),

	async execute(interaction) {
    let link = interaction.options.getString('link');
    if(!link || !link.startsWith('https://toyhou.se/')) {
      await interaction.reply({content: `<@${interaction.user.id}>, please give me a Toyhouse link!`, ephemeral: true})
      return
    }

    link = link.replace(/\s/g, "");
    const embedData = fetchProfile(link, interaction);
	},
};