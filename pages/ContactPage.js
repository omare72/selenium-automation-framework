const { By, until } = require("selenium-webdriver");
const BasePage = require('./BasePage');

class ContactPage extends BasePage {
  constructor(driver) {
    super(driver);

    this.locators = {
      contactLink: By.css("header a[href*='contact']"),
      submitBtn: By.id("srfm-submit-btn"),
      errorMessages: By.className("srfm-error-message"),
      firstName: By.css("input[placeholder*='First Name']"),
      lastName: By.css("input[placeholder*='Last Name']"),
      email: By.css("input[placeholder*='Email Address']"),
      subject: By.css("input[placeholder*='Subject']"),
      message: By.css("textarea[placeholder*='Message']"),
      successMessage: By.xpath("//*[contains(text(), 'Thank you') or contains(text(), 'successfully')]")
    };
  }
  
  async fillField(locator, text) {
    const field = await this.waitForElement(locator);
    await field.clear();
    if (text !== "") {
      await field.sendKeys(text);
    }
  }

  async goToContactPage() {
    const contactLink = await this.driver.wait(
      until.elementLocated(this.locators.contactLink),
      10000
    );

    const oldUrl = await this.driver.getCurrentUrl();
    await contactLink.click();

    await this.driver.wait(async () => {
      return (await this.driver.getCurrentUrl()) !== oldUrl;
    }, 10000);
  }

  async fillFirstName(text) {
    await this.fillField(this.locators.firstName, text);
  }

  async fillLastName(text) {
    await this.fillField(this.locators.lastName, text);
  }

  async fillEmail(text) {
    await this.fillField(this.locators.email, text);
  }

  async fillSubject(text) {
    await this.fillField(this.locators.subject, text);
  }

  async fillMessage(text) {
    await this.fillField(this.locators.message, text);
  }

  async submit() {
    await this.clickElement(this.locators.submitBtn);
  }

  async getErrors() {
    return await this.driver.findElements(this.locators.errorMessages);
  }

  async verifySuccessMessage() {
    const success = await this.driver.wait(
      until.elementLocated(this.locators.successMessage),
      10000
    );

    await this.driver.wait(until.elementIsVisible(success), 5000);
  }

  async fillForm(firstName, lastName, email, subject, message){
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillEmail(email);
    await this.fillSubject(subject);
    await this.fillMessage(message);
  }

  async waitForErrors(){
    await this.driver.wait(async () => {
      const errors = await this.getErrors();
      return errors.length > 0;
    }, 5000);
  }

  async checkElementVisibility(locator){
    const element = await this.driver.wait(until.elementLocated(locator),5000);
    await this.driver.wait(until.elementIsVisible(element),5000);
  }

  async checkAllFieldsVisible(){
    const fieldsToCheck = [
      {name: "First Name Field", locator: this.locators.firstName},
      { name: "Last Name field", locator: this.locators.lastName },
      { name: "Email field", locator: this.locators.email },
      { name: "Subject field", locator: this.locators.subject },
      { name: "Message field", locator: this.locators.message },
      { name: "Submit button", locator: this.locators.submitBtn },
    ];
    for(const field of fieldsToCheck){
      const element = await this.driver.wait(until.elementLocated(field.locator),5000);
      const isVisible = await element.isDisplayed();
      console.log(`${field.name}: ${isVisible ? "✅ visible" : "❌ NOT visible"}`);    
  }
  }
  async securityInputTest(text) {
  const fieldsToTest = [
    { name: "First Name", locator: this.locators.firstName },
    { name: "Last Name", locator: this.locators.lastName },
    { name: "Subject", locator: this.locators.subject },
    { name: "Message", locator: this.locators.message },
  ];

  for (const field of fieldsToTest) {
    const element = await this.driver.wait(until.elementLocated(field.locator), 5000);
    await element.clear();
    await element.sendKeys(text);
    const value = await element.getAttribute("value");
    const executed = value.includes("<script>");
    console.log(`${field.name} XSS test: ${executed ? "⚠️ script tag stored (no execution in input)" : "✅ input sanitized"}`);
  }
}

}//class

module.exports = ContactPage;