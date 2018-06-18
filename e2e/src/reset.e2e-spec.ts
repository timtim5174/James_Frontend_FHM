import { browser, by, element, Key, until} from 'protractor';

describe('Reset created test data', () => {
    browser.waitForAngularEnabled(false);

    // transaction

    // book
    it('should delete created book', async() => {
        await browser.actions().mouseMove(element(by.className('close'))).perform();
        await element(by.className('close')).click();
        await element(by.name('bookName')).sendKeys('E2E create b');
        await element(by.className('btn-danger')).click();
    });

    // user
    xit('should delete user account', async() => {
        await element(by.name('myAccount')).click();
    });
});
