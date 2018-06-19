import { browser, by, element} from 'protractor';

describe('Transaction update test', () => {
    browser.waitForAngularEnabled(false);

    it('should be possible to update transaction', async() => {
        await element(by.className('fa-edit')).click();
        await element(by.name('amount')).clear();
        await element(by.name('amount')).sendKeys(-30);
        await element(by.className('btn-success')).click();
        await browser.sleep(2000);
        const result = await element(by.className('modal-title')).isPresent();
        expect(result).toBe(false);
    });
});
