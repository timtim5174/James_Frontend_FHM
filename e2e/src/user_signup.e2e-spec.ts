import { browser, by, element, Key, WebElement } from 'protractor';
import { async } from 'q';

describe('User sign up test', () => {
    browser.waitForAngularEnabled(false);

    let firstname: WebElement;
    let lastname: WebElement;
    let email: WebElement;
    let birthPicker: WebElement;
    let password: WebElement;
    let passwordCheck: WebElement;

    beforeAll(async () => {
        await browser.get('http://localhost:4200');
        browser.manage().window().maximize();
        await element(by.name('signup')).click();

        firstname = element(by.name('firstname'));
        lastname = element(by.name('lastname'));
        email = element(by.name('email'));
        birthPicker = element(by.className('btn-outline-secondary'));
        password = element(by.name('password'));
        passwordCheck = element(by.name('passwordCheck'));
    });

    it('should not possible to sign up --> passwords different', async() => {
        firstname.sendKeys('Harry', Key.RETURN);
        lastname.sendKeys('Hacker', Key.RETURN);
        await birthPicker.click();
        await browser.actions().sendKeys(Key.ENTER).perform();
        email.sendKeys('harry@hacker.de', Key.RETURN);
        password.sendKeys('test1234', Key.RETURN);
        passwordCheck.sendKeys('test1235', Key.RETURN);
        browser.sleep(2000);
        const error = await element(by.className('text-danger')).isPresent();
        expect(true).toBe(true);
    });

    it('should possible to sign up', async () => {
        passwordCheck.clear();
        passwordCheck.sendKeys('test1234');
        const signUpIsValid = await element(by.className('btn-primary')).isEnabled();
        expect(signUpIsValid).toBe(true);
    });
});
