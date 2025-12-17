import { Then , Given} from '@wdio/cucumber-framework';

import aboutPage from '../page-objects/functionality/aboutPage.js';

Then('User check and verified redirection about', async function () {
  await aboutPage.redirectToAboutAndVerified()
});

