import { browser, by, element, Key } from 'protractor';

describe('User login test', () => {
    browser.waitForAngularEnabled(false);

    it('should show navbar sign up and login', async() => {
        let result = false;
        const signUpExists = await element(by.name('signup')).isPresent();
        const loginExists = await element(by.name('login')).isPresent();
        result = signUpExists && loginExists ? true :  false;
        expect(result).toBe(true);
    });

    it('should not possible to login user -> password wrong', async() => {
        await element(by.name('login')).click();
        await element(by.name('email')).sendKeys('harry@hacker.de', Key.RETURN);
        await element(by.name('password')).sendKeys('test123456', Key.RETURN);
        await browser.sleep(3000);
        const alert = await element(by.className('alert')).isPresent();
        expect(alert).toBe(true);
    });

    it('should possible to login user', async() => {
        await element(by.name('password')).clear();
        await element(by.name('password')).sendKeys('test1234', Key.RETURN);
        await browser.sleep(3000);
        const signout = await element(by.name('signout')).isPresent();
        expect(signout).toBe(true);
    });

    it('should show navbar sign out and my account', async() => {
        let result = false;
        const myAccount = await element(by.name('myAccount')).isPresent();
        const signout = await element(by.name('signout')).isPresent();
        result = myAccount && signout ? true : false;
        expect(result).toBe(true);
    });
});
