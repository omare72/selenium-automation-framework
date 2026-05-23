const { Builder, By, until } = require("selenium-webdriver");

async function fillForm() {
  let driver = await new Builder().forBrowser("chrome").build();

//   const contactPage = {
//    fillFirstName: async (text) => { fillField(locators.firstName,text) },
//    fillLastName: async (text) => {fillField(locators.lastName,text) },
//    fillEmail: async (text) => {fillField(locators.email,text)},
//    fillSubject: async (text) => {fillField(locators.subject,text)},
//    fillMessage: async (text) => {fillField(locators.message,text)},
//    submit: async () => { clickElement(locators.submitBtn) }
// }

//   const locators = {
//   contactLink: By.css("header a[href*='contact']"),
//   submitBtn: By.id("srfm-submit-btn"),
//   errorMessages: By.className("srfm-error-message"),

//   firstName: By.css("input[placeholder*='First Name']"),
//   lastName: By.css("input[placeholder*='Last Name']"),
//   email: By.css("input[placeholder*='Email Address']"),
//   subject: By.css("input[placeholder*='Subject']"),
//   message: By.css("textarea[placeholder*='Message']"),

//   successMessage: By.xpath("//*[contains(text(), 'Thank you') or contains(text(), 'successfully')]")
// };
 //fillField helper function
//  async function fillField(locator, text) {
//     const field = await driver.wait(until.elementLocated(locator),10000);
//     await field.clear();
//     if (text !== "") {
//     await field.sendKeys(text);
//   }
//  }//fillField
//   // clickElement helper function
//     async function clickElement(locator) {
//     const element = await driver.wait(until.elementLocated(locator), 10000);   
//     await driver.executeScript("arguments[0].click();", element);  
//  }//clickElement

//   //goToContactPage function
//   async function goToContactPage(){
//        // 1. Navigate to Contact Page
//     let contactLink = await driver.wait(
//       until.elementLocated(locators.contactLink), 
//       10000
//     );
//     let oldUrl = await driver.getCurrentUrl();
//     await contactLink.click();
//     // 2. Wait for URL change
//     await driver.wait(async () => {
//       return (await driver.getCurrentUrl()) !== oldUrl;
//     }, 10000);
//     console.log("New URL: ", await driver.getCurrentUrl());
//   }//goToContactPage
   
//   //validateEmptyForm function
//   async function validateEmptyForm(){    
//       // 3. EMPTY FIELDS TEST
//       console.log("Error messages verification...");      
//       await clickElement(locators.submitBtn);
//       await driver.wait(async () => {
//       const errors = await driver.findElements(locators.errorMessages);
//       return errors.length > 0; }, 5000);
//       const errorMessages = await driver.findElements(locators.errorMessages);

//       let isAnyVisible = false;
//       for(let error of errorMessages){
//         if(await error.isDisplayed()){
//           isAnyVisible = true;
//           break;
//         }
//       }//for loop      
//       if (!isAnyVisible) {
//       throw new Error("Error messages are not visible ❌");
//       }// if (!isAnyVisible)

//       console.log("Empty Validation Test: PASSED ✅");      
//     }//validateEmptyForm
  
  //Check Empty Email Field        
 async function checkEmptyEmail() {
  console.log("Checking Empty Email Field...");


  await contactPage.fillFirstName("Omar");
  await contactPage.fillLastName("El Arqam");
  await contactPage.fillEmail("");  // Empty in purpose
  await contactPage.fillSubject("QA Test");  
  await contactPage.fillMessage("Test message");  
  await contactPage.submit();

  await driver.wait(async () => {
    const errors = await driver.findElements(locators.errorMessages);
    return errors.length > 0;
  }, 5000);

  const errors = await driver.findElements(locators.errorMessages);

  console.log("Error elements found:", errors.length);

  if (errors.length > 0) {
    console.log("Empty Email Test: PASSED ✅");
  } else {
    console.log("Empty Email Test: FAILED ❌");
  }
}//checkEmptyEmail

  //check Invalid Email Format
async function checkInvalidEmailFormat() {
    console.log("Checking invalid email format...");

  await contactPage.fillFirstName("Omar");
  await contactPage.fillLastName("El Arqam");
  await contactPage.fillEmail("test.com");  // invalid email format
  await contactPage.fillSubject("QA Test");  
  await contactPage.fillMessage("Test message"); 
  await contactPage.submit();
  const oldUrl = await driver.getCurrentUrl();
  
  await driver.wait(async()=>{
    const errors = await driver.findElements(locators.errorMessages);
    const newUrl = await driver.getCurrentUrl();
    return (errors.length > 0 && newUrl === oldUrl);
  },5000);

  const errors = await driver.findElements(locators.errorMessages);
  const newUrl = await driver.getCurrentUrl();
  console.log("Error elements found:", errors.length);
  console.log("New Url :", newUrl);


  if (errors.length>0 && newUrl === oldUrl) {    
    console.log("Invalid Email Format Check: PASSED ✅");
    console.log("Errors found: " + errors.length);
    console.log("New Url :", newUrl);
  } else {
    throw new Error("Invalid Email Format Check: Failed ❌")
    //console.log("Invalid Email Format Check: Failed ❌");    
  }

}//checkInvalidEmailFormat

  //fillContactForm function 
  async function fillContactForm() {
      // 4. FILLING THE FORM
    await fillField(locators.firstName,"Omar");
    await fillField(locators.lastName, "El Arqam");
    await fillField(locators.email, "test@test.com"); 
    await fillField(locators.subject, "QA Test");  
    await fillField(locators.message, "Test message"); 
  }//fillContactForm
  // submitForm function
  async function submitForm() {
    // 5. FINAL SUBMISSION
    await clickElement(locators.submitBtn);
    console.log("Form submitted ✅");
  }//submitForm
  
  // verifySuccessMessage function
  async function verifySuccessMessage() {
     // 6. VALIDATE SUCCESS
    let messageSuccessful = await driver.wait(
      until.elementLocated(locators.successMessage), 
      10000
    )
    await driver.wait(until.elementIsVisible(messageSuccessful), 5000);

    const isVisible = await messageSuccessful.isDisplayed();
    if(!isVisible){
      throw new Error("Success Message Not Visible");
    }
  }////verifySuccessMessage

  try {    
    await driver.get("https://omarwebsolutions.com/");    
    await goToContactPage();
    await checkEmptyEmail();
    await driver.navigate().refresh();
    await checkInvalidEmailFormat();
    await driver.navigate().refresh();
    await validateEmptyForm();
    await driver.navigate().refresh();
    await fillContactForm();   
    await submitForm();
    await verifySuccessMessage();
  } //try
  catch (error) {
    console.log("Error: ", error.message);
  } 
  finally {
    if (driver) {
      await driver.quit();
    }
  }
}

fillForm();
