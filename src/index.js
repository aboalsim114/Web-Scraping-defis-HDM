const puppeteer = require('puppeteer');
const fs = require('fs/promises');

async function start() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const url = 'https://fr.tripadvisor.be/Restaurants-g188646-Charleroi_Hainaut_Province_Wallonia.html';

    await page.goto(url);
    await page.waitForNetworkIdle();



    const restoLinks = await page.$$eval('.biGQs > a', (links) => {
        return links.map((link) => link.href);
    });

    const restaurantData = [];

    for (const link of restoLinks) {
        const newPage = await browser.newPage();
        await newPage.goto(link);
        await newPage.waitForNavigation();

        const name = await newPage.$eval('h1[data-test-target=top-info-header]', (element) => element.textContent);
        const number = await newPage.$eval('.yEWoV', (element) => element.textContent);

        restaurantData.push({ name, number });


    }

    const jsonData = JSON.stringify(restaurantData, null, 2);
    await fs.writeFile('info.json', jsonData);

}

start();