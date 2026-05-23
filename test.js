const { Builder, By, Key, until } = require("selenium-webdriver");

async function open() {
  let driver = await new Builder().forBrowser("chrome").build();
  
  try {
    await driver.get("https://webgolovolomki.com/en");
    
    const oldUrl = await driver.getCurrentUrl();
    console.log("initial URL  :", oldUrl);

    const inputField = await driver.wait(until.elementLocated(By.tagName("input")), 30000);
    await inputField.sendKeys("sudoku", Key.RETURN);

    await driver.wait(async () => {
      const currentUrl = await driver.getCurrentUrl();
      return currentUrl !== oldUrl;
    }, 10000);

    const newUrl = await driver.getCurrentUrl();
    console.log("URL After search :", newUrl);
    console.log("✅ Change confirmed !");

  } catch (error) {
    console.log("Error :", error.message);
  } finally {
    await driver.quit();
  }
}

open();
