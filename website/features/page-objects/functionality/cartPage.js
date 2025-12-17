import cartPage from "../../page-objects/locators/cartPage.js";
import { elementClick, elementWaitForDisplayed, checkElementTextContains, elementSetValue } from "../../helpers/element-action-util.js";

class Cart {

  async addToCartAndVerified(items) {
    const convertElement = items.toLowerCase().replace(/\s+/g, '-')
    console.log(convertElement);
    await elementClick(await cartPage.addItemsToCart(convertElement))
    await checkElementTextContains(await cartPage.itemsCount(),"1")
    await elementClick(await cartPage.cart())
    await elementWaitForDisplayed(await cartPage.titleItems())
    await checkElementTextContains(await cartPage.titleItems(),items)
    await browser.pause(10000)

  }

  async login() {
    await elementWaitForDisplayed(await cartPage.loginButton())
    await elementSetValue(await cartPage.userNameField(),"standard_user")
    await elementSetValue(await cartPage.passwordField(),"secret_sauce")
    await elementClick(await cartPage.loginButton())
    await elementWaitForDisplayed(await cartPage.title())
    await checkElementTextContains(await cartPage.title(),"Products")
  }

  
}
export default new Cart();
