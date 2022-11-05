const Browser = require("../../../Services/Puppeteer/browser");
const File = require('../../../Services/File/file')
const Estate = require("../Models/Estate");
const RealEstate = require("../Models/RealEstate");

class Index extends Browser {

    async getBasicInfo() {

        await this.startBrowser();

        const provinces = await this.getMunicipalities();

        const file = new File();
        file.writeFile(provinces);

        const realEstates = [];
        for (const province of provinces) {
            const realEstatesProvince = await this.getRealEstates(province);
            realEstates.push({
                'province': province,
                'realEstates': realEstatesProvince,
            });
        }
        console.log('End Crawling')

        return realEstates;
    }

    async getInfoByProvince(province) {
        await this.startBrowser();

        return await this.getRealEstates(province);
    }

    // TODO: Municipalities Model Object
    async getMunicipalities() {
        await this.startBrowser();

        await this.goTo('https://www.idealista.com/alquiler-viviendas/#municipality-search');

        const provinces = [];
        const provinceList = await this.page.$$('div.locations-list > ul > li');

        for (const a of provinceList) {
            const total = await a.$eval('p', (el) => el.textContent);
            const province = await a.$eval('a', (el) => el.textContent);
            let url = await a.$eval('a', (el) => el.href);

            const splited = url.split('/');
            const joined = splited.join('/') + '/agencias-inmobiliarias-1';

            url = joined.replace('/alquiler-viviendas', '/pro/alquiler-viviendas')
                .replace('/municipios', '')

            splited.pop();

            provinces.push({
                total: total,
                province: province,
                url: url,
            });

            console.log(total + '-' + province + '-' + url);
        }

        await this.goTo('https://www.idealista.com/venta-viviendas/#municipality-search');

        const saleProvinceList = await this.page.$$('div.locations-list > ul > li');

        for (const [index, b] of saleProvinceList.entries()) {
            const total = await b.$eval('p', (el) => el.textContent);

            provinces[index].saleTotal = total;
        }

        return provinces;
    }

    async getRealEstates(province) {
        await Promise.all([
            this.goTo(province.url),
            this.waitForSelector('ul.paginator'),
        ])

        const total = await this.page.$('ul.paginator');

        let maxPage = 1;
        if (total) {
            const last = await total.$('li.next');
            const prev = await last.evaluateHandle(el => el.previousElementSibling);

            maxPage = (await (await prev.getProperty('textContent')).jsonValue()) - 1;

            // TODO: Build Pagination
            console.log('aa', maxPage);
        }

        const realEstatesLinks = [];
        let currentUrl = province.url;
        for (let i = 0; i < maxPage - 1; i++) {

            const stateBoxes = await this.page.$$('div.secondary-list > article');

            for (const boxes of stateBoxes) {
                const link = await boxes.$eval('a', (el) => el.href);
                const name = await boxes.$eval('a > span.expert-info-container > span.item-link', (el) => el.textContent);

                realEstatesLinks.push(link);
            }

            console.log('crajwlejem ' + currentUrl);

            // TODO ( more than 1 number ?? change to split by -)
            let splited = currentUrl.split('-');
            let currentNum = parseInt(splited.slice(-1)[0]) + 1;
            splited[splited.length - 1] = [currentNum];
            currentUrl = splited.join('-');

            try {
                await Promise.all([
                    this.goTo(currentUrl),
                    this.waitForSelector('div.secondary-list > article', {
                        timeout: 0
                    }),
                ])
            } catch (e) {

            }

        }

        return realEstatesLinks;
    }

    async getRealEstate(url) {
        if (!this.page) {
            await this.startBrowser();
        }

        if (!url) return null;
        await Promise.all([
            this.goTo(url),
            this.waitForSelector('div#office-container'),
        ])
        //TODO: Real Estate Model Construction
        const model = new RealEstate();

        model.vendor_link = url;

        const officeBox = await this.page.$('div#office-container');

        const name = await officeBox.$('h1#commercial-name');
        if (name) {
            model.name = (await (await name.getProperty('textContent')).jsonValue());
        }

        const location = await officeBox.$('a.showMap');
        if (location) {
            const locationString = (await (await location.getProperty('textContent')).jsonValue());
            const splited = locationString.split('\n');
            const newArr = splited.filter((a) => a);
            model.location.street = newArr[0];
            model.location.city = newArr[1];
        }

        const totalEstates = await officeBox.$('p > span');
        if (totalEstates) {
            model.totalEstates = (await (await totalEstates.getProperty('textContent')).jsonValue());
        }

        const contactBox = await this.page.$('div#office-contact')

        const phone = await contactBox.$('span.icon-phone');
        if (phone) {
            model.phone = (await (await phone.getProperty('textContent')).jsonValue()).replace('\n', '').replace('\n', '');
        }

        const web = await contactBox.$('a.icon-new-tab');
        if (web) {
            model.web = (await (await web.getProperty('href')).jsonValue());
        }

        const types = [
            'venta-viviendas',
            'venta-obranueva',
            'alquiler-viviendas'
        ];

        for (const type of types) {

            if (type !== 'venta-viviendas') {
                await Promise.all([
                    this.goTo(url + type),
                    this.waitForSelector('h2#h1-container'),
                ])
            }

            const forSale = await this.page.$('h2#h1-container');
            if (forSale) {
                const forSaleString = (await (await forSale.getProperty('textContent')).jsonValue());
                let splited = forSaleString.split(':');
                if (type === 'venta-viviendas') {
                    model.forSale = parseInt(splited[1]);
                }

                if (type === 'venta-obranueva') {
                    model.forNewBuilding = parseInt(splited[1]);
                }

                if (type === 'alquiler-viviendas') {
                    model.forRent = parseInt(splited[1]);
                }
            }
        }

        // TODO: Estates Pagination ( no max page detect because cause redirect)

        // TODO: Estate Model Construction
        return model;
    }
}

module.exports = Index;