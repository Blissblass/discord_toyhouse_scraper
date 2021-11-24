const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { fetchProfile } = require("../functions/fetchProfile");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('scrape_test')
		.setDescription('This is a developmental command! It\s still WIP :3')
    .addStringOption(option => option.setName('link').setDescription('Enter a Toyhouse link for scraping.')),

	async execute(interaction) {
    await interaction.deferReply();

    let link = interaction.options.getString('link');
    if(!link || !link.startsWith('https://toyhou.se/')) {
      await interaction.reply({content: `<@${interaction.user.id}>, please give me a Toyhouse link!`, ephemeral: true})
      return
    }

    link = link.replace(/\s/g, "");
    const embedData = await fetchProfile(link, interaction);

    const embed = new MessageEmbed()
      .setColor("#1b1b1c")
      .setTitle(embedData.profName)
      .setURL(link)
      .setAuthor('Toyhouse Scraper', embedData.scraperSrc)
      .setThumbnail("https://f2.toyhou.se/file/f2-toyhou-se/characters/13293559?1635436327")
      .setFooter(`Built by kyumi#0480`)

    await interaction.editReply({ embeds: [embed] });
	},
};