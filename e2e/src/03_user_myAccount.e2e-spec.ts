import { browser, by, element, Key, until } from 'protractor';

describe('User my account test', () => {
    browser.waitForAngularEnabled(false);

    it('should be possible to see the correct user e-mail', async() => {
        await element(by.name('myAccount')).click();
        await browser.sleep(2000);
        const email = await element(by.id('email')).getAttribute('value');
        const firstname = await element(by.id('firstname')).getAttribute('value');
        const lastname = await element(by.id('lastname')).getAttribute('value');
        expect(email).toBe('harry@hacker.de');
        expect(firstname).toBe('Harry');
        expect(lastname).toBe('Hacker');
    });

    it('should be possible to update Lastname', async() => {
        const lastname_value = 'E2E Update Lastname Test';
        const lastname = element(by.id('lastname'));
        await lastname.clear();
        await lastname.sendKeys(lastname_value);
        await element(by.className('btn-primary')).click();
    });
});
