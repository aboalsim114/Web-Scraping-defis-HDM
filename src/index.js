const puppeteer = require('puppeteer');
const fs = require('fs/promises');

async function start() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const url = 'https://fr.tripadvisor.be/Restaurants-g188646-Charleroi_Hainaut_Province_Wallonia.html';

    await page.goto(url);

    const restoLinks = await page.$$eval('.biGQs > a', (links) => {
        return links.map((link) => link.href);
    });

    const restaurantData = [];

    for (const link of restoLinks) {
        const newPage = await browser.newPage();
        await newPage.goto(link);
        await newPage.waitForNavigation();

        const name = await newPage.$eval('#component_53 > div > div.acKDw.w.O > h1', (element) => element.textContent);
        const number = await newPage.$eval('#component_54 > div.hILIJ > div > div:nth-child(3) > div > div > div:nth-child(5) > div > a > span > span.yEWoV', (element) => element.textContent.trim());

        restaurantData.push({ name, number });

        await newPage.close();
    }

    const jsonData = JSON.stringify(restaurantData, null, 2);
    await fs.writeFile('info.json', jsonData);

    await browser.close();
}

start();