const { Builder, By } = require('selenium-webdriver');
const path = require('path');
const assert = require('assert');

const indexPath = path.join(__dirname, '../src/index.html');
let driver;

async function setup() {
      driver = await new Builder().forBrowser('chrome').build();
      await driver.get(`file://${indexPath}`);
      return driver;
}

async function runTest() {
      try {
            await whenZoneIsClickedDescriptionShouldBeDisplayed();
      } catch (e) {
            console.log("Some tests failed:");
            await driver.quit();
            throw e;
      }
      console.log("All tests succeeded!");
}

async function whenZoneIsClickedDescriptionShouldBeDisplayed() {
      const driver = await setup();

      const zone = await driver.findElement(By.css('.zone'));
      const description = await driver.findElement(By.css('.description'));

      await zone.click();
      const classList = await description.getAttribute("class");
      assert(classList.includes("shown"));
      assert(!classList.includes("hidden"));

      await driver.quit();
}

runTest();
