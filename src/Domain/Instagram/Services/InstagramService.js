const Browser = require("../../../Services/Puppeteer/browser");

class Index extends Browser {

    async getBasicInfo() {

        await this.startBrowser();

        await Promise.all([
            this.goTo('https://www.instagram.com/'),
            this.waitForSelector('div.x7r02ix > div > button'),
        ])

        const elements = await this.page.$$('div.x7r02ix > div > button');
        console.log('aaaa');
        for(const element of elements) {
            const total = (await (await element.getProperty('textContent')).jsonValue())
            console.log('b', total)
        }

        console.log('finish');

        process.exit;

        return false;
    }
}

module.exports = Index;