let page;

beforeEach(async () => {
    page = await browser.newPage();
});

afterEach(async () => {
    await page.close();
});

describe("Github page tests", () => {

    beforeEach(async () => {
        await page.goto("https://github.com/team");
    });

    test("The h1 header content'", async () => {
        const firstLink = await page.$("header div div a");
        await firstLink.click();
        await page.waitForSelector('h1');
        const title2 = await page.title();
        expect(title2).toEqual('GitHub: Where the world builds software · GitHub');
    }, 10000);

    test("The first link attribute", async () => {
        const actual = await page.$eval("a", link => link.getAttribute('href'));
        expect(actual).toEqual("#start-of-content");
    }, 10000);

    test("The page contains Sign in button", async () => {
        const btnSelector = ".btn-large-mktg.btn-mktg";
        await page.waitForSelector(btnSelector, {
            visible: true,
        });
        const actual = await page.$eval(btnSelector, link => link.textContent);
        expect(actual).toContain("Sign up for free");
    }, 10000);
});

describe("Bitbucket page tests", () => {

    beforeEach(async () => {
        await page.goto("https://bitbucket.org/product");
    }, 10000);

    test("The title is correct", async () => {
        const title = await page.title();
        expect(title).toBe("Bitbucket | The Git solution for professional teams");
    }, 10000);

    test("The title in the selected language is correct", async () => {
        await page.focus("[name='url']");
        await page.select("[name='url']", "https://bitbucket.org/product/ru");
        const title = await page.title();
        expect(title).toBe("Bitbucket | Git-решение для профессиональных команд");
    }, 10000);

    test("The label error is visible", async () => {
        await page.click("[type='submit']");
        const actual = await page.$eval("[for='et-e3bb2ec9-6479-471c-bdce-76bea62a4c6a']", (el) => el.textContent);
        expect(actual).toContain("This field is required");
    });

});


