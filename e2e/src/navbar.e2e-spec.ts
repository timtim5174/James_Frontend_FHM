import { browser, by, element } from 'protractor';

describe('Navbar Test', () => {
    browser.waitForAngularEnabled(false);

    it('should show navbar sign up and login', async () => {
        let result = false;
        await browser.get('http://localhost:4200');
        const signUpExists = await element(by.name('signup')).isPresent();
        const loginExists = await element(by.name('login')).isPresent();
        if (signUpExists && loginExists) {
            result = true;
        }
        expect(result).toBe(true);
    });
});
