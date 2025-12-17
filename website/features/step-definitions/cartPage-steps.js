import { Then , Given} from '@wdio/cucumber-framework';

import cartPage from '../page-objects/functionality/cartPage.js';

Given('User go to SauceDemo website and Login', async function () {
  await browser.reloadSession();
  await browser.url("https://www.saucedemo.com/")
  await cartPage.login()
});

Then('User select {string} and verified it', async function (items) {
  await cartPage.addToCartAndVerified(items)
});

