import { browser, by, element, Key} from 'protractor';

describe('Book tests', () => {
    browser.waitForAngularEnabled(false);

    beforeAll(async() => {
        await browser.get('http://localhost:4200');
        browser.manage().window().maximize();
        await element(by.name('login')).click();
        await element(by.name('email')).sendKeys('tim@test.de', Key.RETURN);
        await element(by.name('password')).sendKeys('test1234', Key.RETURN);
        await browser.sleep(2000);
    });

    afterAll(async() => {
        await element(by.name('cancel')).click();
        await element(by.name('signout')).click();
    });

    it('should not be possible to create book --> missing value', async() => {
        await element(by.className('new-book')).click();
        const result = element(by.name('create')).isEnabled();
        expect(result).toBe(false);
    });

    it('should be possible to create a book', async () => {
        await element(by.name('title')).sendKeys('E2E create book test');
        const result = element(by.name('create')).isEnabled();
        expect(result).toBe(true);
    });
});
