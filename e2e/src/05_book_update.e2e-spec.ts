import { browser, by, element, Key, until} from 'protractor';

describe('Book update test', () => {
    browser.waitForAngularEnabled(false);

    it('should be possible to update book name', async() => {
        await browser.actions().mouseMove(element(by.className('settings'))).perform();
        await element(by.className('settings')).click();
        const title = element(by.name('title'));
        await title.clear();
        await title.sendKeys('E2E update name');
        await element(by.className('btn-success')).click();
        await browser.sleep(2000);
        const result = await element(by.className('modal-title')).isPresent();
        expect(result).toBe(false);
    });
});
