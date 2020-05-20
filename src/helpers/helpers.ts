import { protractor, ElementFinder, element, by } from 'protractor';
import { browser } from 'protractor';
import * as chai from 'chai';


var screenShotUtils = require("protractor-screenshot-utils").ProtractorScreenShotUtils;
declare const allure: any;
screenShotUtils = new screenShotUtils({
    browserInstance: browser
});

// Set default timeout for the functions here
const timeOutDuration = 40000;


/**
 * Takes a full page screenshot and attaches it to the current step
 * @param {string} context
 */
export const takeScreenshot = async (context: string = "Screenshot") => {
    let png = await screenShotUtils.takeScreenshot();
    // @ts-ignore
    await allure.createAttachment(context, function () {
        return new Buffer(png, 'base64')
    }, 'image/png')();
}


/**
 * Waits for element to be clickable
 * @param {ElementFinder} elem
 * @param {number} waitTime - optional parameter
 * @param {boolean} screenshot - optional parameter and whether to take a screenshot
 */
export const waitForElementToBeClickable = async (elem: ElementFinder, waitTime: number = timeOutDuration, screenshot = false) => {
    await allure.createStep(`Wait for ${elem.locator().toString()} to  be clickable`, async () => {
        var EC = protractor.ExpectedConditions;
        // Waits for the element with id 'abc' to be clickable.
        await protractor.browser.wait(EC.elementToBeClickable(elem), waitTime, `${elem.locator().toString()} isn't clickable`);

        if (screenshot)
            await takeScreenshot();
    })();
}

/**
 * Waits for element to be visible
 * @param {ElementFinder} elem
 * @param {number} waitTime - optional parameter
 * @param {boolean} screenshot - optional parameter and whether to take a screenshot
 */
export const waitForElementToBeVisible = async (elem: ElementFinder, waitTime: number = timeOutDuration, screenshot = false) => {
    await allure.createStep(`Wait for ${elem.locator().toString()} to be visible`, async () => {
        var until = protractor.ExpectedConditions;
        await protractor.browser.wait(until.visibilityOf(elem), waitTime, `${elem.locator().toString()} didn't appear in the DOM`);

        if (screenshot)
            await takeScreenshot();
    })();
}


/**
 * Clicks on element with retry (this is to catch other element would receive the click exceptions)
 * @param {ElementFinder} elem
 * @param {number} retryCount - optional parameter for the retries n * 1000ms
 * @param {boolean} screenshot - optional parameter and whether to take a screenshot
 */
export const clickOnElement = async (elem: ElementFinder, retryCount: number = 5, screenshot = false) => {
    await allure.createStep(`Click on ${elem.locator().toString()}`, async () => {

        await waitForElementToBeClickable(elem);
        await browser.sleep(500);
        while (retryCount) {
            try {
                await elem.click();
                retryCount = 0;
            }
            catch (e) {
                if (retryCount === 0)
                    throw `Couldn't click element: ${elem.locator().toString()}`;
                await browser.sleep(1000);
                retryCount--;
            }
        }

        if (screenshot)
            await takeScreenshot();
    })();
}


/**
 * Enters provided text in element with retry (this is to catch stale element locations)
 * @param {ElementFinder} elem
 * @param {string} text
 * @param {number} retryCount - optional parameter for the retries n * 1000ms
 * @param {boolean} screenshot - optional parameter and whether to take a screenshot
 */
export const enterTextInField = async (elem: ElementFinder, text: string, retryCount: number = 5, screenshot = false) => {
    await allure.createStep(`Enter ${text} in ${elem.locator().toString()}`, async () => {
        await waitForElementToBeClickable(elem);
        while (retryCount) {
            try {
                await elem.sendKeys(text);
                retryCount = 0;
            }
            catch (e) {
                if (retryCount === 0)
                    throw `Couldn't enter text in element: ${elem.locator().toString()}`;
                await browser.sleep(1000);
                retryCount--;
            }
        }

        if (screenshot)
            await takeScreenshot();
    })();
}

/**
 * Enters provided text in xpath element by text with retry (this is to catch stale element locations)
 * @param {ElementFinder} elem
 * @param {string} type
 * @param {string} text - element text
 * @param {string} textToEnter - the text to be entered in the element
 * @param {number} elemIndex - optional parameter to fetch the element at the provider index (default = 0)
 * @param {number} retryCount - optional parameter for the retries n * 1000ms
 * @param {boolean} screenshot - optional parameter and whether to take a screenshot
 * @example
 * enterTextInXpathByTextField('td', 'Some text', 'Hello world'); // this translates to 'element(by.xpath(`//td[contains(text(),"Some text")]`))'
 */
export const enterTextInXpathByTextField = async (type: string, text: string, textToEnter: string, elemIndex = 0, retryCount: number = 5, screenshot = false) => {
    await allure.createStep(`Enter ${text} in //${type}[contains(text(),${textToEnter})]`, async () => {
        const elem = element.all(by.xpath(`//${type}[contains(text(),${textToEnter})]`)).get(elemIndex);
        await waitForElementToBeClickable(elem);
        while (retryCount) {
            try {
                await elem.sendKeys(text);
                retryCount = 0;
            }
            catch (e) {
                if (retryCount === 0)
                    throw `Couldn't enter text in element: ${elem.locator().toString()}`;
                await browser.sleep(1000);
                retryCount--;
            }
        }

        if (screenshot)
            await takeScreenshot();
    })();
}

/**
 * Enters provided text in xpath element by text with retry (this is to catch stale element locations)
 * @param {ElementFinder} elem
 * @param {string} text - what text to enter
 * @param {number} elemIndex - optional parameter to fetch the element at the provider index (default = 0)
 * @param {number} retryCount - optional parameter for the retries n * 1000ms
 * @param {boolean} screenshot - optional parameter and whether to take a screenshot
 * @example
 * enterTextInXpathByTextField('//button[@name="Some name"]');
 */
export const enterTextInXpathField = async (xpathLocator: string, text: string, elemIndex: number = 0, retryCount: number = 5, screenshot: boolean = false) => {
    await allure.createStep(`Enter ${text} in ${xpathLocator}`, async () => {
        const elem = element.all(by.xpath(xpathLocator)).get(elemIndex);
        await waitForElementToBeClickable(elem);
        while (retryCount) {
            try {
                await elem.sendKeys(text);
                retryCount = 0;
            }
            catch (e) {
                if (retryCount === 0)
                    throw `Couldn't enter text in element: ${elem.locator().toString()}`;
                await browser.sleep(1000);
                retryCount--;
            }
        }

        if (screenshot)
            await takeScreenshot();
    })();
}
