import { expect } from "chai";

export const deleteValue = async (element) => {
  await element.click();
  await browser.keys(['Control', 'a']);
  await browser.keys('Delete');
};

export const clickDataItems = async (element) => {
  await $('[data-item="' + element + '"]').waitForDisplayed({ timeout: 10000 });
  await $('[data-item="' + element + '"]').click();
};

export const checkButtonDestination = async (button, destination) => {
  await elementScrollIntoClick(button);
  await elementWaitForDisplayed(destination);
  await browser.back();
};

export const elementWaitForDisplayed = async (element, waitingTime) => {
  if (waitingTime === undefined) {
    waitingTime = 15000;
  }
  await element.waitForDisplayed({ timeout: waitingTime });
};

export const elementWaitForClickable = async (element, waitingTime) => {
  if (waitingTime === undefined) {
    waitingTime = 15000;
  }
  await element.waitForClickable({ timeout: waitingTime });
};

export const elementScrollIntoClick = async (element) => {
  await element.waitForExist({ timeout: 15000 });
  await element.scrollIntoView({ block: 'center', inline: 'nearest' });
  await element.click();
};

export const elementScrollIntoView = async (element) => {
  await element.scrollIntoView({ block: 'center', inline: 'nearest' });
};

export const elementhorizontalScrollUntilFound = async (selector, maxAttempts = 5, scrollAmount = 300) => {
  for (let i = 0; i < maxAttempts; i++) {
    const scrollable = await selector;
    const isExisting = await scrollable.isExisting();

    if (isExisting) {
      // Scroll the element horizontally
      await browser.execute((el, amount) => {
        el.scrollBy(amount, 0);
      }, scrollable, scrollAmount);

      return; // success
    }

    // Wait a bit before retrying
    await browser.pause(1500);
  }

  throw new Error(`Scrollable element with selector "${selector}" not found after ${maxAttempts} attempts.`);
};

export const elementWaitForDisplayedIntoClick = async (element) => {
  await element.waitForDisplayed({ block: 'center', inline: 'nearest' });
  await element.click();
};

export const elementClick = async (element) => {
  await element.waitForExist({ timeout: 15000 });
  await element.click();
};

export const elementClickByCoordinate = async (element, width) => {
  await element.click({ x: width });
};

export const elementIsDisplayedInViewport = async (element) => {
  return await element.isDisplayedInViewport();
};

export const elementIsDisplayed = async (element) => {
  return await element.isDisplayed();
};

export const elementIsExisting = async (element) => {
  return await element.isExisting();
};

export const elementIsClickable = async (element) => {
  return await element.isClickable();
};

export const elementLength = async (element) => {
  return await element.length;
};

export const elementGetText = async (element) => {
  return await element.getText();
};

export const elementSetValue = async (element, value) => {
  return await element.setValue(value);
};

export const elementAddValue = async (element, value) => {
  return await element.addValue(value);
};

export const elementSelectByText = async (element, value) => {
  await element.waitForExist({ timeout: 15000 });
  return await element.selectByVisibleText(value);
};

export const elementselectByAttribute = async (element, value) => {
  await element.waitForExist({ timeout: 15000 });
  return await element.selectByAttribute('value', value);
};

export const elementselectByIndex = async (element, index) => {
  await element.waitForExist({ timeout: 15000 });
  return await element.selectByIndex(index);
};

export const elementGetValue = async (element, value) => {
  return await element.getValue(value);
};

export const deleteReactValue = async (element) => {
  const temp = await element;
  const currentValue = await temp.getValue();
  const length = currentValue.length;

  // Move cursor to the end (if needed)
  await browser.keys(['End']); // or ['ArrowRight'] repeated, depending on environment

  for (let i = 0; i < length; i++) {
    await browser.keys('Backspace');
    await browser.pause(1000);//clear data every 500 miliseconds
  }
  await browser.pause(3500);//load empty value
};

export const elementGetAttribute = async (element, attribute) => {
  return await element.getAttribute(attribute);
};

export const waitUntilElementVisible = async (element) => {
  try {
    // Wait until the element is displayed
    await browser.waitUntil(async () => {
      return await element.isDisplayed();
    }, { timeout: 15000, timeoutMsg: 'Element is not displayed within 15 seconds.' });

    // Once the element is displayed, return true
    return true;
  } catch (error) {
    // Handle any errors or timeout
    console.error("An error occurred while waiting for the element to be displayed:", error);
    return false;
  }
};

export const arrayIncludesInObj = (arr, valueToCheck) => {
  return arr.some(value => value === valueToCheck);
};

export const checkIsElementDisplayed = async (element) => {
  const isDisplayed = await element.isDisplayed();
  expect(isDisplayed).to.be.true;
};

export const checkIsElementNotSelected = async (element) => {
  const isDisplayed = await element.isSelected();
  expect(isDisplayed).to.be.false;
};

export const checkIsElementSelected = async (element) => {
  const isDisplayed = await element.isSelected();
  expect(isDisplayed).to.be.true;
};

export const checkIsElementNotDisplayed = async (element) => {
  const isDisplayed = await element.isDisplayed();
  expect(isDisplayed).to.be.false;
};

export const checkElementText = async (element, expectedResult) => {
  if (typeof element === 'object') {
    element = await element.getText();
  }
  expect(element).to.equals(expectedResult);
};

export const checkElementValue = async (element, expectedResult) => {
  if (typeof element === 'object') {
    element = await element.getValue();
  }
  expect(element).to.equals(expectedResult);
};

export const checkElementTextIncludes = async (element, expectedResult) => {
  if (typeof element === 'object') {
    element = await element.getText();
  }
  expect(element).to.includes(expectedResult);
};

export const checkElementTextContains = async (element, expectedResult) => {
  if (typeof element === 'object') {
    element = await element.getText();
  }
  expect(element).to.contains(expectedResult);
};

export const checkElementAttribute = async (element, attribute, expectedResult) => {
  const elementText = await element.getAttribute(attribute);
  expect(elementText).to.equals(expectedResult);
};

export const checkIsElementEnabled = async (element) => {
  const isEnabled = await element.isEnabled();
  expect(isEnabled).to.be.true;
};

export const checkIsElementDisabled = async (element) => {
  const isEnabled = await element.isEnabled();
  expect(isEnabled).to.be.false;
};

export const checkIsElementExist = async (element) => {
  const isExisting = await element.isExisting();
  expect(isExisting).to.be.true;
};

export const checkIsElementClickable = async (element) => {
  const isClickable = await element.isClickable();
  expect(isClickable).to.be.true;
};

export const checkIsElementNotClickable = async (element) => {
  const isClickable = await element.isClickable();
  expect(isClickable).to.be.false;
};

export const assertElementBetweenData = async (data1, data2, tolerance) => {
  expect(data1).to.be.approximately(data2, tolerance);
};

