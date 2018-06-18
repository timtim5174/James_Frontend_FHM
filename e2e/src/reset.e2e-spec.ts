import { browser, by, element} from 'protractor';

describe('Reset created test data', () => {
    browser.waitForAngularEnabled(false);

    // transaction

    // book
    it('should delete created book', async() => {
        await browser.actions().mouseMove(element(by.className('close'))).perform();
        await element(by.className('close')).click();
        await element(by.name('bookName')).sendKeys('E2E update n');
        await element(by.className('btn-danger')).click();
        await browser.sleep(2000);
        const result = await element(by.className('modal-title')).isPresent();
        expect(result).toBe(false);
    });

    // user
    it('should delete user account', async() => {
        await element(by.name('myAccount')).click();
        await element(by.id('deleteAccount')).click();
        await element.all(by.name('password')).get(1).sendKeys('test1234');
        await element(by.className('btn-danger')).click();
        await browser.sleep(2000);
        const result = await element(by.className('modal-title')).isPresent();
        expect(result).toBe(false);
    });
});
