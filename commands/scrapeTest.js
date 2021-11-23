const { SlashCommandBuilder } = require('@discordjs/builders');
const request = require('request-promise');
const cheerio = require('cheerio');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('scrape_test')
		.setDescription('This is a developmental command! It\s still WIP :3')
    .addStringOption(option => option.setName('link').setDescription('Enter a Toyhouse link for scraping.')),

	async execute(interaction) {
    const link = interaction.options.getString('link').replace(/\s/g, "");
    if(!link || !link.startsWith('https://toyhou.se/')) {
      await interaction.reply({content: `<@${interaction.user.id}>, please give me a Toyhouse link!`, ephemeral: true});
      return
    }

    request(link, async (error, response, html) => {
      if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        const name = $("h1.display-4").text();
        await interaction.reply(`<@${interaction.user.id}>, you passed in: ${link} and successfully returned a response for ${name}!`);
        console.log('all operations successful!');
        return
      } else {
        await interaction.reply(error);
        return
      }
    });
	},
};