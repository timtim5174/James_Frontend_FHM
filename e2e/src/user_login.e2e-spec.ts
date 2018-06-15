import { browser, by, element, Key, WebElement } from 'protractor';

describe('User login test', () => {
    browser.waitForAngularEnabled(false);

    beforeAll(async() => {
        await browser.get('http:/localhost:4200');
        browser.manage().window().maximize();
        await element(by.name('login')).click();
        await element(by.name('email')).sendKeys('tim@test.de', Key.RETURN);
    });

    // Login
    it('should not possible to login user -> password wrong', async() => {
        await element(by.name('password')).sendKeys('test123456', Key.RETURN);
        await browser.sleep(3000);
        const alert = await element(by.className('alert')).isPresent();
        expect(alert).toBe(true);
    });

    it('should possible to login user', async() => {
        await element(by.name('password')).clear();
        await element(by.name('password')).sendKeys('test1234', Key.RETURN);
        await browser.sleep(3000);
        const alert = await element(by.className('alert')).isPresent();
        expect(alert).toBe(false);
    });

    it('should sign out user', async() => {
        await element(by.name('signout')).click();
        const alert = await element(by.className('alert')).isPresent();
        expect(alert).toBe(true);
    });
});
