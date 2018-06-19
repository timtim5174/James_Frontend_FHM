import { browser, by, element} from 'protractor';

describe('Transaction create test', () => {
    browser.waitForAngularEnabled(false);

    it('should not be possible to create transaction --> amount missing', async() => {
        await element(by.className('btnTrash')).click();
        await element(by.name('title')).sendKeys('E2E create transaction');
        const result = await element(by.className('btn-success')).isEnabled();
        expect(result).toBe(false);
    });

    it('should be possible to create transaction', async() => {
        await element(by.name('amount')).sendKeys(-15);
        await element(by.className('btn-success')).click();
        await browser.sleep(3000);
        const result = await element(by.className('modal-title')).isPresent();
        expect(result).toBe(false);
    });
});
