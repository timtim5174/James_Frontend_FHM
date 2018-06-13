import { browser, by, element, Key, until, WebElement } from 'protractor';
import { async } from '@angular/core/testing';

describe('Navbar Test', () => {
    browser.waitForAngularEnabled(false);
    beforeEach(async () => {
        await browser.get('http://localhost:4200');
        browser.manage().window().maximize();
    });

    it('should show navbar sign up and login', async () => {
        let result = false;
        const signUpExists = await element(by.name('signup')).isPresent();
        const loginExists = await element(by.name('login')).isPresent();
        result = signUpExists && loginExists ? true :  false;
        expect(result).toBe(true);
    });

    it('should show navbar sign out and my account', async() => {
        let result = false;
        await element(by.name('login')).click();

        // Login in
        const email: WebElement = element(by.name('email'));
        const password: WebElement = element(by.name('password'));
        email.sendKeys('tim@test.de', Key.RETURN);
        password.sendKeys('test1234', Key.RETURN);
        await browser.sleep(3000);

        const myAccount = await element(by.name('myAccount')).isPresent();
        const signout = await element(by.name('signout')).isPresent();
        result = myAccount && signout ? true : false;
        expect(result).toBe(true);
    });
});
