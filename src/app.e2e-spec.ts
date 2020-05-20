import { browser } from 'protractor';
import 'jasmine';
import * as h from './helpers/helpers';
import { googleHomePageElements } from './page-objects/google-home-page';
import { timeIsHomePageElements } from './page-objects/time-is-home-page';
import * as chai from 'chai';
var expect = chai.expect;

describe('Get the exact time now based on location', () => {
  beforeEach(() => { });

  it('Navigates to google', async () => {
    await browser.waitForAngularEnabled(false);
    await browser.get('https://www.google.com/en');
    let currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).have.string('https://www.google.com/');
  });

  it('Enters text in the search bar', async () => {
    await h.waitForElementToBeVisible(googleHomePageElements.searchField);
    await googleHomePageElements.searchField.sendKeys("Exact time now");
  })

  it('Clicks the Google Search button', async () => {
    await  h.waitForElementToBeClickable(googleHomePageElements.searchButton);
    await googleHomePageElements.searchButton.click();
  })

  it('Clicks the Exact time now webpage link from results', async () => {
    await  h.waitForElementToBeClickable(googleHomePageElements.exactTimeNowButton);
    await googleHomePageElements.exactTimeNowButton.click();
  })

  it('Clicks the Los Angeles time button', async () => {
    await  h.waitForElementToBeVisible(timeIsHomePageElements.losAngelesTimeButton);
    await h.clickOnElement(timeIsHomePageElements.losAngelesTimeButton)
  })


  it('Checks the website url', async () => {
    let currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).to.have.string('https://time.is/Los_Angeles');
  })
});
