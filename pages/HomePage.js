const { By, until } = require("selenium-webdriver");
const BasePage = require('./BasePage');

class HomePage extends BasePage {
  constructor(driver) {
    super(driver);

    this.locators = {
      contactLink: By.css("header a[href*='contact']"),
      logo: By.css("header a.custom-logo-link, header .site-branding a"),
    };
  }

  async navigate() {
    await this.navigateToUrl("https://omarwebsolutions.com/");
  }
  async goToContact() {
    await this.clickElement(this.locators.contactLink);
  }

  async isLogoVisible(){
    const logo = await this.driver.wait(until.elementLocated(this.locators.logo), 5000);
    return await logo.isDisplayed();
  }
}//class

module.exports = HomePage;