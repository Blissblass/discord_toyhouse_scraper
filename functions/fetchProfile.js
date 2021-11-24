const puppeteer = require("puppeteer");

module.exports.fetchProfile = async (link, interaction) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(link);

  let nameEle = await page.$("h1.display-4", { visible: true });
  
  if(!nameEle) {
    const confirmButton = await page.$("input.btn-success");
    await confirmButton.click();
  } 
 
  nameEle = await page.waitForSelector('h1.display-4', { visible: true });
  const name = await nameEle.evaluate(el => el.textContent);
  const profImage = await page.$("img.profile-name-icon");
  const imageSrc = await profImage.evaluate(el => el.getAttribute("src"))


  console.log(`Title name: ${name != null} || Image: ${imageSrc != null}`);

  await browser.close();
  
  const data = {
    profName: name,
    imgSrc: `${imageSrc}.jpg`,
    scraperSrc: "https://i.imgur.com/g9pEDMC.png"
  }

  return data
};