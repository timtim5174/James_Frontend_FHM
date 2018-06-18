import { browser, by, element, Key} from 'protractor';

describe('Book create test', () => {
    browser.waitForAngularEnabled(false);

    it('should not be possible to create book --> missing value', async() => {
        await element(by.className('new-book')).click();
        const result = element(by.className('btn-success')).isEnabled();
        expect(result).toBe(false);
    });

    it('should be possible to create a book', async () => {
        await element(by.name('title')).sendKeys('E2E create book test');
        const result = await element(by.className('btn-success')).isEnabled();
        await element(by.className('btn-success')).click();
        await browser.sleep(3000);
        expect(result).toBe(true);
    });
});
