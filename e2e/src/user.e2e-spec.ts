import { browser, by, element, Key, WebElement } from 'protractor';
import { async } from 'q';

describe('User test', () => {
    browser.waitForAngularEnabled(false);
    let email: WebElement;
    let password: WebElement;

    beforeEach(async() => {
        await browser.get('http:/localhost:4200');
        browser.manage().window().maximize();
    });

    // Login
    it('should not possible to login user -> password wrong', async() => {
        await element(by.name('login')).click();
        email = element(by.name('email'));
        password = element(by.name('password'));
        email.sendKeys('tim@test.de', Key.RETURN);
        password.sendKeys('test123456', Key.RETURN);
        await browser.sleep(3000);
        const alert = await element(by.className('alert')).isPresent();
        expect(alert).toBe(true);
    });

    it('should possible to login user', async() => {
        await element(by.name('login')).click();
        email.sendKeys('tim@test.de', Key.RETURN);
        password.sendKeys('test1234', Key.RETURN);
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
