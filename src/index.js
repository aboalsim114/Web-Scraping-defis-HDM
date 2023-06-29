const puppeteer = require('puppeteer');
const fs = require('fs/promises');

async function start() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const url = 'https://fr.tripadvisor.be/Restaurants-g188646-Charleroi_Hainaut_Province_Wallonia.html';

    await page.goto(url);
    await page.waitForNetworkIdle();

    await page.evaluate(() => {
        const cookies = document.querySelector("#onetrust-accept-btn-handler");
        cookies.click();
    });

    await page.waitForNetworkIdle();

    await page.evaluate(() => {
        const restoNames = document.querySelectorAll(".BMQDV._F.G-.bYExr.SwZTJ.FGwzt.ukgoS");
        const restoArray = Array.from(restoNames);
        restoArray.forEach((restoName) => {
            restoName.click();
        });
    });


    await page.screenshot({ path: 'images/bg.png', fullPage: true });
}

start();