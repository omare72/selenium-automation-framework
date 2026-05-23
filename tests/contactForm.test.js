const { Builder, until } = require("selenium-webdriver");
const ContactPage = require("../pages/contactPage");
const config = require("../config");
const { expect } = require("chai");
const invalidEmails = [
  { email: "notanemail", description: "no @ symbol" },
  { email: "missing@domain", description: "no TLD" },
  { email: "@nodomain.com", description: "no username" },
  { email: "spaces in@email.com", description: "spaces in email" },
];



let driver;
let contactPage;

describe("Contact Form Tests", function () {
  this.timeout(30000);
  this.retries(2);

  beforeEach(async function () {
    driver = await new Builder().forBrowser(config.browser).build();
    contactPage = new ContactPage(driver);
    await driver.get(config.baseUrl);
    await contactPage.goToContactPage();
  });

  afterEach(async function () {
    if (this.currentTest.state === "failed") {
    await contactPage.takeScreenshot(this.currentTest.title);
    }
    await driver.quit();
  });

  it("Page title should contain Contact", async function () {
  const title = await contactPage.getTitle();
  expect(title).to.include("Contact");
  });

  it("URL should contain contact", async function () {
  const url = await contactPage.getCurrentUrl();
  expect(url).to.include("contact");
  });

  it("All fields should be visible", async function () {
    await contactPage.checkAllFieldsVisible();
  });

  it("Empty fields should show errors", async function () {
  await contactPage.fillForm("", "", "", "", "");
  await contactPage.submit();
  await contactPage.waitForErrors();
  const errors = await contactPage.getErrors();
  expect(errors.length).to.be.greaterThan(0);
  });

  it("Empty email should show error", async function () {
    await contactPage.fillForm("Omar", "El Arqam", "", "QA Testing", "Test message");
    await contactPage.submit();
    await contactPage.waitForErrors();
  });

  invalidEmails.forEach(({ email, description }) => {
  it(`Invalid email: ${description}`, async function () {
    await contactPage.fillForm("Omar", "El Arqam", email, "QA Test", "Test message");
    await contactPage.submit();
    await contactPage.waitForErrors();
    const errors = await contactPage.getErrors();
    expect(errors.length).to.be.greaterThan(0);
    });
  });

  it("Valid form should show success", async function () {
    await contactPage.fillForm("Omar", "El Arqam", "test@test.com", "QA Test", "Test message");
    await contactPage.submit();
    await contactPage.verifySuccessMessage();
  });

  it("XSS input should not execute", async function () {
    await contactPage.securityInputTest("<script>alert('xss')</script>");
  });
});