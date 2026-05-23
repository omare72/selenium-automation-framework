const { Builder } = require("selenium-webdriver");
const HomePage = require("../pages/HomePage");
const config = require("../config");
const { expect } = require("chai");

let driver;
let homePage;

describe("Home Page Tests", function () {
  this.timeout(30000);
  this.retries(2);

  beforeEach(async function () {
    driver = await new Builder().forBrowser(config.browser).build();
    homePage = new HomePage(driver);
    await homePage.navigate();
  });

  afterEach(async function () {
    if (this.currentTest.state === "failed") {
      await homePage.takeScreenshot(this.currentTest.title);
    }
    await driver.quit();
  });

  it("Logo should be visible", async function () {
    const visible = await homePage.isLogoVisible();
    expect(visible).to.be.true;
  });

  it("Page title should contain site name", async function () {
    const title = await homePage.getTitle();
    expect(title).to.not.be.empty;
  });

  it("Clicking contact link navigates to contact page", async function () {
    await homePage.goToContact();
    const url = await homePage.getCurrentUrl();
    expect(url).to.include("contact");
  });
});