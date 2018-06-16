import { browser, by, element, Key } from 'protractor';

describe('User my account test', () => {
    browser.waitForAngularEnabled(false);

    beforeAll(async () => {
        await browser.get('http:/localhost:4200');
        browser.manage().window().maximize();
        await element(by.name('login')).click();
        await element(by.name('email')).sendKeys('tim@test.de', Key.RETURN);
        await element(by.name('password')).sendKeys('test1234', Key.RETURN);
        await browser.sleep(2000);
    });

    afterAll(async() => {
        await element(by.name('signout')).click();
    });

    it('should be possible to see the correct user infos', async() => {
        await element(by.name('myAccount')).click();
        const email = element(by.id('email')).getAttribute('value');
        await browser.sleep(2000);
        expect(email).toBe('tim@test.de');
    });
});
