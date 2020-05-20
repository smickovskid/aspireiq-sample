// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
var protractor = require("protractor");

var browser = protractor.browser;
const { SpecReporter } = require('jasmine-spec-reporter');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  //seleniumAddress: 'http://localhost:4444/wd/hub/',
  allScriptsTimeout: 600000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [
        "--disable-infobars",
        "--start-maximized",
        //"--headless"
      ]
    }
  },

  SELENIUM_PROMISE_MANAGER: false,

  directConnect: true,
  //seleniumServerJar: '../node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.141.59.jar',
  baseUrl: 'http://localhost:44444/',

  framework: 'jasmine2',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 100000000,
    print: function () { },
    stopSpecOnExpectationFailure: true,

  },

  async onPrepare() {

    var AllureReporter = require('jasmine-allure-reporter');

    // @ts-ignore
    jasmine.getEnv().addReporter(new AllureReporter({
      resultsDir: 'allure-results'
    }));    jasmine.getEnv().afterEach(function (done) {
      protractor.browser.takeScreenshot().then(function (png) {
        // @ts-ignore
        allure.createAttachment('Screenshot', function () {
          return new Buffer(png, 'base64')
        }, 'image/png')();
        done();
      })
    });
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });

    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: false } }));
  }
};
