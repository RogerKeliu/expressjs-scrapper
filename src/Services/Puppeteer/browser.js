const puppeteer = require('puppeteer');

class Browser {

    browser;
    page;

    async startBrowser() {
        try {
            console.log("Opening the browser......");
            this.browser = await puppeteer.launch({
                headless: false,
            });
        } catch (err) {
            console.log("Could not create a browser instance => : ", err);
        }

        this.page = await this.browser.newPage();
        await this.page.setDefaultNavigationTimeout(0); 
    }

    async goTo(url = 'www.google.com') {
        await this.page.goto(url, { waitUntil: 'networkidle0', timeout: 0 });
    }

    async waitForSelector(selector) {
        console.log(`Waiting for selector ${selector}`);
        this.page.waitForSelector(selector);
    }
}

module.exports = Browser;