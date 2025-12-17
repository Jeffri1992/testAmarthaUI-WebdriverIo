import aboutPage from "../../page-objects/locators/aboutPage.js";
import cartPage from "../../page-objects/locators/cartPage.js";
import { elementClick, checkIsElementDisplayed, elementWaitForDisplayed, checkElementTextContains } from "../../helpers/element-action-util.js";

class About {

  async redirectToAboutAndVerified() {
    await elementWaitForDisplayed(await cartPage.title())
    await checkElementTextContains(await cartPage.title(),"Products")
    await elementClick(await aboutPage.burgerMenu())
    await browser.pause(3000) //load choices
    await elementClick(await aboutPage.aboutMenu())
    await checkIsElementDisplayed(await aboutPage.bookButton())
    await checkIsElementDisplayed(await aboutPage.signUpButton())
  }


  
}
export default new About();
