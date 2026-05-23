const config = require("../config");
const { By, until } = require("selenium-webdriver");
const fs = require("fs");

class BasePage {
  
  constructor(driver){
    this.driver = driver;
  }
  
  async takeScreenshot(filename) {
    const screenshot = await this.driver.takeScreenshot();
    fs.writeFileSync(`screenshots/${filename}.png`, screenshot, "base64");
  }
  
  async navigateToUrl(url){
    return await this.driver.get(url)
  }

  async getTitle(){
    return await this.driver.getTitle();
  }

  async getCurrentUrl(){
    return await this.driver.getCurrentUrl();
  }

  async refreshPage(){
    return await this.driver.navigate().refresh();
  }

  async waitForElement(locator) {
  return await this.driver.wait(until.elementLocated(locator), config.timeout);
}

  async clickElement(locator) {
    const element = await this.waitForElement(locator);
    await this.driver.executeScript("arguments[0].click();", element);
  }
}//class

module.exports = BasePage;