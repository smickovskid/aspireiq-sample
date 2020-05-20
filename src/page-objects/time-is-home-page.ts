import { element, by } from "protractor";

export const timeIsHomePageElements = {
    acceptCookiesButton: element(by.xpath(`//button[contains(text(),"I accept")]`)),
    cookieOverlay: element(by.id(`qcCmpUi`)),
    losAngelesTimeButton: element.all(by.xpath(`//a[@href="Los_Angeles"]`)).get(0),


}