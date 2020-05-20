import { element, by } from "protractor";

export const googleHomePageElements = {
    searchField: element(by.xpath(`//input[@title="Search"]`)),
    searchButton: element.all(by.xpath(`//input[@value="Google Search"]`)).get(0),

    // results page elements
    exactTimeNowButton: element(by.xpath(`//*[contains(text(),"Time.is - exact time, any time zone")]`)),

}
