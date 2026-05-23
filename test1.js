const {Builder, until, By, Key} = require("selenium-webdriver")

async function open() {

  //open a browser session
  let driver = await new Builder().forBrowser("chrome").build();
  try {
  await driver.get("https://webgolovolomki.com/en/");
  await driver.wait(until.elementLocated(By.css("body")), 10000);
  const links = await driver.findElements(By.css("a"));
  //I want to count the links in the page and get the first one
  const linksCount = links.length;
  console.log(`Total links on the page is: ${linksCount}`);

  if(linksCount>0){
    const firstLink = links[0];
    await driver.wait(until.elementIsVisible(firstLink),10000);
    const linkText = await firstLink.getText();
    const linkHref = await firstLink.getAttribute("href");
    console.log(`The first link is ${linkText} and its URL is ${linkHref}`);

    const oldUrl = await driver.getCurrentUrl();
    await firstLink.click();

    await driver.wait(async ()=>{
      const newUrl = driver.getCurrentUrl();
      return newUrl !== oldUrl;
    }, 10000);
    console.log("Clicked link successfully ✅");

  }

} catch (error) {
  console.log("Error: ", error.message);
} finally {
  await driver.quit();
}
}
open();

