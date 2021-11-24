const { SlashCommandBuilder } = require('@discordjs/builders');
const puppeteer = require("puppeteer");
const fetch = require('node-fetch');

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

    const fetchSite = async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(link);

      const nameEle = await page.$("h1.display-4");
      
      if(nameEle) {
        const name = await nameEle.evaluate(el => el.textContent);
        const profImage = await page.$("img.profile-name-icon");
        const imageSrc = await profImage.evaluate(el => el.getAttribute("src"))

        console.log(`Title name: ${name != null} || Image: ${imageSrc != null}`);

        await interaction.reply(`<@${interaction.user.id}>, fetched profile for ${name}`);
        await browser.close();
        return
      } else {
        await interaction.deferReply();
        const confirmButton = await page.$("input.btn-success");
        await confirmButton.click();
        await page.waitForSelector('h1.display-4', { visible: true });
        page.screenshot({ path: 'scrunkly.png' });  
        
        const nameEle = await page.$("h1.display-4");
        const name = await nameEle.evaluate(el => el.textContent);
        const profImage = await page.$("img.profile-name-icon");
        const imageSrc = await profImage.evaluate(el => el.getAttribute("src"))

        console.log(`Title name: ${name != null} || Image: ${imageSrc != null}`);
        await interaction.editReply(`<@!${interaction.user.id}>, fetched profile for ${name}`);
        await browser.close();
        return
      }
    };

    fetchSite();
	},
};