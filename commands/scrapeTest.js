const { SlashCommandBuilder } = require('@discordjs/builders');
const puppeteer = require("puppeteer");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('scrape_test')
		.setDescription('This is a developmental command! It\s still WIP :3')
    .addStringOption(option => option.setName('link').setDescription('Enter a Toyhouse link for scraping.')),

	async execute(interaction) {
    const link = interaction.options.getString('link');
    if(!link || !link.startsWith('https://toyhou.se/')) {
      link = link.replace(/\s/g, "");
      await interaction.reply({content: `<@${interaction.user.id}>, please give me a Toyhouse link!`, ephemeral: true});
      return
    }

    const fetchSite = async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(link);

      const nameEle = await page.waitForSelector("h1.display-4");
      const name = await nameEle.evaluate(el => el.textContent);

      await interaction.reply(`<@${interaction.user.id}>, fetched profile for ${name}`);
      await browser.close();
    };

    fetchSite();
	},
};