//const { WebDriver } = require("selenium-webdriver");

const {Builder, By, until} = require("selenium-WebDriver");

async function open() {
  let driver = await new Builder().forBrowser("chrome").build();
  try{
    await driver.get("https://omarwebsolutions.com/en");
    const heading = await driver.wait(
    until.elementLocated(By.xpath("//*[contains(text(), 'Professional Website')]")),
    5000
  );

    await driver.wait(until.elementIsVisible(heading), 5000);    
    console.log("Page opened successfully ✅");
    console.log("Heading contains 'Professional Website'  ✅");
  }
  catch (error) {
    console.log("Error:", error);
  } finally {
    await driver.quit();
  }
  
}
open();